/* Episode model */
const mongoose = require('mongoose');
const { MetaSchema } = require('./meta');

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const EpisodeSchema = new mongoose.Schema({
  userID: String, // creator
  comicID: String, // Comic
  // number: Number, // in order of Comic.Episodes
  name: String,
  description: String,
  thumbURL: String, // Cloudinary
  publishDate: { type: Date, default: Date.now },
  panels: [String],
  // panels: [PanelSchema],
  meta: MetaSchema,
});

// eslint-disable-next-line func-names
EpisodeSchema.statics.findByUserID = function (userID) {
  const Comic = this; // binds this to the User model

  // find comic by userID
  return Comic.find({ userID }).then((comics) => {
    if (!comics) {
      return Promise.reject(); // a rejected promise
    }
    return comics;
  });
};

EpisodeSchema.statics.findByComicID = function (comicID) {
  const Comic = this; // binds this to the User model

  // find comic by userID
  return Comic.find({ comicID }).then((comics) => {
    if (!comics) {
      return Promise.reject(); // a rejected promise
    }
    return comics;
  });
};

// make a model using the Episode schema
const Episode = mongoose.model('Episode', EpisodeSchema);
module.exports = { Episode, EpisodeSchema };
