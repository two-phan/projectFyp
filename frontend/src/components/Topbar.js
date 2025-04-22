import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure this CSS file exists
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

function Navbar() {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  }


  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="btn logo">Thrifty Store</Link>
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="#">Categories</a></li>
      </ul>

      <div className="search-cart-auth">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="cart">
        <Link to="/" className="btn cart">🛒</Link>
      </div>

      {userInfo ? (
        <div className="user-info">
          <span className="welcome">Welcome, {userInfo.name}</span>
          <button onClick={logoutHandler} className="btn logout">Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/signup" className="btn signup">Signup</Link>
        </div>
      )}

      
    </nav>
  );
}

export default Navbar;