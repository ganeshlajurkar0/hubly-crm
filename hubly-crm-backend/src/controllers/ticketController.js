const Ticket = require('../models/Ticket');
const User = require('../models/User');
const generateTicketId = require('../utils/generateTicketId');

// Create ticket (Public - User side)
exports.createTicket = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find admin to assign ticket
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(500).json({ 
        error: 'System error: No admin found. Please contact support.' 
      });
    }

    // Generate unique ticket ID
    const ticketId = await generateTicketId();

    // Create ticket with initial message
    const ticket = new Ticket({
      ticketId,
      userName: name,
      userEmail: email,
      userPhone: phone,
      assignedTo: admin._id,
      status: 'open',
      messages: [{
        senderName: name,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
        timestamp: new Date()
      }]
    });

    await ticket.save();

    res.status(201).json({
      message: 'Thank you! Our team will get back to you soon.',
      ticketId: ticket.ticketId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tickets (with pagination)
exports.getAllTickets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find()
      .populate('assignedTo', 'name email')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Ticket.countDocuments();

    res.json({
      tickets,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTickets: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single ticket
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('messages.senderId', 'name');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send message to ticket
exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const user = await User.findById(req.user.userId);

    ticket.messages.push({
      senderId: user._id,
      senderName: user.name,
      text,
      timestamp: new Date()
    });

    ticket.updatedAt = new Date();
    await ticket.save();

    const updatedTicket = await Ticket.findById(ticket._id)
      .populate('assignedTo', 'name email')
      .populate('messages.senderId', 'name');

    res.json({
      message: 'Message sent successfully',
      ticket: updatedTicket
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update ticket status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['open', 'in_progress', 'resolved'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be: open, in_progress, or resolved' 
      });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({
      message: 'Ticket status updated successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign ticket
exports.assignTicket = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({ error: 'assignedTo user ID is required' });
    }

    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo, updatedAt: new Date() },
      { new: true }
    ).populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({
      message: 'Ticket assigned successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};