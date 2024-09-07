const exp=require('express')
const Userapp=exp.Router()
const eah=require('express-async-handler')
const bcrypt=require('bcrypt')
const schema=require('../passwordValidate')
const jwt=require('jsonwebtoken')
let Users
Userapp.use((req,res,next)=>{
     Users=req.app.get('Users')
    next()
})
const User=require('../ImageUploader/UserImage')

const Image=require('../ImageUploader/FarmLand')

Userapp.post('/login',eah(async(req,res)=>{
    const user=req.body
    const dbuser=await User.findOne({'email':user.email})
    if(dbuser!=null)
        {
            const status = await bcrypt.compare(user.password,dbuser.password)
            if(status==true)
                {
                    const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_CODE,{expiresIn:300000})
                    res.send({message:"login successful",Token:signedToken,data:dbuser})
                }
                else{
                    res.send({'message':"Invalid password"})
                }

        }
    else{
        res.send({'message':"enter correct email"})
    }
}))

const multer = require('multer');

// Define storage for multer
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage });


Userapp.get('/users',async(req,res)=>{
  const userData=await User.find({})
  // //(userData)
 
  res.send(userData)
})
// Route to handle product image upload
Userapp.post('/NewUser', upload.single('photo'),async(req,res)=>{
    try {
        // Multer saves the file as req.file.buffer
        const { name,password,email, phoneNo, address } = req.body;
        //(req.body)
        let imageData
        if (req.body.imageData!=null )
        { //("here")
            imageData = req.file.buffer; 
        }
        else{
            //("else here")
             imageData=""
        }
        
        
        const dbuser=await User.findOne({email:email})
        let pass
        if(dbuser==null)
        {    
            if(schema.validate(password))
                {
                    pass= await bcrypt.hash(password,6)
                    
                }
            else{
                res.send({'message':"password is not strong"})
            }

            const newUser = new User({
                name: name,
                contact_number: phoneNo,
                email: email,
                address: address,
                
                
                join_date: new Date(),
                last_updated: new Date(),
                password:pass
              });
          
              await newUser.save();
              res.status(201).json({ message: 'User profile uploaded successfully', user: newUser });
            }
            else{
                res.status(201).json({ message: 'User already exists', });
            }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Failed to upload user profile', error: error.message });
        }

    
        // Create a new User document
      

})

Userapp.put('/userUpdate/:email', upload.single('image'), async (req, res) => {
    //("called")
    // console.log("called")
    try {
      const email = req.params.email;
      const newupdate=req.body
      const dbuser=await User.findOne({email:email})
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
      const updatedUser = await User.findByIdAndUpdate(dbuser._id, updateData, { new: true });
  
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
  

Userapp.get('/user/:_id',async(req,res)=>{
    const dbuser=await User.findOne({_id:req.params._id})
    //(dbuser)
    //(dbuser)
    //("called",dbuser)
    const buffer = Buffer.from(dbuser.photo);

    // Convert the buffer to a base64 string
    const base64Image = buffer.toString('base64');
    //(base64Image)
    res.send({ photo: base64Image });
})


  

module.exports=Userapp