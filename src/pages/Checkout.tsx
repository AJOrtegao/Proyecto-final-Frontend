import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Checkout: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !address || !paymentMethod) {
      alert('Por favor, completa todos los campos y selecciona un método de pago.');
      return;
    }

    // Aquí luego puedes enviar los datos a tu backend NestJS
    console.log("Datos de compra:", { name, address, paymentMethod });

    setSuccess(true);
    setTimeout(() => {
      alert(`✅ Compra realizada por ${name}, con el método de pago: ${paymentMethod}`);
    }, 300);
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h2>🛍️ Confirmación de Compra</h2>
      <p>Por favor, completa tus datos antes de finalizar el pago.</p>

      {success && (
        <Alert variant="success">
          ¡Compra confirmada! Gracias por tu pedido.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mt-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress" className="mt-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPaymentMethod" className="mt-3">
          <Form.Label>Método de Pago</Form.Label>
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Tarjeta de Crédito</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Pago contra entrega</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className="mt-4 w-100"
        >
          Confirmar Compra
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
