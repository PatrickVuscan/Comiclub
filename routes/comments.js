/* Episodes API Routes */
const express = require('express');
const { mongoChecker, isMongoError } = require('../mongoHelpers');

// Import models
const { Comment } = require('../models/comment');
const { updateNestedEpisode } = require('./helpers');

const router = express.Router();

router.use(mongoChecker);

// GET comments by episodeID
router.get('/episodeID/:episodeID', async (req, res) => {
  try {
    const comments = await Comment.find({ episodeID: req.params.episodeID });
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET comments by userID
router.get('/userID/:userID', async (req, res) => {
  try {
    const comments = await Comment.find({ userID: req.params.userID });
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Creates a new COMMENT within an EPISODE
router.put('/', async (req, res) => {
  const { user } = req.session;

  const comment = new Comment({
    userID: user,
    episodeID: req.body.episodeID,
    body: req.body.body,
  });

  try {
    const newComment = await comment.save();
    await updateNestedEpisode(req.body.episodeID, '$push', 'comments', comment);
    res.send(newComment);
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
