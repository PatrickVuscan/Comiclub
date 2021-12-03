/* Episodes API Routes */
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

// GET panels by episodeID
router.get('/episodeID/:episodeID', async (req, res) => {
  try {
    const panels = await Panel.find({ episodeID: req.params.episodeID });
    res.send(panels);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET panels by userID
router.get('/userID/:userID', async (req, res) => {
    try {
      const panels = await Panel.find({ userID: req.params.userID });
      res.send(panels);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });

// Creates a new PANEL within an EPISODE
router.put('/panel/', mongoChecker, async (req, res) => {
  const panel = new Panel({
    episodeID: req.body.episodeID,
    userID: req.body.userID,
  });

  try {
    const newPanel = await panel.save();
    const episode = await Episode.updateOne(
      { _id: req.body.episodeID },
      {
        $push: {
          panels: panel,
        },
      }
    );
    res.send(newPanel);
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

// Add panel image for panel
router.post('/panel-image/:panelID', multipartMiddleware, async (req, res) => {
  // Upload to cloudinary
  // * req.files contains uploaded files
  try {
    const { panelID } = req.params;
    const panel = await Panel.findOne({ _id: panelID });

    if (panel.userID !== req.session.user) {
      res.status(401).send("You're not authorized to edit this Panel. Please ensure this is your panel.");
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

    const updatedPanel = await Panel.findByIdAndUpdate(
      { _id: panelID },
      { $set: { panelImage: newImg } },
      { new: true }
    );

    // Assuming all goes well, we now send the panel with updated values
    res.send(updatedPanel);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send('Internal server error');
    } else {
      console.log(error);
      res.status(400).send('Error uploading your panel image.');
    }
  }
});

module.exports = router;
