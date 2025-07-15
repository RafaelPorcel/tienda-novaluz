import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductosDestacados() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/productos`)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="productos-destacados">
      <div className="container">
        <div className="section-header">
          <h2>Productos Destacados</h2>
          <p>Los productos más populares de nuestra tienda</p>
        </div>
        
        <div className="productos-grid">
          {productos.slice(0, 3).map(producto => (
            <div key={producto.id} className="producto-card">
              <div className="producto-imagen">
                <img src={producto.imagen || '/placeholder.jpg'} alt={producto.nombre} />
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