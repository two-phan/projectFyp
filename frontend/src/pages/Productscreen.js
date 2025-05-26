import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productsActions";
import Footer from "../components/Footer";
import "./Productscreen.css";
import Rating from "../components/Rating";

function ProductScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="vintage-product-screen">
      <Container className="py-4">
        <Link to="/" className="btn btn-vintage-outline mb-4">
          &larr; Back to Shop
        </Link>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="secondary" />
            <p className="mt-3 vintage-loading-text">
              Loading Vintage Treasures...
            </p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="vintage-alert">
            {error}
          </Alert>
        ) : (
          <Row className="vintage-product-container">
            <Col md={5} className="mb-4">
              <div className="vintage-image-container">
                <Image
                  src={product.image}
                  alt={product.productname}
                  fluid
                  className="vintage-product-image"
                />
                <div className="vintage-image-frame"></div>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="vintage-details-card">
                <ListGroup variant="flush">
                  <ListGroup.Item className="vintage-list-item">
                    <h2 className="vintage-product-title">
                      {product.productname}
                    </h2>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-list-item">
                    <p className="vintage-detail-label">Brand:</p>
                    <p className="vintage-detail-value">
                      {product.productbrand}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-list-item">
                    <p className="vintage-detail-label">Category:</p>
                    <p className="vintage-detail-value">
                      {product.productcategory}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-list-item">
                    <p className="vintage-detail-label">Description:</p>
                    <p className="vintage-product-description">
                      {product.productdescription}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-list-rating">
                    <p className="vintage-detail-label">
                      Rating:<Rating value={product.rating} color={"#f8e825"} />  
                    </p>
                    
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="vintage-purchase-card">
                <ListGroup variant="flush">
                  <ListGroup.Item className="vintage-list-item">
                    <Row>
                      <Col>
                        <p className="vintage-price-label">Price:</p>
                      </Col>
                      <Col className="text-right">
                        <strong className="vintage-price">
                          Rs {product.price}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-list-item">
                    <Row>
                      <Col>
                        <p className="vintage-stock-label">Status:</p>
                      </Col>
                      <Col className="text-right">
                        <span
                          className={`vintage-stock-status ${
                            product.countInStock > 0
                              ? "in-stock"
                              : "out-of-stock"
                          }`}
                        >
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="vintage-list-item">
                      <Row className="align-items-center">
                        <Col>
                          <p className="vintage-qty-label">Quantity:</p>
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="vintage-qty-select"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="vintage-list-item">
                    <Button
                      className="w-100 vintage-add-to-cart-btn"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      {product.countInStock > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default ProductScreen;
