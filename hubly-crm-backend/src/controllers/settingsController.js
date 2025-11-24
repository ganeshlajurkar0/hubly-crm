const Settings = require('../models/Settings');

// Get chatbot settings (Public - for user-side widget)
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update chatbot settings (Admin only)
exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings(updates);
    } else {
      Object.assign(settings, updates);
    }

    await settings.save();

    res.json({
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};