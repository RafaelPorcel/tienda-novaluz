import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { carritoItems } = useCarrito();
  const cartItems = carritoItems.reduce((total, item) => total + item.cantidad, 0);


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
          <NavLink to="/login" className="nav-login">
            <span className="login-icon">🔐</span>
            <span className="login-text">Iniciar Sesión</span>
          </NavLink>
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