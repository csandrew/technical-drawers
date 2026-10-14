const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const {
    stkPush,
    mpesaCallback,
    queryPaymentStatus,
    simulatePayment,
    getOrderPaymentStatus
} = require('../controllers/mpesaController');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const mongoose = require('mongoose');
const User = require('../models/User');
const { sendError } = require('../utils/responseHandler');

const guestOrderAccess = async (req, res, next) => {
    try {
        const orderId = req.body?.orderId || req.params.orderId;
        const token = req.get('X-Order-Access-Token');
        if (!orderId || !mongoose.isValidObjectId(orderId) || !token) {
            return sendError(res, 404, 'Order not found');
        }

        const order = await Order.findById(orderId).select('+guestAccessTokenHash');
        if (!order || !order.guestAccessTokenHash) return sendError(res, 404, 'Order not found');

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const expected = Buffer.from(order.guestAccessTokenHash, 'hex');
        const received = Buffer.from(tokenHash, 'hex');
        if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) {
            return sendError(res, 404, 'Order not found');
        }

        req.guestOrder = order;
        next();
    } catch (error) {
        console.error('Guest payment authorization error:', error);
        sendError(res, 500, 'Unable to authorize payment request');
    }
};

const requireOrderOwner = async (req, res, next) => {
    try {
        const orderId = req.body.orderId || req.params.orderId;
        if (!mongoose.isValidObjectId(orderId)) return sendError(res, 404, 'Order not found');
        const order = await Order.findById(orderId);
        if (!order || String(order.userId) !== String(req.userId)) {
            return sendError(res, 404, 'Order not found');
        }
        next();
    } catch (error) {
        console.error('Payment order ownership check failed:', error);
        sendError(res, 500, 'Unable to verify payment access');
    }
};

const requireOrderAccess = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('role');
        if (user?.role === 'admin') return next();

        const order = await Order.findOne({
            'mpesa.checkoutRequestId': req.params.checkoutRequestID
        });
        if (!order || String(order.userId) !== String(req.userId)) {
            return sendError(res, 404, 'Payment not found');
        }
        next();
    } catch (error) {
        console.error('Payment authorization failed:', error);
        sendError(res, 500, 'Unable to verify payment access');
    }
};

// Public routes (M-Pesa calls these)
router.post('/callback', mpesaCallback);

// Protected routes (require authentication)
router.post('/stkpush', auth, requireOrderOwner, stkPush);
router.get('/status/:checkoutRequestID', auth, requireOrderAccess, queryPaymentStatus);
router.get('/order/:orderId', auth, requireOrderOwner, getOrderPaymentStatus);
router.post('/guest/stkpush', guestOrderAccess, stkPush);
router.get('/guest/order/:orderId', guestOrderAccess, getOrderPaymentStatus);

// Testing only - remove in production
if (process.env.NODE_ENV !== 'production') {
    router.post('/simulate', auth, requireOrderOwner, simulatePayment);
}

module.exports = router;