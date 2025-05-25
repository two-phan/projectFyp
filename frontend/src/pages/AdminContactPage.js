import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/admin/contact/', config);
        setContacts(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchContacts();
  }, [userInfo]);

  return (
    <Container className="p-4">
      <Link to="/admin/dashboard" className="btn btn-vintage-back">
          &larr; Back to Admin Panel
        </Link>
      <h2>Contact Inquiries</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {contacts.length === 0 ? (
          <Col>No contact inquiries found.</Col>
        ) : (
          contacts.map((contact) => (
            <Col md={6} key={contact.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{contact.name || 'Anonymous'}</Card.Title>
                  <Card.Text><strong>Email:</strong> {contact.email}</Card.Text>
                  <Card.Text><strong>Phone:</strong> {contact.phone || 'N/A'}</Card.Text>
                  <Card.Text><strong>Inquiry Type:</strong> {contact.inquiry_type}</Card.Text>
                  <Card.Text><strong>Message:</strong> {contact.message}</Card.Text>
                  <Card.Text><small>Submitted at: {new Date(contact.submitted_at).toLocaleString()}</small></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default AdminContactPage;
