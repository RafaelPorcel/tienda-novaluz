import React from 'react';
import { useCarrito } from '../../../context/CarritoContext';

function ProductoCard({ producto, onVerDetalles }) {
  const { id, nombre, precio, imagen, categoria, stock, destacado } = producto;
  const { añadirAlCarrito } = useCarrito();

  const getStockBadge = () => {
    if (stock === 0) return <span className="badge badge-sin-stock">Sin Stock</span>;
    if (stock < 5) return <span className="badge badge-stock-bajo">Stock Bajo</span>;
    return <span className="badge badge-en-stock">En Stock</span>;
  };

  const getDestacadoBadge = () => {
    if (destacado) return <span className="badge badge-destacado">Destacado</span>;
    return null;
  };

  return (
    <div className="producto-card">
      <div className="producto-imagen">
        <img src={imagen || '/placeholder.jpg'} alt={nombre} />
        <div className="producto-badges">
          {getDestacadoBadge()}
          {getStockBadge()}
        </div>
      </div>
      
      <div className="producto-info">
        <div className="producto-categoria">{categoria}</div>
        <h3 className="producto-nombre">{nombre}</h3>
        <div className="producto-precio">€{precio.toFixed(2)}</div>
        
        <div className="producto-acciones">
          <button className="btn-ver-producto" onClick={() => onVerDetalles(producto)}>
            Ver Detalles
          </button>
          <button 
            className="btn-añadir-carrito"
            disabled={stock === 0}
            onClick={() => añadirAlCarrito(producto)} //Añadimos el producto al carrito
          >
            <span className="carrito-icon">🛒</span>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard; 