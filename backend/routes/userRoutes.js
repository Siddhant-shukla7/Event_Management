const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/create', async (req, res) => {
  try {
    console.log("Received request to create user");
    const { email, name } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    const user = new User({ email, name });
    console.log(user);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

// List all users
router.get('/list', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
