import React, {useEffect, useState } from 'react';
import './Product.css';
import { useLocation } from 'react-router-dom';
import { FcPortraitMode, FcComments } from 'react-icons/fc';
import axios from 'axios'
import { Link } from 'react-router-dom';
import UserFarmerLoginThunk from '../../Redux/slices/UserFarmerLoginThunk';
import { useSelector,useDispatch } from 'react-redux'
import { AddProduct,RemoveProduct } from '../../Redux/slices/CartProduct';
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
  const dispatch=useDispatch()

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };
  let data1
  let data=useSelector((state)=>state.userFarmer)
  //console.log(data)
  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would normally handle the submission (e.g., send to server)
    //console.log('Comment:', comment);
    //console.log('Rating:', rating);
  
    const formData={'comment':[data.currentUser.name,comment],'rating':rating}
    data1=await axios.put(`http://localhost:3030/organicfarm/comments/${id1}`, formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
   //console.log(data1)
  };
  useEffect(()=>{
   
    async function get(id) {
      const data=await axios.get(`http://localhost:3030/organicfarm/product/${id}`)
      //console.log(data.data)
      setproduct(data.data)
    }
    const  id=location.pathname.slice(9)
  
    get(id)

  },[])

  return (
    <div className="container1">
      <div className="product-details" style={{boxShadow: ''}}>
        <img className='d-block mx-auto' src={productData.image} alt={productData.productName}  style={{}}/>
        
        <div className='d-flex m-1 p-2' style={{justifyContent:'space-around' ,border:'2px solid #ccc ' }}>
        <div >
        <h5>{productData.productName}</h5>
        <p>Price: ₹{productData.productPrice}</p>
        <p>Category: {productData.category}</p>
        <p>Description: {productData.description}</p>
        <p>Payment Methods: {productData.paymentMethods}</p>
        </div>
       <div>
       <h5>Farmer Details</h5>
        <p>Name: {productData.farmerName}</p>
        <p>Contact: {productData.farmerContactNumber}</p>
        <p>Email: {productData.farmerEmail}</p>
        <p>Address: {productData.farmerAddress}</p>
       
        
       </div>
       </div>
        <p className='text-center m-1'> <Link className='btn btn-success mx-1 mt-1' to='/cart' onClick={()=>{
          dispatch(AddProduct(productData))

        }}  style={{}}>Add to card</Link></p>
      </div>
     
      <div className="product-details" style={{boxShadow: ''}}>
      <h4 className='text-center m-4'>Comments</h4>
    { productData.comments && productData.comments.map((comment, index) => (
      <div key={index} className="bg-light p-3">
        <p
          className="fs-7"
          style={{
            color: 'dodgerblue',
            textTransform: 'capitalize',
          }}
        > <span className='text-success fs-5 m-3'> {comment[0]}</span>
          <FcPortraitMode className="fs-2 me-2" />
          {comment[1]} {/* Display the comment here */}
        </p>

        <p
          style={{
            fontFamily: 'fantasy',
            color: 'lightseagreen',
          }}
          className="ps-4"
        >
         
          
        </p>
        <hr style={{width:"100%",textAlign:"left",marginLeft:"0"}}></hr>
      </div>
    ))}</div>
  
      <div className="comment-section" style={{}}>
      {/* {productData.comments &&    <p>Comments{

<div>
{productData.comments.map((data, index) => (
    <h5 key={index}>{data}</h5>
))}
</div>
}</p>} */}
        <h3 className='text-center'>Leave a Comment and Rating</h3>
     

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
            <button type="submit" className='mx-auto d-block'>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Product;
