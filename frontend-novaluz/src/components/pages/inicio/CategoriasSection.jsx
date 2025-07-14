import React from 'react';
import { Link } from 'react-router-dom';

function CategoriasSection() {
  const categorias = [
    {
      id: 1,
      nombre: 'Iluminación LED',
      icono: '💡',
      descripcion: 'Bombillas y lámparas LED de alta eficiencia',
      enlace: '/tienda?categoria=iluminacion'
    },
    {
      id: 2,
      nombre: 'Ventilación',
      icono: '🌪️',
      descripcion: 'Ventiladores de techo y pared',
      enlace: '/tienda?categoria=ventilacion'
    },
    {
      id: 3,
      nombre: 'Accesorios',
      icono: '🔧',
      descripcion: 'Cables, interruptores y más',
      enlace: '/tienda?categoria=accesorios'
    }
  ];

  return (
    <section className="categorias-section">
      <div className="container">
        <div className="section-header">
          <h2>Nuestras Categorías</h2>
          <p>Encuentra todo lo que necesitas para tu proyecto</p>
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