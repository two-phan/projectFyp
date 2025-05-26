import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listRentals, listRentalCategories } from "../actions/rentalActions";
import Rental from "../components/Rproduct";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "./Rental.css";

function Rentalpage() {
  const { category } = useParams();
  const dispatch = useDispatch();

  // Define your static rental categories
  const staticRentalCategories = [
    { slug: 'costumes', name: 'Costumes' },
    { slug: 'props', name: 'Props' },
    { slug: 'jackets', name: 'Jackets' },
    { slug: 'shoes', name: 'Shoes' },
    { slug: 'womens Wear', name: 'Womens Wear' },
    { slug: 'other', name: 'Other Rentals' },
  ];

  const rentalList = useSelector((state) => state.rentalList || {});
  const { 
    loading: loadingRentals, 
    error: errorRentals, 
    rentals = [] 
  } = rentalList;

  useEffect(() => {
    dispatch(listRentals(category || 'all'));
  }, [dispatch, category]);

  // Find the current category name
  const currentCategory = staticRentalCategories.find(c => c.slug === category)?.name || category;

  return (
    <div className="vintage-rental-page">
      <Container className="py-4">
        <Row>
          <Col md={3} className="mb-4">
            <div className="vintage-sidebar">
              <h3 className="vintage-sidebar-title">Rental Categories</h3>
              <ListGroup variant="flush" className="vintage-category-list">
                <ListGroup.Item
                  as={Link}
                  to="/rentals/all"
                  action
                  active={!category || category === "all"}
                  className="vintage-category-item"
                >
                  <span className="vintage-category-name">All Rentals</span>
                </ListGroup.Item>
                
                {staticRentalCategories.map((cat) => (
                  <ListGroup.Item
                    key={cat.slug}
                    as={Link}
                    to={`/rentals/${cat.slug}`}
                    action
                    active={category === cat.slug}
                    className="vintage-category-item"
                  >
                    <span className="vintage-category-name">{cat.name}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col md={9}>
            <div className="vintage-products-header">
              <h2 className="vintage-products-title">
                {!category || category === "all" 
                  ? "All Rental Items" 
                  : currentCategory}
              </h2>
              {!loadingRentals && (
                <span className="vintage-products-count">
                  Showing {rentals.length} {rentals.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            {loadingRentals ? (
              <div className="vintage-loading-container">
                <Loader />
                <p className="vintage-loading-text">Discovering rental items...</p>
              </div>
            ) : errorRentals ? (
              <Message variant="danger">{errorRentals}</Message>
            ) : rentals.length === 0 ? (
              <div className="vintage-no-products">
                <Message variant="info">No rental items found in this category</Message>
                <Link to="/rentals/all" className="btn btn-vintage-outline mt-3">
                  Browse All Rentals
                </Link>
              </div>
            ) : (
              <Row className="vintage-products-row">
                {rentals.map((rental) => (
                  <Col key={rental._id} lg={4} md={6} className="vintage-product-col">
                    <Rental rental={rental} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Rentalpage;