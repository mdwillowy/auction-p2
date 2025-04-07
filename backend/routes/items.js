const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// @route   GET /
// @desc    Get all items
router.get('/items', async (req, res) => {
  process.stdout.write('\n=== REQUEST DETAILS ===\n');
  process.stdout.write(`Method: ${req.method}\n`);
  process.stdout.write(`Path: ${req.path}\n`);
  process.stdout.write(`Original URL: ${req.originalUrl}\n`);
  process.stdout.write(`Base URL: ${req.baseUrl}\n`);
  process.stdout.write(`Headers: ${JSON.stringify(req.headers)}\n`);
  process.stdout.write(`Query: ${JSON.stringify(req.query)}\n`);
  process.stdout.write(`Params: ${JSON.stringify(req.params)}\n`);
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/items
// @desc    Create an item
router.post('/items', async (req, res) => {
  try {
    const { title, description, startingBid, image } = req.body;
    
    // Validate required fields
    if (!title || !description || !startingBid || !image) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errors: {
          title: !title ? 'Title is required' : undefined,
          description: !description ? 'Description is required' : undefined,
          startingBid: !startingBid ? 'Starting bid is required' : undefined,
          image: !image ? 'Image URL is required' : undefined
        }
      });
    }

    // Validate starting bid is a positive number
    if (isNaN(startingBid) || startingBid <= 0) {
      return res.status(400).json({ 
        message: 'Starting bid must be a positive number',
        field: 'startingBid'
      });
    }

    const newItem = new Item({
      title,
      description,
      startingBid: Number(startingBid),
      currentBid: Number(startingBid),
      image
    });

    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('Create item error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: err.errors 
      });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   POST api/items/:id/bid
// @desc    Place a bid on an item
router.post('/items/:id/bid', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (!item.isActive()) {
      return res.status(400).json({ msg: 'Auction has ended' });
    }

    if (req.body.amount <= item.currentBid) {
      return res.status(400).json({ msg: 'Bid must be higher than current bid' });
    }

    item.currentBid = req.body.amount;
    item.bidHistory.push({
      amount: req.body.amount,
      bidder: req.user ? req.user._id : 'anonymous'
    });
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item (admin only)
router.delete('/items/:id', async (req, res) => {
  try {
    // Verify admin role
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ msg: 'Admin privileges required' });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    await item.remove();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
