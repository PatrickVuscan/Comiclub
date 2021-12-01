/* User model */

const mongoose = require('mongoose');

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const ComicSchema = new mongoose.Schema({
  userID: String, // creator
  name: String,
  description: String,
  thumb: String,
  publishDate: { type: Date, default: Date.now },
  episodes: [{ episodeID: String }],
  meta: {
    views: Number,
    likes: Number,
  },
  comments: [
    {
      userID: String,
      body: String,
      publishDate: Date,
    },
  ],
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
