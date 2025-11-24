const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authenticateToken = require('../middleware/auth');

// Analytics routes require authentication
router.get('/', authenticateToken, analyticsController.getAnalytics);

module.exports = router;