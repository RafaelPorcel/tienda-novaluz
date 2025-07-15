import React from 'react';
import { Link } from 'react-router-dom';

function CategoriasSection() {
  const categorias = [
    {
      id: 1,
      nombre: 'Iluminación',
      icono: '💡',
      descripcion: 'Últimos productos del mercado en iluminación LED y bajo consumo',
      enlace: '/tienda?categoria=iluminacion'
    },
    {
      id: 2,
      nombre: 'Climatización',
      icono: '🌪️',
      descripcion: 'Ventiladores y sistemas de climatización de bajo consumo',
      enlace: '/tienda?categoria=climatizacion'
    },
    {
      id: 3,
      nombre: 'Herramienta',
      icono: '🔧',
      descripcion: 'Herramientas profesionales para instalaciones y mantenimiento',
      enlace: '/tienda?categoria=herramienta'
    }
  ];

  return (
    <section className="categorias-section">
      <div className="container">
        <div className="section-header">
          <h2>Nuestros Productos</h2>
          <p>Rendimiento y eficiencia comprometidos con nuestros clientes y el medio ambiente</p>
        </div>
        
        <div className="categorias-grid">
          {categorias.map(categoria => (
            <Link 
              key={categoria.id} 
              to={categoria.enlace} 
              className="categoria-card"
            >
              <div className="categoria-icon">{categoria.icono}</div>
              <h3>{categoria.nombre}</h3>
              <p>{categoria.descripcion}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriasSection; 