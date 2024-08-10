const mongoose = require("mongoose");
require('dotenv').config()
const port=process.env.port || 5001
const mongo_url=process.env.mongo_url
mongoose.connect(mongo_url, {
    
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
  });
const Schema = mongoose.Schema;
const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});
module.exports = mongoose.model("Image", imageSchema);