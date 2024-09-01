
const exp=require('express')
const app=exp()
const cors = require('cors');
require('dotenv').config()
const port=process.env.port || 5001
const mongo_url=process.env.mongo_url
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const Chat=require('./ImageUploader/Chat')
// console.log(server)
app.use(cors());
const io = new Server(server, {
    
    //   path: '/socket.io',
    //   transports: ['websocket', 'polling'],
  });


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
const farmersapi=require('./API/farmersapi')
const houseApp=require('./API/householdfarm')
const organicApp=require('./API/organicfarm')
const contractors=require('./API/contractors')
const mail=require('./API/mail')
const payment=require('./API/payment')
const chatroom=require('./API/Chatroom')


app.use('/userapi',Userapp)
app.use('/farmersapi',farmersapi)
app.use('/householdfarm',houseApp)
app.use('/contract',contractors)
app.use('/organicfarm',organicApp)
app.use('/postMail',mail)
app.use('/payment',payment)
app.use('/chatroom',chatroom)


const connectedUsers = {};
io.on('connection', (socket) => {
//   console.log('A user connected');

  // Handle user joining
  socket.on('join', (email) => {
    connectedUsers[email] = socket.id;
    // console.log(`${email} joined with socket ID: ${socket.id}`);
  });

  // Handle sending messages
  socket.on('sendMessage', async (data) => {
    const { sender, receiver, message } = data;
//   console.log(data)
    // Save message to the database
    const chatMessage = new Chat({
      sender,
      recipient:receiver,
      message,
      timestamp: new Date(),
    });
    await chatMessage.save();

    // Emit the message to the receiver if online
    const receiverSocketId = connectedUsers[receiver];
    // console.log(connectedUsers)
    // console.log(receiverSocketId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', chatMessage);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    // Remove user from connectedUsers
    for (const email in connectedUsers) {
      if (connectedUsers[email] === socket.id) {
        // console.log(`${email} disconnected`);
        delete connectedUsers[email];
        // console.log('Updated connected users:', connectedUsers);
        break;
      }
    }
  });
});
server.listen(port,()=>{console.log('running on ',port)})
// app.listen(port,()=>{console.log('running on ',port)})