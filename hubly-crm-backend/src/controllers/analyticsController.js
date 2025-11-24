const Ticket = require('../models/Ticket');

// Get analytics data
exports.getAnalytics = async (req, res) => {
  try {
    // Total chats
    const totalChats = await Ticket.countDocuments();

    // Resolved vs Unresolved
    const resolved = await Ticket.countDocuments({ status: 'resolved' });
    const unresolved = await Ticket.countDocuments({
      status: { $in: ['open', 'in_progress'] }
    });

    // Average reply time calculation
    const tickets = await Ticket.find();
    let totalReplyTime = 0;
    let ticketsWithReplies = 0;

    tickets.forEach(ticket => {
      if (ticket.messages.length > 1) {
        const firstMessage = new Date(ticket.messages[0].timestamp);
        const firstReply = new Date(ticket.messages[1].timestamp);
        const replyTime = (firstReply - firstMessage) / (1000 * 60); // in minutes
        totalReplyTime += replyTime;
        ticketsWithReplies++;
      }
    });

    const avgReplyTime = ticketsWithReplies > 0
      ? (totalReplyTime / ticketsWithReplies).toFixed(2)
      : 0;

    res.json({
      totalChats,
      resolved,
      unresolved,
      resolvedPercentage: totalChats > 0 ? ((resolved / totalChats) * 100).toFixed(2) : 0,
      avgReplyTime: parseFloat(avgReplyTime)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};