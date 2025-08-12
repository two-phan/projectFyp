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
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayNow');

  const submitHandler = (e) => {
    e.preventDefault();

    // Save full shipping info
    dispatch(saveShippingAddress({ email, phone, city, address, paymentMethod }));

    if (paymentMethod === 'PayNow') {
      navigate('/payment'); // Redirect to eSewa/Khalti payment page
    } else {
      navigate('/placeorder'); // Redirect to place order directly for COD
    }
  };

  return (
    <FormContainer>
      <h1>Shipping & Payment</h1>
      <Form onSubmit={submitHandler}>

        {/* Phone */}
        <Form.Group controlId='phone' className='mb-3'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        {/* City */}
        <Form.Group controlId='city' className='mb-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        {/* Address */}
        <Form.Group controlId='address' className='mb-3'>
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter shipping address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        {/* Payment Method */}
        <Form.Group controlId='paymentMethod' className='mb-4'>
          <Form.Label>Payment Method</Form.Label>
          <div>
            <Form.Check
              type='radio'
              label='Pay Now eSewa'
              id='PayNow'
              name='paymentMethod'
              value='PayNow'
              checked={paymentMethod === 'PayNow'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Cash on Delivery (COD)'
              id='COD'
              name='paymentMethod'
              value='COD'
              checked={paymentMethod === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
        </Form.Group>

        <Button type='submit' variant='primary'>
          {paymentMethod === 'PayNow' ? 'Proceed to Payment' : 'Place Order'}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
