const exp=require('express')
const eah=require('express-async-handler')
const farmerapp=exp.Router()

farmerapp.use((req,res,next)=>{
    let farmers=req.app.get('farmers')
    next()
})

farmerapp.post('/register',eah(async(req,res)=>{
    console.log(req.body)
}))

farmerapp.post('/Details',eah(async(req,res)=>{
    console.log(req.body)
}))



module.exports=farmerapp