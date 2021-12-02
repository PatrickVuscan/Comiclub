/* Meta model */
const mongoose = require('mongoose');

const MetaSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

const Meta = mongoose.model('Meta', MetaSchema);
module.exports = { Meta, MetaSchema };
