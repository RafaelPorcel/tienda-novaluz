import React, { useState, useEffect } from 'react';
import ProductoCard from './ProductoCard';

function ListaProductos({ filtros }) {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Datos de ejemplo
  useEffect(() => {
    const productosEjemplo = [
      {
        id: 1,
        nombre: 'Bombilla LED 9W E27',
        precio: 12.99,
        imagen: '/placeholder.jpg',
        categoria: 'Iluminación LED',
        stock: 50,
        destacado: true
      },
      {
        id: 2,
        nombre: 'Ventilador de Techo Moderno',
        precio: 89.99,
        imagen: '/placeholder.jpg',
        categoria: 'Ventilación',
        stock: 15,
        destacado: false
      },
      {
        id: 3,
        nombre: 'Lámpara de Mesa LED',
        precio: 45.99,
        imagen: '/placeholder.jpg',
        categoria: 'Iluminación LED',
        stock: 25,
        destacado: true
      },
      {
        id: 4,
        nombre: 'Cable Eléctrico 2.5mm',
        precio: 8.99,
        imagen: '/placeholder.jpg',
        categoria: 'Accesorios',
        stock: 100,
        destacado: false
      },
      {
        id: 5,
        nombre: 'Interruptor Simple',
        precio: 5.99,
        imagen: '/placeholder.jpg',
        categoria: 'Accesorios',
        stock: 0,
        destacado: false
      },
      {
        id: 6,
        nombre: 'Tubo LED 18W',
        precio: 22.99,
        imagen: '/placeholder.jpg',
        categoria: 'Iluminación LED',
        stock: 3,
        destacado: false
      }
    ];
    setProductos(productosEjemplo);
  }, []);

  // Filtrar productos
  useEffect(() => {
    let filtrados = [...productos];

    // Filtro por categoría
    if (filtros.categoria) {
      filtrados = filtrados.filter(p => 
        p.categoria.toLowerCase().includes(filtros.categoria.toLowerCase())
      );
    }

    // Filtro por precio mínimo
    if (filtros.precioMin) {
      filtrados = filtrados.filter(p => p.precio >= parseFloat(filtros.precioMin));
    }

    // Filtro por precio máximo
    if (filtros.precioMax) {
      filtrados = filtrados.filter(p => p.precio <= parseFloat(filtros.precioMax));
    }

    // Ordenar productos
    switch (filtros.ordenar) {
      case 'precio-asc':
        filtrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        filtrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'popularidad':
        filtrados.sort((a, b) => b.destacado - a.destacado);
        break;
      default:
        filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    setProductosFiltrados(filtrados);
  }, [productos, filtros]);

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
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
      
      <div className="productos-info">
        <p>Mostrando {productosFiltrados.length} de {productos.length} productos</p>
      </div>
    </div>
  );
}

export default ListaProductos; 