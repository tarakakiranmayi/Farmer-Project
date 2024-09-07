const mongoose = require('mongoose');
require('dotenv').config()
const port=process.env.port || 5001
const mongo_url=process.env.mongo_url
mongoose.connect(mongo_url, {
    
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
  });
const cultivateLandSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  landSize: {
    type: Number, // In acres or square meters, based on your preference
    required: true,
  },
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  cropType: {
    type: String,
    required: true,
  },
  irrigationType: {
    type: String, // e.g., "Drip", "Sprinkler", "Flood"
    required: true,
  },
  ownershipStatus: {
    type: String, // e.g., "Owned", "Leased"
    required: true,
  },
  soilQuality: {
    type: String, // e.g., "Fertile", "Saline", etc.
  },
  landDocuments: {
    type: String, // URL or file path for documents
  },
  cultivatedSince: {
    type: Date,
    required: true,
  },
  landDescription: {
    type: String,
  },
});

const CultivateLand = mongoose.model('CultivateLand', cultivateLandSchema);
module.exports = CultivateLand;
