import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('esewa'); // Default to eSewa

  const submitHandler = (e) => {
    e.preventDefault();

    // Save full shipping info to Redux
    dispatch(
      saveShippingAddress({
        email,
        phone,
        city,
        shipping_address: shippingAddress, // match Django model field name
        payment_method: paymentMethod, // match backend choices
      })
    );

    if (paymentMethod === 'esewa') {
      navigate('/payment'); // Redirect to eSewa payment page
    } else {
      navigate('/placeorder'); // Redirect to place order directly for COD
    }
  };

  return (
    <FormContainer>
      <h1>Shipping & Payment</h1>
      <Form onSubmit={submitHandler}>
        {/* Email */}
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Phone */}
        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        {/* City */}
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        {/* Shipping Address */}
        <Form.Group controlId="shippingAddress" className="mb-3">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </Form.Group>

        {/* Payment Method */}
        <Form.Group controlId="paymentMethod" className="mb-4">
          <Form.Label>Payment Method</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Pay Now (eSewa)"
              id="esewa"
              name="paymentMethod"
              value="esewa"
              checked={paymentMethod === 'esewa'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Cash on Delivery (COD)"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
        </Form.Group>

        <Button type="submit" variant="primary">
          {paymentMethod === 'esewa' ? 'Proceed to Payment' : 'Place Order'}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
