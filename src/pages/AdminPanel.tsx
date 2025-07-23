import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formState, setFormState] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') navigate('/');
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const openModalToAdd = () => {
    setEditingProduct(null);
    setFormState({ name: '', description: '', price: 0, image: '' });
    setShowModal(true);
  };

  const openModalToEdit = (product: Product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        // Editar
        const updated = await API.put(`/products/${editingProduct.id}`, formState);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updated.data : p))
        );
      } else {
        // Crear
        const created = await API.post('/products', formState);
        setProducts((prev) => [...prev, created.data]);
      }
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛠️ Panel de Administración</h2>
      <Button variant="success" onClick={openModalToAdd}>
        ➕ Agregar Producto
      </Button>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} width="80" height="60" />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openModalToEdit(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={formState.price}
                onChange={(e) => setFormState({ ...formState, price: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                value={formState.image}
                onChange={(e) => setFormState({ ...formState, image: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingProduct ? 'Guardar Cambios' : 'Guardar Producto'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
