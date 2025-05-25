// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [rentals, setRentals] = useState([]);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const [statsRes, usersRes, productsRes, rentalsRes] = await Promise.all([
          axios.get('/api/admin/stats/', config),
          axios.get('/api/admin/users/', config),
          axios.get('/api/admin/products/', config),
          axios.get('/api/admin/rentals/', config),
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
        setRentals(rentalsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, [userInfo]);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark min-vh-100 p-3">
          <h4 className="text-white mb-4">Admin Panel</h4>
          <nav className="nav flex-column">
            <Link to="/admin/dashboard" className="nav-link text-white mb-2 active">Dashboard</Link>
            <Link to="/admin/users" className="nav-link text-white mb-2">Users</Link>
            <Link to="/admin/products" className="nav-link text-white mb-2">Products</Link>
            <Link to="/admin/orders" className="nav-link text-white mb-2">Orders</Link>
            <Link to="/admin/rentals" className="nav-link text-white mb-2">Rentals</Link>
            <Link to="/admin/contact" className="nav-link text-white mb-2">Contact Us</Link>
          </nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <h2 className="mb-4">Admin Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Stats */}
          <Row className="mb-4">
            {stats && (
              <>
                <Col md={3}><Card><Card.Body><Card.Title>Total Users</Card.Title><Card.Text className="display-6">{stats.users}</Card.Text></Card.Body></Card></Col>
                <Col md={3}><Card><Card.Body><Card.Title>Total Products</Card.Title><Card.Text className="display-6">{stats.products}</Card.Text></Card.Body></Card></Col>
                <Col md={3}><Card><Card.Body><Card.Title>Active Rentals</Card.Title><Card.Text className="display-6">{stats.activeRentals}</Card.Text></Card.Body></Card></Col>
                <Col md={3}><Card><Card.Body><Card.Title>Pending Orders</Card.Title><Card.Text className="display-6">{stats.pendingOrders}</Card.Text></Card.Body></Card></Col>
              </>
            )}
          </Row>

          {/* User Details */}
          <h4 className="mt-5">User Details</h4>
          <Row>
            {users.map((user) => (
              <Col md={4} key={user.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>Email: {user.email}</Card.Text>
                    <Card.Text>Admin: {user.is_staff ? 'Yes' : 'No'}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Product Details */}
          <h4 className="mt-5">Product Details</h4>
          <Row>
            {products.map((product) => (
              <Col md={4} key={product.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Card.Text>Category: {product.category}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Rental Details */}
          <h4 className="mt-5">Rental Details</h4>
          <Row>
            {rentals.map((rental) => (
              <Col md={4} key={rental.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Rental ID: {rental.id}</Card.Title>
                    <Card.Text>Status: {rental.status}</Card.Text>
                    <Card.Text>User ID: {rental.user}</Card.Text>
                    <Card.Text>Product: {rental.product}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
