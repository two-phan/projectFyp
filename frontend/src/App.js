import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Topbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Productscreen from "./pages/Productscreen";
import Cart from "./pages/Cart";
import Category from "./pages/Category";

import Rentalpage from "./pages/Rental";
import Rentalscreen from "./pages/Rentalscreen";


function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/product/:id" element={<Productscreen />} />
        <Route path="/rental" element={<Rentalpage />} />
        <Route path="/rental/:id" element={<Rentalscreen />} />

      </Routes>
    </Router>
  )
}

export default App;
