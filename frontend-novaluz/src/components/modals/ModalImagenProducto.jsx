import React from 'react';
import '../../styles/components/ModalImagenProducto.css';

function ModalImagenProducto({ imagen, alt, isOpen, onClose }) {
  if (!isOpen || !imagen) return null;

  return (
    <div className="modal-imagen-overlay">
      <div className="modal-imagen-content">
        <button className="modal-imagen-close" onClick={onClose} aria-label="Cerrar">×</button>
        <img src={imagen} alt={alt || 'Imagen del producto'} className="modal-imagen-img" />
      </div>
    </div>
  );
}

export default ModalImagenProducto; 