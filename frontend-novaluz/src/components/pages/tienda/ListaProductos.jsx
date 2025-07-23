import React, { useEffect, useState } from 'react';
import ProductoCard from './ProductoCard';
import ModalProducto from '../../modals/ModalProducto';

function ListaProductos({ filtros, productos = [], loading }) {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [modalAbierta, setModalAbierta] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    let filtrados = [...productos];

    if (filtros.categoria) {
      filtrados = filtrados.filter(p =>
        p.categoria === filtros.categoria
      );
    }
    if (filtros.subcategoria) {
      filtrados = filtrados.filter(p =>
        p.subcategoria === filtros.subcategoria
      );
    }
    if (filtros.precioMin) {
      filtrados = filtrados.filter(p => p.precio >= parseFloat(filtros.precioMin));
    }
    if (filtros.precioMax) {
      filtrados = filtrados.filter(p => p.precio <= parseFloat(filtros.precioMax));
    }
    switch (filtros.ordenar) {
      case 'precio-asc':
        filtrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        filtrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'popularidad':
        filtrados.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
        break;
      default:
        filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    setProductosFiltrados(filtrados);
  }, [productos, filtros]);

  const handleVerDetalles = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierta(true);
  };

  const handleCerrarModal = () => {
    setModalAbierta(false);
    setProductoSeleccionado(null);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (productosFiltrados.length === 0) {
    return (
      <div className="productos-vacio">
        <div className="productos-vacio-content">
          <div className="productos-vacio-icon">🔍</div>
          <h3>No se encontraron productos</h3>
          <p>Intenta ajustar los filtros de búsqueda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-productos">
      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <ProductoCard key={producto.id} producto={producto} onVerDetalles={handleVerDetalles} />
        ))}
      </div>
      <ModalProducto producto={productoSeleccionado} isOpen={modalAbierta} onClose={handleCerrarModal} />
      <div className="productos-info">
        <p>Mostrando {productosFiltrados.length} de {productos.length} productos</p>
      </div>
    </div>
  );
}

export default ListaProductos; 