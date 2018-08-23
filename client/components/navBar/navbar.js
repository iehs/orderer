import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import './navBar.css'


// const navbarStyle = {
//   "overflow-x" : "hidden"
// }

const Navbar = ({handleClick, isLoggedIn}) => (
  <div >
    <nav className="nav-extended blue-grey darken-4">
    <div className="nav-wrapper">
    <a href="#" className="brand-logo left">International</a>

    
      {isLoggedIn ? (
        <div className="right">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="right">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        
      )}
  
 
    <div className="nav-content">
      <ul className="tabs tabs-fixed-width tabs-transparent extendedNav" >
        <li className="tab"><a href="#test1">Test 1</a></li>
        <li className="tab"><a className="active" href="#test2">Test 2</a></li>
        <li className="tab disabled"><a href="#test3">Disabled Tab</a></li>
      </ul>
    </div>
    </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
