const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/items/:id/bid
// @desc    Place a bid on an item
router.post('/:id/bid', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (req.body.amount <= item.currentBid) {
      return res.status(400).json({ msg: 'Bid must be higher than current bid' });
    }

    item.currentBid = req.body.amount;
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;