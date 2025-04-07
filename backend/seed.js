const mongoose = require('mongoose');
const Item = require('./models/Item');
const connectDB = require('./config/db');

connectDB();

const seedItems = [
  {
    title: "Vintage Watch",
    description: "Antique pocket watch in excellent condition",
    startingBid: 150,
    currentBid: 175,
    image: "https://images.pexels.com/photos/552774/pexels-photo-552774.jpeg",
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    seller: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011') // Test seller ID
  },
  {
    title: "Rare Painting",
    description: "Oil painting from 19th century",
    startingBid: 500,
    currentBid: 650,
    image: "https://images.pexels.com/photos/2792157/pexels-photo-2792157.jpeg",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    seller: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011') // Test seller ID
  },
  {
    title: "Classic Car",
    description: "1965 Mustang in good condition",
    startingBid: 25000,
    currentBid: 27500,
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    seller: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011') // Test seller ID
  },
  {
    title: "Antique Chair",
    description: "Victorian era armchair",
    startingBid: 300,
    currentBid: 350,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    seller: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011') // Test seller ID
  },
  {
    title: "Rare Book",
    description: "First edition of classic novel",
    startingBid: 1200,
    currentBid: 1500,
    image: "https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg",
    endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    seller: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011') // Test seller ID
  }
];

const seedDB = async () => {
  await Item.deleteMany({});
  await Item.insertMany(seedItems);
  console.log('Database seeded!');
  process.exit();
};

seedDB();