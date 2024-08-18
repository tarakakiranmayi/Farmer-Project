import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Cart.css';

function Cart() {
    const [products, setProducts] = useState([]);
    const [orderId, setOrderId] = useState('');

    // Retrieve products from Redux store
    let res = useSelector((state) => state.product);
    let data=useSelector((state)=>state.userFarmer)
    console.log(data)
    useEffect(() => {
        if (res) {
            setProducts(res.ProductCount);
        }
    }, [res]);

    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            console.log('Razorpay script loaded successfully');
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
        try {
            // Calculate the total price
            const totalPrice = products.reduce((sum, product) => sum + product.productPrice, 0);

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
            console.log(response.data)

            const order_id  = response.data.id;
            setOrderId(order_id);

            // Configure Razorpay options
            const options = {
                key: "rzp_test_xUzWg33hsBbdcw", // Replace with your Razorpay Key ID
                name: "Akk",
                image: "https://example.com/your_logo",
                order_id: order_id,
                handler: async function (response) {
                    console.log(response);
                    // response.user=data.currentUser
                    const res=await axios.post('http://localhost:3030/payment/is-order-completed',response)
                    console.log(res)
                    const postData = {
                      signature: response.razorpay_signature,
                      order_id: order_id,
                      email: data.currentUser.email // Ensure data.currentUser is defined and accessible
                  };
                  
                     axios.post('http://localhost:3030/postMail/payment',postData)
                    
                  .then((res) => {
                      console.log('Signature sent to /mail:', res.data);
                  })
                  .catch((error) => {
                      console.error('Error sending signature:', error);
                  });
                    axios.post('http://localhost:3030/payment/verify', response)
                        .then((res) => {
                            console.log('Payment successful:', res.data);
                        })
                        .catch((error) => {
                            console.error('Error verifying payment:', error);
                        });
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
        <div className='m-1' style={{ backgroundColor: 'greenyellow' }}>
            <div>
                Shopping bag
            </div>
            <div className="cart-container">
                {products.map((product) => (
                    <div key={product._id} className="cart-item d-flex w-100 h-75" style={{ justifyContent: 'space-around' }}>
                        <img src={product.image} height='50' width='50' alt={product.productName} />
                        <h2>{product.productName}</h2>
                        <p>Price: ₹{product.productPrice}</p>
                        <p>Total: ₹{product.productPrice}</p>
                    </div>
                ))}
            </div>
            <button className='btn-success btn d-block mx-auto w-25 m-4 p-3 mb-1' onClick={pay}>Pay</button>
        </div>
    );
}

export default Cart;
