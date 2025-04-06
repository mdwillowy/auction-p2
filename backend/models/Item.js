const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startingBid: {
    type: Number,
    required: true
  },
  currentBid: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    default: 'Anonymous'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);