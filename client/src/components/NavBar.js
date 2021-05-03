
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../auth/auth.js'
import '../styles/navbar.scss'


const Navbar = () => {
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/potions')
  }
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link to="/lab" className="logo-image">
          <img src="../../assets/nav-logo.png" alt={`${name}`} />
        </Link>
        <Link to="/potions" className="navbar-item">Potions</Link>

      </div>
      <div className="navbar-end">
        { !userIsAuthenticated() &&
          <>
            <Link to="/register" className="navbar-item">
              Register
            </Link>

            <Link to="/login" className="navbar-item">
              Log in
            </Link>
          </>
        }
        { userIsAuthenticated() &&
          <h4 onClick={handleLogout} className="logout">Log-out</h4>
        }
      </div>
    </nav>
  )
}

export default Navbar

















// /* eslint-disable no-unused-vars */
// import '../styles/navbar.scss'
// import React, { useEffect, useState } from 'react'
// // import { Link, useHistory, useLocation } from 'react-router-dom'

// const NavBar = () => {
  

//   return (
//     <nav className="navbar custom-nav">

//     </nav>
//   )
  

// }

// export default NavBar
