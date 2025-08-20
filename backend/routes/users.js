const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users with rankings
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    
    // Update rankings
    const updatedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));

    // Update ranks in database
    for (let i = 0; i < updatedUsers.length; i++) {
      await User.findByIdAndUpdate(updatedUsers[i]._id, { rank: updatedUsers[i].rank });
    }

    res.json(updatedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name: name.trim()
    });

    const newUser = await user.save();
    
    // Recalculate rankings
    const users = await User.find().sort({ totalPoints: -1 });
    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, { rank: i + 1 });
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Claim points for a user
router.post('/:id/claim', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate random points between 1 and 10
    const pointsClaimed = Math.floor(Math.random() * 10) + 1;
    
    // Update user's total points
    user.totalPoints += pointsClaimed;
    await user.save();

    // Create claim history entry
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsClaimed: pointsClaimed,
      totalPointsAfterClaim: user.totalPoints
    });
    await claimHistory.save();

    // Recalculate rankings for all users
    const users = await User.find().sort({ totalPoints: -1 });
    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, { rank: i + 1 });
    }

    // Get updated user with new rank
    const updatedUser = await User.findById(req.params.id);

    res.json({
      user: updatedUser,
      pointsClaimed,
      claimHistory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
