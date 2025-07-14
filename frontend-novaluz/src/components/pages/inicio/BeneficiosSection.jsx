import React from 'react';

function BeneficiosSection() {
  const beneficios = [
    {
      id: 1,
      icono: '🚚',
      titulo: 'Envío Gratuito',
      descripcion: 'En pedidos superiores a €50'
    },
    {
      id: 2,
      icono: '🔄',
      titulo: 'Devolución Gratuita',
      descripcion: '30 días para cambiar de opinión'
    },
    {
      id: 3,
      icono: '🛡️',
      titulo: 'Garantía de 2 Años',
      descripcion: 'En todos nuestros productos'
    },
    {
      id: 4,
      icono: '💬',
      titulo: 'Soporte 24/7',
      descripcion: 'Atención al cliente especializada'
    }
  ];

  return (
    <section className="beneficios-section">
      <div className="container">
        <div className="section-header">
          <h2>¿Por qué elegir Nova Luz?</h2>
          <p>Descubre las ventajas de comprar con nosotros</p>
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