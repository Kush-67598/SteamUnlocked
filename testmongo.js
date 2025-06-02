const mongoose = require('mongoose');
require('dotenv').config(); // Make sure you have dotenv installed

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });
