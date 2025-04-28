// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/admin/stats', config);
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchStats();
  }, [userInfo]);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark min-vh-100 p-3">
          <h4 className="text-white mb-4">Admin Panel</h4>
          <nav className="nav flex-column">
            <Link to="/admin/dashboard" className="nav-link text-white mb-2 active">
              Dashboard
            </Link>
            <Link to="/admin/users" className="nav-link text-white mb-2">
              Users
            </Link>
            <Link to="/admin/products" className="nav-link text-white mb-2">
              Products
            </Link>
            <Link to="/admin/orders" className="nav-link text-white mb-2">
              Orders
            </Link>
            <Link to="/admin/rentals" className="nav-link text-white mb-2">
              Rentals
            </Link>
          </nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <h2 className="mb-4">Admin Dashboard</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="mb-4">
            {stats && (
              <>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total Users</Card.Title>
                      <Card.Text className="display-6">{stats.users}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total Products</Card.Title>
                      <Card.Text className="display-6">{stats.products}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Active Rentals</Card.Title>
                      <Card.Text className="display-6">{stats.activeRentals}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Pending Orders</Card.Title>
                      <Card.Text className="display-6">{stats.pendingOrders}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            )}
          </Row>

          {/* Recent Activity Section */}
          <Card className="mb-4">
            <Card.Header>Recent Activity</Card.Header>
            <Card.Body>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {/* You would map through recent activities here */}
                  <tr>
                    <td>2023-05-15</td>
                    <td>New product added</td>
                    <td>admin@example.com</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;