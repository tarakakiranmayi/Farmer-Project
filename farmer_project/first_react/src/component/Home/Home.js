import React from 'react'
import { increment,decrement,incrementByAmount } from '../../Redux/slices/Counter'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import './Home.css'
function Home() {
  // const count = useSelector((state)=>state.counter.CounterValue)
  
  // const dispatch=useDispatch()
  // //(count)
  const data=useSelector((state)=>state.userFarmer)
  //(data)
  return (
    <>
          <Carousel className='m-3 p-3 custom-carousel' style={{minWidth:'350px',minHeight:"350px"}}>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://agronicfood.com/wp-content/uploads/2020/02/0-4.png"
          alt=""
          height="350px"
        />
        <Carousel.Caption>
       
          <h5>Empowering Farmers to Cultivate Success Anywhere</h5>
          <p> Your Trusted Source for Expert Farming Insights</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/0632/4912/1521/files/th_480x480.jpg?v=1672911534"
          alt="Second slide"
           height="350px"
        />
        <Carousel.Caption>
          <h5>Pure and Natural</h5>
          <p> Your Trusted Source for the Finest Organic Products</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static.toiimg.com/thumb/imgsize-23456,msid-77893038,width-600,resizemode-4/77893038.jpg"
          alt="Third slide"
           height="350px"
        />
        <Carousel.Caption>
          <h5>Post Your Organic Produce</h5>
          <p>Share your fresh, organic produce and reach a community eager for healthy, pesticide-free food!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  <div className='container1' style={{minwidth: "15rem;"}}>
      <div className='row g-3 m-3'>
        <div className='col-lg-6 col-sm-6 '>
          <div className='card'>
        <div className='row' style={{width: "18rem;"}}>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6'>
        <img src="https://www.dahu.bio/images/photos/agriculture/organic-product.jpg" className="card-img-top" alt="..."  height="200px"/>
        </div>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6 card-body text-center' >
          <h5 className='card-title mb-3'>Enjoy Organic Produce</h5>
        <p className="card-text ">Enjoy fresh, organic produce delivered to your doorstep! </p>
        <div className='card-footer'>
          <Link to="/shop" className='btn btn-success mx-auto d-block w-50'>Explore</Link>
        </div>
        </div>
        
        </div>
        </div>
        </div>
        <div className='col-lg-6 col-sm-6'>
          <div className='card'>
        <div className='row' style={{width: "18rem;"}}>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6'>
        <img src="https://kids.earth.org/wp-content/uploads/2022/04/Untitled-1024-%C3%97-768px-17.jpg" className="card-img-top" alt="..." height="200px"/>
        </div>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6 card-body text-center' >
          <h5 className='card-title mb-3'> Share Your Fresh Organic Harvest</h5>
        <p className="card-text ">Share your fresh, organic vegetables with our community! 

</p> <div className='card-footer'>
          <Link to="/products" className='btn btn-success mx-auto d-block w-50'>Explore</Link>
        </div>
        </div>
        </div>
        </div>
        </div>
        
      
     
      
         
      </div>
      <div className='row g-3 m-3'>
      <div className='col-lg-6 col-sm-6'>
          <div className='card'>
        <div className='row' style={{width: "18rem;"}}>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6'>
        <img src="https://media.istockphoto.com/id/1328004520/photo/healthy-young-soybean-crop-in-field-at-dawn.jpg?s=612x612&w=0&k=20&c=XRw20PArfhkh6LLgFrgvycPLm0Uy9y7lu9U7fLqabVY=" className="card-img-top" alt="..."  height="200px"/>
        </div>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6 card-body text-center' >
          <h5 className='card-title mb-3'>List Your Land for Cultivation</h5>
        <p className="card-text ">Have land available for cultivation? Share the details with our network of farmers </p>
        <div className='card-footer'>
          <Link to="/" className='btn btn-success mx-auto d-block w-50'>Explore</Link>
        </div>
        </div>
        </div>
        </div>
        </div><div className='col-lg-6 col-sm-6'>
          <div className='card'>
        <div className='row' style={{width: "18rem;"}}>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6'>
        <img src="https://images.yourstory.com/cs/wordpress/2017/08/shutterstock_498961387.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=3840&q=75" className="card-img-top" alt="..."  height="200px" />
        </div>
        <div className='col-lg-6 col-sm-6 col-mg-4 col-sm-6 card-body text-center' >
          <h5 className='card-title mb-3'>Connect with a Farmer</h5>
        <p className="card-text ">Connect with local farmers passionate about organic farming.</p>
        <div className='card-footer'>
          <Link to="/" className='btn btn-success mx-auto d-block w-50'>Explore</Link>
        </div>
        </div>
        </div>
        </div>
        </div>
        
      
     
      
         
      </div>
      </div>
  
    
    </>
  )
}

export default Home