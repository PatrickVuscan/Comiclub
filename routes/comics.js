/* Comics API Routes */
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

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

//! *************************************************************** COMIC ROUTES
// Create a new Comic
router.post('/', async (req, res) => {
  const comic = new Comic({
    userID: req.session.user,
    name: req.body.name,
    description: req.body.description,
    genre: req.body.genre,
  });

  try {
    // Save the user
    const newComic = await comic.save();
    res.send(newComic);
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

// Update a Comic
router.post('/update/:comicID', async (req, res) => {
  try {
    const comic = await Comic.findOne({ _id: req.params.comicID });

    if (comic.userID !== req.session.user) {
      res.status(401).send("You're not authorized to edit this Comic. Please ensure this is your comic.");
      return;
    }

    const toSet = {};
    const { name, description, genre } = req.body;
    if (name) toSet.name = name;
    if (description) toSet.description = description;
    if (genre) toSet.genre = genre;

    const updatedComic = Comic.findByIdAndUpdate({ _id: req.body.comicID }, { $set: toSet }, { new: true });

    res.send(updatedComic);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('There was something wrong trying to '); // bad request for changing the student.
    }
  }
});

// Add thumbnail for comic
router.post('/thumbnail/:comicID', multipartMiddleware, async (req, res) => {
  // Upload to cloudinary
  // * req.files contains uploaded files
  try {
    const { comicID } = req.params;
    const comic = await Comic.findOne({ _id: comicID });

    if (comic.userID !== req.session.user) {
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

    const updatedComic = await Comic.findByIdAndUpdate(
      { _id: comicID },
      { $set: { thumbImage: newImg } },
      { new: true }
    );

    // Assuming all goes well, we now send the user with updated values
    res.send(updatedComic);
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

// Get all comics by userID
router.get('/userID/:userID', async (req, res) => {
  try {
    const comics = await Comic.find({ userID: req.params.userID });
    res.send(comics);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Like a Comic
router.post('/like', async (req, res) => {
  const { comicID } = req.body;
  const { user } = req.session;

  try {
    const alreadyLiked = await User.checkLiked(user, comicID);

    if (alreadyLiked) {
      res.status(304).send(`User ${user} already liked comic ${comicID}. Not modified.`);
      return;
    }

    await User.findByIdAndUpdate({ _id: user }, { $push: { likes: comicID } }, { new: true });

    await Comic.findByIdAndUpdate({ _id: comicID }, { $inc: { 'meta.likes': 1 } }, { new: true });

    res.status(200).send(`User ${user} liked comic ${comicID}.`);
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

// Like a Comic
router.post('/unlike', async (req, res) => {
  const { comicID } = req.body;
  const { user } = req.session;

  try {
    const alreadyLiked = await User.checkLiked(user, comicID);

    if (!alreadyLiked) {
      res.status(304).send(`User ${user} did not previously like comic ${comicID}. Not modified.`);
      return;
    }

    await User.findByIdAndUpdate({ _id: user }, { $pull: { likes: comicID } }, { new: true });

    await Comic.findByIdAndUpdate({ _id: comicID }, { $inc: { 'meta.likes': -1 } }, { new: true });

    res.status(200).send(`User ${user} unliked comic ${comicID}.`);
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
