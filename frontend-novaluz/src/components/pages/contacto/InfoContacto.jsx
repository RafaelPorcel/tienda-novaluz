import React from 'react';

function InfoContacto() {
  const infoContacto = [
    {
      id: 1,
      icono: '📍',
      titulo: 'Dirección',
      contenido: 'Avda. Villanueva de Córdoba, 43 - Pozoblanco',
      descripcion: 'Nuestra tienda física está en Pozoblanco, Córdoba.',
      link: 'https://www.google.com/maps/search/?api=1&query=Avda.+Villanueva+de+Córdoba,+43,+Pozoblanco',
      target: '_blank'
    },
    {
      id: 2,
      icono: '📞',
      titulo: 'Teléfono',
      contenido: '957 130 334',
      descripcion: 'Llámanos para cualquier consulta o pedido.',
      link: 'tel:957130334'
    },
    {
      id: 3,
      icono: '💬',
      titulo: 'WhatsApp',
      contenido: '623 450 198',
      descripcion: 'Atención rápida por WhatsApp.',
      link: 'https://wa.me/34623450198',
      target: '_blank'
    },
    {
      id: 4,
      icono: '✉️',
      titulo: 'Email',
      contenido: 'novaluzsc@gmail.com',
      descripcion: 'Responderemos en menos de 24 horas.',
      link: 'mailto:novaluzsc@gmail.com'
    },
    {
      id: 5,
      icono: '🕒',
      titulo: 'Horario',
      contenido: 'Lunes-Viernes: 10:00/14:00 - 17:00/20:30\nSábado: 10:00-14:00',
      descripcion: 'Visítanos en nuestro horario comercial.'
    }
  ];

  const handleCardClick = (info) => {
    if (info.link) {
      if (info.target === '_blank') {
        window.open(info.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = info.link;
      }
    }
  };

  return (
    <div className="info-contacto">
      <h2>Vías de Contacto</h2>
      <p>No dudes en contactar con nosotros para cualquier consulta o pedido</p>
      
      <div className="datos-grid">
        {infoContacto.map(info => {
          const isClickable = !!info.link;
          return (
            <div
              key={info.id}
              className={`dato-card${isClickable ? ' dato-card-clickable' : ''}`}
              onClick={() => isClickable && handleCardClick(info)}
              style={isClickable ? { cursor: 'pointer' } : {}}
              tabIndex={isClickable ? 0 : undefined}
              role={isClickable ? 'button' : undefined}
              onKeyDown={e => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) handleCardClick(info);
              }}
            >
              <div className="dato-icon">{info.icono}</div>
              <div className="dato-content">
                <h3>{info.titulo}</h3>
                <p className="dato-principal dato-link">{info.contenido}</p>
                <p className="dato-subtitle">{info.descripcion}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mapa-section">
        <h3>Ubicación</h3>
        <div className="mapa-iframe-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.6381659465574!2d-4.851687461911013!3d38.38049116156855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6cbb2bb4f5ff9d%3A0x6a032e000210f980!2sNOVALUZ%20POZOBLANCO%20SC!5e0!3m2!1ses!2ses!4v1753374867025!5m2!1ses!2ses"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Nova Luz Pozoblanco"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default InfoContacto; 