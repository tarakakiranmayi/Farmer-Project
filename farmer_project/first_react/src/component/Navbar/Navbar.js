import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faUser } from '@fortawesome/free-solid-svg-icons';
import '../Navbar/Navbar.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector,useDispatch } from 'react-redux'
import UserFarmerLoginThunk from '../../Redux/slices/UserFarmerLoginThunk';
function Navbar() {
   
  let [clicked,setclicked]=useState(false)
  let data=useSelector((state)=>state.userFarmer)
  console.log(data)
  function profileDisplay()
  {
    // console.log(currentUser,loginStatus)
  }
  function dropmenu()
  {
    setclicked(true)
  }
  const handleTouchStart = (e) => {
    // Prevent the default touch behavior to avoid conflicts
   console.log("yes")
  };
  function offdropmenu()
  { console.log("why now")
    setclicked(false)
  }
  // console.log(clicked)
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="#navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          
        >
          <span className="navbar-toggler-icon" onClick={dropmenu}  ></span>
         
        </button>
        <NavLink className="navbar-brand" to="#">
          <FontAwesomeIcon icon={faTractor} size="2x" />
        </NavLink>
        <div id="navbarNav" className="collapse navbar-collapse" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="#">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">Features</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">Pricing</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" aria-disabled="true" to="#">Disabled</NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav ms-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/Login">Sign Up</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Register">Sign In</NavLink>
            </li>
            <li className="nav-item">
             
            </li>
          </ul>
          <NavLink className="nav-link" to="/profile" onClick={profileDisplay}>
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
        </div>
      </div>
      { clicked &&
        <div id="dropmenu" className='d-flex justify-content-end'    onMouseLeave={offdropmenu} >
     
        
        <ul className="dropdown-container list-group w-50"   >
        
          <NavLink className="list-group-item list-group-item-action active" aria-current="page" to="#"  >Home</NavLink>
        
       
          <NavLink className="list-group-item list-group-item-action" to="#">Features</NavLink>
        
       
          <NavLink className="list-group-item list-group-item-action" to="#">Pricing</NavLink>
        
       
          <NavLink className="list-group-item list-group-item-action" aria-disabled="true" to="#">Disabled</NavLink>
          <NavLink className="list-group-item list-group-item-action" onClick={offdropmenu}>
          <FontAwesomeIcon icon={faTimes} ></FontAwesomeIcon> Close
        </NavLink> 
       
      </ul>
      
      
      
    
     

      </div>}
    </nav>
   

      </>
  );
}

export default Navbar;
