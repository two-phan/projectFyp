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
  Spinner
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listRentalDetails } from "../actions/rentalActions";
import Footer from "../components/Footer";
import "./Rentalscreen.css";

function RentalScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [duration, setDuration] = useState(1); 
  const dispatch = useDispatch();
  
  const rentalDetails = useSelector((state) => state.rentalDetails);
  const { error = null, loading = false, rental = {} } = rentalDetails || {};

  useEffect(() => {
    dispatch(listRentalDetails(id));
  }, [dispatch, id]);

  const rentNowHandler = () => {
    navigate(`/rent/${id}?duration=${duration}`);
  };

  return (
    <div className="vintage-rental-screen">
      <Container className="vintage-rental-container">
        <Link to="/rental" className="btn btn-vintage-back">Go Back
        </Link>

        {loading ? (
          <div className="vintage-loading">
            <Spinner animation="border" variant="secondary" />
            <p className="mt-3 vintage-loading-text">Loading Vintage Treasures...</p>
          </div>
        ) : error ? (
          <div className="vintage-error">
            <p>{error}</p>
          </div>
        ) : (
          <Row>
            <Col md={4}>
              <div className="vintage-rental-image-container">
                <Image 
                  src={rental.image} 
                  alt={rental.rentalname} 
                  fluid 
                  className="vintage-rental-image"
                />
                <div className="vintage-image-frame"></div>
              </div>
            </Col>
            
            <Col md={4}>
              <Card className="vintage-rental-details">
                <ListGroup variant="flush">
                  <ListGroup.Item className="vintage-rental-list-item">
                    <h3 className="vintage-rental-title">{rental.rentalname}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-rental-list-item">
                    <p className="vintage-rental-label">Brand:</p>
                    <p className="vintage-rental-value">{rental.rentalbrand}</p>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-rental-list-item">
                    <p className="vintage-rental-label">Category:</p>
                    <p className="vintage-rental-value">{rental.rentalcategory}</p>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-rental-list-item">
                    <p className="vintage-rental-label">Daily Rate:</p>
                    <p className="vintage-rental-value">Rs {rental.price}</p>
                  </ListGroup.Item>
                  <ListGroup.Item className="vintage-rental-list-item">
                    <p className="vintage-rental-label">Description:</p>
                    <p className="vintage-rental-description">{rental.rentaldescription}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="vintage-rental-card">
                <ListGroup variant="flush">
                  <ListGroup.Item className="vintage-rental-list-item">
                    <Row>
                      <Col>
                        <p className="vintage-summary-label">Daily Rate:</p>
                      </Col>
                      <Col className="text-right">
                        <strong className="vintage-daily-rate">Rs {rental.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="vintage-rental-list-item">
                    <Row>
                      <Col>
                        <p className="vintage-summary-label">Status:</p>
                      </Col>
                      <Col className="text-right">
                        <span className={`vintage-availability ${rental.countInStock ? 'vintage-available' : 'vintage-unavailable'}`}>
                          {rental.countInStock > 0 ? "Available" : "Unavailable"}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  

                  {rental.isAvailable && (
                    <ListGroup.Item className="vintage-rental-list-item">
                      <Row>
                        <Col>
                          <p className="vintage-summary-label">Rental Duration (days)</p>
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="vintage-duration-select"
                          >
                            {[...Array(30).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="vintage-rental-list-item">
                    <Button
                      className="vintage-rent-now-btn"
                      disabled={rental.countInStock === 0}
                      onClick={rentNowHandler}
                    >
                      {rental.countInStock > 0 ? "Rent Now" : "Unavailable"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer className="vintage-footer" />
    </div>
  );
}

export default RentalScreen;