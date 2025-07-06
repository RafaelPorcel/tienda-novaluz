// 1. Importamos React y el hook useState
import React, { useState } from "react";

// 2. Definimos las categorías y subcategorías fijas
const categorias = ["Ventiladores", "Lámparas", "Bombillas"];

const subcategoriasPorCategoria = {
  "Ventiladores": ["Techo", "Pared", "Pie", "Industrial"],
  "Lámparas": ["Techo", "Pie", "Apliques", "Plafones", "Ojos de buey"],
  "Bombillas": ["LED", "Halógena", "Bajo Consumo"]
};

function AñadirProducto() {
  // 3. Creamos un estado para cada campo del formulario
  const [nombre, setNombre] = useState(""); // Estado para el nombre del producto
  const [categoria, setCategoria] = useState(""); // Estado para la categoría seleccionada
  const [subcategoria, setSubcategoria] = useState(""); // Estado para la subcategoría seleccionada
  const [precio, setPrecio] = useState(""); // Estado para el precio
  const [stock, setStock] = useState(""); // Estado para el stock

  // (Opcional) Estado para mensajes de éxito o error
  const [mensaje, setMensaje] = useState("");

  // Aquí irá el resto del código (renderizado del formulario, validación, envío, etc.)

  return (
    <div>
      <h2>Añadir nuevo producto</h2>
      <form>
        {/* Campo: Nombre */}
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Introduce el nombre del producto"
            required
          />
        </div>
  
        {/* Campo: Categoría */}
        <div>
          <label>Categoría:</label>
          <select
            value={categoria}
            onChange={e => {
              setCategoria(e.target.value);
              setSubcategoria(""); // Al cambiar categoría, resetea subcategoría
            }}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
  
        {/* Campo: Subcategoría */}
        <div>
          <label>Subcategoría:</label>
          <select
            value={subcategoria}
            onChange={e => setSubcategoria(e.target.value)}
            required
            disabled={!categoria} // Solo habilitado si hay categoría seleccionada
          >
            <option value="">Selecciona una subcategoría</option>
            {categoria &&
              subcategoriasPorCategoria[categoria].map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
          </select>
        </div>
  
        {/* Campo: Precio */}
        <div>
          <label>Precio (€):</label>
          <input
            type="number"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            min="0"
            step="0.01"
            placeholder="Ej: 19.99"
            required
          />
        </div>
  
        {/* Campo: Stock */}
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
            min="0"
            step="1"
            placeholder="Ej: 10"
            required
          />
        </div>
  
        {/* Botón para añadir producto */}
        <button type="submit" disabled={!nombre || !categoria || !subcategoria || !precio || !stock}>
          Añadir producto
        </button>
      </form>
    </div>
  );
}

export default AñadirProducto;