import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listRentals } from "../actions/rentalActions";
import Rental from "../components/Rproduct";
import Footer from "../components/Footer";

function Rentalpage() {
  const dispatch = useDispatch();
  const rentalList = useSelector((state) => state.rentalList);
  
  const { error = null, loading = false, rentals = [] } = rentalList || {};

  useEffect(() => {
    dispatch(listRentals());
  }, [dispatch]);

  return (
    <>
     <Container>
      <br />
      <h1>Rental Products</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        
        <Row>
          {rentals.map((rental) => (
            <Col key={rental._id} sm={12} md={6} lg={4} xl={3}>
              <Rental rental={rental} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
    <Footer />
    </>
   
  );
}

export default Rentalpage;