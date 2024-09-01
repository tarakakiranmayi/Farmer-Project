import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Card(props) {
  let navigate = useNavigate();

  function goToUser() {
    //console.log(props.data)
    
    navigate(`/Product/${props.data._id}`)
  }


  return (
    <div key={props.data._id} className='col-sm-12 col-md-6 col-lg-4'>
      <Link  style={{ textDecoration: 'none' }}>
        <div className='card h-100 d-flex flex-row w-100 shadow-lg'>
          <div className='card-image col-6 m-2'>
            <img
              src={props.data.image}
              alt=""
              height="240px"
              style={{ width: '100%', padding: '12px' }}
            />
          </div>
          <div className='card-body col-6'>
            <h6 className='card-title' style={{ fontSize: '17px' }}>
              {props.data.productName}
            </h6>
            <div className='col-8 d-flex' style={{ height: "29px", justifyContent: 'space-between', position: 'relative',margin:'1px' }}>
              <p>
                <img
                  src="https://static-00.iconduck.com/assets.00/star-rating-icon-2048x2048-2k1x57ky.png"
                  alt=""
                  width="20px"
                  height="20px"
                  className='m-1'
                />
                {props.data.averageRating}
              </p>
            </div>
            <div style={{  margin: "3px" }}>
              
              <p className='text-black' style={{ height: "50px", }}>
                {props.data.category}
              </p>
            </div>
            <div style={{ }}>
              <h3 className='text-danger text-start'>${props.data.productPrice}</h3>
            </div>
            <div className='card-footer'>
              <button className='btn btn-success d-block mx-auto' onClick={goToUser}>FIND</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
