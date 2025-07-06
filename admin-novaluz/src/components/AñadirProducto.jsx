// Importamos React y el hook useState para manejar los estados del formulario
import React, { useState } from "react";

// Definimos las categorías y subcategorías disponibles en el sistema
const categorias = ["Ventiladores", "Lámparas", "Bombillas"];

const subcategoriasPorCategoria = {
  "Ventiladores": ["Techo", "Pared", "Pie", "Industrial"],
  "Lámparas": ["Techo", "Pie", "Apliques", "Plafones", "Ojos de buey"],
  "Bombillas": ["LED", "Halógena", "Bajo Consumo"]
};

// Componente principal del formulario de alta de producto
function AñadirProducto() {
  // Estados para los campos obligatorios
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [precio, setPrecio] = useState("");

  // Estados para los campos opcionales básicos
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("0");
  const [imagen, setImagen] = useState("");

  // Estados para características técnicas
  const [marca, setMarca] = useState("");
  const [potencia, setPotencia] = useState("");
  const [peso, setPeso] = useState("");

  // Estados para medidas del producto
  const [medidasAlto, setMedidasAlto] = useState("");
  const [medidasAncho, setMedidasAncho] = useState("");
  const [medidasLargo, setMedidasLargo] = useState("");

  // Estados para medidas del embalaje
  const [embalajeAlto, setEmbalajeAlto] = useState("");
  const [embalajeAncho, setEmbalajeAncho] = useState("");
  const [embalajeLargo, setEmbalajeLargo] = useState("");

  // Estados para otros campos
  const [otros, setOtros] = useState("");

  // Estado para mensajes de validación
  const [mensaje, setMensaje] = useState("");

  // Función para validar que los campos obligatorios estén completos
  const validarCamposObligatorios = () => {
    if (!nombre.trim()) return "El nombre es obligatorio";
    if (!categoria) return "La categoría es obligatoria";
    if (!subcategoria) return "La subcategoría es obligatoria";
    if (!precio || precio <= 0) return "El precio debe ser mayor a 0";
    return null;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    const error = validarCamposObligatorios();
    if (error) {
      setMensaje(error);
      return;
    }

    // Crear objeto con todos los datos del producto
    const nuevoProducto = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria,
      subcategoria,
      precio: parseFloat(precio),
      stock: parseInt(stock) || 0,
      imagen: imagen.trim(),
      medidas: {
        alto: medidasAlto ? parseFloat(medidasAlto) : undefined,
        ancho: medidasAncho ? parseFloat(medidasAncho) : undefined,
        largo: medidasLargo ? parseFloat(medidasLargo) : undefined
      },
      embalaje: {
        alto: embalajeAlto ? parseFloat(embalajeAlto) : undefined,
        ancho: embalajeAncho ? parseFloat(embalajeAncho) : undefined,
        largo: embalajeLargo ? parseFloat(embalajeLargo) : undefined
      },
      peso: peso ? parseFloat(peso) : undefined,
      marca: marca.trim(),
      potencia: potencia.trim(),
      otros: otros.trim()
    };

    // TODO: Aquí irá la función para enviar al backend
    console.log("Producto a guardar:", nuevoProducto);
    setMensaje("Producto guardado correctamente");
    
    // Limpiar formulario después de guardar
    limpiarFormulario();
  };

  // Función para limpiar todos los campos del formulario
  const limpiarFormulario = () => {
    setNombre("");
    setCategoria("");
    setSubcategoria("");
    setPrecio("");
    setDescripcion("");
    setStock("0");
    setImagen("");
    setMarca("");
    setPotencia("");
    setPeso("");
    setMedidasAlto("");
    setMedidasAncho("");
    setMedidasLargo("");
    setEmbalajeAlto("");
    setEmbalajeAncho("");
    setEmbalajeLargo("");
    setOtros("");
  };

  // Estilos comunes para los campos
  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px"
  };

  // Estilo para campos obligatorios
  const inputRequiredStyle = {
    ...inputStyle,
    border: "2px solid #dc3545",
    backgroundColor: "#fff5f5"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333"
  };

  // Estilo para etiquetas de campos obligatorios
  const labelRequiredStyle = {
    ...labelStyle,
    color: "#dc3545"
  };

  const sectionStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9"
  };

  const sectionTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#2c3e50",
    borderBottom: "2px solid #3498db",
    paddingBottom: "5px"
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        {/* SECCIÓN 1: Información básica */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>📋 Información Básica</h3>
          
          <div>
            <label style={labelRequiredStyle}>Nombre del producto *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={inputRequiredStyle}
              placeholder="Ej: Ventilador de techo industrial"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              placeholder="Describe las características principales del producto..."
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelRequiredStyle}>Categoría *</label>
              <select
                value={categoria}
                onChange={(e) => {
                  setCategoria(e.target.value);
                  setSubcategoria(""); // Resetear subcategoría al cambiar categoría
                }}
                style={inputRequiredStyle}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelRequiredStyle}>Subcategoría *</label>
              <select
                value={subcategoria}
                onChange={(e) => setSubcategoria(e.target.value)}
                style={inputRequiredStyle}
                disabled={!categoria}
                required
              >
                <option value="">Selecciona una subcategoría</option>
                {categoria &&
                  subcategoriasPorCategoria[categoria].map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: Precio y stock */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>💰 Precio y Stock</h3>
          
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelRequiredStyle}>Precio (€) *</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                style={inputRequiredStyle}
                min="0"
                step="0.01"
                placeholder="Ej: 29.99"
                required
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Stock disponible</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={inputStyle}
                min="0"
                step="1"
                placeholder="Ej: 10"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: Características técnicas */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>⚡ Características Técnicas</h3>
          
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Marca</label>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                style={inputStyle}
                placeholder="Ej: Philips, Osram..."
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Potencia</label>
              <input
                type="text"
                value={potencia}
                onChange={(e) => setPotencia(e.target.value)}
                style={inputStyle}
                placeholder="Ej: 60W, 100W..."
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Peso (kg)</label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                style={inputStyle}
                min="0"
                step="0.1"
                placeholder="Ej: 2.5"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 4: Medidas del producto */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>📏 Medidas del Producto (cm)</h3>
          
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Alto</label>
              <input
                type="number"
                value={medidasAlto}
                onChange={(e) => setMedidasAlto(e.target.value)}
                style={inputStyle}
                min="0"
                step="0.1"
                placeholder="Ej: 30.5"
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Ancho</label>
              <input
                type="number"
                value={medidasAncho}
                onChange={(e) => setMedidasAncho(e.target.value)}
                style={inputStyle}
                min="0"
                step="0.1"
                placeholder="Ej: 25.0"
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Largo</label>
              <input
                type="number"
                value={medidasLargo}
                onChange={(e) => setMedidasLargo(e.target.value)}
                style={inputStyle}
                min="0"
                step="0.1"
                placeholder="Ej: 15.2"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 5: Medidas del embalaje */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>📦 Medidas del Embalaje (cm)</h3>
          
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Alto</label>
              <input
                type="number"
                value={embalajeAlto}
                onChange={(e) => setEmbalajeAlto(e.target.value)}
                style={inputStyle}
                min="0"
                step="0.1"
                placeholder="Ej: 35.0"
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Ancho</label>
              <input
                type="number"
                value={embalajeAncho}
                onChange={(e) => setEmbalajeAncho(e.target.value)}
                style={inputStyle}
                min="0"
                step="0.1"
                placeholder="Ej: 30.0"
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Largo</label>
              <input
                type="number"
                value={embalajeLargo}
                onChange={(e) => setEmbalajeLargo(e.target.value)}
                style={inputStyle}
                min="0"
                step="0.1"
                placeholder="Ej: 20.0"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 6: Imagen y otros */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>🖼️ Imagen y Otros</h3>
          
          <div>
            <label style={labelStyle}>URL de la imagen</label>
            <input
              type="url"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              style={inputStyle}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <label style={labelStyle}>Información adicional</label>
            <textarea
              value={otros}
              onChange={(e) => setOtros(e.target.value)}
              style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
              placeholder="Cualquier información adicional sobre el producto..."
            />
          </div>
        </div>

        {/* Mensajes de validación */}
        {mensaje && (
          <div style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            backgroundColor: mensaje.includes("error") ? "#f8d7da" : "#d4edda",
            color: mensaje.includes("error") ? "#721c24" : "#155724",
            border: `1px solid ${mensaje.includes("error") ? "#f5c6cb" : "#c3e6cb"}`
          }}>
            {mensaje}
          </div>
        )}

        {/* Botones de acción */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button
            type="submit"
            style={{
              padding: "12px 30px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            💾 Guardar Producto
          </button>

          <button
            type="button"
            onClick={limpiarFormulario}
            style={{
              padding: "12px 30px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            🗑️ Limpiar Formulario
          </button>
        </div>
      </form>
    </div>
  );
}

export default AñadirProducto;