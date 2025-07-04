import { useState, useEffect } from 'react';
import { getProductos } from '../utils/api';

function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <h3>Lista de Productos</h3>
      {productos.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Categoría</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.nombre}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.categoria}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>€{producto.precio}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.stock}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button>Editar</button>
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablaProductos;