import React, { useEffect, useState } from 'react';
import { getProductos } from '../../../utils/api';
import ModalProducto from '../../modals/ModalProducto';

function ProductosDestacados() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierta, setModalAbierta] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    getProductos()
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleVerDetalles = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierta(true);
  };

  const handleCerrarModal = () => {
    setModalAbierta(false);
    setProductoSeleccionado(null);
  };

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
                <button className="btn-ver-producto" onClick={() => handleVerDetalles(producto)}>
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
        <ModalProducto producto={productoSeleccionado} isOpen={modalAbierta} onClose={handleCerrarModal} />
        <div className="section-footer">
          <a href="/tienda" className="btn-ver-todos">
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProductosDestacados; 