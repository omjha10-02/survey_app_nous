const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Unique code
  isActive: { type: Boolean, default: true }, // Boolean to mark if the code is active
});

module.exports = mongoose.model('Code', codeSchema);
