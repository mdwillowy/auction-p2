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
    image: "https://images.pexels.com/photos/552774/pexels-photo-552774.jpeg"
  },
  {
    title: "Rare Painting",
    description: "Oil painting from 19th century",
    startingBid: 500,
    currentBid: 650,
    image: "https://images.pexels.com/photos/2792157/pexels-photo-2792157.jpeg"
  },
  {
    title: "Classic Car",
    description: "1965 Mustang in good condition",
    startingBid: 25000,
    currentBid: 27500,
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
  },
  {
    title: "Antique Chair",
    description: "Victorian era armchair",
    startingBid: 300,
    currentBid: 350,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
  },
  {
    title: "Rare Book",
    description: "First edition of classic novel",
    startingBid: 1200,
    currentBid: 1500,
    image: "https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg"
  }
];

const seedDB = async () => {
  await Item.deleteMany({});
  await Item.insertMany(seedItems);
  console.log('Database seeded!');
  process.exit();
};

seedDB();