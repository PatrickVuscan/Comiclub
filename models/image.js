/* Image mongoose model */
const mongoose = require('mongoose');

// create an image schema
const ImageSchema = mongoose.Schema({
  image_id: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

// create an image model using the schema
const Image = mongoose.model('Image', ImageSchema);

module.exports = { Image, ImageSchema };

/** * Example Image API Routes below *********************************** */

// // a POST route to *create* an image
// app.post('/images', multipartMiddleware, (req, res) => {
//   // Use uploader.upload API to upload image to cloudinary server.
//   cloudinary.uploader.upload(
//     req.files.image.path, // req.files contains uploaded files
//     function (result) {
//       // Create a new image using the Image mongoose model
//       const img = new Image({
//         image_id: result.public_id, // image id on cloudinary server
//         image_url: result.url, // image url on cloudinary server
//         created_at: new Date(),
//       });

//       // Save image to the database
//       img.save().then(
//         (saveRes) => {
//           res.send(saveRes);
//         },
//         (error) => {
//           res.status(400).send(error); // 400 for bad request
//         }
//       );
//     }
//   );
// });

// // a GET route to get all images
// app.get('/images', (req, res) => {
//   Image.find().then(
//     (images) => {
//       res.send({ images }); // can wrap in object if want to add more properties
//     },
//     (error) => {
//       res.status(500).send(error); // server error
//     }
//   );
// });

// /// a DELETE route to remove an image by its id.
// app.delete('/images/:imageId', (req, res) => {
//   const { imageId } = req.params;

//   // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
//   // on the cloudinary server
//   cloudinary.uploader.destroy(imageId, function (result) {
//     // Delete the image from the database
//     Image.findOneAndRemove({ image_id: imageId })
//       .then((img) => {
//         if (!img) {
//           res.status(404).send();
//         } else {
//           res.send(img);
//         }
//       })
//       .catch((error) => {
//         res.status(500).send(); // server error, could not delete.
//       });
//   });
// });
