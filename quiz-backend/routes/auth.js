

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // User model
// const Code = require('../models/Code'); // Code model
// // Assuming User model is already defined
// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User'); // User model

// // User signup route
// router.post('/signup', async (req, res) => {
//   const { name, code } = req.body;

//   // Validate input
//   if (!name || !code) {
//     return res.status(400).json({ error: 'Name and code are required' });
//   }

//   try {
//     const user = new User({
//       name,
//       code,
//     });

//     // Save user to the database
//     await user.save();

//     // Return success with the user ID
//     res.status(201).json({ message: 'User created successfully', userId: user._id });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model
const Code = require('../models/Code'); // Code model

// User signup route
router.post('/signup', async (req, res) => {
  const { name, code } = req.body;

  // Validate input
  if (!name || !code) {
    return res.status(400).json({ error: 'Name and code are required' });
  }

  try {
    // Check if the provided code exists in the database
    const validCode = await Code.findOne({ code }); // Look for the code in the Code collection
    if (!validCode || !validCode.isActive) {
      return res.status(400).json({ error: 'Invalid or inactive code' });
    }

    // Create a new user with the provided name and code
    const user = new User({
      name,
      code,
    });

    // Save user to the database
    await user.save();

    // Return success with the user ID
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;
