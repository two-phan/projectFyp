import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions'; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import Footer from '../components/Footer';
import './Cart.css';

function Cart() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div className="vintage-cart-page">
      <Container className="py-4">
        <Row>
          <Col md={8} className="mb-4">
            <div className="vintage-cart-header">
              <h1 className="vintage-cart-title">Your Vintage Collection</h1>
              <div className="vintage-divider"></div>
            </div>

            {cartItems.length === 0 ? (
              <Message variant="info" className="vintage-empty-cart">
                Your cart is empty <Link to="/" className="vintage-continue-shopping">Continue Exploring</Link>
              </Message>
            ) : (
              <ListGroup variant="flush" className="vintage-cart-list">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product} className="vintage-cart-item">
                    <Row className="align-items-center">
                      <Col md={2} className="vintage-cart-image-col">
                        <Image 
                          src={item.image} 
                          fluid 
                          rounded 
                          className="vintage-cart-image"
                        />
                      </Col>

                      <Col md={3} className="vintage-cart-name-col">
                        <Link 
                          to={`/product/${item.product}`} 
                          className="vintage-cart-product-name"
                        >
                          {item.name}
                        </Link>
                      </Col>

                      <Col md={2} className="vintage-cart-price-col">
                        <span className="vintage-cart-price">Rs {item.price}</span>
                      </Col>

                      <Col md={2} className="vintage-cart-qty-col">
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                          className="vintage-qty-selector"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={2} className="vintage-cart-remove-col">
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => removeFromCartHandler(item.product)}
                          className="vintage-remove-btn"
                        >
                          <i className="fas fa-trash vintage-trash-icon"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card className="vintage-summary-card">
              <ListGroup variant="flush">
                <ListGroup.Item className="vintage-summary-header">
                  <h2 className="vintage-summary-title">Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item className="vintage-summary-item">
                  <Row>
                    <Col>Items:</Col>
                    <Col className="text-right">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="vintage-summary-item">
                  <Row>
                    <Col>Subtotal:</Col>
                    <Col className="text-right">
                      <span className="vintage-subtotal">
                        Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="vintage-checkout-btn-container">
                  <Button
                    type="button"
                    className="vintage-checkout-btn"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Cart;