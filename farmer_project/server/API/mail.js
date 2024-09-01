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
    // console.log(req.params)
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

mail.post('/payment', eah(async (req, res) => {
//   console.log("called")
   const { email, signature, order_id } = req.body; // Assuming `email` is provided in the request body
  console.log(req.body,"hey this is mail")
  
  const user = await User.findOne({ email });

  if (!user) {
      return res.status(404).send({ message: 'User not found' });
  }

  // Configure the email transporter
  const transporter = mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: "tarakakiranmayi@gmail.com",
          pass: "ncqrrutuvrhchjfu" // Ensure this is kept secure
      },
  });

  // Email options
  const mailOptions = {
      from: 'tarakakiranmayi@gmail.com',
      to: user.email,
      subject: 'Payment Confirmation from Support Farmers',
      text: `
          Dear ${user.name},

          We have received your payment with order ID: ${order_id} and signature: ${signature}. Thank you for your purchase!

          At Support Farmers, we are committed to connecting you with high-quality organic products and supporting local farmers. 

          If you have any questions or need further assistance, please feel free to reach out.

          Thank you for your support!

          Warm regards,
          T. Kiranmayi
          CEO
          Email: tarakakiranmayi@gmail.com
          SupportFarmers.com
      `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send({ message: 'Error sending email' });
      } else {
          console.log('Email sent:', info.response);
          res.send({ message: 'Email sent successfully' });
      }
  });
}));

  module.exports=mail