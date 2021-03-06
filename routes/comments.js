/* Episodes API Routes */
const express = require('express');
const { mongoChecker, isMongoError } = require('../mongoHelpers');

// Import models
const { Comment } = require('../models/comment');
const { updateNestedEpisode } = require('./helpers');
const { User } = require('../models/user');
const { Episode, EpisodeSchema } = require('../models/episode');
const { Comic } = require('../models/comic');

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

    // Update User Episode Count
    const creator = await User.findById(user);
    creator.commentsCount += 1;
    creator.save();

    res.send(newComment);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Could not add your comment.'); // bad request for changing the student.
    }
  }
});

router.delete('/comment', async (req, res) => {
  const { userID, episodeID, commentID } = req.body;

  try {
    // remove comment from Episode
    const episode = await Episode.findById(episodeID);
    const nestedComment = episode.comments.id(commentID);
    nestedComment.remove();
    episode.save();

    // remove comment from the Comic that this Episode is nested within
    const comic = await Comic.findById(episode.comicID);
    const nestedEpisodeComment = comic.episodes.id(episodeID).comments.id(commentID);
    nestedEpisodeComment.remove();
    comic.save();
    
    // remove comment from Comments
    const comment = await Comment.findById(commentID);
    const { body } = comment;
    comment.remove();

    // decrement comment count from User
    const creator = await User.findById(userID);
    creator.commentsCount -= 1;
    creator.save();

    res.send(`Removed: "${body}"`);
  } catch (error) {
    console.log(error);
    res.status(400).send('Bad Request');
  }
});

module.exports = router;
