import { useState, useEffect } from 'react';
import { getProductos, eliminarProducto } from '../utils/api';
import ModalEliminarProducto from './modals/ModalEliminarProducto';
import ModalEditarProducto from "./modals/ModalEditarProducto";
import { API_URL } from '../utils/api';

function TablaProductos() {
  // Estados principales
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState('');
  const [mostrarTabla, setMostrarTabla] = useState(false);

  // Estados para modales
  const [modalEliminar, setModalEliminar] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Categorías y subcategorías
  const categorias = ["Ventiladores", "Lámparas", "Bombillas"];
  const subcategoriasPorCategoria = {
    "Ventiladores": ["De techo aspas normales", "De techo aspas retráctiles", "De pie", "De sobremesa"],
    "Lámparas": ["De sobremesa", "Plafones", "Flexos"],
    "Bombillas": ["Halógenas", "LED", "Bajo consumo"]
  };
  const subcategorias = categoriaSeleccionada ? subcategoriasPorCategoria[categoriaSeleccionada] || [] : [];

  // Función para cargar productos y devolver los datos
  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
      return data;
    } catch (error) {
      console.error('Error al cargar productos:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Filtrar productos cuando cambian productos o filtros
  useEffect(() => {
    let filtrados = productos;
    if (categoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }
    if (subcategoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.subcategoria === subcategoriaSeleccionada);
    }
    setProductosFiltrados(filtrados);
  }, [productos, categoriaSeleccionada, subcategoriaSeleccionada]);

  // Mostrar productos: recarga y filtra con los datos recién traídos
  const handleMostrarProductos = async () => {
    const data = await cargarProductos();
    let filtrados = data;
    if (categoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }
    if (subcategoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.subcategoria === subcategoriaSeleccionada);
    }
    setProductosFiltrados(filtrados);
    setMostrarTabla(true);
  };

  // Limpiar filtros y ocultar tabla
  const handleLimpiarFiltros = () => {
    setCategoriaSeleccionada('');
    setSubcategoriaSeleccionada('');
    setMostrarTabla(false);
    setProductosFiltrados([]);
  };

  // Eliminar producto
  const handleEliminarProducto = (producto) => {
    setProductoAEliminar(producto);
    setModalEliminar(true);
  };

  // Confirmar eliminación
  const handleConfirmarEliminacion = async (productoId) => {
    try {
      await eliminarProducto(productoId);
      setProductos(productos.filter(p => p._id !== productoId));
      setProductosFiltrados(productosFiltrados.filter(p => p._id !== productoId));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  };

  // Editar producto
  const handleEditarClick = (producto) => {
    setProductoSeleccionado(producto);
    setIsModalOpen(true);
  };

  // Guardar cambios de edición
  const handleGuardarCambios = async (productoEditado) => {
    try {
      await fetch(`${API_URL}/productos/${productoEditado._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEditado),
      });
      await cargarProductos();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <h3>Filtros de Productos</h3>
      {/* Selector de categoría */}
      <div style={{ marginBottom: '10px' }}>
        <label>Categoría: </label>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value);
            setSubcategoriaSeleccionada('');
          }}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {/* Selector de subcategoría */}
      {categoriaSeleccionada && (
        <div style={{ marginBottom: '10px' }}>
          <label>Subcategoría: </label>
          <select
            value={subcategoriaSeleccionada}
            onChange={(e) => setSubcategoriaSeleccionada(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="">Todas las subcategorías</option>
            {subcategorias.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
      )}
      {/* Botones de control */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleMostrarProductos}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Mostrar Productos
        </button>
        <button
          onClick={handleLimpiarFiltros}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Limpiar Filtros
        </button>
      </div>
      {/* Tabla de productos */}
      {mostrarTabla && (
        <div>
          <h4>Productos encontrados: {productosFiltrados.length}</h4>
          {productosFiltrados.length === 0 ? (
            <p>No hay productos con los filtros seleccionados</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Categoría</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subcategoría</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto) => (
                  <tr key={producto._id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.nombre}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.categoria}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.subcategoria}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>€{producto.precio}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.stock}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <button
                        onClick={() => handleEditarClick(producto)}
                        style={{
                          marginRight: '5px',
                          padding: '4px 8px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleEliminarProducto(producto)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {/* Modales */}
      <ModalEliminarProducto
        producto={productoAEliminar}
        isOpen={modalEliminar}
        onClose={() => {
          setModalEliminar(false);
          setProductoAEliminar(null);
        }}
        onConfirm={handleConfirmarEliminacion}
      />
      <ModalEditarProducto
        producto={productoSeleccionado}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleGuardarCambios}
      />
    </div>
  );
}

export default TablaProductos;