/* User model */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { ImageSchema } = require('./image');

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
  profilePicture: ImageSchema,
  username: {
    // what other people see
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail, // custom validator
      message: 'Not valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  genres: [String], // Genres Liked ("Action", "Horror", etc.)
  likes: [String], //  comicIDs of Comics Liked
  // notifications: [String], // TODO: NotificationSchema (string, URL)
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified('password')) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (saltErr, salt) => {
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
// eslint-disable-next-line func-names
UserSchema.statics.findByEmailPassword = function (email, password) {
  const User = this; // binds this to the User model

  // First find the user by their email
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(); // a rejected promise
    }
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// A static method on the document model.
// Allows us to check if a email is unique/not used, and if a password
// is long enough (no other criteria for now. more should be added later)
// eslint-disable-next-line func-names
UserSchema.statics.checkCredentials = function (username, email, password) {
  const User = this; // binds this to the User model

  if (password.length < 6) {
    return Promise.resolve({ available: false, message: 'Password is too short' });
  }

  if (username.length < 2) {
    return Promise.resolve({ available: false, message: 'Username is too short' });
  }

  // Check if there is a user by this email
  return User.findOne({ $or: [{ username }, { email }] })
    .then((user) => {
      if (!user) {
        return Promise.resolve({ available: true });
      }
      if (user.username === username) {
        return Promise.resolve({ available: false, message: 'Username is taken' });
      }
      return Promise.resolve({ available: false, message: 'Email is taken' });
    })
    .catch((error) => {
      console.log('Some error with checkCredentials');
      return Promise.reject(Error(`checkCredentials - ${error}`));
    });
};

// Check if the user by the given userID likes the comic provided by comicID
// eslint-disable-next-line func-names
UserSchema.statics.checkLiked = async function (userID, comicID) {
  const User = this; // binds this to the User model

  // Check if there is a user by this email
  try {
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return Promise.reject(Error('Could not find user by provided userID'));
    }

    return Promise.resolve(user.likes.includes(comicID));
  } catch (error) {
    return Promise.reject(error);
  }
};

// make a model using the User schema
const User = mongoose.model('User', UserSchema);
module.exports = { User };
