import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCategories, listCategoryProducts } from "../actions/categoryActions";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "./Category.css";

function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();

  // Define your static categories based on your Django model choices
  const staticCategories = [
    { slug: 'shirts', name: 'Shirts' },
    { slug: 'jackets', name: 'Jackets' },
    { slug: 'bags', name: 'Bags' },
    { slug: 'shoes', name: 'Shoes' },
    { slug: 'others', name: 'Others' },
  ];

  // Safely get categoryProducts state with default values
  const categoryProducts = useSelector((state) => state.categoryProducts || {});
  const { 
    loading: loadingProducts, 
    error: errorProducts, 
    products = [] 
  } = categoryProducts;

  useEffect(() => {
    dispatch(listCategoryProducts(category || 'all'));
  }, [dispatch, category]);

  // Find the current category name
  const currentCategory = staticCategories.find(c => c.slug === category)?.name || category;

  return (
    <div className="vintage-category-page">
      <Container className="py-4">
        <Row>
          {/* Categories Sidebar */}
          <Col md={3} className="mb-4">
            <div className="vintage-sidebar">
              <h3 className="vintage-sidebar-title">Shop By Category</h3>
              <ListGroup variant="flush" className="vintage-category-list">
                <ListGroup.Item
                  as={Link}
                  to="/category/all"
                  action
                  active={!category || category === "all"}
                  className="vintage-category-item"
                >
                  <span className="vintage-category-name">All Categories</span>
                </ListGroup.Item>
                
                {staticCategories.map((cat) => (
                  <ListGroup.Item
                    key={cat.slug}
                    as={Link}
                    to={`/category/${cat.slug}`}
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

          {/* Products Display */}
          <Col md={9}>
            <div className="vintage-products-header">
              <h2 className="vintage-products-title">
                {!category || category === "all" 
                  ? "All Vintage Treasures" 
                  : currentCategory}
              </h2>
              {!loadingProducts && (
                <span className="vintage-products-count">
                  Showing {products.length} {products.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            {loadingProducts ? (
              <div className="vintage-loading-container">
                <Loader />
                <p className="vintage-loading-text">Discovering vintage treasures...</p>
              </div>
            ) : errorProducts ? (
              <Message variant="danger">{errorProducts}</Message>
            ) : products.length === 0 ? (
              <div className="vintage-no-products">
                <Message variant="info">No vintage items found in this category</Message>
                <Link to="/category/all" className="btn btn-vintage-outline mt-3">
                  Browse All Items
                </Link>
              </div>
            ) : (
              <Row className="vintage-products-row">
                {products.map((product) => (
                  <Col key={product._id} lg={4} md={6} className="vintage-product-col">
                    <Product product={product} />
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

export default Category;