/* Episode model */
const mongoose = require('mongoose');
const { MetaSchema } = require('./meta');
const { ImageSchema } = require('./image');
const { PanelSchema } = require('./panel');

const EpisodeSchema = new mongoose.Schema({
  userID: String, // Creator
  comicID: String, // Comic Series Episode is from
  name: String, // Name of the Episode
  description: String,
  thumbImage: ImageSchema,
  publishDate: { type: Date, default: Date.now },
  panels: [PanelSchema],
  meta: MetaSchema,
});

// Get creatorID of comic
// eslint-disable-next-line func-names
EpisodeSchema.statics.findCreatorByEpisodeID = function (episodeID) {
  const Episode = this; // Binds this to the Comic model

  // Find comic by userID
  return Episode.findOne({ _id: episodeID }).then((episode) => {
    if (!episode) {
      return Promise.reject();
    }
    return episode.userID;
  });
};

// eslint-disable-next-line func-names
EpisodeSchema.statics.findByUserID = function (userID) {
  const Episode = this; // Binds this to the Episode model

  // Find comic by userID
  return Episode.find({ userID }).then((episodes) => {
    if (!episodes) {
      return Promise.reject();
    }
    return episodes;
  });
};

EpisodeSchema.statics.findByComicID = function (comicID) {
  const Episode = this; // Binds this to the Episode model

  // Find Episodes by comicID
  return Episode.find({ comicID }).then((episodes) => {
    if (!episodes) {
      return Promise.reject();
    }
    return episodes;
  });
};

// make a model using the Episode schema
const Episode = mongoose.model('Episode', EpisodeSchema);

module.exports = { Episode, EpisodeSchema };
