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

  // Añadir nuevos estados para los filtros avanzados
  const [idFiltro, setIdFiltro] = useState("");
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  // Categorías y subcategorías
  const categorias = ["Ventiladores", "Lámparas", "Bombillas"];
  const subcategoriasPorCategoria = {
    "Ventiladores": ["De techo aspas normales", "De techo aspas retráctiles", "De pie", "De sobremesa"],
    "Lámparas": ["De sobremesa", "Plafones", "Flexos"],
    "Bombillas": ["Halógenas", "LED", "Bajo consumo"]
  };
  const subcategorias = categoriaSeleccionada ? subcategoriasPorCategoria[categoriaSeleccionada] || [] : [];

  // Calcular contadores por categoría y global
  const totalGlobal = productos.length;
  const conteoPorCategoria = categorias.reduce((acc, cat) => {
    acc[cat] = productos.filter(p => p.categoria === cat).length;
    return acc;
  }, {});

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
  const handleMostrarProductos = () => {
    let filtrados = productos;
    if (idFiltro) {
      filtrados = filtrados.filter(p => p._id && p._id.toLowerCase().includes(idFiltro.toLowerCase()));
    }
    if (nombreFiltro) {
      filtrados = filtrados.filter(p =>
        p.nombre && p.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
      );
    }
    if (categoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }
    if (subcategoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.subcategoria === subcategoriaSeleccionada);
    }
    if (marcaFiltro) {
      filtrados = filtrados.filter(p =>
        p.marca && p.marca.toLowerCase().includes(marcaFiltro.toLowerCase())
      );
    }
    if (precioMin) {
      filtrados = filtrados.filter(p => Number(p.precio) >= Number(precioMin));
    }
    if (precioMax) {
      filtrados = filtrados.filter(p => Number(p.precio) <= Number(precioMax));
    }
    setProductosFiltrados(filtrados);
    setMostrarTabla(true);
  };

  // Limpiar filtros y ocultar tabla
  const handleLimpiarFiltros = () => {
    setCategoriaSeleccionada("");
    setSubcategoriaSeleccionada("");
    setIdFiltro("");
    setNombreFiltro("");
    setMarcaFiltro("");
    setPrecioMin("");
    setPrecioMax("");
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
      <div className="contadores-productos">
        <span><b>Total productos:</b> {totalGlobal}</span>
        {categorias.map(cat => (
          <span key={cat} style={{marginLeft: '16px'}}><b>{cat}:</b> {conteoPorCategoria[cat]}</span>
        ))}
      </div>
      <div className="filtros-productos">
        <div>
          <label htmlFor="id-filtro">ID:</label>
          <input
            id="id-filtro"
            type="text"
            value={idFiltro}
            onChange={e => setIdFiltro(e.target.value)}
            placeholder="Buscar por ID"
          />
        </div>
        <div>
          <label htmlFor="nombre-filtro">Nombre:</label>
          <input
            id="nombre-filtro"
            type="text"
            value={nombreFiltro}
            onChange={e => setNombreFiltro(e.target.value)}
            placeholder="Buscar por nombre"
          />
        </div>
        <div>
          <label htmlFor="marca-filtro">Marca:</label>
          <input
            id="marca-filtro"
            type="text"
            value={marcaFiltro}
            onChange={e => setMarcaFiltro(e.target.value)}
            placeholder="Buscar por marca"
          />
        </div>
        <div className="filtros-precio-group">
          <label htmlFor="precio-min">Precio:</label>
          <input
            id="precio-min"
            type="number"
            value={precioMin}
            onChange={e => setPrecioMin(e.target.value)}
            placeholder="Mín"
            min="0"
            className="input-precio"
          />
          <span style={{margin: '0 4px'}}>-</span>
          <input
            id="precio-max"
            type="number"
            value={precioMax}
            onChange={e => setPrecioMax(e.target.value)}
            placeholder="Máx"
            min="0"
            className="input-precio"
          />
        </div>
        <div>
          <label htmlFor="categoria-select">Categoría:</label>
          <select
            id="categoria-select"
            value={categoriaSeleccionada}
            onChange={(e) => {
              setCategoriaSeleccionada(e.target.value);
              setSubcategoriaSeleccionada("");
            }}
            className="input-categoria"
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