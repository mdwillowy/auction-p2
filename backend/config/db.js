const mongoose = require('mongoose');

const connectDB = async () => {
  try {
mongoose.connect('mongodb+srv://greenSnake:greenD9@firstcluster.ko3qdr3.mongodb.net/AuctionDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;