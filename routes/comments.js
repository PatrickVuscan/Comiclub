/* Episodes API Routes */
const express = require('express');
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

// GET comments by panelID
router.get('/panelID/:panelID', async (req, res) => {
  try {
    const comments = await Comment.find({ panelID: req.params.panelID });
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

// Creates a new COMMENT within a PANEL
router.put('/comment', mongoChecker, async (req, res) => {
  const { user } = req.session;

  const comment = new Comment({
    userID: user,
    panelID: req.body.panelID,
    body: req.body.body,
  });

  try {
    const newComment = await comment.save();

    await Panel.updateOne(
      { _id: req.body.panelID },
      {
        $push: {
          comments: comment,
        },
      }
    );

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
