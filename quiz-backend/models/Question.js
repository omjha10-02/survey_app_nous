// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   options: { type: [String], required: true },
// });

// module.exports = mongoose.model('Question', questionSchema);
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  number: { type: Number, required: true },  // Adding a number field for question ordering
});

module.exports = mongoose.model('Question', questionSchema);
