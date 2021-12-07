/* Episodes API Routes */
const express = require('express');
const { ObjectId } = require('mongoose').Types;
const { multipartMiddleware, cloudinary } = require('../db/cloudinary');
const { mongoChecker, isMongoError } = require('../mongoHelpers');

// Import models
const { Comic } = require('../models/comic');
const { Episode } = require('../models/episode');
const { Image } = require('../models/image');
const { User } = require('../models/user');

const { updateNestedEpisode } = require('./helpers');

const router = express.Router();

router.use(mongoChecker);

// Creates a new EPISODE within a COMIC
router.put('/episode', mongoChecker, async (req, res) => {
  const { user } = req.session;

  const episode = new Episode({
    userID: user,
    comicID: req.body.comicID,
    name: req.body.name,
    description: req.body.description,
  });

  try {
    // Check that the creator of the comic is the user trying to add the episode
    const creatorID = await Comic.findCreatorByComicID(req.body.comicID);

    if (creatorID !== user) {
      res.status(401).send("You're not authorized to add an episode to this Comic. Please ensure this is your comic.");
      return;
    }

    // Once confirmed that the user is the creator of the comic
    const newEpisode = await episode.save();

    await Comic.updateOne(
      { _id: req.body.comicID },
      {
        $push: {
          episodes: episode,
        },
      }
    );

    // Update User Episode Count
    const creator = await User.findById(creatorID);
    creator.episodeCount += 1;
    creator.save();

    res.send(newEpisode);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('There was an error creating the episode.');
    }
  }
});

// Update an Episode
router.post('/update/:episodeID', async (req, res) => {
  const { episodeID } = req.params;

  try {
    const episode = await Episode.findOne({ _id: episodeID });

    if (episode.userID !== req.session.user) {
      res.status(401).send("You're not authorized to edit this Comic. Please ensure this is your comic.");
      return;
    }

    const { name, description } = req.body;
    let updatedEpisode;

    if (name) {
      updatedEpisode = await updateNestedEpisode(episodeID, '$set', 'name', name);
    }

    if (description) {
      updatedEpisode = await updateNestedEpisode(episodeID, '$set', 'description', description);
    }

    res.send(updatedEpisode);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('There was an error while trying to update the episode.');
    }
  }
});

// Add thumbnail for episode
router.post('/thumbnail/:episodeID', multipartMiddleware, async (req, res) => {
  // Upload to cloudinary
  // * req.files contains uploaded files
  try {
    const { episodeID } = req.params;
    const episode = await Episode.findOne({ _id: episodeID });

    if (episode.userID !== req.session.user) {
      res.status(401).send("You're not authorized to edit this Comic. Please ensure this is your comic.");
      return;
    }

    const cloudinaryResult = await cloudinary.uploader.upload(req.files.image.path);

    // Create a new image using the Image mongoose model
    const img = new Image({
      imageID: cloudinaryResult.public_id, // image id on cloudinary server
      imageURL: cloudinaryResult.url, // image url on cloudinary server
    });

    // Save image to the database
    const newImg = await img.save();

    const updatedEpisode = await updateNestedEpisode(episodeID, '$set', 'thumbImage', newImg);

    // Assuming all goes well, we now send the episode with the updated values
    res.send(updatedEpisode);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Error uploading your thumbnail for this episode.');
    }
  }
});

// Add thumbnail for episode
router.post('/panels/:episodeID', multipartMiddleware, async (req, res) => {
  // Upload to cloudinary
  // * req.files contains uploaded files
  try {
    const { episodeID } = req.params;
    const episode = await Episode.findOne({ _id: episodeID });

    if (episode.userID !== req.session.user) {
      res.status(401).send("You're not authorized to edit this Comic. Please ensure this is your comic.");
      return;
    }

    if (!req.files.panels) {
      res.status(400).send('No panels PDF included in request files');
      return;
    }
    const cloudinaryResult = await cloudinary.uploader.upload(req.files.panels.path);

    // Create a new image using the Image mongoose model
    const img = new Image({
      imageID: cloudinaryResult.public_id, // image id on cloudinary server
      imageURL: cloudinaryResult.url, // image url on cloudinary server
    });

    // Save image to the database
    const newImg = await img.save();

    const updatedEpisode = await updateNestedEpisode(episodeID, '$set', 'panels', newImg);

    // Assuming all goes well, we now send the episode with the updated values
    res.send(updatedEpisode);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Error uploading your panels for this episode.');
    }
  }
});

// GET episode by episodeID
router.get('/:episodeID', async (req, res) => {
  try {
    const episode = await Episode.findOne({ _id: req.params.episodeID });
    if (episode) {
      res.send(episode);
    } else {
      res.status(404).send('Episode not found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET episodes by userID
router.get('/userID/:userID', async (req, res) => {
  try {
    const episodes = await Episode.find({ userID: req.params.userID });
    res.send(episodes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET episodes by comicID
router.get('/comicID/:comicID', async (req, res) => {
  const { comicID } = req.params;

  try {
    if (!comicID || !ObjectId.isValid(comicID)) {
      res.status(400).send('The comicID sent is not valid.');
      return;
    }

    const comic = await Comic.findById(req.params.comicID);
    if (comic) {
      res.send(comic.episodes);
    } else {
      res.status(404).send('Comic by this ID was not found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// View an episode
router.post('/view', async (req, res) => {
  const { episodeID } = req.body;

  try {
    // Increment views for episode
    const updatedEpisode = await updateNestedEpisode(episodeID, '$inc', 'meta.views', 1);

    // Increment total views for entire comic series
    await Comic.findByIdAndUpdate({ _id: updatedEpisode.comicID }, { $inc: { 'meta.views': 1 } }, { new: true });

    res.status(200).send(`Viewed ${episodeID}.`);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Bad Request'); // bad request for changing the student.
    }
  }
});

module.exports = router;
