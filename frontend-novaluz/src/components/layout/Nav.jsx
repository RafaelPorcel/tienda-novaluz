import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';

function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { carritoItems } = useCarrito();
  const { user, isAuthenticated, logout } = useAuth();
  const cartItems = carritoItems.reduce((total, item) => total + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" className="nav-logo">
            <img src="/logo_novaluz.png" alt="Nova Luz" />
          </NavLink>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)} end>
            Inicio
          </NavLink>
          <NavLink to="/tienda" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
            Tienda
          </NavLink>
          <NavLink to="/sobre-nosotros" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
            Sobre Nosotros
          </NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
            Contacto
          </NavLink>
        </div>

        <div className="nav-actions">
          <NavLink to="/carrito" className="nav-cart">
            <span className="cart-icon">🛒</span>
            {cartItems > 0 && (
              <span className="cart-badge">{cartItems}</span>
            )}
          </NavLink>
          
          {isAuthenticated ? (
            <div className="nav-user-menu">
              <span className="nav-user-name">
                👤 <span className="user-name-full">{user?.nombre}</span>
                <span className="user-name-initial">{user?.nombre?.charAt(0)}</span>
              </span>
              <button onClick={handleLogout} className="nav-logout">
                <span className="logout-text-full">Cerrar Sesión</span>
                <span className="logout-text-short">Salir</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-login">
              <span className="login-icon">🔐</span>
              <span className="login-text">Iniciar Sesión</span>
            </NavLink>
          )}
          
          <button 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav; 