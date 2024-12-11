const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.body.isAdmin || req.body.isAdmin !== true) {
    return res.status(403).json({ error: 'You must be an admin to access this route' });
  }
  next();
};

// POST route for adding questions (admin-only)
router.post('/questions', isAdmin, async (req, res) => {
  const { text, options, number } = req.body;

  // Validate data
  if (!text || !options || options.length < 2 || !number) {
    return res.status(400).json({ error: 'Invalid question data. Text, options, and number are required.' });
  }

  try {
    const question = new Question({ text, options, number });
    await question.save();
    res.status(201).json({ message: 'Question added successfully', question });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: 'Failed to add question' });
  }
});

module.exports = router;
