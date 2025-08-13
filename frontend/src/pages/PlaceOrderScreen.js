import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';

function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector((state) => state.orderCreate);
    const { shippingAddress = {}, cartItems } = cart;
    const { loading, error, success, order } = orderCreate;

    const [successMessage, setSuccessMessage] = React.useState('');

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const placeOrderHandler = async () => {
        const orderData = {
            email: shippingAddress.email || '',
            phone: shippingAddress.phone || '',
            city: shippingAddress.city || '',
            shipping_address: shippingAddress.shipping_address || '',
            payment_method: shippingAddress.payment_method === 'PayNow' ? 'esewa' : shippingAddress.payment_method || 'cod',
            total_price: totalPrice,
            items: cartItems.map((item) => ({
                product_id: item.product,
                qty: item.qty,
                price: item.price,
            })),
        };

        const result = await dispatch(createOrder(orderData));

        if (result && orderData.payment_method === 'esewa') {
            navigate('/payment');
        } else if (result) {
            setSuccessMessage('Order placed successfully!');
            setTimeout(() => {
                navigate('/orders');
            }, 2000);
        }
    };

    return (
        <>
            <h1>Place Order</h1>
            {loading && <Alert variant="info">Processing...</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Email:</strong> {shippingAddress.email || 'Not provided'}
                            </p>
                            <p>
                                <strong>Phone:</strong> {shippingAddress.phone || 'Not provided'}
                            </p>
                            <p>
                                <strong>Address:</strong> {shippingAddress.shipping_address || 'Not provided'}, {shippingAddress.city || 'Not provided'}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>{shippingAddress.payment_method === 'esewa' ? 'eSewa' : shippingAddress.payment_method || 'Cash on Delivery'}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>{item.name}</Col>
                                                <Col md={4}>
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

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs.{totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0 || loading}
                                    onClick={placeOrderHandler}
                                >
                                    Confirm & Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default PlaceOrderScreen;