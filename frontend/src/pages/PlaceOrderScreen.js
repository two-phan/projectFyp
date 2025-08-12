import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import './PlaceOrderScreen.css';  // Import vintage CSS

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [successMessage, setSuccessMessage] = React.useState('');

  const totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrderHandler = () => {
    const orderData = {
      email: cart.shippingAddress.email,
      phone: cart.shippingAddress.phone,
      city: cart.shippingAddress.city,
      shipping_address: cart.shippingAddress.shipping_address,
      payment_method: cart.shippingAddress.payment_method,
      total_price: totalPrice,
      items: cart.cartItems.map((item) => ({
        product_id: item.product, // assuming product id stored in cart item
        qty: item.qty,
        price: item.price,
      })),
    };

    dispatch(createOrder(orderData));

    setSuccessMessage('Order placed successfully!');
    setTimeout(() => {
      navigate('/orders'); // or an order confirmation page
    }, 2000);
  };

  return (
    <div className="placeorder-container">
      <h1>Place Order</h1>
      {successMessage && <Alert variant="success" className="vintage-alert">{successMessage}</Alert>}
      <Row>
        <Col md={7} className="placeorder-left">
          <ListGroup variant="flush">
            <ListGroup.Item className="vintage-list-group-item">
              <h2>Shipping</h2>
              <p><strong>Email:</strong> {cart.shippingAddress.email}</p>
              <p><strong>Phone:</strong> {cart.shippingAddress.phone}</p>
              <p><strong>Address:</strong> {cart.shippingAddress.shipping_address}, {cart.shippingAddress.city}</p>
            </ListGroup.Item>

            <ListGroup.Item className="vintage-list-group-item">
              <h2>Payment Method</h2>
              <p>{cart.shippingAddress.payment_method === 'esewa' ? 'eSewa' : 'Cash on Delivery'}</p>
            </ListGroup.Item>

            <ListGroup.Item className="vintage-list-group-item">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className="vintage-list-group-item order-item">
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded className="vintage-product-image" />
                        </Col>
                        <Col className="product-name">{item.name}</Col>
                        <Col md={4} className="product-price">
                          {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={5} className="placeorder-right">
          <Card className="vintage-card">
            <ListGroup variant="flush">
              <ListGroup.Item className="vintage-list-group-item summary-header">
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="vintage-list-group-item summary-total">
                <Row>
                  <Col>Total :</Col>
                  <Col>Rs.{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="vintage-list-group-item">
                <Button
                  type="button"
                  className="vintage-button"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Confirm & Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
