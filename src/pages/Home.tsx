import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <Container>
          <h1 style={styles.title}>Bienvenido a FarmaThony 💊</h1>
          <p style={styles.subtitle}>
            Tu farmacia online de confianza. Compra segura, rápida y con productos de calidad garantizada.
          </p>
          <Link to="/productos">
            <Button variant="light" style={styles.cta}>Ver Productos</Button>
          </Link>
        </Container>
      </div>

      <Container className="mt-5">
        <h2 className="text-center mb-4">¿Por qué elegirnos?</h2>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card style={styles.card}>
                <Card.Body>
                  <Card.Title>{feature.icon} {feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f1faee',
    minHeight: '100vh',
  },
  hero: {
    backgroundColor: '#6a0572',
    color: 'white',
    padding: '60px 0',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginTop: '15px',
    marginBottom: '30px',
  },
  cta: {
    fontSize: '1.1rem',
    backgroundColor: '#e63946',
    color: '#fff',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '5px',
  },
  card: {
    height: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
};

const features = [
  {
    icon: '🚚',
    title: 'Envío rápido',
    description: 'Recibe tus productos en menos de 48 horas a cualquier parte del país.',
  },
  {
    icon: '🛡️',
    title: 'Compra segura',
    description: 'Tus datos están protegidos y tu compra garantizada con métodos seguros.',
  },
  {
    icon: '🧾',
    title: 'Facturación inmediata',
    description: 'Generamos tu factura electrónica automáticamente tras tu compra.',
  },
];

export default Home;
