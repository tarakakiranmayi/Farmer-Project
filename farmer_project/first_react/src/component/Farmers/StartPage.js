import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Buffer } from 'buffer';
import './StartPage.css'

const StartPage = () => {

  const [users, setUsers] = useState([]);
  const history = useNavigate();
  // const userEmail = localStorage.getItem('email');
//   const token = localStorage.getItem('token');
const user=useSelector((state)=>state.userFarmer.currentUser)

const userEmail=user.email
  useEffect(() => {
    // if (!userEmail) {
    //   history.push('/login');
    //   return;
    // }

    const fetchUsers = async () => {
      if(user.area==null){
      
        try {
          const res = await axios.get('http://localhost:3030/farmersapi/users');
          console.log(res)
          const farmers=res.data.filter((farmer)=>farmer.online==true)
          const users=farmers.map((user1)=>{
            
          const buffer=Buffer.from(user1.photo)
          
          const base64image=buffer.toString('base64')

          user1.photo=base64image
          return {
            ...user1,
            photo: `data:image/jpeg;base64,${base64image}`, // assuming the image is in JPEG format
          };
          })
          setUsers(users);
          console.log(users)
        } catch (err) {
          console.error(err);
          // alert('Failed to fetch users');
        }
      }
      else{
        try {
          const res = await axios.get('http://localhost:3030/userapi/users');
          console.log(res)
          
          setUsers(res.data);
        } catch (err) {
          console.error(err);
          alert('Failed to fetch users');
        }
      }
     
    };

    fetchUsers();
  }, [userEmail,  history]);
 
  const handleStartChat = (recipientEmail) => {
    history(`/chat/${recipientEmail}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, {user.name}</h2>
      {
      user.area ?<h3>Available Users :</h3> : <h3>Available Farmers :</h3>
    }
     
      {users.length === 0 ? (
        <p>No other users available to chat.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {users.map((user, index) => (
            <li key={index} className="w-75 "style={{ margin: '10px 10px' ,alignItems:'center', display:'block',margin:'auto',border:'1px solid #ccc'}}>
              
              {user.area && user.busy==false && 
              <div className='d-flex w-100 mx-auto m-2 p-2 '  style={{justifyContent:'space-between',minHeight:'25%'}}>
             
              <div className='w-75 text-start m-1 p-1'>
              <p> Email : {user.email}{'  '}</p>
                <p>
                  Name : {user.name}
                </p>
                <p>
                  Phone No : {user.contact_number}
                </p>
                <p>
                  About : {user.description}
                </p>
                <p>
                  Area : {user.area}
                </p>
                <p>
                  Address : {user.address}
                </p>
                <p>
                  Price : ${user.pricePerHour}
                </p>
               
                </div>
                <div className="w-75"style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                <img src={user.photo} width='97%' height='60%'></img>
                <button className='online-button pulse' style={{maxHeight:'40px',marginTop:'12px'}} onClick={() => handleStartChat(user.email)}>Start Chat</button>
                </div>
              </div>
               }

              {
                user.area==null && 
                 <div className='d-flex w-50 mx-auto justify-content-space-between m-1 p-1' style={{justifyContent:'space-between'}}>
                 <div className='w-75'>
                <p>
                  Name : {user.name}
                </p>
                
                 </div>
             
              <button onClick={() => handleStartChat(user.email)}>Start Chat</button></div>
              }
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StartPage;
