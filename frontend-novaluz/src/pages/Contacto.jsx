import React from 'react';
import InfoContacto from '../components/pages/contacto/InfoContacto';
import FormularioContacto from '../components/pages/contacto/FormularioContacto';

function Contacto() {
  return (
    <div className="contacto">
      <div className="contacto-content">
        <div className="container">
          <div className="contacto-grid">
            <div className="contacto-info">
              <InfoContacto />
            </div>
            <div className="contacto-formulario">
              <FormularioContacto />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto; 