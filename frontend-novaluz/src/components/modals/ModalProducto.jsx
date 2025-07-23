import React, { useState } from 'react';
import '../../styles/components/ModalProducto.css';
import ModalImagenProducto from './ModalImagenProducto';

function ModalProducto({ producto, isOpen, onClose }) {
  const [modalImagenAbierta, setModalImagenAbierta] = useState(false);
  if (!isOpen || !producto) return null;

  // Desestructuramos los campos relevantes
  const {
    imagen,
    nombre,
    descripcion,
    categoria,
    subcategoria,
    precio,
    marca,
    potencia,
    medidasAlto,
    medidasAncho,
    medidasLargo,
    embalajeAlto,
    embalajeAncho,
    embalajeLargo,
    peso,
    otros
  } = producto;

  const handleAbrirImagen = () => {
    if (imagen) setModalImagenAbierta(true);
  };
  const handleCerrarImagen = () => setModalImagenAbierta(false);

  return (
    <div className="modal-producto-overlay">
      <div className="modal-producto">
        <button className="modal-producto-close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="modal-producto-content">
          {imagen && (
            <div className="modal-producto-img modal-producto-img-grande" onClick={handleAbrirImagen} style={{cursor: 'zoom-in'}}>
              <img src={imagen} alt={nombre} />
            </div>
          )}
          <div className="modal-producto-info">
            <h2 className="modal-producto-nombre">{nombre}</h2>
            <p className="modal-producto-descripcion">{descripcion}</p>
            <div className="modal-producto-datos">
              <div><strong>Categoría:</strong> {categoria}</div>
              {subcategoria && <div><strong>Subcategoría:</strong> {subcategoria}</div>}
              <div><strong>Precio:</strong> {precio} €</div>
              {marca && <div><strong>Marca:</strong> {marca}</div>}
              {potencia && <div><strong>Potencia:</strong> {potencia}</div>}
              {(medidasAlto || medidasAncho || medidasLargo) && (
                <div><strong>Medidas:</strong> {medidasAlto || '-'} x {medidasAncho || '-'} x {medidasLargo || '-'} cm</div>
              )}
              {(embalajeAlto || embalajeAncho || embalajeLargo) && (
                <div><strong>Embalaje:</strong> {embalajeAlto || '-'} x {embalajeAncho || '-'} x {embalajeLargo || '-'} cm</div>
              )}
              {peso && <div><strong>Peso:</strong> {peso} kg</div>}
              {otros && <div><strong>Otros:</strong> {otros}</div>}
            </div>
          </div>
        </div>
        <ModalImagenProducto imagen={imagen} alt={nombre} isOpen={modalImagenAbierta} onClose={handleCerrarImagen} />
      </div>
    </div>
  );
}

export default ModalProducto; 