import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Product.css';
import Rating from './Rating';


function Product({product}) {
    return (
        <Card className="vintage-product-card my-3 p-3 rounded">
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} />
          </Link>
          <Card.Body>
            <Link to={`/product/${product._id}`} className='text-dark' >
              <Card.Title as="div">
                <h4>{product.productname}</h4>
              </Card.Title>
            </Link>
          </Card.Body>
          <Card.Text as="h5">Rs: {product.price}</Card.Text>
          <Rating 
          value={product.rating}
          color={"#f8e825"} />
          <Card.Text as="p">{product.productdescription}</Card.Text>
          
        </Card>
      );
    
}

export default Product