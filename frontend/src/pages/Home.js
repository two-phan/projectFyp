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
        {/* Carousel Section */}
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
              src="https://img.freepik.com/premium-vector/hand-drawn-thrift-store-illustration_23-2150066313.jpg"
              alt="Second slide"
            />
         
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://tse2.mm.bing.net/th/id/OIP.6Phkd3oouTo8skPPGrwBLwHaE8?w=826&h=551&rs=1&pid=ImgDetMain"
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
