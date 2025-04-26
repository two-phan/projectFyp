import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="vintage-footer">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4} className="footer-section">
            <h5 className="footer-heading">About Thrifty Fifty</h5>
            <p className="footer-text">
              We brought you quality second-hand treasures with history and character. 
              Thrifty Fifty is not just a store; it's a community of like-minded individuals who appreciate the beauty of pre-loved items.
            </p>
            <div className="footer-social">
                <Link to="/"><i className="fa-brands fa-facebook">Facebook</i></Link>
                <br />
                <Link to="/"><i className="fa-brands fa-instagram">Instagram</i></Link>
                <br />
                <Link to="/"><i className="fa-brands fa-twitter">Twitter</i></Link>    
                <br />          
                <Link to="/"><i className="fa-brands fa-snapchat">Snapchat</i></Link>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="footer-section">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rental">Rental</Link></li>
              <li><Link to="/category">Category</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4} className="footer-section">
            <h5 className="footer-heading">Visit Us</h5>
            <address className="footer-address">
              <p>Pokhara ACD complex</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@thriftyfifty.com</p>
            </address>
            <div className="business-hours">
              <p>Mon-Fri: 10am - 7pm</p>
              <p>Sat-Sun: 9am - 8pm</p>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col className="text-center copyright">
            <p>&copy; {new Date().getFullYear()} Thrifty Store. All Rights Reserved.</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link> | 
              <Link to="/terms">Terms of Service</Link> | 
              <Link to="/returns">Returns Policy</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;