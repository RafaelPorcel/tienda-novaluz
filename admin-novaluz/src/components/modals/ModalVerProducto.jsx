import React from "react";
import styles from "./ModalVerProducto.module.css";

function ModalVerProducto({ producto, isOpen, onClose }) {
  if (!isOpen || !producto) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>📝 Detalle del Producto</h2>
        <table className={styles.detailsTable}>
          <tbody>
            <tr><td>ID</td><td>{producto.id}</td></tr>
            <tr><td>Nombre</td><td>{producto.nombre}</td></tr>
            <tr><td>Descripción</td><td>{producto.descripcion}</td></tr>
            <tr><td>Categoría</td><td>{producto.categoria}</td></tr>
            <tr><td>Subcategoría</td><td>{producto.subcategoria}</td></tr>
            <tr><td>Precio</td><td>€{producto.precio}</td></tr>
            <tr><td>Stock</td><td>{producto.stock}</td></tr>
            <tr><td>Imagen</td><td>{producto.imagen}</td></tr>
            <tr><td>Marca</td><td>{producto.marca}</td></tr>
            <tr><td>Potencia</td><td>{producto.potencia}</td></tr>
            <tr><td>Peso</td><td>{producto.peso}</td></tr>
            <tr><td>Medidas</td><td>{producto.medidasAlto || producto.medidasAncho || producto.medidasLargo ? `Alto: ${producto.medidasAlto || '-'} cm, Ancho: ${producto.medidasAncho || '-'} cm, Largo: ${producto.medidasLargo || '-'} cm` : '-'}</td></tr>
            <tr><td>Embalaje</td><td>{producto.embalajeAlto || producto.embalajeAncho || producto.embalajeLargo ? `Alto: ${producto.embalajeAlto || '-'} cm, Ancho: ${producto.embalajeAncho || '-'} cm, Largo: ${producto.embalajeLargo || '-'} cm` : '-'}</td></tr>
            <tr><td>Otros</td><td>{producto.otros}</td></tr>
          </tbody>
        </table>
        <button
          className={styles.closeBtn}
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalVerProducto; 