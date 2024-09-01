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

const productSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
 

  farmerName:{type: String,required:true},
  farmerContactNumber:{type:Number,required:true},
  farmerEmail: {type:String,required:true},
  farmerAddress:{type:String,required:true},
  
      rate: { type: Array },
      comments: { type: Array },
      averageRating:{type:Number }
    ,
  // manufactureDate: {
  //   type: Date,
  //   required: true
  // },
  // shippingBy: {
  //   type: String,
  //   required: true
  // },
  // expiryDate: {
  //   type: Date,
  //   required: true
  // },
  // quantity: {
  //   type: Number,
  //   required: true
  // },
  // unit: {
  //   type: String,
  //   required: true
  // },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // certifications: [
  //   {
  //     type: String,
      
  //   }
  // ],
  // discount: {
  //   type: Number,
    
  // },
  // availability: {
  //   type: Boolean,
    
  // },
  // location: {
  //   type: String,
    
  // },
  paymentMethods: [
    {
      type: String,
      
    }
  ],
  // shippingCost: {
  //   type: Number,
  //   required: true
  // },
  // deliveryTime: {
  //   type: String,
  //   required: true
  // },
  // packagingDetails: {
  //   type: String,
  //   required: true
  // },
  // productId: {   type: Number}, // Example reference to Product model
  // imageData: { type: Buffer },
  image:{type:String, required:true}
  

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
