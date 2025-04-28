import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { searchProducts } from "../actions/searchActions";
import myImage from "../pages/images/thriftlogo.jpeg";
import AdminDashboard from "../pages/AdminDashboard";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      dispatch(searchProducts(keyword));
    } else {
      navigate("/");
    }
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
            <Link to="/">
              <i class="fa-solid fa-house"></i>Home
            </Link>
          </li>
          <li>
            <Link to="/category">
              <i class="fa-solid fa-list"></i>Category
            </Link>
          </li>
          <li>
            <Link to="/rental">
              <i class="fa-solid fa-truck-ramp-box"></i>Rental
            </Link>
          </li>
          <li>
            <Link to="/contact">
            <i class="fa-solid fa-address-book"></i>Contact Us
            </Link>
          </li>
          <li>
          {userInfo && userInfo.isAdmin && (
          <Link to="/admin/dashboard"><i class="fa-solid fa-user-tie"></i>Admin</Link>
        )}
          </li>
        </ul>
        

        
      </div>

      <div className="navbar-right">
        <form onSubmit={submitHandler} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="search-button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <div className="action-buttons">
          <Link to="/rent" className="btn-cart">
            🛒 Rent
          </Link>
          <Link to="/cart" className="btn-cart">
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
                <i class="fa-solid fa-right-to-bracket"></i>Login
              </Link>
              <Link to="/signup" className="btn signup">
                <i class="fa-solid fa-user-plus"></i>Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
