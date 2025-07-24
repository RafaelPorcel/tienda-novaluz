import React from 'react';
import { Link } from 'react-router-dom';

function ContactoHome() {
  return (
    <section className="contacto-home">
      <div className="container">
        <div className="contacto-content">
          <div className="contacto-text">
            <h2>¿Necesitas ayuda?</h2>
            <p>
              Nuestro equipo de expertos está aquí para ayudarte a encontrar 
              la solución perfecta para tus necesidades de iluminación.
            </p>
            <Link to="/contacto" className="btn-contacto">
              Contactar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactoHome; 