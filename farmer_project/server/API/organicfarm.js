const exp=require('express')
const organicApp=exp.Router()
const eah=require('express-async-handler')
let organicfarm
organicApp.use((req,res,next)=>{
     organicfarm=req.app.get('organicfarm')
    next()
})
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// organicApp.post('/product',eah((async(req,res)=>{
//     console.log(req.body)
// })))
// organicApp.get('/products',eah(async(req,res)=>{

// }))
// server.js or productImagesController.js

// Assuming you have Product and ProductImage models imported
const ProductImage = require('../ImageUploader/ProductImage');
// const ProductImage = require('./models/ProductImage');
const Product = require('../ImageUploader/ProductImage');
const multer = require('multer');

// Define storage for multer
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage });

// Route to handle product image upload
organicApp.post('/productUpload',  async (req, res) => {
  try{ const productId = new Date();
    console.log(req.body)
    const {
      image,
      productName,
      productPrice,
      farmerName,
      farmerContactNumber,
      farmerEmail,
      farmerAddress,
      // manufactureDate,
      // expiryDate,
      // quantity,
      // unit,
      category,
      description,
      paymentMethods,

      // shippingBy,
      // shippingCost,
      // deliveryTime,
      // packagingDetails
    } = req.body;

    // Create a new ProductImage document
    const newProductImage = new ProductImage({
      productId: productId,
     
   
      productName: productName,
      productPrice: productPrice,
      farmerName: farmerName,
      farmerContactNumber: farmerContactNumber,
      farmerEmail: farmerEmail,
      farmerAddress: farmerAddress,
      // manufactureDate: new Date(manufactureDate),
      // expiryDate: new Date(expiryDate),
      // quantity: quantity,
      // unit: unit,
      paymentMethods:paymentMethods,
      category: category,
      description: description,
      // shippingBy: shippingBy,
      // shippingCost: shippingCost,
      // deliveryTime: deliveryTime,
      // packagingDetails: packagingDetails
      image:image
    });

    // Save the ProductImage document
    const ans = await newProductImage.save();
    res.send({ message: 'Product image uploaded successfully' });}
  catch (error) {
    console.error('Error uploading product image:', error);
    res.status(500).send({ error: 'Failed to upload product image' });
  }
});

organicApp.get('/category',eah(async(req,res)=>{
    const id=req.params.category
    const data=await Product.findOne({category:id})
    const buffer= Buffer.from(data.imageData)
    const base64Image= buffer.toString('base64')
    res.send({message:"take your data",data:data,image:base64Image})
}))
organicApp.get('/product/:id',eah(async(req,res)=>{
  const id1=req.params
  const id = new ObjectId(id1);

  const data1=await Product.findById(id)
  
  res.send(data1)
}))

organicApp.put('/comments/:id', eah(async (req, res) => {
  try {
      const { comment, rating } = req.body; // Destructure comments and rating from request body
      const { id } = req.params; // Extract id from req.params

      // Convert string id to ObjectId
      const objectId = new ObjectId(id);

      // Find the product by id
      const product = await Product.findById(objectId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Add the new comment to the comments array
      product.comments.push(comment);

      // Add the new rating to the rate array
      product.rate.push(rating);

      // Calculate the new average rating
      const totalRatings = product.rate.reduce((sum, rate) => sum + rate, 0);
      const averageRating = totalRatings / product.rate.length;

      // Update the product in the database
      const updatedProduct = await Product.findOneAndUpdate(
          { _id: objectId },
          {
              $push: { comments: comment, rate: rating }, // Add the new comment and rating
              averageRating: averageRating // Update the average rating
          },
          { new: true }
      );

      res.send(updatedProduct);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
}));
organicApp.get('/products',eah(async(req,res)=>{
  const data=await Product.find({})
  res.send(data)
}))


module.exports=organicApp