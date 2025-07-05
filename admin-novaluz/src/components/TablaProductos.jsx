// Importamos los hooks necesarios de React y la función para obtener productos del backend
import { useState, useEffect } from 'react';
import { getProductos } from '../utils/api';

function TablaProductos() {
  // Estados para manejar los datos y la interfaz de usuario
  const [productos, setProductos] = useState([]); // Array con todos los productos de la base de datos
  const [productosFiltrados, setProductosFiltrados] = useState([]); // Array con solo los productos que coinciden con los filtros
  const [loading, setLoading] = useState(true); // Boolean que indica si está cargando datos (true = cargando, false = terminado)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // String con la categoría elegida en el selector
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(''); // String con la subcategoría elegida en el selector
  const [mostrarTabla, setMostrarTabla] = useState(false); // Boolean que controla si se muestra la tabla (true = mostrar, false = ocultar)

  // Obtener categorías únicas de todos los productos (sin repetir)
  const categorias = [...new Set(productos.map(p => p.categoria))];
  
  // Obtener subcategorías únicas de la categoría seleccionada
  const subcategorias = [...new Set(
    productos
      .filter(p => p.categoria === categoriaSeleccionada) // Solo productos de la categoría elegida
      .map(p => p.subcategoria) // Extrae las subcategorías
  )];

  // Cargar productos cuando el componente se monta (solo se ejecuta una vez)
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        // Hace la petición al backend para obtener todos los productos
        const data = await getProductos();
        setProductos(data); // Guarda los productos en el estado
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false); // Indica que terminó de cargar (exito o error)
      }
    };

    cargarProductos(); // Ejecuta la función de carga
  }, []); // Array vacío significa que solo se ejecuta al montar el componente

  // Filtrar productos cuando cambian las selecciones de categoría o subcategoría
  useEffect(() => {
    let filtrados = productos; // Empieza con todos los productos
    
    // Si hay categoría seleccionada, filtra por categoría
    if (categoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }
    
    // Si hay subcategoría seleccionada, filtra por subcategoría
    if (subcategoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.subcategoria === subcategoriaSeleccionada);
    }
    
    setProductosFiltrados(filtrados); // Guarda los productos filtrados
  }, [productos, categoriaSeleccionada, subcategoriaSeleccionada]); // Se ejecuta cuando cambian estos valores

  // Función que se ejecuta al presionar el botón "Mostrar Productos"
  const handleMostrarProductos = () => {
    setMostrarTabla(true); // Muestra la tabla
  };

  // Función que se ejecuta al presionar el botón "Limpiar Filtros"
  const handleLimpiarFiltros = () => {
    setCategoriaSeleccionada(''); // Resetea la categoría
    setSubcategoriaSeleccionada(''); // Resetea la subcategoría
    setMostrarTabla(false); // Oculta la tabla
    setProductosFiltrados([]); // Limpia los productos filtrados
  };

  // Si está cargando, muestra un mensaje de carga
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <h3>Filtros de Productos</h3>
      
      {/* Selector de categoría - permite elegir una categoría específica */}
      <div style={{ marginBottom: '10px' }}>
        <label>Categoría: </label>
        <select 
          value={categoriaSeleccionada} // Muestra la categoría seleccionada
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value); // Guarda la nueva categoría
            setSubcategoriaSeleccionada(''); // Resetear subcategoría cuando cambias categoría
          }}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">Todas las categorías</option>
          {/* Genera una opción por cada categoría única */}
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Selector de subcategoría - solo se muestra si hay categoría seleccionada */}
      {categoriaSeleccionada && (
        <div style={{ marginBottom: '10px' }}>
          <label>Subcategoría: </label>
          <select 
            value={subcategoriaSeleccionada} // Muestra la subcategoría seleccionada
            onChange={(e) => setSubcategoriaSeleccionada(e.target.value)} // Guarda la nueva subcategoría
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="">Todas las subcategorías</option>
            {/* Genera una opción por cada subcategoría de la categoría seleccionada */}
            {subcategorias.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
      )}

      {/* Botones de control - para mostrar productos y limpiar filtros */}
      <div style={{ marginBottom: '20px' }}>
        {/* Botón para mostrar la tabla de productos */}
        <button 
          onClick={handleMostrarProductos} // Ejecuta la función cuando se presiona
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
        
        {/* Botón para limpiar todos los filtros y ocultar la tabla */}
        <button 
          onClick={handleLimpiarFiltros} // Ejecuta la función cuando se presiona
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

      {/* Tabla de productos - solo se muestra si mostrarTabla es true */}
      {mostrarTabla && (
        <div>
          {/* Muestra el número de productos encontrados con los filtros */}
          <h4>Productos encontrados: {productosFiltrados.length}</h4>
          
          {/* Si no hay productos filtrados, muestra un mensaje */}
          {productosFiltrados.length === 0 ? (
            <p>No hay productos con los filtros seleccionados</p>
          ) : (
            /* Tabla con los productos filtrados */
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              {/* Encabezados de la tabla */}
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
              {/* Cuerpo de la tabla - genera una fila por cada producto */}
              <tbody>
                {productosFiltrados.map((producto) => (
                  <tr key={producto._id}> {/* _id es el identificador único de MongoDB */}
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.nombre}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.categoria}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.subcategoria}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>€{producto.precio}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.stock}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {/* Botones de acciones para cada producto */}
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