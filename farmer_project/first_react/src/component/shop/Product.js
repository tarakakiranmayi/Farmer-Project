import React, {useEffect, useState } from 'react';
import './Product.css';
import { useLocation } from 'react-router-dom';
import { FcPortraitMode, FcComments } from 'react-icons/fc';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Product = () => {
    const location=useLocation()
  const  id1=location.pathname.slice(9)
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
   const [productData,setproduct]=useState({})
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };
  let data1
  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would normally handle the submission (e.g., send to server)
    console.log('Comment:', comment);
    console.log('Rating:', rating);
    const formData={'comment':comment,'rating':rating}
    data1=await axios.put(`http://localhost:3030/organicfarm/comments/${id1}`, formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
   console.log(data1)
  };
  useEffect(()=>{
   
    async function get(id) {
      const data=await axios.get(`http://localhost:3030/organicfarm/product/${id}`)
      console.log(data.data)
      setproduct(data.data)
    }
    const  id=location.pathname.slice(9)
  
    get(id)

  },[])

  return (
    <div className="container">
      <div className="product-details">
        <img src={productData.image} alt={productData.productName} />
        <h2>{productData.productName}</h2>
        <p>Price: ${productData.productPrice}</p>
        <p>Category: {productData.category}</p>
        <p>Description: {productData.description}</p>
        <h3>Farmer Details</h3>
        <p>Name: {productData.farmerName}</p>
        <p>Contact: {productData.farmerContactNumber}</p>
        <p>Email: {productData.farmerEmail}</p>
        <p>Address: {productData.farmerAddress}</p>
        <p>Payment Methods: {productData.paymentMethods} <Link className='btn btn-success' to='/profile'>Buy</Link></p>
      </div>
      <h4 className='text-center'>Comments</h4>
      
    { productData.comments && productData.comments.map((comment, index) => (
      <div key={index} className="bg-light p-3">
        <p
          className="fs-4"
          style={{
            color: 'dodgerblue',
            textTransform: 'capitalize',
          }}
        >
          <FcPortraitMode className="fs-2 me-2" />
          {comment} {/* Display the comment here */}
        </p>

        <p
          style={{
            fontFamily: 'fantasy',
            color: 'lightseagreen',
          }}
          className="ps-4"
        >
         
          
        </p>
      </div>
    ))}
  
      <div className="comment-section">
      {/* {productData.comments &&    <p>Comments{

<div>
{productData.comments.map((data, index) => (
    <h5 key={index}>{data}</h5>
))}
</div>
}</p>} */}
        <h3>Leave a Comment and Rating</h3>
     

        {submitted ? (
          <div className="submitted-info">
            <p>Thank you for your feedback!</p>
            
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <select id="rating" value={rating} onChange={handleRatingChange} required>
                <option value="">Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Product;
