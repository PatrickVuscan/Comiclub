/* Users API Routes */
const express = require('express');
const { multipartMiddleware, cloudinary } = require('../db/cloudinary');
const { mongoChecker, isMongoError } = require('../mongoHelpers');

// Import models
const { User } = require('../models/user');
const { Image } = require('../models/image');
const { Comic } = require('../models/comic');
const { Comment } = require('../models/comment');
const { Episode } = require('../models/episode');

const router = express.Router();

router.use(mongoChecker);

function loginHelper(user, req) {
  req.session.user = user._id;
  req.session.username = user.username;
  req.session.email = user.email;
  req.session.profilePicture = user.profilePicture;
  req.session.genres = user.genres;
}

router.post('/', async (req, res) => {
  // Create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    genres: req.body.genres,
  });

  try {
    // Save the user
    const newUser = await user.save();

    // After creating and saving user, log the user in.
    loginHelper(user, req);

    res.send({
      user: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      genres: newUser.genres,
    });
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('There was an error when trying to sign up.'); // Error creating the user
    }
  }
});

// Route to get the current user
router.get('/', async (req, res) => {
  try {
    if (req.session.user) {
      const user = await User.findById(req.session.user);
      res.send(user);
    } else {
      res.status(401).send("You're not currently logged in");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// A route to login and create a session
router.post(
  '/login',
  (req, res, next) => {
    // Addition loggin for first check
    console.log('Process Environment: ', process.env);
    console.log('Session middleware: ', req.session);
    next();
  },
  (req, res) => {
    const { email, password } = req.body;

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
      .then((user) => {
        // Add the user's id to the session.
        // We can check later if this exists to ensure we are logged in.
        loginHelper(user, req);

        console.log('Inside of login');
        console.log('User ', req.session.user);
        console.log('Username ', req.session.username);
        console.log('Finished login');

        res.send({
          user: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          genres: user.genres,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send('There was an error trying to log in');
      });
  }
);

function logoutHelper(req, res) {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send('Logged out!');
    }
  });
}

// A route to logout a user
router.get('/logout', (req, res) => {
  // Remove the session
  logoutHelper(req, res);
});

// A route to check if a user is logged in on the session
router.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.send({
      user: req.session.user,
      username: req.session.username,
      email: req.session.email,
      profilePicture: req.session.profilePicture,
      genres: req.session.genres,
    });
  } else {
    res.status(401).send('There is no available session for this user.');
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
      res.status(400).send('There was an error checking your credentials.');
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
      genres: user.genres,
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

router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get a user's ID by their username, for future calls
router.get('/:username', (req, res) => {
  const { username } = req.params;

  // Use the static method on the User model to find a user
  // by their email and password
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(404).send('A user by this username does not exist.');
        return;
      }

      res.send({
        user: user._id,
        username: user.username,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('There was an error trying to find a user by this username.');
    });
});

// Get a user's ID by their username, for future calls
router.get('/userID/:userID', (req, res) => {
  const { userID } = req.params;

  // Use the static method on the User model to find a user
  // by their email and password
  User.findById(userID)
    .then((user) => {
      if (!user) {
        res.status(404).send('A user by this id does not exist.');
        return;
      }

      res.send({
        username: user.username,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('There was an error trying to find a user by their ID.');
    });
});

// Get comics liked by a user via their username
router.get('/:username/likes', async (req, res) => {
  const { username } = req.params;

  if (!req.session.user) {
    res.status(401).send('Please log in before trying to access your comics.');
    return;
  }

  try {
    const user = await User.findOne({ username });
    res.send({ likes: user.likes });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get user via their email
router.get('/email/:email', async (req, res) => {
  const { email } = req.params;

  if (!req.session.user) {
    res.status(401).send('Please log in before trying to access your comics.');
    return;
  }

  try {
    const user = await User.findOne({ email });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete user via their ID
router.delete('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { user } = req.session;

  if (!user) {
    res.status(401).send('Please log in before trying to delete a user.');
    return;
  }

  try {
    const comments = await Comment.find({ userID: { $eq: userID } });
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < comments.length; i++) {
      // Find the episode that this comment belongs to and delete
      // the nested comment from the episode
      const episode = await Episode.findById(comments[i].episodeID);
      episode.comments.id(comments[i]._id).remove();
      episode.save();

      // Find the comic that this comment belongs to and delete
      // the nested comment from the relevant episode of the comic.
      const comic = await Comic.findById(episode.comicID);
      comic.episodes.id(episode._id).comments.id(comments[i]._id).remove();
      comic.save();

      // Finally, delete the comment itself.
      await comments[i].remove();
    }
    await Episode.deleteMany({ userID: { $eq: userID } });
    await Comic.deleteMany({ userID: { $eq: userID } });
    await User.findByIdAndDelete(userID);
    if (user === userID) {
      // If the user is deleting their own account, log them out.
      logoutHelper(req, res);
      return;
    }
    res.status(200).send('Successfully deleted user.');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
