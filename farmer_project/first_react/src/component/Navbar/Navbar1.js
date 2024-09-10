import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaWindowClose } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { MdWavingHand } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { resetState } from '../../Redux/slices/UserFarmerLoginThunk';
import { useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import '../Navbar/Navbar1.css';

function Navbar1() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const data = useSelector((state) => state.userFarmer);
  const nav=useNavigate()
  function Logout() {
    
    sessionStorage.clear()
    localStorage.clear()
    dispatch(resetState());
    // window.location.reload()
    nav('/Login')
  }

  return (
    <>
      <nav className='' style={{ marginTop: "20px", position: 'relative' }}>
        <div className='mainNav' style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-between' }}>
          <ul style={{ minWidth: '6rem', display: 'flex', listStyle: 'none', justifyContent: 'space-between' }}>
            <li>
              <button className='nav-link1 m-1'>
                <span>
                  {clicked === false
                    ? <FaBars style={{ fontSize: '30px' }} onClick={() => setClicked(true)} />
                    : <FaWindowClose style={{ fontSize: '30px', color: 'white' }} onClick={() => setClicked(false)} />}
                </span>
              </button>
            </li>
            
              <div  className={`d-flex justify-content-end dropmenu ${clicked ? 'show':'hide'}`}>
                <ul className="dropdown-container list-group w-25" style={{ maxWidth: "150px" }}>
               
                  <NavLink className="list-group-item " to="/startpage"><span className='text-black '>Chat Room</span></NavLink>
                  <NavLink className="list-group-item list-group-item-action" to="/shop"><span className='text-black'>Organic Shop</span></NavLink>
                  <NavLink className="list-group-item list-group-item-action" aria-disabled="true" to="/Login" onClick={Logout}><span className='text-black'>Logout</span></NavLink>
                </ul>
              </div>
            
            <li>
              <NavLink className="nav-link active " to="/" onClick={()=>{window.location.reload()}}><FaHome className='' style={{ fontSize: "30px" ,color: '#28a745'}} /></NavLink>
            </li>
          </ul>

          <ul style={{ minWidth: '12rem', display: 'flex', listStyle: 'none', justifyContent: 'flex-end' }}>
            {data.loginStatus === false ? (
              <div style={{ minWidth: '5rem', display: 'flex', listStyle: 'none', justifyContent: 'space-around' }}>
                <li><NavLink className="nav-link active" to="/Login">Login</NavLink></li>
                <li><NavLink className="nav-link active fs-10" to="/Register">Sign in</NavLink></li>
              </div>
            ) : (
              <li className="nav-link active text-success">
                Hello {data.currentUser.name}<span><MdWavingHand  style={{color: '#28a745',fontSize:'30px'}}/></span>
              </li>
            )}

            {data.loginStatus && (
              <li className="nav-link">
                {!showProfile ? (
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginTop: "16px", padding: "0.1px", margin: "0px",color: '#28a745',fontSize:'25' }}
                    onClick={() => setShowProfile(true)}
                  />
                ) : (
                  <FaTimes
                    size={25}
                    style={{ cursor: 'pointer', color: '#28a745' }}
                    onClick={() => setShowProfile(false)}
                  />
                )}
              </li>
            )}

            {/* Profile Slide */}
            
            <div className={`profile-container ${showProfile ? 'show' : 'hide'}`}>
              <Profile />
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar1;
