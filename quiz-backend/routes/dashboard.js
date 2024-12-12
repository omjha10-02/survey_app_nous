
const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Question = require('../models/Question');

router.get('/getresult', async (req, res) => {
  try {
    // Fetch all questions to ensure we have complete data
    const questions = await Question.find();

    // Aggregate response data to count selections for each option
    const responseData = await Response.aggregate([
      { $unwind: '$selectedOptions' }, // Split multiple options into separate documents
      {
        $group: {
          _id: { questionId: '$questionId', selectedOption: '$selectedOptions' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Organize data by question
    const results = questions.map((question) => {
      // Map each option in the question to its response count
      const optionsData = question.options.map((option) => {
        const optionCount = responseData.find(
          (response) =>
            response._id.questionId.toString() === question._id.toString() &&
            response._id.selectedOption === option
        );
        return {
          option,
          count: optionCount ? optionCount.count : 0,
        };
      });

      return {
        questionId: question._id,
        questionText: question.text,
        options: optionsData,
      };
    });

    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching dashboard data:', err.message);
    res.status(500).json({ error: 'Failed to fetch dashboard data. Please try again later.' });
  }
});

module.exports = router;
