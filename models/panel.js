/* Panel model */
const mongoose = require('mongoose');
const { CommentSchema } = require('./comment');

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const PanelSchema = new mongoose.Schema({
  userID: String, // creator
  episodeID: String, // Parent Episode
  panelURL: String, // Cloudinary
  comments: [CommentSchema],
  // comments: [commentsID]
});

// make a model using the Episode schema
const Panel = mongoose.model('Panel', PanelSchema);
module.exports = { Panel, PanelSchema };
