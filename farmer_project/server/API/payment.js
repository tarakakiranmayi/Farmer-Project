const exp=require('express')
const eah=require('express-async-handler')
const payment=exp.Router()
require('dotenv').config()
const Razorpay=require('razorpay')
const port=process.env.port 
let order_id
const razorpay =new Razorpay({
    key_id:'rzp_test_xUzWg33hsBbdcw',
    key_secret:'3oXK5ZkPyP4pKyOD7TdVQvMd',
})



payment.post('/order',eah(async(req,res)=>{
   
    let options={
        amount:req.body.price*1000,
        currency:"INR"
    };
    razorpay.orders.create(options,function (err,order){
        
        res.send(order)
      })
}))
payment.post('/is-order-completed',(req,res)=>{
    
    razorpay.payments.fetch(req.body.razorpay_payment_id ).then((paymentdocument)=>{
        if (paymentdocument.status=='captured')
            {
                res.send("payment done")
            }
        else{
            //("here")
            res.send("error")
        }
    })

})

module.exports=payment