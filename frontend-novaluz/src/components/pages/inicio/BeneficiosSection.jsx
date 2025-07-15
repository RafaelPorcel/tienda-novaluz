import React from 'react';

function BeneficiosSection() {
  const beneficios = [
    {
      id: 1,
      icono: '🏠',
      titulo: 'Instalación en Nueva Vivienda',
      descripcion: 'Servicios completos de instalación eléctrica e iluminación'
    },
    {
      id: 2,
      icono: '🔧',
      titulo: 'Reforma y Mantenimiento',
      descripcion: 'Iluminación, climatización, antenas, redes y energía solar'
    },
    {
      id: 3,
      icono: '💡',
      titulo: 'Asesoramiento Personalizado',
      descripcion: 'Más de 20 años de experiencia en el sector'
    },
    {
      id: 4,
      icono: '🛒',
      titulo: 'Tienda Online',
      descripcion: 'Compra desde casa con los mejores productos del mercado'
    }
  ];

  return (
    <section className="beneficios-section">
      <div className="container">
        <div className="section-header">
          <h2>¿Por qué elegir Nova Luz?</h2>
          <p>Somos especialistas en asesoramiento personalizado. ¡Visítanos!</p>
        </div>
        
        <div className="beneficios-grid">
          {beneficios.map(beneficio => (
            <div key={beneficio.id} className="beneficio-card">
              <div className="beneficio-icon">{beneficio.icono}</div>
              <h3>{beneficio.titulo}</h3>
              <p>{beneficio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeneficiosSection; 