import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-text">
          <h1>MÁS DE 20 AÑOS ILUMINANDO TU HOGAR Y TU NEGOCIO</h1>
          <h2>Especialistas en asesoramiento personalizado</h2>
          <p>
            En Nova Luz somos mucho más que una tienda. Ofrecemos todo tipo de servicios: 
            instalación en nueva vivienda, reforma y mantenimiento de iluminación, climatización, 
            antenas, redes, energía solar de autoconsumo, montajes y reparaciones. 
            ¡Y ahora también tienda online para que puedas comprar desde casa!
          </p>
          <div className="hero-actions">
            <Link to="/tienda" className="btn-primary">
              Tienda Online
            </Link>
            <Link to="/contacto" className="btn-secondary">
              Visítanos
            </Link>
          </div>
        </div>
        
        <div className="hero-offer">
          <div className="offer-card">
            <h3>ÚLTIMAS TENDENCIAS</h3>
            <p>Encontrarás los últimos productos del mercado en iluminación, climatización de bajo consumo, ventiladores, herramienta...</p>
            <span className="offer-price">¡Ven a visitarnos!</span>
            <Link to="/tienda" className="btn-offer">
              Ver Ofertas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner; 