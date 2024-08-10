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

const FarmerSchema = new Schema({
    // Essential Information
    name: { type: String, required: true },
    contact_number: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
    price: { type: Number, required: true },
    area: { type: String, required: true },
    skills: [{ type: String, required: true }],
    rating: { type: Number, required: true },
    reviews: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true },
        review: { type: String, required: true },
        date: { type: Date, required: true }
      }
    ],
  
    // Optional Information
    email: { type: String },
    address: { type: String },
    photo: { type: String },
    experience: { type: String },
    education: { type: String },
    work_hours_per_day: { type: Number },
    availability: { type: String },
    languages_spoken: [{ type: String }],
    tools_and_equipment: [{ type: String }],
    payment_methods: [{ type: String }],
    average_response_time: { type: String },
    total_jobs_completed: { type: Number },
    successful_jobs: { type: Number },
    failed_jobs: { type: Number },
    certifications: [{ type: String }],
    join_date: { type: Date },
    last_updated: { type: Date },
    comments: [
      {
        user: { type: String },
        comment: { type: String },
        date: { type: Date }
      }
    ]
  });
  
  const Farmer = mongoose.model('Farmer', FarmerSchema);
  
  module.exports = Farmer;