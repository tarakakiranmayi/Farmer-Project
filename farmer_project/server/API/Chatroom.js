const exp=require('express')
const eah=require('express-async-handler')
const http = require('http');
const { Server } = require('socket.io');
const chatroomApp=exp.Router()
const server = http.createServer(chatroomApp);
const io = new Server(server);

const Chat=require('../ImageUploader/Chat')
// io.on('connection', (socket) => {
//     //console.log('A user connected');
  
//     // Handle incoming messages
//     socket.on('sendMessage', async (data) => {
//       const { sender, receiver, message } = data;
  
//       // Save the message to the database
//       const chatMessage = new Chat({ sender, receiver, message, timestamp: new Date() });
//       await chatMessage.save();
  
//       // Emit the message to the specific receiver
//       socket.to(receiver).emit('receiveMessage', chatMessage);
//     });
//     socket.on('disconnect', () => {
//         //console.log('User disconnected');
//       });
//       socket.on('join', async ({ userId, recipientId }) => {
//         const chatHistory = await Chat.find({
//           $or: [
//             { sender: userId, receiver: recipientId },
//             { sender: recipientId, receiver: userId },
//           ],
//         }).sort({ timestamp: 1 });
    
//         socket.emit('loadMessages', chatHistory);
//       });
//       socket.on('join', async ({ userId, recipientId }) => {
//         const chatHistory = await Chat.find({
//           $or: [
//             { sender: userId, receiver: recipientId },
//             { sender: recipientId, receiver: userId },
//           ],
//         }).sort({ timestamp: 1 });
    
//         socket.emit('loadMessages', chatHistory);
//       });
    
//       // Handle incoming messages from a client
//       socket.on('sendMessage', async (data) => {
//         const { sender, receiver, message } = data;
    
//         // Save the message to the database
//         const chatMessage = new Chat({ sender, receiver, message, timestamp: new Date() });
//         await chatMessage.save();
    
//         // Emit the message to the specific receiver
//         socket.to(receiver).emit('receiveMessage', chatMessage);
//       });
    
//     });
const connectedUsers = {};

// Socket.IO Connection
// io.on('connection', (socket) => {
//   //console.log('A user connected');

//   // Handle user joining
//   socket.on('join', (email) => {
//     connectedUsers[email] = socket.id;
//     //console.log(`${email} joined with socket ID: ${socket.id}`);
//   });

//   // Handle sending messages
//   socket.on('sendMessage', async (data) => {
//     const { sender, receiver, message } = data;

//     // Save message to the database
//     const chatMessage = new Chat({
//       sender,
//       receiver,
//       message,
//       timestamp: new Date(),
//     });
//     await chatMessage.save();

//     // Emit the message to the receiver if online
//     const receiverSocketId = connectedUsers[receiver];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit('receiveMessage', chatMessage);
//     }
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     // Remove user from connectedUsers
//     for (const email in connectedUsers) {
//       if (connectedUsers[email] === socket.id) {
//         //console.log(`${email} disconnected`);
//         delete connectedUsers[email];
//         break;
//       }
//     }
//   });
// });

chatroomApp.get('/chat',async (req,res)=>{

  
    const { receiver,sender } = req.query;
    //console.log(receiver,sender)
  
    try {
      const chatHistory = await Chat.find({
        $or: [
          {
            $and: [
              { sender: sender },
              { recipient: receiver }
            ]
          },
          {
            $and: [
              { sender: receiver },
              { recipient: sender }
            ]
          }
        ]
      }).sort({ timestamp: 1 });
  
      res.json(chatHistory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
})
module.exports=chatroomApp