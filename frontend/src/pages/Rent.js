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
import { addToRentalCart, removeFromRentalCart } from '../actions/rentalCartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Footer from '../components/Footer';
import './Rent.css';

function Rent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const rentalId = id;
  const duration = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const rentalCart = useSelector((state) => state.rentalCart);
  const { rentalItems } = rentalCart;

  useEffect(() => {
    if(rentalId) {
      dispatch(addToRentalCart(rentalId, duration));
    }
  }, [dispatch, rentalId, duration]);

  const removeFromRentalCartHandler = (id) => {
    dispatch(removeFromRentalCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=rental/shipping");
  };

  return (
    <div className="vintage-rent-page">
      <Container className="py-4">
        <Row>
          <Col md={8} className="mb-4">
            <div className="vintage-rent-header">
              <h1 className="vintage-rent-title">Your Rental Collection</h1>
              <div className="vintage-divider"></div>
            </div>

            {rentalItems.length === 0 ? (
              <Message variant="info" className="vintage-empty-rent">
                Your rental cart is empty <Link to="/rental" className="vintage-continue-browsing">Continue Browsing</Link>
              </Message>
            ) : (
              <ListGroup variant="flush" className="vintage-rent-list">
                {rentalItems.map((item) => (
                  <ListGroup.Item key={item.rental} className="vintage-rent-item">
                    <Row className="align-items-center">
                      <Col md={2} className="vintage-rent-image-col">
                        <Image 
                          src={item.image} 
                          fluid 
                          rounded 
                          className="vintage-rent-image"
                        />
                      </Col>

                      <Col md={3} className="vintage-rent-name-col">
                        <Link 
                          to={`/rental/${item.rental}`} 
                          className="vintage-rent-product-name"
                        >
                          {item.name}
                        </Link>
                      </Col>

                      <Col md={2} className="vintage-rent-price-col">
                        <span className="vintage-rent-price">Rs {item.price}/day</span>
                      </Col>

                      <Col md={2} className="vintage-rent-duration-col">
                        <Form.Control
                          as="select"
                          value={item.duration}
                          onChange={(e) => dispatch(addToRentalCart(item.rental, Number(e.target.value)))}
                          className="vintage-duration-selector"
                        >
                          {[...Array(30).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1} days
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={2} className="vintage-rent-total-col">
                        <span className="vintage-rent-total">Rs {(item.price * item.duration).toFixed(2)}</span>
                      </Col>

                      <Col md={1} className="vintage-rent-remove-col">
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => removeFromRentalCartHandler(item.rental)}
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
                  <h2 className="vintage-summary-title">Rental Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item className="vintage-summary-item">
                  <Row>
                    <Col>Items:</Col>
                    <Col className="text-right">
                      {rentalItems.reduce((acc, item) => acc + 1, 0)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="vintage-summary-item">
                  <Row>
                    <Col>Total Days:</Col>
                    <Col className="text-right">
                      {rentalItems.reduce((acc, item) => acc + item.duration, 0)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="vintage-summary-item">
                  <Row>
                    <Col>Total:</Col>
                    <Col className="text-right">
                      <span className="vintage-subtotal">
                        Rs {rentalItems.reduce((acc, item) => acc + (item.duration * item.price), 0).toFixed(2)}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="vintage-checkout-btn-container">
                  <Button
                    type="button"
                    className="vintage-checkout-btn"
                    disabled={rentalItems.length === 0}
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

export default Rent;