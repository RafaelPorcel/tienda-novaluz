import { useState, useEffect } from 'react';
import { getProductos } from '../utils/api';

function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState('');
  const [mostrarTabla, setMostrarTabla] = useState(false);

  // Obtener categorías únicas
  const categorias = [...new Set(productos.map(p => p.categoria))];
  
  // Obtener subcategorías únicas de la categoría seleccionada
  const subcategorias = [...new Set(
    productos
      .filter(p => p.categoria === categoriaSeleccionada)
      .map(p => p.subcategoria)
  )];

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Filtrar productos cuando cambian las selecciones
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

  const handleMostrarProductos = () => {
    setMostrarTabla(true);
  };

  const handleLimpiarFiltros = () => {
    setCategoriaSeleccionada('');
    setSubcategoriaSeleccionada('');
    setMostrarTabla(false);
    setProductosFiltrados([]);
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
            setSubcategoriaSeleccionada(''); // Resetear subcategoría
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

      {/* Botones */}
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
                      <button style={{ marginRight: '5px', padding: '4px 8px' }}>Editar</button>
                      <button style={{ padding: '4px 8px' }}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default TablaProductos;