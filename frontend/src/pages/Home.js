import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import Shop from "./Shop";
import Product from "../components/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import { listProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const {error, loading, products} = productsList;


  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Container>
        <br />
        <h1>Latest Products</h1>

        {loading ? ( 
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <h4></h4>
        )}

        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
