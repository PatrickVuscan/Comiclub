const { mongoose } = require('./db/mongoose');

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === 'MongoNetworkError';
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    console.log('Issue with mongoose connection');
    res.status(500).send('Internal server error');
  } else {
    next();
  }
};

module.exports = { isMongoError, mongoChecker };
