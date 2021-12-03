/* Users API Routes */
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

router.post('/', async (req, res) => {
  // Create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    // Save the user
    const newUser = await user.save();

    res.send({
      user: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
    });
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

// A route to login and create a session
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Use the static method on the User model to find a user
  // by their email and password
  User.findByEmailPassword(email, password)
    .then((user) => {
      // Add the user's id to the session.
      // We can check later if this exists to ensure we are logged in.
      req.session.user = user._id;
      req.session.username = user.username;
      req.session.email = user.email;
      req.session.profilePicture = user.profilePicture;

      res.send({
        user: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('There was an error trying to log in');
    });
});

// A route to logout a user
router.get('/logout', (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send('Logged out!');
    }
  });
});

// A route to check if a user is logged in on the session
router.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.send({
      user: req.session.user,
      username: req.session.username,
      email: req.session.email,
      profilePicture: req.session.profilePicture,
    });
  } else {
    res.status(401).send();
  }
});

// A route to login and create a session
router.post('/check-credentials', (req, res) => {
  const { email, password, username } = req.body;

  // Use the static method on the User model to find a user
  // by their email and password
  User.checkCredentials(username, email, password)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('There was an error checking your credentials');
    });
});

// Add profile picture for user
router.post('/profile-picture', multipartMiddleware, async (req, res) => {
  // Upload to cloudinary
  // * req.files contains uploaded files
  try {
    const cloudinaryResult = await cloudinary.uploader.upload(req.files.image.path);

    // Create a new image using the Image mongoose model
    const img = new Image({
      imageID: cloudinaryResult.public_id, // image id on cloudinary server
      imageURL: cloudinaryResult.url, // image url on cloudinary server
    });

    // Save image to the database
    const newImg = await img.save();

    const user = await User.findByIdAndUpdate(
      { _id: req.session.user },
      { $set: { profilePicture: newImg } },
      { new: true }
    );

    // Update Session to have correct profilePicture
    req.session.profilePicture = user.profilePicture;

    // Assuming all goes well, we now send the user with updated values
    res.send({
      user: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    });
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

module.exports = router;