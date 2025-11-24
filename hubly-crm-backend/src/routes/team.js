const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

// Admin only routes
router.get('/', authenticateToken, isAdmin, teamController.getAllMembers);
router.post('/', authenticateToken, isAdmin, teamController.addMember);
router.delete('/:id', authenticateToken, isAdmin, teamController.deleteMember);

// Admin or self can update
router.put('/:id', authenticateToken, teamController.updateMember);

module.exports = router;