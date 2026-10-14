const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');
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
        console.error('Upload administrator authorization failed:', error);
        sendError(res, 500, 'Unable to verify administrator access');
    }
};

router.post('/image', auth, requireAdmin, upload.single('image'), uploadImage);

module.exports = router;
