const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

// Get all team members (Admin only)
exports.getAllMembers = async (req, res) => {
  try {
    const members = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add team member (Admin only)
exports.addMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters'
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'team_member'
    });

    await user.save();

    res.status(201).json({
      message: 'Team member added successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update team member (Admin or Self)
exports.updateMember = async (req, res) => {
  try {
    const { name, password } = req.body;
    const targetUserId = req.params.id;
    const currentUser = await User.findById(req.user.userId);

    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    // Check if user is admin or updating own profile
    if (currentUser.role !== 'admin' && req.user.userId !== targetUserId) {
      return res.status(403).json({
        error: 'You can only update your own profile'
      });
    }

    const updates = {};
    if (name) updates.name = name;

    // If password is being changed
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password must be at least 6 characters'
        });
      }
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      targetUserId,
      updates,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete team member (Admin only)
exports.deleteMember = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userToDelete.role === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin account' });
    }

    // Reassign all tickets to admin
    const admin = await User.findOne({ role: 'admin' });
    await Ticket.updateMany(
      { assignedTo: req.params.id },
      { assignedTo: admin._id, updatedAt: new Date() }
    );

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Team member deleted successfully. All their tickets have been reassigned to admin.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};