import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CultivateLandForm = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    landSize: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    latitude: '',
    longitude: '',
    cropType: '',
    irrigationType: '',
    ownershipStatus: '',
    soilQuality: '',
    landDocuments: '',
    cultivatedSince: '',
    landDescription: '',
  });
  const nav=useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/contract/cultivateLand', formData);
      console.log(response.data);
      if(response.data=='Register Successfully')
      {
         alert('Thanks for uploading')
         nav('/')
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cultivate Land Form</h2>

      <label>Owner Name:</label>
      <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required />

      <label>Land Size (in acres):</label>
      <input type="number" name="landSize" value={formData.landSize} onChange={handleChange} required />

      <label>Address:</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} />

      <label>City:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} />

      <label>State:</label>
      <input type="text" name="state" value={formData.state} onChange={handleChange} />

      <label>Pincode:</label>
      <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />

      <label>Latitude:</label>
      <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} />

      <label>Longitude:</label>
      <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} />

      <label>Crop Type:</label>
      <input type="text" name="cropType" value={formData.cropType} onChange={handleChange} required />

      <label>Irrigation Type:</label>
      <select name="irrigationType" value={formData.irrigationType} onChange={handleChange} required>
        <option value="">Select Irrigation Type</option>
        <option value="Drip">Drip</option>
        <option value="Sprinkler">Sprinkler</option>
        <option value="Flood">Flood</option>
      </select>

      <label>Ownership Status:</label>
      <select name="ownershipStatus" value={formData.ownershipStatus} onChange={handleChange} required>
        <option value="">Select Ownership Status</option>
        <option value="Owned">Owned</option>
        <option value="Leased">Leased</option>
      </select>

      <label>Soil Quality:</label>
      <input type="text" name="soilQuality" value={formData.soilQuality} onChange={handleChange} />

      <label>Land Documents (URL):</label>
      <input type="text" name="landDocuments" value={formData.landDocuments} onChange={handleChange} />

      <label>Cultivated Since:</label>
      <input type="date" name="cultivatedSince" value={formData.cultivatedSince} onChange={handleChange} required />

      <label>Land Description:</label>
      <textarea name="landDescription" value={formData.landDescription} onChange={handleChange}></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CultivateLandForm;
