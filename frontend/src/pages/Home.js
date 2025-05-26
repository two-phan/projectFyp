import React, { useState, useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import Product from "../components/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import { listProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import './Home.css';
import Footer from "../components/Footer";
import image1 from "../pages/images/carousel1.jpg";
import image2 from "../pages/images/carousel2.jpg";
import image3 from "../pages/images/carousel3.jpg";



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
        <Carousel className="mb-4">
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src={image1}
              alt="First slide"
            />
            
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src={image2}
              alt="Second slide"
            />
         
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src={image3}
              alt="Third slide"
            />
           
          </Carousel.Item>
        </Carousel>
        
        <br />
        <h1>Latest Products</h1>

        {loading ? ( 
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          

        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
                )}

      </Container>
      <Footer />
    </>
  );
}

export default Home;
