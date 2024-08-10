import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Nav } from 'react-bootstrap'
import Navbar1 from '../Navbar/Navbar1'
function RootLayout() {
  return (
    <div>
        <Navbar1/>
        <div style={{ minHeight: "10vh" , marginBottom :"13px"}}>
        <Outlet />
      </div>
        <Footer/>
    </div>
  )
}

export default RootLayout