const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authenticateToken = require('../middleware/auth');

// Public route - Create ticket from user side
router.post('/create', ticketController.createTicket);

// Protected routes - Admin/Team member access
router.get('/', authenticateToken, ticketController.getAllTickets);
router.get('/:id', authenticateToken, ticketController.getTicket);
router.post('/:id/messages', authenticateToken, ticketController.sendMessage);
router.patch('/:id/status', authenticateToken, ticketController.updateStatus);
router.patch('/:id/assign', authenticateToken, ticketController.assignTicket);

module.exports = router;