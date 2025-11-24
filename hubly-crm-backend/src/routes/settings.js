const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

// Public route - Get settings for user-side widget
router.get('/', settingsController.getSettings);

// Admin only - Update settings
router.put('/', authenticateToken, isAdmin, settingsController.updateSettings);

module.exports = router;