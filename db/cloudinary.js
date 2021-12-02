/* This module will hold our connection to cloudinary.
   We will access the connection in our express server. */

// ! Set up Multipart
// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');

// * Note that this multipartMiddleware is what you include as middleware for routes that get sent images
const multipartMiddleware = multipart();

// ! Set up Cloudinary
// cloudinary: configure using credentials found on your Cloudinary Dashboard
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'comiclub',
  api_key: '636911723561835',
  api_secret: 'YLID8aZKLDEHM8USmCgau2aK2CI',
});

module.exports = { multipartMiddleware, cloudinary }; // Export the active connection.
