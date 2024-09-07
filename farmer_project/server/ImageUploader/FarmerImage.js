// models/Product.js
const mongoose = require('mongoose');
const farmerapp = require('../API/farmersapi');
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
    name: { type: String, required:true },
    contact_number: { type: String,required:true  },
    description: { type: String,required:true  },
  
    pricePerHour: { type: Number,required:true  },
    area: { type: String,required:true },
    skills: [{ type: String,  }],
    rating: { type: Number,  },
    reviews: [
      {
        user: { type: String,  },
        rating: { type: Number,  },
        review: { type: String,  },
        date: { type: Date,  }
      }
    ],
  
    // Optional Information
    email: { type: String ,required:true},
    password: { type: String ,required:true},
    address: { type: String,required:true },
    photo: { type:  Buffer },
    online:{type:Boolean,default:false},
    busy:{type:Boolean,default:false},
    photoAdded: { type: Boolean, default: false },
    join_date: { type: Date },
    last_updated: { type: Date },
    
  });
  

  
  const Farmer = mongoose.model('Farmer', FarmerSchema);
  
  module.exports = Farmer;