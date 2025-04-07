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
  bidHistory: [{
    amount: Number,
    bidder: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  image: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if auction is still active before accepting bids
itemSchema.methods.isActive = function() {
  return this.status === 'active' && this.endTime > new Date();
};

module.exports = mongoose.model('Item', itemSchema);