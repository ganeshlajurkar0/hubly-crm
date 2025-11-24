const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  headerColor: {
    type: String,
    default: '#4F46E5',
    match: [/^#[0-9A-F]{6}$/i, 'Please provide a valid hex color']
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF',
    match: [/^#[0-9A-F]{6}$/i, 'Please provide a valid hex color']
  },
  initialMessage: {
    type: String,
    default: 'Hi! How can we help you today?',
    maxlength: 500
  },
  namePlaceholder: {
    type: String,
    default: 'Your Name',
    maxlength: 100
  },
  emailPlaceholder: {
    type: String,
    default: 'Your Email',
    maxlength: 100
  },
  phonePlaceholder: {
    type: String,
    default: 'Your Phone Number',
    maxlength: 100
  },
  popMessage: {
    type: String,
    default: 'Need help? Chat with us!',
    maxlength: 200
  },
  missedChatTimer: {
    type: Number,
    default: 5,
    min: 1,
    max: 60
  }
});

module.exports = mongoose.model('Settings', settingsSchema);