import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="vintage-footer">
      <Container>
        <Row>
          
          <Col md={4} className="footer-section">
            <h5 className="footer-heading">About Thrifty Fifty</h5>
            <p className="footer-text">
              We brought you quality second-hand treasures with history and character. 
              Not just a store a community of like-minded individuals who appreciate the beauty of pre-loved items.
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

          <Col md={4} className="footer-section">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rental">Rental</Link></li>
              <li><Link to="/category">Category</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </Col>

    
          <Col md={4} className="footer-section">
            <h5 className="footer-heading">Contact Us</h5>
            <address className="footer-address">
              <p>For further inquiries contact us at the below number and email</p>
              <p>Phone: 9801234567</p>
              <p>Email: thriftyfifty@gmai.com</p>
            </address>
          </Col>
        </Row>

     
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