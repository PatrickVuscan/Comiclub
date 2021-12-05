const { User } = require('../models/user');
const { Comic } = require('../models/comic');
const { Episode } = require('../models/episode');
const { Image } = require('../models/image');
const { Meta } = require('../models/meta');
const { Comment } = require('../models/comment');

async function updateNestedEpisode(episodeID, updateType, attribute, value) {
  const updatedEpisode = await Episode.findByIdAndUpdate(
    { _id: episodeID },
    { [`${updateType}`]: { [`${attribute}`]: value } },
    { new: true }
  );

  const updatedComic = await Comic.findOneAndUpdate(
    { "episodes._id": episodeID },
    { [`${updateType}`]: { [`episodes.$.${attribute}`]: value } },
    { new: true }
  );

  return updatedEpisode;
}

module.exports = { updateNestedEpisode };