import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Farmer = ({ clients }) => {
  const history = useHistory();
  const userEmail = localStorage.getItem('userEmail'); // User's own email from local storage

  const handleStartChat = (recipientEmail) => {
    // Navigate to the chatroom with userEmail and recipientEmail as URL parameters
    history.push(`/chat?userId=${userEmail}&recipientId=${recipientEmail}`);
  };

  return (
    <div>
      <h2>Available Clients</h2>
      <ul>
        {clients.map((client, index) => (
          <li key={index}>
            {client.email} 
            <button onClick={() => handleStartChat(client.email)}>Start Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Farmer;
