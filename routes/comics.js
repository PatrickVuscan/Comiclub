/* Comics API Routes */
const express = require('express');
const { ObjectId } = require('mongoose').Types;
const { multipartMiddleware, cloudinary } = require('../db/cloudinary');
const { mongoChecker, isMongoError } = require('../mongoHelpers');

// Import models
const { User } = require('../models/user');
const { Comic } = require('../models/comic');
const { Image } = require('../models/image');
const { Episode } = require('../models/episode');
const { Comment } = require('../models/comment');

const router = express.Router();

router.use(mongoChecker);

// Create a new Comic
router.post('/', async (req, res) => {
  if (!req.session.user) {
    res.status(401).send('Please log in before trying to create a comic.');
  } else if (!req.body.name || !req.body.description || !req.body.genre) {
    res.status(400).send('You did not include all the required attributes to create a comic.');
  }

  const comic = new Comic({
    userID: req.session.user,
    name: req.body.name,
    description: req.body.description,
    genre: req.body.genre,
  });

  try {
    // Update User Comics Count
    const user = await User.findById(req.session.user);
    user.comicsCount += 1;
    user.save();

    // Save the user
    const newComic = await comic.save();
    res.send(newComic);
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('There was an error creating your Comic.'); // Error saving the comic
    }
  }
});

// Get all comics - sorry for bad route name, didn't organize routes well at start.
router.get('/retrieve/all-comics', async (req, res) => {
  try {
    const comics = await Comic.find();
    res.send(comics);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get top comics - sorry for bad route name, didn't organize routes well at start.
router.get('/retrieve/top-comics', async (req, res) => {
  try {
    const comics = await Comic.find({}, null, {
      limit: 10,
      sort: { 'meta.views': -1 },
    });

    res.send(comics);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get comics sorted into the different genres
// Returned as an object of key value pairs, where the
// key is the genre string, and the value is the array of comics
router.get('/retrieve/comics-by-genre', async (req, res) => {
  try {
    const comics = await Comic.aggregate([
      {
        $group: {
          _id: '$genre',
          fields: { $push: '$$ROOT' },
        },
      },
      {
        $group: {
          _id: null,
          root: { $push: { k: '$_id', v: '$fields' } },
        },
      },
      {
        $replaceRoot: { newRoot: { $arrayToObject: '$root' } },
      },
    ]);

    if (comics.length === 0) {
      res.send({});
      return;
    }

    res.send(comics[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a Comic
router.post('/update/:comicID', async (req, res) => {
  const { comicID } = req.params;

  try {
    const comic = await Comic.findOne({ _id: comicID });

    if (comic.userID !== req.session.user) {
      res.status(401).send("You're not authorized to edit this Comic. Please ensure this is your comic.");
      return;
    }

    const toSet = {};
    const { name, description, genre } = req.body;
    if (name) toSet.name = name;
    if (description) toSet.description = description;
    if (genre) toSet.genre = genre;

    const updatedComic = await Comic.findByIdAndUpdate({ _id: comicID }, { $set: toSet }, { new: true });

    res.send(updatedComic);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Something went wrong while trying to update the comic.'); // bad request for changing the student.
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

    // Assuming all goes well, we now send the episode with updated values
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

// Get the current user's comics
router.get('/userID', async (req, res) => {
  if (!req.session.user) {
    res.status(401).send('Please log in before trying to access your comics.');
    return;
  }

  try {
    const comics = await Comic.find({ userID: req.session.user });
    res.send(comics);
    // if (comics) res.send(comics);
    // else res.send([]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get comic by given comicID
router.get('/:comicID', async (req, res) => {
  const { comicID } = req.params;

  if (!req.session.user) {
    res.status(401).send('Please log in before trying to access your comics.');
    return;
  }

  try {
    if (!ObjectId.isValid(comicID)) {
      res.status(400).send('The comicID sent is not valid.');
      return;
    }

    const comic = await Comic.findOne({ _id: comicID });
    res.send(comic || {});
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get comic by given comicID
router.get('/user/likedComics', async (req, res) => {
  if (!req.session.user) {
    res.status(401).send('Please log in before trying to access your comics.');
    return;
  }

  try {
    const user = await User.findById(req.session.user);

    const { likes } = user;
    const validLikes = [];

    likes.forEach((like) => {
      if (ObjectId.isValid(like)) {
        validLikes.push(like);
      }
    });

    const likedComics = await Comic.find({ _id: { $in: validLikes } });
    res.send(likedComics || []);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
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

// Check if a comic is liked by the current user
router.get('/liked/:comicID', async (req, res) => {
  const { comicID } = req.params;
  const { user } = req.session;

  try {
    const alreadyLiked = await User.checkLiked(user, comicID);
    res.status(200).send(alreadyLiked);
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
router.post('/like', async (req, res) => {
  const { comicID } = req.body;
  const { user } = req.session;

  try {
    const alreadyLiked = await User.checkLiked(user, comicID);

    if (alreadyLiked) {
      res.status(409).send(`User ${user} already liked comic ${comicID}. Not modified.`);
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
      res.status(409).send(`User ${user} did not previously like comic ${comicID}. Not modified.`);
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

// Delete comic via their ID
router.delete('/:comicID', async (req, res) => {
  const { comicID } = req.params;
  const { user } = req.session;

  if (!user) {
    res.status(401).send('Please log in before trying to delete a comic.');
    return;
  }

  try {
    // Delete all episodes of the comic first
    await Episode.deleteMany({ comicID: { $eq: comicID } });

    await Comic.findByIdAndDelete(comicID);
    res.status(200).send('Successfully deleted comic.');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
