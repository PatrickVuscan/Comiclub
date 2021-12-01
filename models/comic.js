/* User model */

const mongoose = require('mongoose');
const { EpisodeSchema } = require('./episode');
const { MetaSchema } = require('./meta');

const ComicSchema = new mongoose.Schema({
  userID: String, // creator
  name: String,
  description: String,
  genre: String,
  thumbURL: String, // Cloudinary url
  publishDate: { type: Date, default: Date.now },
  episodes: [EpisodeSchema],
  meta: MetaSchema,
});

// eslint-disable-next-line func-names
ComicSchema.statics.findByUserID = function (userID) {
  const Comic = this; // binds this to the User model

  // find comic by userID
  return Comic.find({ userID }).then((comics) => {
    if (!comics) {
      return Promise.reject(); // a rejected promise
    }
    return comics;
  });
};

// make a model using the Comic schema
const Comic = mongoose.model('Comic', ComicSchema);
module.exports = { Comic };
