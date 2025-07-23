import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import CarritoItem from '../components/pages/carrito/CarritoItem';
import CarritoResumen from '../components/pages/carrito/CarritoResumen';

function Carrito() {
  const navigate = useNavigate();
  const { carritoItems, actualizarCantidad, eliminarDelCarrito } = useCarrito();

  const totalItems = carritoItems.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carritoItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  const handleCheckout = () => {
    console.log('Finalizando compra...');
    alert('Redirigiendo al checkout...');
  };

  const handleContinueShopping = () => {
    navigate('/tienda');
  };

  if (carritoItems.length === 0) {
    return (
      <div className="carrito">
        <div className="carrito-vacio">
          <div className="carrito-vacio-content">
            <div className="carrito-vacio-icon">🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p>Parece que aún no has añadido ningún producto a tu carrito.</p>
            <button className="btn-ir-tienda" onClick={handleContinueShopping}>
              <span className="btn-icon">🛍️</span>
              Ir a la Tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito">
      <div className="carrito-content">
        <div className="container">
          <div className="carrito-header-compact">
            <h1>Carrito de Compras</h1>
            <div className="carrito-stats-compact">
              <span className="stat-compact">
                <span className="stat-icon">🛒</span>
                {totalItems} productos
              </span>
              <span className="stat-compact">
                <span className="stat-icon">💰</span>
                €{totalPrecio.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="carrito-grid">
            <div className="carrito-items">
              <h2>Productos ({totalItems})</h2>
              <div className="items-list">
                {carritoItems.map(item => (
                  <CarritoItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={actualizarCantidad}
                    onRemoveItem={eliminarDelCarrito}
                  />
                ))}
              </div>
            </div>

            <div className="carrito-sidebar">
              <CarritoResumen
                items={carritoItems}
                onCheckout={handleCheckout}
                onContinueShopping={handleContinueShopping}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
