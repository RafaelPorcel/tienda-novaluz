// Utilidades para consumir la API de productos desde el frontend

// Obtener todos los productos
export const getProductos = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${id}`);
  if (!response.ok) throw new Error('Error al obtener el producto');
  return response.json();
}; 