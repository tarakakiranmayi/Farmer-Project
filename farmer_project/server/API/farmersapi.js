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
const multer = require('multer');

// Define storage for multer
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage });
farmersapp.get('/users',async(req,res)=>{
  const userData=await Farmer.find({})
  // //(userData)
// console.log(userData)
  res.send(userData)
})
farmersapp.post('/login',eah(async(req,res)=>{
  console.log("called me login")
  const user=req.body
  const dbuser=await Farmer.findOne({'email':user.email})
  // console.log(dbuser)
  if(dbuser!=null)
      { 
          const status = await bcrypt.compare(user.password,dbuser.password)
          if(status==true)
              {
                  const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_CODE,{expiresIn:300000})
                  dbuser.online=true
                  await Farmer.findOneAndUpdate(dbuser._id,dbuser,{new:true})
                  dbuser.photo=null
                 
               

                  res.send({message:"login successful",Token:signedToken,data:dbuser})
              }
              else{
                  res.send({message:"Invalid password"})
              }

      }
  else{
      res.send({'message':"enter correct email"})
  }


}))

farmersapp.post('/register',eah(async(req,res)=>{
  console.log("called")
    let { name,password,email, phoneNo, address } = req.body;
    try {
        const dbuser=await Farmer.findOne({email:email})
        console.log(dbuser)
        if(dbuser==null){
   console.log("here..")
          if(schema.validate(password))
            {  
                req.body.password= await bcrypt.hash(password,6)
                
                const Farmer1 = new Farmer(req.body);
               await Farmer1.save();
         
          res.status(201).send('Registration successful');
            }
        else{
            res.send({'message':"password is not strong"})
        }
          
        }
        else{
          res.send('Already Register with given Email')
        }
       
      } catch (error) {
        res.send(error);
      }
}))

farmersapp.post('/Details',eah(async(req,res)=>{
    console.log(req.body)
}))
farmersapp.put('/userUpdate/:email', upload.single('image'), async (req, res) => {
  //("called")
  console.log("called")
  try {
    const email = req.params.email;
    const newupdate=req.body
    const dbuser=await Farmer.findOne({email:email})
    const updateData = {
      name: dbuser.name,
      contact_number: dbuser.contact_number,
      email: dbuser.email,
      address: dbuser.address,
      last_updated: new Date()
    };
    //(updateData)
    // console.log(updateData)
    if (req.file) {
      updateData.photo = req.file.buffer;
      updateData.photoAdded=true
      
    }
     //(updateData)
    const updatedUser = await Farmer.findByIdAndUpdate(dbuser._id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
  //   const base64Image = updatedUser.photo.toString('base64');
  const buffer = Buffer.from(updatedUser.photo);
  //(buffer)
  // Convert the buffer to a base64 string
  const base64Image = buffer.toString('base64');
    
    res.status(200).send({ message: 'User profile updated successfully', user:  updatedUser,image:base64Image});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update user profile', error: error.message });
  }
});

farmersapp.get('/user/:_id',async(req,res)=>{
  const dbuser=await Farmer.findOne({_id:req.params._id})
  //(dbuser)
  //(dbuser)
  //("called",dbuser)
  const buffer = Buffer.from(dbuser.photo);

  // Convert the buffer to a base64 string
  const base64Image = buffer.toString('base64');
  //(base64Image)
  res.send({ photo: base64Image });
})


module.exports=farmersapp