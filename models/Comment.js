const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
