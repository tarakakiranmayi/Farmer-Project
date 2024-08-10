const exp=require('express')
const contractApp=exp.Router()
const eah=require('express-async-handler')


contractApp.use((req,res,next)=>{
    let contractors=req.app.get('contractors')
    next()
})

contractApp.post('/farmland',eah(async(req,res)=>{
    console.log(req.body)
}))


module.exports=contractApp