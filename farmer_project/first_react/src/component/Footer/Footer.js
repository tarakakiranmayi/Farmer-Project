// src/Footer.js
import React from 'react';
import { Container, Row, div } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../Footer/Footer.css'
function Footer() {
  return (
    <footer className="footer" style={{minWidth:"330px"}}>
    <div className="container">
     <div className="row">
       <div className="footer-col">
         <h4>company</h4>
         <ul id='ul'>
           <li><a href="#">about us</a></li>
           <li><a href="#">our services</a></li>
           <li><a href="#">privacy policy</a></li>
          
         </ul>
       </div>
       <div className="footer-col">
         <h4>get help</h4>
         <ul>
           <li><a href="#">FAQ</a></li>
           <li><a href="#">shipping</a></li>
           <li><a href="#">returns</a></li>
           <li><a href="#">order status</a></li>
           <li><a href="#">payment options</a></li>
         </ul>
       </div>
       <div className="footer-col">
         <h4>online shop</h4>
         <ul>
           <li><a href="#">Organic Products</a></li>
           <li><a href="#">Farm</a></li>
           <li><a href="#">Culitvate Land</a></li>
          
         </ul>
       </div>
       <div className="footer-col">
         <h4>follow us</h4>
         <div className="social-links">
           <a href="#"><i className="fab fa-facebook-f"><FaFacebook></FaFacebook></i></a>
           <a href="#"><i className="fab fa-twitter"><FaInstagram></FaInstagram></i></a>
           <a href="#"><i className="fab fa-instagram"><FaLinkedin></FaLinkedin></i></a>
           <a href="#"><i className="fab fa-linkedin-in"><FaTwitter></FaTwitter></i></a>
         </div>
       </div>
     </div>
    </div>
 </footer>
  )
}
export default Footer;