const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/auth');

// All dashboard routes require authentication
router.get('/stats', authenticateToken, dashboardController.getStats);
router.get('/search/:ticketId', authenticateToken, dashboardController.searchTicket);

module.exports = router;