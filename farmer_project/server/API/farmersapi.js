const exp=require('express')
const eah=require('express-async-handler')
const farmersapp=exp.Router()
const Farmer=require('../ImageUploader/FarmerImage')
const bcrypt=require('bcrypt')
const schema=require('../passwordValidate')
const jwt=require('jsonwebtoken')
farmersapp.use((req,res,next)=>{
    let farmers=req.app.get('farmers')
    next()
})

farmersapp.post('/register',eah(async(req,res)=>{
    const { name,password,email, phoneNo, address } = req.body;
    try {
        const Farmer1 = new Farmer(req.body);
        await Farmer1.save();
       
        res.status(201).send('Registration successful');
      } catch (error) {
        res.send(error);
      }
}))

farmersapp.post('/Details',eah(async(req,res)=>{
    console.log(req.body)
}))



module.exports=farmersapp