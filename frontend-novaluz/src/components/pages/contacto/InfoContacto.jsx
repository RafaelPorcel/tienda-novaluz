import React from 'react';

function InfoContacto() {
  const infoContacto = [
    {
      id: 1,
      icono: '📍',
      titulo: 'Dirección',
      contenido: 'Calle Principal 123, 28001 Madrid, España',
      descripcion: 'Nuestra tienda física está ubicada en el centro de Madrid'
    },
    {
      id: 2,
      icono: '📞',
      titulo: 'Teléfono',
      contenido: '+34 91 123 45 67',
      descripcion: 'Llámanos de lunes a viernes de 9:00 a 18:00'
    },
    {
      id: 3,
      icono: '✉️',
      titulo: 'Email',
      contenido: 'info@novaluz.com',
      descripcion: 'Responderemos en menos de 24 horas'
    },
    {
      id: 4,
      icono: '🕒',
      titulo: 'Horario',
      contenido: 'Lun-Vie: 9:00-18:00',
      descripcion: 'Sábados: 10:00-14:00 (Solo tienda física)'
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
            <p>Madrid, España</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContacto; 