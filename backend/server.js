const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/history', require('./routes/history'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leaderboard')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Initialize with default users if none exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        { name: 'Rahul' },
        { name: 'Kamal' },
        { name: 'Sanak' },
        { name: 'Priya' },
        { name: 'Amit' },
        { name: 'Neha' },
        { name: 'Vikas' },
        { name: 'Anita' },
        { name: 'Rohit' },
        { name: 'Yajat' }
      ];
      
      await User.insertMany(defaultUsers);
      console.log('Default users created');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Leaderboard API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
