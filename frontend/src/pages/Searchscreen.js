// SearchScreen.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchProducts } from "../actions/searchActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Product from "../components/Product";
import "./Searchscreen.css"; // Import your CSS file for styling

function SearchScreen() {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productSearch = useSelector((state) => state.productSearch);
  const { loading, error, products } = productSearch;

  useEffect(() => {
    dispatch(searchProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="search-screen vintage-theme">
      <h2 className="search-title">Search Results for "{keyword}"</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="products-grid vintage-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <Message className="vintage-message">No products found</Message>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchScreen;