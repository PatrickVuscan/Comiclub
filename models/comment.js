/* Comment model */
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userID: String,
  body: String,
  publishDate: { type: Date, default: Date.now },
  episodeID: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment, CommentSchema };
