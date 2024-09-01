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

const ChatSchema = new Schema({
    // Essential Information
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }

    });
  
  const Chat = mongoose.model('Chat', ChatSchema);
  
  module.exports = Chat;