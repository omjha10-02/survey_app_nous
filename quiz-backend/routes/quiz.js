const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Response = require('../models/Response');
const User = require('../models/User');  // Adjust path as necessary

router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});


router.post('/responses', async (req, res) => {
  const { questionId, selectedOptions, userId } = req.body;

  // Validate input
  if (!questionId || !selectedOptions || !userId) {
    return res.status(400).json({ error: 'Invalid data. Provide questionId, selectedOptions, and userId.' });
  }

  if (!Array.isArray(selectedOptions)) {
    return res.status(400).json({ error: 'Selected options must be an array.' });
  }

  try {
    // Save response to the database
    const response = new Response({
      questionId,
      selectedOptions,
      userId,
    });

    await response.save();
    res.status(201).json({ message: 'Response recorded successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record response.' });
  }
});
  module.exports = router;
  
module.exports = router;
