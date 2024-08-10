// models/Product.js
const mongoose = require('mongoose');
require('dotenv').config()
const port=process.env.port || 5001
const mongo_url=process.env.mongo_url
mongoose.connect(mongo_url, {
    
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
  });
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/FarmerDataBase', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new Schema({
    // Essential Information
    name: { type: String, required: true },
    contact_number: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Boolean, default: true },
    password: { type: String, required: true },
    
  
    // Optional Information
    address: { type: String },
    photo: { type: Buffer},
    join_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
    photoAdded: { type: Boolean, default: false }
  });
  
  const User = mongoose.model('User', UserSchema);
  
  module.exports = User;