import React from 'react';

function ServiciosEquipo() {
  const servicios = [
    {
      id: 1,
      icono: '💡',
      titulo: 'Iluminación LED',
      descripcion: 'Amplia gama de productos LED de alta eficiencia energética'
    },
    {
      id: 2,
      icono: '🌪️',
      titulo: 'Ventilación',
      descripcion: 'Ventiladores de techo y pared para todo tipo de espacios'
    },
    {
      id: 3,
      icono: '🔧',
      titulo: 'Instalación',
      descripcion: 'Servicio de instalación profesional en el Valle de los Pedroches y alrededores'
    },
    {
      id: 4,
      icono: '🛠️',
      titulo: 'Mantenimiento',
      descripcion: 'Servicios de mantenimiento y reparación de equipos'
    }
  ];

  const equipo = [
    {
      id: 1,
      nombre: 'La Paquita',
      cargo: 'Directora General',
      descripcion: 'Más de 30 años de experiencia en el sector de la electricidad'
    },
    {
      id: 2,
      nombre: 'Jorge el Mellizo',
      cargo: 'contable',
      descripcion: 'Dueño y señor de Jorgilia, un mundo maravilloso'
    },
    {
      id: 3,
      nombre: 'Ivano fistulas',
      cargo: 'El más apaleao de todos',
      descripcion: 'Trabaja dia y noche incluso los domingos, algunos bebe'
    }
  ];

  return (
    <section className="servicios-equipo">
      <div className="container">
        <div className="servicios-section">
          <h2>Nuestros Servicios</h2>
          <p>Ofrecemos soluciones completas para todas tus necesidades de iluminación</p>
          
          <div className="servicios-grid">
            {servicios.map(servicio => (
              <div key={servicio.id} className="servicio-card">
                <div className="servicio-icon">{servicio.icono}</div>
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="equipo-section">
          <h2>Nuestro Equipo</h2>
          <p>Conoce a los profesionales que hacen posible nuestro éxito</p>
          
          <div className="equipo-grid">
            {equipo.map(miembro => (
              <div key={miembro.id} className="miembro-card">
                <div className="miembro-avatar">
                  <span className="avatar-icon">👤</span>
                </div>
                <h3>{miembro.nombre}</h3>
                <p className="miembro-cargo">{miembro.cargo}</p>
                <p className="miembro-descripcion">{miembro.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="valores-section">
          <h2>Nuestros Valores</h2>
          <div className="valores-grid">
            <div className="valor-item">
              <div className="valor-icon">🌟</div>
              <h3>Calidad</h3>
              <p>Solo trabajamos con las mejores marcas y productos</p>
            </div>
            <div className="valor-item">
              <div className="valor-icon">🤝</div>
              <h3>Confianza</h3>
              <p>Construimos relaciones duraderas con nuestros clientes</p>
            </div>
            <div className="valor-item">
              <div className="valor-icon">🌱</div>
              <h3>Sostenibilidad</h3>
              <p>Comprometidos con el medio ambiente y la eficiencia energética</p>
            </div>
            <div className="valor-item">
              <div className="valor-icon">💪</div>
              <h3>Innovación</h3>
              <p>Siempre a la vanguardia de las últimas tecnologías</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiciosEquipo; 