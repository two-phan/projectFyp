// import React, { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Row, Col, ListGroup, Container } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { listCategories, listCategoryProducts } from "../actions/categoryActions";
// import Product from "../components/Product";
// import Message from "../components/Message";
// import Loader from "../components/Loader";

// function Category() {
//   const { category } = useParams();
//   const dispatch = useDispatch();

//   // Safely get categoryList state with default values
//   const categoryList = useSelector((state) => state.categoryList || {});
//   const { 
//     loading: loadingCategories = true, 
//     error: errorCategories = null, 
//     categories = [] 
//   } = categoryList;

//   // Safely get categoryProducts state with default values
//   const categoryProducts = useSelector((state) => state.categoryProducts || {});
//   const { 
//     loading: loadingProducts = true, 
//     error: errorProducts = null, 
//     products = [] 
//   } = categoryProducts;

//   useEffect(() => {
//     dispatch(listCategories());
//     dispatch(listCategoryProducts(category || 'all'));
//   }, [dispatch, category]);

//   return (
//     <Container className="py-4">
//       <Row>
//         {/* Categories Sidebar */}
//         <Col md={3} className="mb-4">
//           <h3 className="border-bottom pb-2">Shop By Category</h3>
//           {loadingCategories ? (
//             <Loader />
//           ) : errorCategories ? (
//             <Message variant="danger">{errorCategories}</Message>
//           ) : (
//             <ListGroup variant="flush">
//               <ListGroup.Item
//                 as={Link}
//                 to="/category/all"
//                 action
//                 active={!category || category === "all"}
//                 className="rounded my-1"
//               >
//                 <strong>All Categories</strong>
//               </ListGroup.Item>
              
//               {categories.map((cat) => (
//                 <ListGroup.Item
//                   key={cat._id || cat}
//                   as={Link}
//                   to={`/category/${cat.slug || cat}`}
//                   action
//                   active={category === (cat.slug || cat)}
//                   className="rounded my-1"
//                 >
//                   {cat.name || cat}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Col>

//         {/* Products Display */}
//         <Col md={9}>
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h2 className="mb-0">
//               {!category || category === "all" 
//                 ? "All Products" 
//                 : categories.find(c => (c.slug || c) === category)?.name || category}
//             </h2>
//             {!loadingProducts && (
//               <small className="text-muted">
//                 Showing {products.length} products
//               </small>
//             )}
//           </div>

//           {loadingProducts ? (
//             <Loader />
//           ) : errorProducts ? (
//             <Message variant="danger">{errorProducts}</Message>
//           ) : products.length === 0 ? (
//             <Message variant="info">No products found in this category</Message>
//           ) : (
//             <Row>
//               {products.map((product) => (
//                 <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
//                   <Product product={product} />
//                 </Col>
//               ))}
//             </Row>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Category;