const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  isOffensive: { type: Boolean, required: true },
  analyzedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
