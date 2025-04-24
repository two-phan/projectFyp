import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {Row,Col,Image,ListGroup,Button,Card,Container,Form,} from "react-bootstrap";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions'; 
import { useDispatch, useSelector } from 'react-redux';

function Cart(params) {
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const productId = id
    const qty = location.search ? Number(location.search.split("=")[1]) : 1
    console.log(productId,qty)
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart


    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping")
    }


  return (
    <>

    <Row>
        <Col md={8}>
            <h1>Cart Items</h1>
            {cartItems.length === 0 ? (
                <Message variant="info">
                    Your cart is empty <Link to="/">Go Back</Link>
                </Message>
            ) : (
                <Container>
                <ListGroup variant="flush">
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image}  fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>Rs {item.price}</Col>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                </Container>
            )}
        </Col>

        <Col md={4}>
            <Card className="mt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2> 
                        Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    
    </>
  )
}

export default Cart