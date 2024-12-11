// const express = require('express');
// const router = express.Router();
// const Response = require('../models/Response');

// router.get('/getresult', async (req, res) => {
//   try {
//     const data = await Response.aggregate([
//       {
//         $group: {
//           _id: '$questionId',
//           options: { $push: '$selectedOption' },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch dashboard data' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Question = require('../models/Question');

router.get('/getresult', async (req, res) => {
  try {
    // Fetch all questions to ensure we have data for all of them
    const questions = await Question.find();

    // Aggregate response data to count selections for each option
    const responseData = await Response.aggregate([
      {
        $group: {
          _id: { questionId: '$questionId', selectedOption: '$selectedOption' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Organize data by question
    const results = questions.map((question) => {
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
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
