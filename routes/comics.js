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
    userID: req.body.userID,
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

// Get all comics by userID
router.get('/:userID', async (req, res) => {
  try {
    const comics = await Comic.find({ userID: req.params.userID });
    res.send(comics);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
