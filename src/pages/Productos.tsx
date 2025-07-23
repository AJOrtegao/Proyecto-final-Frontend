import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductosProps {
  products?: Product[] | null;
  addToCart: (product: Product) => void;
}

const Productos: React.FC<ProductosProps> = ({ products, addToCart }) => {
  const displayProducts = Array.isArray(products) && products.length > 0 ? products : [];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-primary">🧴 Nuestros Productos</h2>
      <Row>
        {displayProducts.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0 product-card">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="text-primary">{product.name}</Card.Title>
                  <Card.Text style={{ fontSize: '0.9rem' }}>{product.description}</Card.Text>
                </div>
                <div className="mt-3">
                  <h5 className="text-danger">${product.price.toFixed(2)}</h5>
                  <Button
                    variant="outline-success"
                    className="w-100 mt-2"
                    onClick={() => addToCart(product)}
                  >
                    Añadir al carrito 🛒
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productos;
