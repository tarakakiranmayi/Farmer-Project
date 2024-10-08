import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact_number: '',
    description: '',
    pricePerHour: '',
    area: '',
    skills: [],
    rating: '',
    reviews: [],
    email: '',
    password:'',
    address: '',
    photo: '',
    experience: '',
    education: '',
    work_hours_per_day: '',
    availability: '',
    languages_spoken: [],
    tools_and_equipment: [],
    payment_methods: [],
    average_response_time: '',
    total_jobs_contracts: '',
    join_date: '',
    last_updated: '',
  });
  const nav=useNavigate()
  let [err,setErr]=useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post('http://localhost:3030/farmersapi/register', formData);
      console.log(res)
      if(res.data=='Registration successful')
      {
        nav('/Login')
      }
      else{
         setErr(res.data)
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="Contact Number" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
      <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} placeholder="Price Per Hour" required />
      <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Area" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      {/* Add inputs for other fields similarly */}
      <button type="submit">Register</button>
      {
        err &&
        <p className='text-danger text-center m-1 p-2'>{err}</p>
      }
      <p className='text-center'>
       <NavLink style={{textDecoration:"None"}} className='text-center' to="/Login">Already Registered</NavLink></p>
    </form>
  );
};

export default RegisterPage;
