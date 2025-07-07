// Funciones para conectar con el backend
export const API_URL = 'http://localhost:5000/api';

// Obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

// Crear un producto nuevo
export const crearProducto = async (producto) => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// Eliminar un producto por ID
export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};