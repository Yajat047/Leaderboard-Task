const express = require('express');
const router = express.Router();
const ClaimHistory = require('../models/ClaimHistory');

// Get all claim history
router.get('/', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate('userId', 'name')
      .sort({ claimedAt: -1 });
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get claim history for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const history = await ClaimHistory.find({ userId: req.params.userId })
      .populate('userId', 'name')
      .sort({ claimedAt: -1 });
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
