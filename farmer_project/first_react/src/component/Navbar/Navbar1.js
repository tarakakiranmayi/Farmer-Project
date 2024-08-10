import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {  FaWindowClose } from 'react-icons/fa';
import '../Navbar/Navbar1.css';
import { faTractor, faUser } from '@fortawesome/free-solid-svg-icons';
import UserFarmerLoginThunk from '../../Redux/slices/UserFarmerLoginThunk';
import { useSelector,useDispatch } from 'react-redux'
import { FaRegHandPaper } from 'react-icons/fa';
import { MdWavingHand } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import Profile from '../profile/Profile';
function Navbar1() {
  const [clicked, setClicked] = useState(false);
  
  const dropdownRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);

  const openProfile = () => setShowProfile(true);
  const closeProfile = () => setShowProfile(false);

  let data=useSelector((state)=>state.userFarmer)
  console.log(data)
  function dropmenu() {
    setClicked(true);
    console.log("yes")
  }

  function offdropmenu() {
    setClicked(false);
  }

  // Effect to handle clicks outside the dropdown menu
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setClicked(false);
//       }
//     }

//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

  return (
    <>
      <nav className='' style={{ marginTop: "20px" }}>
        <div className='mainNav' style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-between' }}>
          <ul style={{ minWidth: '6rem', display: 'flex', listStyle: 'none', justifyContent: 'space-between' }}>
            <li>
              <button
                className='nav-link1 m-1'
               
                
              >
                <span  className='' >
                    {
                        clicked===false?<FaBars   style={{ fontSize: '30px'}} onClick={dropmenu} />: <FaWindowClose  style={{ fontSize: '30px', color: 'black' }} onClick={offdropmenu} />
                    }
                  
                </span>
              </button>
            </li>
            {
              clicked &&
              <div ref={dropdownRef} id="dropmenu" className='d-flex justify-content-end'>
                <ul className="dropdown-container list-group w-25" style={{maxWidth:"300px"}}>
                  <NavLink className="list-group-item list-group-item-action active" aria-current="page" to="#"></NavLink>
                  <NavLink className="list-group-item list-group-item-action" to="#">Features</NavLink>
                  <NavLink className="list-group-item list-group-item-action" to="#">Pricing</NavLink>
                  <NavLink className="list-group-item list-group-item-action" aria-disabled="true" to="#">Disabled</NavLink>
                 
                </ul>
              </div>
            }
            <li>
              <NavLink className="nav-link active" to="/"><FaHome style={{fontSize:"30px"}}/></NavLink>
            </li>
          </ul>
          <ul style={{ minWidth: '12rem', display: 'flex', listStyle: 'none', justifyContent:'flex-end' }}>
            {
                data.loginStatus===false ?  <div style={{ minWidth: '5rem', display: 'flex', listStyle: 'none', justifyContent: 'space-around', }} > <li><NavLink className="nav-link active" to="/Login">Login</NavLink></li>
            <li><NavLink className="nav-link active fs-10"  to="/Register">Sign in</NavLink></li></div>
                 :<li  className="nav-link active">
                    Hello { data.currentUser.name}<span><MdWavingHand/></span>
                 </li>
                 
            }
            {/* <li><NavLink className="nav-link active">Sign in</NavLink></li>
            <li><NavLink className="nav-link active">Sign out</NavLink></li> */}
           {
            data.loginStatus==true && 
             <li className="nav-link" >
              <NavLink to='/profile'>
            <FontAwesomeIcon icon={faUser} style={{marginTop:"16px",padding:"1px",margin:"1px"}}/>
          
            </NavLink>
          </li>
           }
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar1;
