
const exp=require('express')
const app=exp()
const cors = require('cors');
require('dotenv').config()
const port=process.env.port || 5001
const mongo_url=process.env.mongo_url
app.use(cors());
mongoclient=require('mongodb').MongoClient
mongoclient.connect(mongo_url)
.then((client)=>{console.log("db is connected sucessfully")
    
const farmdb=client.db('FarmerDataBase')
const Users=farmdb.collection('Users')
const contractors=farmdb.collection('contractors')
const householdfarm=farmdb.collection('householdfarm')
const organicfarm=farmdb.collection('organicfarm')
const farmers=farmdb.collection('farmers')
app.set('farmers',farmers)
app.set('householdfarm',householdfarm)
app.set('contractors',contractors)
app.set('Users',Users)
app.set('organicfarm',organicfarm)


}

)
.catch((err)=>console.log(err,"why"))
app.use(exp.json())

const Userapp=require('./API/userapi')
const farmerapi=require('./API/farmersapi')
const houseApp=require('./API/householdfarm')
const organicApp=require('./API/organicfarm')
const contractors=require('./API/contractors')
const mail=require('./API/mail')
app.use('/userapi',Userapp)
app.use('/farmersapi',farmerapi)
app.use('/householdfarm',houseApp)
app.use('/contract',contractors)
app.use('/organicfarm',organicApp)
app.use('/postMail',mail)


app.listen(port,()=>{console.log('running on ',port)})