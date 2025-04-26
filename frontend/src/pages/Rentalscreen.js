import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import { listRentalDetails } from "../actions/rentalActions";
import Footer from "../components/Footer";

function RentalScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [duration, setDuration] = useState(1); 
  const dispatch = useDispatch();
  
//   const rentalDetails = useSelector((state) => state.rentalDetails);
//   const { error, loading, rental } = rentalDetails;
//   const rentalDetails = useSelector((state) => state.rentalDetails || {});
//   const { error = null, loading = false, rental = {} } = rentalDetails;
const rentalDetails = useSelector((state) => state.rentalDetails);
const { error = null, loading = false, rental = {} } = rentalDetails || {};



  useEffect(() => {
    dispatch(listRentalDetails(id));
  }, [dispatch, id]);

  const rentNowHandler = () => {
    navigate(`/rent/${id}?duration=${duration}`);
  };

  return (
    <>
    <Container>
      <div>
        <Link to="/rental" className="btn btn-dark my-3">
          Go Back
        </Link>

        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Row>
            <Col md={4}>
              <Image src={rental.image} alt={rental.rentalname} fluid />
            </Col>
            
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{rental.rentalname}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Brand: {rental.rentalbrand}
                </ListGroup.Item>
                <ListGroup.Item>
                  Category: {rental.rentalcategory}
                </ListGroup.Item>
                <ListGroup.Item>
                  Daily Rate: Rs {rental.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {rental.rentaldescription}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Daily Rate:</Col>
                      <Col>
                        <strong>{rental.price} Rs</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {rental.isAvailable ? "Available" : "Not Available"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {rental.isAvailable && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Rental Duration (days)</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          >
                            {[...Array(30).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block btn-primary"
                      disabled={!rental.isAvailable}
                      type="button"
                      onClick={rentNowHandler}
                    >
                      Rent Now
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Container>
    <Footer />
    </>
  );
}

export default RentalScreen;