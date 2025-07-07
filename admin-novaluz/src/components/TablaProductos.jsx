import { useState, useEffect } from 'react';
import { getProductos, eliminarProducto, actualizarProducto } from '../utils/api';
import ModalEliminarProducto from './modals/ModalEliminarProducto';
import ModalEditarProducto from "./modals/ModalEditarProducto";
import { API_URL } from '../utils/api';
import './TablaProductos.css';
import ModalVerProducto from './modals/ModalVerProducto';

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
  const [productoVer, setProductoVer] = useState(null);
  const [modalVerAbierto, setModalVerAbierto] = useState(false);

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
      await actualizarProducto(productoEditado);
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
    <div className="tabla-productos-container">
      <div className="filtros-productos">
        <div>
          <label htmlFor="categoria-select">Categoría:</label>
          <select
            id="categoria-select"
            value={categoriaSeleccionada}
            onChange={(e) => {
              setCategoriaSeleccionada(e.target.value);
              setSubcategoriaSeleccionada('');
            }}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {categoriaSeleccionada && (
          <div>
            <label htmlFor="subcategoria-select">Subcategoría:</label>
            <select
              id="subcategoria-select"
              value={subcategoriaSeleccionada}
              onChange={(e) => setSubcategoriaSeleccionada(e.target.value)}
            >
              <option value="">Todas las subcategorías</option>
              {subcategorias.map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
            </select>
          </div>
        )}
        <div className="filtros-botones">
          <button className="mostrar" onClick={handleMostrarProductos}>Mostrar Productos</button>
          <button className="limpiar" onClick={handleLimpiarFiltros}>Limpiar Filtros</button>
          <button className="añadir" onClick={() => window.location.href='/productos/nuevo'}>Añadir Producto</button>
        </div>
      </div>
      {/* Tabla de productos */}
      {mostrarTabla && (
    <div>
          <div className="tabla-productos-header">
            <h4>Productos encontrados: {productosFiltrados.length}</h4>
          </div>
          {productosFiltrados.length === 0 ? (
            <div className="tabla-productos-mensaje">No hay productos con los filtros seleccionados</div>
      ) : (
            <table className="tabla-productos-table">
          <thead>
            <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Subcategoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
                {productosFiltrados.map((producto) => (
              <tr key={producto._id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.subcategoria}</td>
                    <td>€{producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td className="tabla-productos-acciones">
                      <button
                        className="editar"
                        onClick={() => handleEditarClick(producto)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="eliminar"
                        onClick={() => handleEliminarProducto(producto)}
                      >
                        🗑️ Eliminar
                      </button>
                      <button
                        className="btn-ver"
                        onClick={() => { setProductoVer(producto); setModalVerAbierto(true); }}
                      >
                        <span role="img" aria-label="ver">👁️</span> Ver completo
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
      <ModalVerProducto
        producto={productoVer}
        isOpen={modalVerAbierto}
        onClose={() => setModalVerAbierto(false)}
      />
    </div>
  );
}

export default TablaProductos;