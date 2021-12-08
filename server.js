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
const { mongoose } = require('./db/mongoose');

// Import models
const { User } = require('./models/user');

// ! Import Routes
const users = require('./routes/users');
const comics = require('./routes/comics');
const episodes = require('./routes/episodes');
const comments = require('./routes/comments');

// ! Setting up the app and middleware
const app = express();

// Enable CORS if in development, for React local development server to connect to the web server.
// if (env !== 'production') {
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'https://calm-springs-75379.herokuapp.com'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true,
  })
);
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded form data (from form POST requests)

// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'our hardcoded secret', // Make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      expires: 86400000, // One day
    },
    // Store the sessions on the database in production
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ComiclubAPI',
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

app.use((req, res, next) => {
  console.log('Session middleware: ', req.session);
  console.log('User ', req.session.user);
  console.log('Username ', req.session.username);
  console.log('Email ', req.session.email);
  next();
});

// ! Add routes
app.use('/api/users', users);
app.use('/api/comics', comics);
app.use('/api/episodes', episodes);
app.use('/api/comments', comments);

//! ************************************************ WEBPAGE ROUTES
// Serve the build
app.use(express.static(path.join(__dirname, '/frontend/build')));

// All routes other than above will go to index.html
app.get('*', (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  // const goodPageRoutes = ['/', '/login', '/dashboard'];
  // if (!goodPageRoutes.includes(req.url)) {
  //   // if url not in expected page routes, set status to 404.
  //   res.status(404);
  //   // ! in the future, once we have all of our paths, we may want to make this conclusive?
  // }

  // send index.html
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

// ! ************************************************ LISTEN TO PORT
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
