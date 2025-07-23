import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/user.slice';
import logo from './assets/images/logo-farmathony.png'; 

export default function NavigationBar() {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    setRole(storedRole);
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/login');
    window.location.reload(); // Forzar re-render del navbar
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <NavLink to="/" className={({ isActive }) => isActive ? 'navbar-brand active' : 'navbar-brand'}>
          <img src={logo} alt="FarmaThony Logo" style={{ width: '50px', marginRight: '10px' }} />
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Farmathony</span>
          <br />
          <small>Tu farmacia online</small>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
            <NavLink to="/productos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Productos</NavLink>
            <NavLink to="/carrito" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Carrito</NavLink>
            {role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admin Panel</NavLink>
            )}
          </Nav>

          <Nav>
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="nav-link">Iniciar Sesión</NavLink>
                <NavLink to="/register" className="nav-link">Registrarse</NavLink>
              </>
            ) : (
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
