import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Topbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Productscreen from "./pages/Productscreen";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Rental from "./components/Rproduct";
import Rentalpage from "./pages/Rental";
import Rentalscreen from "./pages/Rentalscreen";
import SearchScreen from "./pages/Searchscreen";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Rent from "./pages/Rent";
import ContactPage from "./pages/ContactUs";
import ShippingScreen from './pages/ShippingScreen';



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
        <Route path="/search/:keyword" Component={SearchScreen} />
        <Route path="/rent/:id" element={<Rent />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/category/all" element={<Category />} />
        <Route path="/rental/:category" element={<Rental />} />
        <Route path="/rental/all" element={<Rental />} />
        <Route path="/" element={<Category />} />
        <Route path='/login/shipping' element={<ShippingScreen />} />      
        </Routes>
    </Router>
  );
}

export default App;
