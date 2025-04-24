import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productsActions";

function ProductScreen({params}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);

    const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`);
    }

  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>

        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.productname} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.productname}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Product Brand: {product.productbrand}
                </ListGroup.Item>
                <ListGroup.Item>
                  Product Category: {product.productcategory}
                </ListGroup.Item>
                <ListGroup.Item>Price: Rs {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.productdescription}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price} Rs</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                  <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs="auto" className="my-1">
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block btn-success"
                      disabled={product.countInStock === 0}
                      type="button" onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default ProductScreen;
