import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const StartPage = () => {
  console.log("fsdg")
  const [users, setUsers] = useState([]);
  const history = useNavigate();
  // const userEmail = localStorage.getItem('email');
//   const token = localStorage.getItem('token');
const user=useSelector((state)=>state.userFarmer)
console.log(user)
const userEmail=''
  useEffect(() => {
    // if (!userEmail) {
    //   history.push('/login');
    //   return;
    // }

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3030/userapi/users');
        console.log(res)
        
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch users');
      }
    };

    fetchUsers();
  }, [userEmail,  history]);

  const handleStartChat = (recipientEmail) => {
    history(`/chat/${recipientEmail}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, {userEmail}</h2>
      <h3>Available Users:</h3>
      {users.length === 0 ? (
        <p>No other users available to chat.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {users.map((user, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              {user.email}{' '}
              <button onClick={() => handleStartChat(user.email)}>Start Chat</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StartPage;
