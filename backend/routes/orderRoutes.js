const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendResponse, sendError } = require('../utils/responseHandler');
const { reserveOrderItems, restoreReservedItems, releaseOrderInventory } = require('../utils/orderInventory');
const { rateLimit } = require('express-rate-limit');

const guestOrderLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many order attempts. Please try again later.' }
});

const hasGuestAccess = (order, req) => {
    const token = req.get('X-Order-Access-Token');
    if (!order.guestAccessTokenHash || !token) return false;
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expected = Buffer.from(order.guestAccessTokenHash, 'hex');
    const received = Buffer.from(tokenHash, 'hex');
    return expected.length === received.length && crypto.timingSafeEqual(expected, received);
};

const serializeOrder = (order) => {
    const result = order.toObject();
    delete result.guestAccessTokenHash;
    return result;
};

const requireOrderOwner = async (req, res, next) => {
    try {
        const orderId = req.body?.orderId || req.params.id || req.params.orderId;
        if (!mongoose.isValidObjectId(orderId)) {
            return sendError(res, 404, 'Order not found');
        }
        const order = await Order.findById(orderId);
        if (!order || String(order.userId) !== String(req.userId)) {
            return sendError(res, 404, 'Order not found');
        }
        next();
    } catch (error) {
        console.error('Order ownership check failed:', error);
        sendError(res, 500, 'Unable to verify order access');
    }
};

const requireAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('role');
        if (!user || user.role !== 'admin') {
            return sendError(res, 403, 'Administrator access required');
        }
        next();
    } catch (error) {
        console.error('Admin authorization failed:', error);
        sendError(res, 500, 'Unable to verify administrator access');
    }
};

// Guest checkout: server derives item names and prices from product records.
router.post('/guest', guestOrderLimiter, async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod, customer } = req.body;
        if (!Array.isArray(items) || items.length === 0 || !shippingAddress || !customer) {
            return sendError(res, 400, 'Order items, customer and shipping information are required');
        }
        if (!['mpesa', 'cash'].includes(paymentMethod)) {
            return sendError(res, 400, 'Invalid payment method');
        }

        const quantitiesByProductId = new Map();
        for (const item of items) {
            const productId = String(item.productId || '');
            const quantity = Number(item.quantity);
            if (!mongoose.isValidObjectId(productId) || !Number.isInteger(quantity) || quantity < 1) {
                return sendError(res, 400, 'One or more products or quantities are invalid');
            }
            quantitiesByProductId.set(
                productId,
                (quantitiesByProductId.get(productId) || 0) + quantity
            );
        }

        const productIds = [...quantitiesByProductId.keys()];
        if (productIds.some((id) => !mongoose.isValidObjectId(id))) {
            return sendError(res, 400, 'One or more products are invalid');
        }
        const products = await Product.find({ _id: { $in: productIds } });
        const productById = new Map(products.map((product) => [String(product._id), product]));
        const orderItems = [];

        for (const [productId, quantity] of quantitiesByProductId) {
            const product = productById.get(productId);
            if (!product) {
                return sendError(res, 400, 'An item in your cart is invalid');
            }
            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.images?.[0] || ''
            });
        }

        const accessToken = crypto.randomBytes(32).toString('hex');
        const guestAccessTokenHash = crypto.createHash('sha256').update(accessToken).digest('hex');
        const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const safeCustomer = {
            name: String(customer.name || '').trim(),
            email: String(customer.email || '').trim(),
            phone: String(customer.phone || '').trim()
        };
        const safeShippingAddress = {
            street: String(shippingAddress.street || '').trim(),
            city: String(shippingAddress.city || '').trim(),
            county: String(shippingAddress.county || '').trim(),
            phone: String(shippingAddress.phone || '').trim()
        };
        if (!safeCustomer.name || !safeCustomer.email || !safeCustomer.phone ||
            !safeShippingAddress.street || !safeShippingAddress.city ||
            !safeShippingAddress.county || !safeShippingAddress.phone) {
            return sendError(res, 400, 'Complete customer and shipping information is required');
        }
        const unavailableProduct = await reserveOrderItems(orderItems);
        if (unavailableProduct) {
            return sendError(res, 409, `${unavailableProduct} does not have enough stock`);
        }

        let order;
        try {
            order = await Order.create({
                items: orderItems,
                totalAmount,
                shippingAddress: safeShippingAddress,
                paymentMethod,
                customer: safeCustomer,
                guestAccessTokenHash,
                inventoryReserved: true
            });
        } catch (error) {
            await restoreReservedItems(orderItems);
            throw error;
        }
        sendResponse(res, 201, {
            order: serializeOrder(order),
            accessToken
        }, 'Guest order created successfully');
    } catch (error) {
        console.error('Guest order creation error:', error);
        sendError(res, 500, 'Unable to create order');
    }
});

router.get('/guest/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return sendError(res, 404, 'Order not found');
        }
        const order = await Order.findById(req.params.id).select('+guestAccessTokenHash');
        if (!order || !hasGuestAccess(order, req)) {
            return sendError(res, 404, 'Order not found');
        }
        sendResponse(res, 200, serializeOrder(order));
    } catch (error) {
        console.error('Guest order lookup error:', error);
        sendError(res, 500, 'Unable to retrieve order');
    }
});

// Create order
router.post('/', auth, async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod, customer } = req.body;
        if (!Array.isArray(items) || items.length === 0 || !shippingAddress) {
            return sendError(res, 400, 'Order items and shipping information are required');
        }
        if (!['mpesa', 'cash'].includes(paymentMethod)) {
            return sendError(res, 400, 'Invalid payment method');
        }

        const quantitiesByProductId = new Map();
        for (const item of items) {
            const productId = String(item.productId || item._id || '');
            const quantity = Number(item.quantity);
            if (!mongoose.isValidObjectId(productId) || !Number.isInteger(quantity) || quantity < 1) {
                return sendError(res, 400, 'One or more products or quantities are invalid');
            }
            quantitiesByProductId.set(
                productId,
                (quantitiesByProductId.get(productId) || 0) + quantity
            );
        }

        const products = await Product.find({ _id: { $in: [...quantitiesByProductId.keys()] } });
        const productById = new Map(products.map((product) => [String(product._id), product]));
        const orderItems = [];
        for (const [productId, quantity] of quantitiesByProductId) {
            const product = productById.get(productId);
            if (!product) return sendError(res, 400, 'An item in your cart is invalid');
            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.images?.[0] || ''
            });
        }

        const unavailableProduct = await reserveOrderItems(orderItems);
        if (unavailableProduct) {
            return sendError(res, 409, `${unavailableProduct} does not have enough stock`);
        }

        let order;
        try {
            order = await Order.create({
                items: orderItems,
                totalAmount: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                shippingAddress,
                paymentMethod,
                customer,
                userId: req.userId,
                inventoryReserved: true
            });
        } catch (error) {
            await restoreReservedItems(orderItems);
            throw error;
        }
        sendResponse(res, 201, order, 'Order created successfully');
    } catch (error) {
        console.error('Order creation error:', error);
        sendError(res, 500, error.message);
    }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId })
            .sort({ createdAt: -1 });
        sendResponse(res, 200, orders);
    } catch (error) {
        sendError(res, 500, error.message);
    }
});

// Get single order
router.get('/:id', auth, requireOrderOwner, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order || String(order.userId) !== String(req.userId)) {
            return sendError(res, 404, 'Order not found');
        }
        sendResponse(res, 200, order);
    } catch (error) {
        sendError(res, 500, error.message);
    }
});

// Update order status (admin only)
router.put('/:id/status', auth, requireAdmin, async (req, res) => {
    try {
        const { orderStatus } = req.body;
        if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(orderStatus)) {
            return sendError(res, 400, 'Invalid order status');
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true, runValidators: true }
        );
        if (!order) {
            return sendError(res, 404, 'Order not found');
        }
        if (orderStatus === 'cancelled' && order.paymentStatus !== 'paid') {
            await releaseOrderInventory(order._id);
        }
        sendResponse(res, 200, order, 'Order status updated');
    } catch (error) {
        sendError(res, 500, error.message);
    }
});

module.exports = router;
