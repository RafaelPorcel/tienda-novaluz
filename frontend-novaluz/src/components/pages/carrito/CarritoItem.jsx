import React from 'react';

function CarritoItem({ item, onUpdateQuantity, onRemoveItem }) {
  const { id, nombre, precio, imagen, cantidad, categoria } = item;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemoveItem(id);
  };

  return (
    <div className="carrito-item">
      <div className="item-imagen">
        <img src={imagen || '/placeholder.jpg'} alt={nombre} />
      </div>
      
      <div className="item-info">
        <div className="item-details">
          <h3 className="item-nombre">{nombre}</h3>
          <p className="item-categoria">{categoria}</p>
          <p className="item-precio">€{precio}</p>
        </div>
        
        <div className="item-cantidad">
          <label>Cantidad:</label>
          <div className="cantidad-controls">
            <button 
              className="cantidad-btn"
              onClick={() => handleQuantityChange(cantidad - 1)}
              disabled={cantidad <= 1}
            >
              -
            </button>
            <span className="cantidad-valor">{cantidad}</span>
            <button 
              className="cantidad-btn"
              onClick={() => handleQuantityChange(cantidad + 1)}
              disabled={cantidad >= 10}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="item-subtotal">
          <span className="subtotal-label">Subtotal:</span>
          <span className="subtotal-valor">€{(precio * cantidad).toFixed(2)}</span>
        </div>
        
        <button className="item-remove" onClick={handleRemove}>
          <span className="remove-icon">🗑️</span>
          <span className="remove-text">Eliminar</span>
        </button>
      </div>
    </div>
  );
}

export default CarritoItem; 