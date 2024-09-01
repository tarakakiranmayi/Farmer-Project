import React from 'react'
import { useEffect,useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';
const socket = io('http://localhost:3030', {
   // Ensure this path matches server path
  transports: ['websocket', 'polling'], // Support WebSocket and polling
});
// socket.on('connect', () => {
//   console.log('Connected to server');
// });

function Chatroom() {
    const [message, setMessage] = useState('');   // State to hold the current message being typed
  const [messages, setMessages] = useState([]); // State to hold the list of messages
  const location=useLocation()
   // This is your email from local storage
//   console.log(location)
  const recipientEmail = location.pathname.slice(6,)
  
  const user=useSelector((state)=>state.userFarmer)
  
  const userEmail=user.currentUser.email
  console.log(userEmail,recipientEmail)
    useEffect(() => {
        // Join the chat with recipientId
        socket.on('connection', () => {
            
            console.log('Connected to chatroom');
            // You can now use socket.emit and socket.on to communicate
          });
        socket.emit('join', userEmail);
        const fetchChatHistory = async () => {
            try {
              const res = await axios.get('http://localhost:3030/chatroom/chat', {
                
                params: { receiver: recipientEmail,sender:userEmail },
              });
              console.log(res)
              setMessages(res.data);
            } catch (err) {
              console.error(err);
              alert('Failed to fetch chat history');
            }
          };
      
          fetchChatHistory();
      
    
        // Listen for incoming messages
        socket.on('receiveMessage', (data) => {
          console.log(data)
            if (data.sender === recipientEmail && data.recipient === userEmail) {
              setMessages((prevMessages) => [...prevMessages, data]);
              alert(`New message from ${data.sender}: ${data.message}`);
            }
          });
        
    
        // Cleanup on unmount
        return () => {
           
            socket.off('receiveMessage');
        };
      }, [userEmail, recipientEmail]);
      const handleSendMessage = () => {
        if (message.trim()) {
          // Send the message to the server
          socket.emit('sendMessage', {
            sender: userEmail,
            receiver: recipientEmail,
            message,
          });
          setMessages((prevMessages) => [...prevMessages, { ...message, timestamp: new Date() }]);
          setMessage(''); // Clear the input field
        }
      };
    
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Chat with {recipientEmail}</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          width: '60%',
          margin: '0 auto',
          height: '300px',
          overflowY: 'scroll',
          textAlign: 'left',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender === userEmail ? 'You' : msg.sender}:</strong> {msg.message}
            <div style={{ fontSize: '0.8em', color: '#555' }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '40%', padding: '10px' }}
        />
        <button onClick={handleSendMessage} style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Send
        </button>
      </div>
      {/* <div style={{ marginTop: '20px' }}>
        <button onClick={() => history.push('/')}>Back to Users List</button>
      </div> */}
    </div>
  )
}

export default Chatroom