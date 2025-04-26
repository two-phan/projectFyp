import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import myImage from "../pages/images/thriftlogo.jpeg";

function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={myImage} alt="Thrift Store Logo" className="logo-img" />
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
          <li>
            <Link to="/rental">Rental</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <input type="text" placeholder="Search..." className="search-bar" />
        
        <div className="action-buttons">
          <Link to="/cart" className="btn cart">
            🛒 Cart
          </Link>

          {userInfo ? (
            <div className="user-info">
              <span className="welcome">Welcome, {userInfo.name}</span>
              <button onClick={logoutHandler} className="btn logout">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn login">
                Login
              </Link>
              <Link to="/signup" className="btn signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;