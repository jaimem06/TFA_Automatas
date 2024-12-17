const mongoose = require('mongoose');

const PatternSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pattern', PatternSchema);
