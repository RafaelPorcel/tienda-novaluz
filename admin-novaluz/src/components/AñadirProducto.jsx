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
      {/* Aquí irá el formulario */}
    </div>
  );
}

export default AñadirProducto;