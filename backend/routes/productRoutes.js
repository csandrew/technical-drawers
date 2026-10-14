const express = require('express');
const router = express.Router();
const {
    getProducts,
    getFeaturedProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { sendError } = require('../utils/responseHandler');

const requireAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('role');
        if (!user || user.role !== 'admin') {
            return sendError(res, 403, 'Administrator access required');
        }
        next();
    } catch (error) {
        console.error('Product administrator authorization failed:', error);
        sendError(res, 500, 'Unable to verify administrator access');
    }
};

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);
router.post('/', auth, requireAdmin, createProduct);
router.put('/:id', auth, requireAdmin, updateProduct);
router.delete('/:id', auth, requireAdmin, deleteProduct);

module.exports = router;
