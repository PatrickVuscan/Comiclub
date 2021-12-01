/* User model */

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userID: String,
  body: String,
  publishDate: Date,
  panelID: String,
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = { Comment, CommentSchema };
