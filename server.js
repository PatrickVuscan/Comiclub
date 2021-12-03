/* Server environment setup */

// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV; // read the environment variable (will be 'production' in production mode)

// ! Express Imports
const path = require('path');
const express = require('express');
const cors = require('cors');
// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser');
const session = require('express-session'); // express-session for managing user sessions

// ! MongoDB and Mongoose Imports
const MongoStore = require('connect-mongo'); // to store session information on the database in production
const { ObjectId } = require('mongodb');
const { multipartMiddleware, cloudinary } = require('./db/cloudinary'); // ! Import Cloudinary and Connect-MultiParty
const { mongoose } = require('./db/mongoose');
const { isMongoError, mongoChecker } = require('./mongoHelpers');
// Import models
const { User } = require('./models/user');
const { Comic } = require('./models/comic');
const { Episode } = require('./models/episode');
const { Panel } = require('./models/panel');
const { Image } = require('./models/image');
const { Meta } = require('./models/meta');
const { Comment } = require('./models/comment');

// ! Setting up the app and middleware
const app = express();

// Enable CORS if in development, for React local development server to connect to the web server.
if (env !== 'production') {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded form data (from form POST requests)

// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'our hardcoded secret', // Make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 86400000, // One day
      httpOnly: true,
    },
    // Store the sessions on the database in production
    store:
      env === 'production'
        ? MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ComiclubAPI',
          })
        : MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/ComiclubAPI',
          }),
  })
);

// ! Setting up the database
// mongoose and mongo connection
mongoose.set('useFindAndModify', false); // for some deprecation issues

// ! Authentication - Currently unused
// Middleware for authentication of resources
const authenticate = (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        }
        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(401).send('Unauthorized');
      });
  } else {
    res.status(401).send('Unauthorized');
  }
};

// ! ************************************************************* User API Route
app.post('/api/users', mongoChecker, async (req, res) => {
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
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  // Use the static method on the User model to find a user
  // by their email and password
  User.findByEmailPassword(email, password)
    .then((user) => {
      // Add the user's id to the session.
      // We can check later if this exists to ensure we are logged in.
      req.session.user = user._id;
      req.session.username = user.username;
      req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
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
app.get('/api/users/logout', (req, res) => {
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
app.get('/api/users/check-session', (req, res) => {
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
app.post('/api/users/check-credentials', (req, res) => {
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
app.post(
  '/api/users/profile-picture',
  // (req, res, next) => {
  //   console.log('Middleware', req.body, req.files);
  //   next();
  // },
  multipartMiddleware,
  async (req, res) => {
    // Upload to cloudinary
    // * req.files contains uploaded files
    try {
      const cloudinaryResult = await cloudinary.uploader.upload(req.files.image.path);

      // Create a new image using the Image mongoose model
      const img = new Image({
        image_id: cloudinaryResult.public_id, // image id on cloudinary server
        image_url: cloudinaryResult.url, // image url on cloudinary server
      });

      console.log('Created Image Object', img);

      // Save image to the database
      const newImg = await img.save();

      console.log('Saved img', newImg);

      const user = await User.findByIdAndUpdate(
        { _id: req.session.user },
        { $set: { profilePicture: newImg } },
        { new: true }
      );

      console.log('Saved User', user);

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
  }
);

//! *************************************************************** COMIC ROUTES
// GET all comics by userID
app.get('/api/comics/userID/:userID', async (req, res) => {
  try {
    const comics = await Comic.find({ userID: req.params.userID });
    res.send(comics);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new Comic
app.post('/api/comics', mongoChecker, async (req, res) => {
  const comic = new Comic({
    userID: req.body.userID,
    name: req.body.name,
    description: req.body.description,
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

//! ************************************************************* EPISODE ROUTES
// GET episodes by userID
app.get('/api/episodes/userID/:userID', async (req, res) => {
  try {
    const episodes = await Episode.find({ userID: req.params.userID });
    res.send(episodes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET episodes by comicID
app.get('/api/episodes/comicID/:comicID', async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.comicID);
    if (comic) {
      res.send(comic.episodes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Creates a new EPISODE within a COMIC
app.put('/api/comics/episode', mongoChecker, async (req, res) => {
  const episode = new Episode({
    comicID: req.body.comicID,
    userID: req.body.userID,
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newEpisode = await episode.save();
    const comic = await Comic.updateOne(
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

//! ************************************************************* WEBPAGE ROUTES
// Serve the build
app.use(express.static(path.join(__dirname, '/frontend/build')));

// All routes other than above will go to index.html
app.get('*', (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = ['/', '/login', '/dashboard'];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
    // ! in the future, once we have all of our paths, we may want to make this conclusive?
  }

  // send index.html
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

// ! ************************************************ LISTEN TO PORT
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
