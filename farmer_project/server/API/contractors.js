const exp=require('express')
const contractApp=exp.Router()
const eah=require('express-async-handler')
const CultivateLand =require('../ImageUploader/CultivateLand')

contractApp.use((req,res,next)=>{
    let contractors=req.app.get('contractors')
    next()
})

contractApp.post('/cultivateLand',eah(async(req,res)=>{
    console.log(" ncdbvhjdv")
   const r= new CultivateLand(req.body)
   await r.save()
   res.send("Register Successfully")
}))


module.exports=contractApp