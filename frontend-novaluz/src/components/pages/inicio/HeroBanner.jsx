import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Iluminación LED de Calidad</h1>
          <h2>Soluciones de iluminación para tu hogar y negocio</h2>
          <p>
            Descubre nuestra amplia gama de productos de iluminación LED, 
            ventilación y soluciones eléctricas. Calidad garantizada y 
            precios competitivos.
          </p>
          <div className="hero-actions">
            <Link to="/tienda" className="btn-primary">
              Ver Productos
            </Link>
            <Link to="/contacto" className="btn-secondary">
              Contactar
            </Link>
          </div>
        </div>
        
        <div className="hero-offer">
          <div className="offer-card">
            <h3>OFERTA ESPECIAL</h3>
            <p>Bombilla LED 9W</p>
            <span className="offer-price">€9.99</span>
            <Link to="/tienda" className="btn-offer">
              Comprar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner; 