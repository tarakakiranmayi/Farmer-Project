const exp=require('express')
const houseApp=exp.Router()
const eah=require('express-async-handler')
let householdfarm



houseApp.use((req,res,next)=>{
  householdfarm=req.app.get('householdfarm')
  next()
})
houseApp.post('/new-register',eah(async(req,res)=>{
    console.log("yes called")
    console.log(req.body)
}))

module.exports=houseApp