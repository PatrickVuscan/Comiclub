/* Comic model */
const mongoose = require('mongoose');
const { EpisodeSchema } = require('./episode');
const { MetaSchema } = require('./meta');
const { ImageSchema } = require('./image');

const ComicSchema = new mongoose.Schema({
  userID: String, // Creator
  name: String, // Name of the Comic Series
  description: String,
  genre: String,
  thumbImage: ImageSchema,
  publishDate: { type: Date, default: Date.now },
  episodes: [EpisodeSchema],
  meta: MetaSchema,
});

// eslint-disable-next-line func-names
ComicSchema.statics.findByUserID = function (userID) {
  const Comic = this; // Binds this to the Comic model

  // Find comic by userID
  return Comic.find({ userID }).then((comics) => {
    if (!comics) {
      return Promise.reject();
    }
    return comics;
  });
};

// make a model using the Comic schema
const Comic = mongoose.model('Comic', ComicSchema);

module.exports = { Comic };
