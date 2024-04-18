import React from 'react'
import logo from '../assets/logo.png'
import '../components/Navbar.css'
import Logout from './Logout'
import logo2 from '../assets/logo2.png'

export const Navbar = () => {
  return (
    <div className="outerdiv">
      <div className="logo-container">
        {/* <img className="logo" src={logo} alt="" /> */}
      </div>
      <div className="logout-container">
        {/* <Logout /> */}
      </div>
    </div>

  )
}


