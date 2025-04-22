import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {Row,Col,Image,ListGroup,Button,Card,Container,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productsActions";

function ProductScreen({ params }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  

  // useEffect(() => {
  //   dispatch(listProductDetails(id));
  // }, [dispatch,params,id]);
 


  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
        

        <Row>
          <Col md={4}>
            <Image src={product.image} alt={product.productname} fluid />
          </Col>
          <Col md={3}>
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

          <Col md={3}>
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
                <ListGroup.Item>
                  <Button
                    className="btn-block btn-success"
                    disabled={product.countInStock === 0}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProductScreen;
