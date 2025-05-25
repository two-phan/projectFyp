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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ email, phone, city }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            required
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone' className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
