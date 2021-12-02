/* Panel model */
const mongoose = require('mongoose');
const { CommentSchema } = require('./comment');
const { ImageSchema } = require('./image');

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const PanelSchema = new mongoose.Schema({
  userID: String, // creator
  episodeID: String, // Parent Episode
  panelImage: ImageSchema, // Cloudinary
  comments: [CommentSchema],
});

// make a model using the Episode schema
const Panel = mongoose.model('Panel', PanelSchema);

module.exports = { Panel, PanelSchema };
