import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Topbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Productscreen from "./pages/Productscreen";
import Cart from "./pages/Cart";
import Category from "./pages/Category";



function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/product/:id" element={<Productscreen />} />

      </Routes>
    </Router>
  )
}

export default App;
