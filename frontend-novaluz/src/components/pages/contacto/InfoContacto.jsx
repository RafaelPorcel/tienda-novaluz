import React from 'react';

function InfoContacto() {
  const infoContacto = [
    {
      id: 1,
      icono: '📍',
      titulo: 'Dirección',
      contenido: 'Avda. Villanueva de Córdoba, 43 - Pozoblanco',
      descripcion: 'Nuestra tienda física está en Pozoblanco, Córdoba.'
    },
    {
      id: 2,
      icono: '📞',
      titulo: 'Teléfono',
      contenido: '957 130 334',
      descripcion: 'Llámanos para cualquier consulta o pedido.'
    },
    {
      id: 3,
      icono: '💬',
      titulo: 'WhatsApp',
      contenido: '623 450 198',
      descripcion: 'Atención rápida por WhatsApp.'
    },
    {
      id: 4,
      icono: '✉️',
      titulo: 'Email',
      contenido: 'iluminacion_novaluz@hotmail.com',
      descripcion: 'Responderemos en menos de 24 horas.'
    },
    {
      id: 5,
      icono: '🕒',
      titulo: 'Horario',
      contenido: 'Lunes-Viernes: 10:00/13:45 - 17:15/20:30\nSábado: 10:00-13:45',
      descripcion: 'Visítanos en nuestro horario comercial.'
    }
  ];

  return (
    <div className="info-contacto">
      <h2>Información de Contacto</h2>
      <p>Estamos aquí para ayudarte con cualquier consulta sobre nuestros productos</p>
      
      <div className="datos-grid">
        {infoContacto.map(info => (
          <div key={info.id} className="dato-card">
            <div className="dato-icon">{info.icono}</div>
            <div className="dato-content">
              <h3>{info.titulo}</h3>
              <p className="dato-principal">{info.contenido}</p>
              <p className="dato-subtitle">{info.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mapa-section">
        <h3>Ubicación</h3>
        <div className="mapa-placeholder">
          <div className="mapa-content">
            <span className="mapa-icon">🗺️</span>
            <p>Mapa interactivo</p>
            <p>Pozoblanco, Córdoba</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContacto; 