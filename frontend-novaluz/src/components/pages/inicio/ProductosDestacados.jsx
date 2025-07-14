import React from 'react';
import { Link } from 'react-router-dom';

function ProductosDestacados() {
  const productos = [
    {
      id: 1,
      nombre: 'Bombilla LED 9W',
      precio: 12.99,
      imagen: '/placeholder.jpg',
      categoria: 'Iluminación'
    },
    {
      id: 2,
      nombre: 'Ventilador de Techo',
      precio: 89.99,
      imagen: '/placeholder.jpg',
      categoria: 'Ventilación'
    },
    {
      id: 3,
      nombre: 'Lámpara de Mesa LED',
      precio: 45.99,
      imagen: '/placeholder.jpg',
      categoria: 'Iluminación'
    }
  ];

  return (
    <section className="productos-destacados">
      <div className="container">
        <div className="section-header">
          <h2>Productos Destacados</h2>
          <p>Los productos más populares de nuestra tienda</p>
        </div>
        
        <div className="productos-grid">
          {productos.map(producto => (
            <div key={producto.id} className="producto-card">
              <div className="producto-imagen">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p className="producto-categoria">{producto.categoria}</p>
                <p className="producto-precio">€{producto.precio}</p>
                <Link to="/tienda" className="btn-ver-producto">
                  Ver Producto
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="section-footer">
          <Link to="/tienda" className="btn-ver-todos">
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductosDestacados; 