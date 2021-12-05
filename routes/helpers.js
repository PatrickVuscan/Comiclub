/* Routes Helper functions */
const { Comic } = require('../models/comic');
const { Episode } = require('../models/episode');

// Updates an episode, then accordingly updates the comic containing the episode
async function updateNestedEpisode(episodeID, updateType, attribute, value) {
  const updatedEpisode = await Episode.findByIdAndUpdate(
    { _id: episodeID },
    { [`${updateType}`]: { [`${attribute}`]: value } },
    { new: true }
  );

  await Comic.findOneAndUpdate(
    { 'episodes._id': episodeID },
    { [`${updateType}`]: { [`episodes.$.${attribute}`]: value } },
    { new: true }
  );

  return updatedEpisode;
}

module.exports = { updateNestedEpisode };
