const { initiateSTKPush, querySTKStatus } = require('../config/mpesa');
const Order = require('../models/Order');
const { sendResponse, sendError } = require('../utils/responseHandler');
const { reserveOrderItems, releaseOrderInventory, restoreReservedItems } = require('../utils/orderInventory');

// Initiate STK Push Payment
const stkPush = async (req, res) => {
    try {
        const { phoneNumber, amount, orderId } = req.body;

        // Basic validation
        if (!phoneNumber || !amount || !orderId) {
            return sendError(res, 400, 'Phone number, amount and order ID are required');
        }

        // Validate amount
        if (amount < 1) {
            return sendError(res, 400, 'Amount must be at least 1 KES');
        }

        // Check if order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return sendError(res, 404, 'Order not found');
        }

        if (order.paymentMethod !== 'mpesa') {
            return sendError(res, 400, 'This order is not configured for M-Pesa payment');
        }

        if (Number(amount) !== Number(order.totalAmount)) {
            return sendError(res, 400, 'Payment amount does not match the order total');
        }

        // Check if order is already paid
        if (order.paymentStatus === 'paid') {
            return sendError(res, 400, 'Order is already paid');
        }
        if (order.paymentStatus === 'pending' && order.mpesa?.checkoutRequestId) {
            return sendError(res, 409, 'An M-Pesa payment request is already pending for this order');
        }

        // Convert Kenyan number to 254 format
        let phone = phoneNumber.toString().replace(/\s+/g, '');

        if (phone.startsWith('07')) {
            phone = '254' + phone.substring(1);
        } else if (phone.startsWith('+254')) {
            phone = phone.substring(1);
        } else if (phone.startsWith('254')) {
            // Already in correct format
        } else {
            return sendError(res, 400, 'Invalid Kenyan phone number format');
        }

        // Validate phone number (2547XXXXXXXX)
        if (!/^2547\d{8}$/.test(phone)) {
            return sendError(res, 400, 'Invalid Kenyan M-Pesa phone number. Must start with 2547');
        }

        if (!order.inventoryReserved) {
            const unavailableProduct = await reserveOrderItems(order.items);
            if (unavailableProduct) {
                return sendError(res, 409, `${unavailableProduct} does not have enough stock`);
            }
            order.inventoryReserved = true;
            try {
                await order.save();
            } catch (error) {
                await restoreReservedItems(order.items);
                throw error;
            }
        }

        // Initiate STK Push
        const response = await initiateSTKPush({
            phoneNumber: phone,
            amount: Math.round(amount),
            orderId: orderId
        });

        // Save transaction details to order
        if (response.ResponseCode === '0') {
            order.mpesa = {
                transactionId: null,
                phoneNumber: phone,
                amount: Math.round(amount),
                merchantRequestId: response.MerchantRequestID,
                checkoutRequestId: response.CheckoutRequestID,
                callbackData: null
            };
            order.paymentStatus = 'pending';
            await order.save();

            return sendResponse(res, 200, {
                checkoutRequestID: response.CheckoutRequestID,
                merchantRequestID: response.MerchantRequestID,
                responseCode: response.ResponseCode,
                responseDescription: response.ResponseDescription,
                customerMessage: response.CustomerMessage
            }, 'STK Push initiated successfully. Please check your phone for M-Pesa prompt.');
        } else {
            await releaseOrderInventory(order._id);
            return sendError(res, 400, response.ResponseDescription || 'STK Push failed');
        }

    } catch (error) {
        console.error('STK Controller Error:', error.response?.data || error.message);
        return sendError(res, 500, 'Unable to initiate M-Pesa payment. Please try again.');
    }
};

// M-Pesa Callback Handler
const mpesaCallback = async (req, res) => {
    try {
        console.log(
            'M-Pesa callback received for checkout request:',
            req.body?.Body?.stkCallback?.CheckoutRequestID
        );

        const { Body } = req.body;

        if (!Body || !Body.stkCallback) {
            console.error('Invalid callback structure');
            return res.status(400).json({
                ResultCode: 1,
                ResultDesc: 'Invalid callback data'
            });
        }

        const { stkCallback } = Body;
        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
        } = stkCallback;

        // Find order by merchant request ID or checkout request ID
        let order = await Order.findOne({
            $or: [
                { 'mpesa.merchantRequestId': MerchantRequestID },
                { 'mpesa.checkoutRequestId': CheckoutRequestID }
            ]
        });

        if (!order) {
            console.error(`Order not found for CheckoutRequestID: ${CheckoutRequestID}`);
            return res.status(404).json({
                ResultCode: 1,
                ResultDesc: 'Transaction not found'
            });
        }

        const callbackData = {
            ResultCode,
            ResultDesc,
            CallbackMetadata,
            receivedAt: new Date()
        };

        if (ResultCode === 0 && CallbackMetadata) {
            // Extract payment details from metadata
            const metadata = CallbackMetadata.Item;
            const paymentData = {};

            metadata.forEach(item => {
                paymentData[item.Name] = item.Value;
            });

            await Order.findOneAndUpdate(
                { _id: order._id, paymentStatus: { $ne: 'paid' } },
                {
                    $set: {
                        'mpesa.transactionId': paymentData.MpesaReceiptNumber,
                        'mpesa.amount': paymentData.Amount,
                        'mpesa.phoneNumber': paymentData.PhoneNumber,
                        'mpesa.callbackData': callbackData,
                        paymentStatus: 'paid',
                        orderStatus: 'processing'
                    }
                }
            );

            console.log(`✅ Payment successful for order ${order._id}: ${paymentData.MpesaReceiptNumber}`);

        } else {
            await Order.findOneAndUpdate(
                { _id: order._id, paymentStatus: { $ne: 'paid' } },
                {
                    $set: {
                        'mpesa.callbackData': callbackData,
                        paymentStatus: 'failed',
                        orderStatus: 'pending'
                    }
                }
            );
            await releaseOrderInventory(order._id);
            console.log(`❌ Payment failed for order ${order._id}: ${ResultDesc}`);
        }

        // Always respond with success to M-Pesa
        res.status(200).json({
            ResultCode: 0,
            ResultDesc: 'Callback processed successfully'
        });

    } catch (error) {
        console.error('Callback processing error:', error);
        res.status(500).json({
            ResultCode: 1,
            ResultDesc: 'Internal server error'
        });
    }
};

// Query Payment Status
const queryPaymentStatus = async (req, res) => {
    try {
        const { checkoutRequestID } = req.params;
        if (!checkoutRequestID) {
            return sendError(res, 400, 'Checkout Request ID is required');
        }

        const response = await querySTKStatus(checkoutRequestID);
        if (String(response.ResultCode) === '0') {
            await Order.findOneAndUpdate(
                { 'mpesa.checkoutRequestId': checkoutRequestID, paymentStatus: { $ne: 'paid' } },
                { $set: { paymentStatus: 'paid', orderStatus: 'processing' } }
            );
        }

        return sendResponse(res, 200, response, 'Payment status retrieved successfully');
    } catch (error) {
        console.error('Query Status Error:', error.response?.data || error.message);
        return sendError(res, 500, 'Failed to query payment status');
    }
};

// Simulate Payment (for testing without actual M-Pesa)
const simulatePayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return sendError(res, 400, 'Order ID is required');
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return sendError(res, 404, 'Order not found');
        }

        // Simulate successful payment
        order.paymentStatus = 'paid';
        order.orderStatus = 'processing';
        order.mpesa.transactionId = `SIM${Date.now()}`;
        order.mpesa.callbackData = {
            ResultCode: 0,
            ResultDesc: 'Simulated payment successful',
            simulated: true,
            timestamp: new Date()
        };

        await order.save();

        return sendResponse(res, 200, {
            orderId: order._id,
            transactionId: order.mpesa.transactionId,
            paymentStatus: order.paymentStatus
        }, 'Payment simulated successfully');

    } catch (error) {
        console.error('Simulation error:', error);
        return sendError(res, 500, 'Failed to simulate payment');
    }
};

// Get payment status by order ID
const getOrderPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return sendError(res, 404, 'Order not found');
        }

        return sendResponse(res, 200, {
            orderId: order._id,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            mpesaTransactionId: order.mpesa?.transactionId,
            mpesaPhoneNumber: order.mpesa?.phoneNumber,
            mpesaAmount: order.mpesa?.amount,
            checkoutRequestId: order.mpesa?.checkoutRequestId
        }, 'Payment status retrieved');

    } catch (error) {
        console.error('Get order payment status error:', error);
        return sendError(res, 500, 'Failed to get payment status');
    }
};

module.exports = {
    stkPush,
    mpesaCallback,
    queryPaymentStatus,
    simulatePayment,
    getOrderPaymentStatus
};