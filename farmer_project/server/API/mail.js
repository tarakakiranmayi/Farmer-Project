const exp=require('express')
const mail=exp.Router()
const mailer=require('nodemailer')
const eah=require('express-async-handler')
let Users
mail.use((req,res,next)=>{
     Users=req.app.get('Users')
    next()
})
const User=require('../ImageUploader/UserImage')
mail.get('/:email',eah(async(req,res)=>{
    console.log(req.params)
    const email=req.params
    
     const user=await User.findOne({'email':email.email})
     
    const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "tarakakiranmayi@gmail.com",
          pass: "ncqrrutuvrhchjfu"
        },
      });
    
      const options={
        from:'tarakakiranmayi@gmail.com',
        to:user.email,
        subject:'Welcome to Support Farmers: Discover Organic Delights and Support Local Farmers!',
        text:`
        

Dear ${user.name},

Welcome to Support Farmers ! We're thrilled to have you join our community dedicated to organic products and supporting local farmers.

At farmer-support.com , we believe in the goodness of organic farming and its positive impact on health and the environment. Our platform is designed to connect you directly with organic products sourced from passionate farmers who cultivate with care and dedication.

Explore our curated selection of organic goods ranging from fresh produce to sustainable household essentials. Each purchase not only brings you quality products but also supports the hard work of local farmers committed to organic practices.

Stay tuned for updates on new arrivals, special offers, and stories from our farming partners. Feel free to reach out to us with any questions or feedback. We're here to make your organic shopping experience delightful and meaningful.

Thank you for choosing farmer-support.com!

Warm regards,

T.kiranmayi
CEO
Email:tarakakiranmayi@gmail.com
SupportFarmers.com
        `
      }
      transporter.sendMail(options,function(error,info){
        if(error)
        {
            console.log("error")
        }
        else{
            res.send({message:"sent successfully"})
            console.log("sent")
        }
      })
}))



  module.exports=mail