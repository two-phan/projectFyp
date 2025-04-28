import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Footer from '../components/Footer';
import './ContactUs.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'feedback',
    agreeToTerms: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.message) {
      setError('Email and message are required');
      return;
    }
    
    if (formData.inquiryType === 'sell' && !formData.phone) {
      setError('Phone number is required for selling inquiries');
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setError('');
  };

  if (submitted) {
    return (
      <div className="vintage-contact-page">
        <Container className="py-5 text-center">
          <h2 className="vintage-contact-title">Thank You!</h2>
          <p className="vintage-contact-text">
            We've received your {formData.inquiryType === 'sell' ? 'selling inquiry' : 'message'} and will get back to you soon.
          </p>
          <Button 
            variant="outline-secondary" 
            onClick={() => setSubmitted(false)}
            className="vintage-contact-btn"
          >
            Submit Another Inquiry
          </Button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="vintage-contact-page">
      <Container className="py-5">
        <h1 className="vintage-contact-title text-center mb-4">Contact Us</h1>
        
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit} className="vintage-contact-form">
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address*</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </Form.Group>

              <Form.Group controlId="formInquiryType" className="mb-3">
                <Form.Label>I'm contacting about...</Form.Label>
                <Form.Select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                >
                  <option value="feedback">General Feedback/Question</option>
                  <option value="sell">Selling My Clothes/Items</option>
                  <option value="rental">Rental Inquiry</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label>
                  {formData.inquiryType === 'sell' ? 'Tell us about the items you want to sell*' : 'Your Message*'}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    formData.inquiryType === 'sell' 
                      ? 'Please describe the items you want to sell (type, condition, quantity, etc.)' 
                      : 'Enter your message here'
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAgree" className="mb-4">
                <Form.Check
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  label="I agree to the Terms and Conditions and Privacy Policy"
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 vintage-submit-btn"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactPage;