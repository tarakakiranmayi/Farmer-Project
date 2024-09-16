import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Cart.css';
import { Link } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { AddProduct,RemoveProduct } from '../../Redux/slices/CartProduct';
function Cart() {
    const [products, setProducts] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
   const navi=useNavigate()
   const dispatch=useDispatch()
    // Retrieve products from Redux store
    let res = useSelector((state) => state.product);
    let data=useSelector((state)=>state.userFarmer)
    // //(data)
    
   
    useEffect(() => {
        if (res) {
            
            let a=res.ProductCount
           console.log(a)
            const def=a.map((data)=>({
                ...data,
                'count':1,
                'totalprice':data.productPrice
            }))
            setProducts(def)
           
        }
    }, [res]);

   function subtract(obj){
    // console.log(obj)
   dispatch(RemoveProduct(obj))
   }
   function add(obj)
   {
    setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === obj._id
            ? { ...product, count: product.count + 1, totalprice: product.productPrice+product.totalprice }
            : product
        )
      );
   }

    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            //('Razorpay script loaded successfully');
        };
        script.onerror = () => {
            console.error('Error loading Razorpay script');
        };
        document.body.appendChild(script);

        // Cleanup script from the document when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);
   
    const pay = async () => {
        // setShowConfetti(true);
        try {
            // Calculate the total price
            const totalPrice = products.reduce((sum, product) => sum + product.totalprice, 0);

            // Prepare payment data
            const paymentData = {
                price: totalPrice,
                currency: 'INR'
            };

            // Request order creation from backend
            const response = await axios.post('http://localhost:3030/payment/order', paymentData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // //(response.data)

            const order_id  = response.data.id;
            setOrderId(order_id);

            // Configure Razorpay options
            const options = {
                key: "rzp_test_xUzWg33hsBbdcw", // Replace with your Razorpay Key ID
                name: "Akk",
                image: "https://example.com/your_logo",
                order_id: order_id,
                handler: async function (response) {
                    //(response);
                    // response.user=data.currentUser
                    const res=await axios.post('http://localhost:3030/payment/is-order-completed',response)
                    // //(res)
                    const postData = {
                      signature: response.razorpay_signature,
                      order_id: order_id,
                      email: data.currentUser.email // Ensure data.currentUser is defined and accessible
                  };
                      setShowConfetti(true);
                     
                     

                     axios.post('http://localhost:3030/postMail/payment',postData)
                    
                  .then((res) => {
                      //('Signature sent to /mail:', res.data);
                      
                  })
                  .catch((error) => {
                      console.error('Error sending signature:', error);
                  });
                  setTimeout(() => {setShowConfetti(false);  navi('/')}, 8000);
                 
                  
                    // axios.post('http://localhost:3030/payment/verify', response)
                //     .then((res) => {
                    //         //('Payment successful:', res.data);
                    //     })
                    //     .catch((error) => {
                    //         console.error('Error verifying payment:', error);
                    //     });
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // Open Razorpay checkout
            const rzp1 = new window.Razorpay(options); // Use window.Razorpay
            rzp1.open();

        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <>
        {showConfetti==true ? <><Confetti /> 
         <div className="message bg-success h-50 w-50">
         <h1>Thanks for buying our product!</h1>
         <p>Your order will be delivered soon.</p>
       </div></>
        :
        <div className='m-1' style={{  }}>
            <div className='text-center p-3 m-3'>
                Shopping bag
            </div>
            <div className="cart-container" style={{boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;'}}>
                {products.map((product) => (
                    <div key={product._id} className="cart-item d-flex w-100 h-100" style={{ justifyContent: 'space-around' }}>
                        <img src={product.image} height='50' width='50' alt={product.productName} />
                        <h2 style={{width:'25%'}}>{product.productName}</h2>
                        <div style={{width:'10%'}}>
                        <button style={{border:'1px solid ',fontSize:'16px'}} onClick={()=>{add(product)}}>+</button>
                        <button style={{border:'1px solid '}} onClick={()=>{subtract(product)}}>-</button>
                        </div>
                      
                        <p style={{width:'15%'}}>{product.count<=1 ? <span> 1 X </span> :<span> {product.count} X</span>}Price: ₹{product.productPrice}</p>
                        {
                            product.count==0 ?<p style={{width:'10%'}}>Total: ₹{product.productPrice}</p>:<p style={{width:'10%'}}>Total: ₹{product.totalprice}</p>
                        }
                       

                    </div>
                ))}
                 <button className='btn-success btn d-block mx-auto w-25 m-3 p-3' onClick={pay}>Pay</button>
            </div>
           
           
        </div>}
        <div className=' 
        backstore text-center'>
        <Link   to="/shop" style={{textDecoration:'none',color:' #28a745'}}>
        <FaStore /> Back to Shop
      </Link>
        </div>
       
        </>
    );
}

export default Cart;
