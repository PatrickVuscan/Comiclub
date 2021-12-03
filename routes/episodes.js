/* Episodes API Routes */
const express = require('express');
const { multipartMiddleware, cloudinary } = require('../db/cloudinary');
const { mongoChecker, isMongoError } = require('../mongoHelpers');

// Import models
const { User } = require('../models/user');
const { Comic } = require('../models/comic');
const { Episode } = require('../models/episode');
const { Panel } = require('../models/panel');
const { Image } = require('../models/image');
const { Meta } = require('../models/meta');
const { Comment } = require('../models/comment');

const router = express.Router();

router.use(mongoChecker);

//! ************************************************************* EPISODE ROUTES
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

    res.send(newEpisode);
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

// Update an Episode
router.post('/update/:episodeID', async (req, res) => {
  const { episodeID } = req.params;

  try {
    const episode = await Episode.findOne({ _id: episodeID });

    if (episode.userID !== req.session.user) {
      res.status(401).send("You're not authorized to edit this Comic. Please ensure this is your comic.");
      return;
    }

    const toSet = {};
    const { name, description } = req.body;
    if (name) toSet.name = name;
    if (description) toSet.description = description;

    const updatedEpisode = await Episode.findByIdAndUpdate({ _id: episodeID }, { $set: toSet }, { new: true });

    res.send(updatedEpisode);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Something went wrong while trying to update the episode.'); // bad request for changing the student.
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

    const updatedEpisode = await Episode.findByIdAndUpdate(
      { _id: episodeID },
      { $set: { thumbImage: newImg } },
      { new: true }
    );

    // Assuming all goes well, we now send the episode with the updated values
    res.send(updatedEpisode);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Error uploading your profile picture.');
    }
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
  try {
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
    const updatedEpisode = await Episode.findByIdAndUpdate(
      { _id: episodeID },
      { $inc: { 'meta.views': 1 } },
      { new: true }
    );

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
