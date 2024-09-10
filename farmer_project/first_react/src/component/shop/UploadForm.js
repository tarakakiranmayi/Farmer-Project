import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadForm.css'; // Assume you have some CSS for styling

const UploadForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    // farmerName: '',
    // farmerContactNumber: '',
    // farmerEmail: '',
    // farmerAddress: '',
    // manufactureDate: '',
    // shippingBy: '',
    // expiryDate: '',
    // quantity: '',
    // unit: 'kg',
    category: 'Vegetables',
    description: '',
    // certifications: [],
    // discount: '',
    // availability: true,
    // location: '',
    // paymentMethods: [],
    // shippingCost: '',
    // deliveryTime: '',
    // packagingDetails: '',
    image:''
  });

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //(formData)
    try {
    
      const response = await axios.post(
        'http://localhost:3030/organicfarm/productUpload',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.message === 'Product image uploaded successfully') {
        navigate('/shop');
      }
    } catch (error) {
      console.error('Error uploading product image:', error);
    }
  };

  return (
    <div className='happy h-100' style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
    <div className="upload-form w-100">
      <h2>Upload Product Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Image:</label>
          <input type="text" name="image" value={formData.image} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input type="number" name="productPrice" value={formData.productPrice} onChange={handleInputChange} required />
        </div>
         <div className="form-group">
          <label>Farmer Name:</label>
          <input type="text" name="farmerName" value={formData.farmerName} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Farmer Contact Number:</label>
          <input type="tel" name="farmerContactNumber" value={formData.farmerContactNumber} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Farmer Email:</label>
          <input type="email" name="farmerEmail" value={formData.farmerEmail} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Farmer Address:</label>
          <textarea name="farmerAddress" value={formData.farmerAddress} onChange={handleInputChange} required></textarea>
        </div>{/*
        <div className="form-group">
          <label>Manufacture Date:</label>
          <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
        </div> */}
        {/* <div className="form-group">
          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Unit:</label>
          <select name="unit" value={formData.unit} onChange={handleInputChange}>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="lbs">lbs</option>
          </select>
        </div> */}
        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
        </div>
        <div className="form-group">
          <label>UPI ID:</label>
          <input type="text" name="paymentMethods" value={formData.paymentMethods} onChange={handleInputChange} required />
        </div>
        {/* <div className="form-group">
          <label>Shipping By:</label>
          <input type="text" name="shippingBy" value={formData.shippingBy} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Shipping Cost:</label>
          <input type="number" name="shippingCost" value={formData.shippingCost} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Delivery Time:</label>
          <input type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Packaging Details:</label>
          <textarea name="packagingDetails" value={formData.packagingDetails} onChange={handleInputChange} required></textarea>
        </div> */}
        <button type="submit">Upload Product</button>
      </form>
    </div>
    </div>
  );
};

export default UploadForm;
