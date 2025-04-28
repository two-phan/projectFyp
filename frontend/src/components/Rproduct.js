import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Rproduct.css';

function Rental({rental}) {
    return (
        <Card className="vintage-rental-card">
          <span className="vintage-rental-badge">RENTAL</span>
          <Link to={`/rental/${rental._id}`}>
            <Card.Img src={rental.image} />
          </Link>
          <Card.Body>
            <Link to={`/rental/${rental._id}`} className='text-dark' >
              <Card.Title as="div">
                <h4>{rental.rentalname}</h4>
              </Card.Title>
            </Link>
          </Card.Body>
          <Card.Text as="h6">Rs: {rental.price}</Card.Text>
          <Card.Text as="p">{rental.rentaldescription}</Card.Text>
        </Card>
      );
    
}

export default Rental