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

// router.post('/responses', async (req, res) => {
//   const { questionId, selectedOption, userId } = req.body;

//   if (!questionId || !selectedOption || !userId) {
//     return res.status(400).json({ error: 'Invalid data' });
//   }

//   try {
//     const response = new Response({ questionId, selectedOption, userId });
//     await response.save();
//     res.status(201).json({ message: 'Response recorded' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to record response' });
//   }
// });


// Submit response route
router.post('/responses', async (req, res) => {
    const { questionId, selectedOption, userId } = req.body;
  
    // Validate data
    if (!questionId || !selectedOption || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Create a new response and save it to the database
      const response = new Response({
        questionId,
        selectedOption,
        userId,
      });
  
      await response.save();
  
      // Return success response
      res.status(201).json({ message: 'Response recorded successfully', response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to record response' });
    }
  });
  
  module.exports = router;
  
module.exports = router;
