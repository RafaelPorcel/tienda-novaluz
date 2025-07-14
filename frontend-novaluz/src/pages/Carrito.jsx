import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarritoItem from '../components/pages/carrito/CarritoItem';
import CarritoResumen from '../components/pages/carrito/CarritoResumen';

function Carrito() {
  const navigate = useNavigate();
  
  // Datos de ejemplo del carrito
  const [carritoItems, setCarritoItems] = useState([
    {
      id: 1,
      nombre: 'Ventilador de Techo Moderno',
      precio: 89.99,
      imagen: '/placeholder.jpg',
      cantidad: 1,
      categoria: 'Ventiladores'
    },
    {
      id: 2,
      nombre: 'Lámpara de Mesa LED',
      precio: 45.99,
      imagen: '/placeholder.jpg',
      cantidad: 2,
      categoria: 'Lámparas'
    },
    {
      id: 3,
      nombre: 'Bombilla LED 9W',
      precio: 12.99,
      imagen: '/placeholder.jpg',
      cantidad: 3,
      categoria: 'Bombillas'
    }
  ]);

  const totalItems = carritoItems.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carritoItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  const handleUpdateQuantity = (id, newQuantity) => {
    setCarritoItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCarritoItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Aquí iría la lógica para finalizar la compra
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
            <button 
              className="btn-ir-tienda"
              onClick={handleContinueShopping}
            >
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
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
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