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
            <div className="contacto-info">
              <div className="contacto-item">
                <span className="contacto-icon">📞</span>
                <div>
                  <h4>Llámanos</h4>
                  <p>+34 91 123 45 67</p>
                </div>
              </div>
              <div className="contacto-item">
                <span className="contacto-icon">✉️</span>
                <div>
                  <h4>Escríbenos</h4>
                  <p>info@novaluz.com</p>
                </div>
              </div>
            </div>
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