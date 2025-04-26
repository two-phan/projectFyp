import React from "react";
import { Container, Row, Col, Card, ListGroup, Button, Image, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer";
// import "./RentalConfirmationScreen.css";

function RentalConfirmationScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rental, duration, totalPrice, startDate, endDate, confirmationNumber } = location.state || {};

  // If no state was passed, redirect back
  if (!location.state) {
    navigate("/rental");
    return null;
  }

  return (
    <div className="vintage-confirmation-screen">
      <Container className="vintage-confirmation-container">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="vintage-confirmation-card">
              <Card.Header className="vintage-confirmation-header">
                <FaCheckCircle className="text-success me-2" size={24} />
                <h2 className="d-inline-block mb-0">Rental Confirmed!</h2>
              </Card.Header>
              
              <Card.Body>
                <Alert variant="success" className="vintage-confirmation-alert">
                  <p className="mb-0">Your rental is confirmed. We've sent the details to your email.</p>
                </Alert>

                <Row className="mb-4">
                  <Col md={4}>
                    <Image src={rental.image} alt={rental.rentalname} fluid className="vintage-confirmation-image" />
                  </Col>
                  <Col md={8}>
                    <h3 className="vintage-rental-name">{rental.rentalname}</h3>
                    <p className="vintage-rental-brand">{rental.rentalbrand}</p>
                    
                    <div className="vintage-rental-dates">
                      <p><FaCalendarAlt className="me-2" /> <strong>Rental Period:</strong></p>
                      <p>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</p>
                      <p>({duration} day{duration > 1 ? 's' : ''})</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Card className="vintage-details-card mb-4">
                      <Card.Header className="vintage-details-header">
                        Rental Summary
                      </Card.Header>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex justify-content-between">
                          <span>Daily Rate:</span>
                          <span>Rs {rental.price}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between">
                          <span>Duration:</span>
                          <span>{duration} day{duration > 1 ? 's' : ''}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between vintage-total-item">
                          <strong>Total:</strong>
                          <strong>Rs {totalPrice}</strong>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  
                  <Col md={6}>
                    <Card className="vintage-pickup-card mb-4">
                      <Card.Header className="vintage-details-header">
                        Pickup Information
                      </Card.Header>
                      <Card.Body>
                        <p><FaMapMarkerAlt className="me-2" /> <strong>Location:</strong></p>
                        <p>123 Vintage Lane, Colombo 05, Sri Lanka</p>
                        
                        <p><FaCalendarAlt className="me-2" /> <strong>Pickup Date:</strong></p>
                        <p>{new Date(startDate).toLocaleDateString()} at 10:00 AM</p>
                        
                        <p><FaPhone className="me-2" /> <strong>Contact:</strong></p>
                        <p>+94 76 123 4567</p>
                        <p><FaEnvelope className="me-2" /> vintage@rentals.com</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <div className="vintage-next-steps">
                  <h4 className="vintage-next-steps-title">Next Steps</h4>
                  <ol className="vintage-steps-list">
                    <li>Bring your confirmation number and ID when picking up</li>
                    <li>Inspect the item with our staff before leaving</li>
                    <li>Return the item by {new Date(endDate).toLocaleDateString()} before 6:00 PM</li>
                  </ol>
                </div>

                <div className="vintage-confirmation-actions mt-4">
                  <Button variant="outline-primary" className="me-3" as={Link} to="/rental">
                    Browse More Rentals
                  </Button>
                  <Button variant="primary" as={Link} to="/account/rentals">
                    View My Rentals
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer className="vintage-footer" />
    </div>
  );
}

export default RentalConfirmationScreen;