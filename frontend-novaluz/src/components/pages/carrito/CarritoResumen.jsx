import React from 'react';

function CarritoResumen({ items, onCheckout, onContinueShopping }) {
  const subtotal = items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const envio = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + envio;

  return (
    <div className="carrito-resumen">
      <div className="resumen-header">
        <h3>Resumen de la Compra</h3>
      </div>
      
      <div className="resumen-detalles">
        <div className="resumen-item">
          <span>Subtotal ({items.length} productos):</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="resumen-item">
          <span>Envío:</span>
          <span className={envio === 0 ? 'envio-gratis' : ''}>
            {envio === 0 ? 'Gratis' : `€${envio.toFixed(2)}`}
          </span>
        </div>
        
        {envio > 0 && (
          <div className="envio-nota">
            <span>💡 Añade €{(50 - subtotal).toFixed(2)} más para envío gratis</span>
          </div>
        )}
        
        <div className="resumen-total">
          <span>Total:</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="resumen-beneficios">
        <div className="beneficio-item">
          <span className="beneficio-icon">✅</span>
          <span>Envío gratuito en pedidos superiores a €50</span>
        </div>
        <div className="beneficio-item">
          <span className="beneficio-icon">🔄</span>
          <span>Devolución gratuita en 30 días</span>
        </div>
        <div className="beneficio-item">
          <span className="beneficio-icon">🔒</span>
          <span>Pago seguro y encriptado</span>
        </div>
      </div>
      
      <div className="resumen-acciones">
        <button 
          className="btn-checkout"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          <span className="checkout-icon">💳</span>
          Finalizar Compra
        </button>
        
        <button 
          className="btn-continue"
          onClick={onContinueShopping}
        >
          <span className="continue-icon">🛍️</span>
          Seguir Comprando
        </button>
      </div>
      
      <div className="resumen-seguridad">
        <div className="seguridad-icons">
          <span>🔒</span>
          <span>🛡️</span>
          <span>✅</span>
        </div>
        <p>Tu información está protegida con encriptación SSL</p>
      </div>
    </div>
  );
}

export default CarritoResumen; 