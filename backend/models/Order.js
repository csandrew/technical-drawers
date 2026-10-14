const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },

    guestAccessTokenHash: { type: String, select: false },

    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],

    totalAmount: {
        type: Number,
        required: true
    },

    shippingAddress: {
        street: String,
        city: String,
        county: String,
        phone: String
    },

    customer: {
        name: String,
        email: String,
        phone: String
    },

    paymentMethod: {
        type: String,
        enum: ['mpesa', 'cash'],
        default: 'mpesa'
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },

    inventoryReserved: {
        type: Boolean,
        default: false
    },

    orderStatus: {
        type: String,
        enum: [
            'pending',
            'processing',
            'shipped',
            'delivered',
            'cancelled'
        ],
        default: 'pending'
    },

    mpesa: {
        transactionId: String,
        phoneNumber: String,
        amount: Number,
        merchantRequestId: String,
        checkoutRequestId: String,
        callbackData: mongoose.Schema.Types.Mixed
    },

    isInstitutionOrder: {
        type: Boolean,
        default: false
    },

    institutionName: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Order', orderSchema);