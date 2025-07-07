// Importamos React y los hooks necesarios para manejar el estado y los efectos
import React, { useState, useEffect } from "react";

// Definimos las categorías y subcategorías igual que en el formulario principal
const categorias = ["Ventiladores", "Lámparas", "Bombillas"];
const subcategoriasPorCategoria = {
  "Ventiladores": ["De techo aspas normales", "De techo aspas retráctiles", "De pie", "De sobremesa"],
  "Lámparas": ["De sobremesa", "Plafones", "Flexos"],
  "Bombillas": ["Halógenas", "LED", "Bajo consumo"]
};

// Componente modal para editar un producto
function ModalEditarProducto({ producto, isOpen, onClose, onConfirm }) {
  // Estados para cada campo editable del formulario
  const [nombre, setNombre] = useState(""); // Nombre del producto
  const [descripcion, setDescripcion] = useState(""); // Descripción
  const [categoria, setCategoria] = useState(""); // Categoría
  const [subcategoria, setSubcategoria] = useState(""); // Subcategoría
  const [precio, setPrecio] = useState(""); // Precio
  const [stock, setStock] = useState(""); // Stock
  const [imagen, setImagen] = useState(""); // Imagen
  const [marca, setMarca] = useState(""); // Marca
  const [potencia, setPotencia] = useState(""); // Potencia
  const [peso, setPeso] = useState(""); // Peso
  const [medidasAlto, setMedidasAlto] = useState(""); // Medidas alto
  const [medidasAncho, setMedidasAncho] = useState(""); // Medidas ancho
  const [medidasLargo, setMedidasLargo] = useState(""); // Medidas largo
  const [embalajeAlto, setEmbalajeAlto] = useState(""); // Embalaje alto
  const [embalajeAncho, setEmbalajeAncho] = useState(""); // Embalaje ancho
  const [embalajeLargo, setEmbalajeLargo] = useState(""); // Embalaje largo
  const [otros, setOtros] = useState(""); // Otros

  // Estado para mensajes de validación y para saber si se está guardando
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Cuando se abre el modal, rellenar los estados con los datos actuales del producto
  useEffect(() => {
    if (isOpen && producto) {
      setNombre(producto.nombre || "");
      setDescripcion(producto.descripcion || "");
      setCategoria(producto.categoria || "");
      setSubcategoria(producto.subcategoria || "");
      setPrecio(producto.precio || "");
      setStock(producto.stock || "");
      setImagen(producto.imagen || "");
      setMarca(producto.marca || "");
      setPotencia(producto.potencia || "");
      setPeso(producto.peso || "");
      setMedidasAlto(producto.medidas?.alto || "");
      setMedidasAncho(producto.medidas?.ancho || "");
      setMedidasLargo(producto.medidas?.largo || "");
      setEmbalajeAlto(producto.embalaje?.alto || "");
      setEmbalajeAncho(producto.embalaje?.ancho || "");
      setEmbalajeLargo(producto.embalaje?.largo || "");
      setOtros(producto.otros || "");
      setMensaje("");
      setGuardando(false);
    }
  }, [isOpen, producto]);

  // Validación básica de campos obligatorios
  const validar = () => {
    if (!nombre.trim()) return "El nombre es obligatorio";
    if (!categoria) return "La categoría es obligatoria";
    if (!subcategoria) return "La subcategoría es obligatoria";
    if (!precio || precio <= 0) return "El precio debe ser mayor a 0";
    return null;
  };

  // Función para manejar el guardado de cambios
  const handleGuardar = async () => {
    const error = validar();
    if (error) {
      setMensaje(`❌ ${error}`);
      return;
    }
    setGuardando(true);
    setMensaje("⏳ Guardando cambios...");

    // Construir el objeto actualizado solo con los campos rellenados y bien formateados
    const productoEditado = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria,
      subcategoria,
      precio: parseFloat(precio),
      stock: stock !== "" ? parseInt(stock) : undefined,
      imagen: imagen.trim(),
      marca: marca.trim(),
      potencia: potencia.trim(),
      peso: peso !== "" ? parseFloat(peso) : undefined,
      otros: otros.trim()
    };

    // Solo incluir medidas si hay algún valor
    const medidasObj = {};
    if (medidasAlto !== "") medidasObj.alto = parseFloat(medidasAlto);
    if (medidasAncho !== "") medidasObj.ancho = parseFloat(medidasAncho);
    if (medidasLargo !== "") medidasObj.largo = parseFloat(medidasLargo);
    if (Object.keys(medidasObj).length > 0) {
      productoEditado.medidas = medidasObj;
    }

    // Solo incluir embalaje si hay algún valor
    const embalajeObj = {};
    if (embalajeAlto !== "") embalajeObj.alto = parseFloat(embalajeAlto);
    if (embalajeAncho !== "") embalajeObj.ancho = parseFloat(embalajeAncho);
    if (embalajeLargo !== "") embalajeObj.largo = parseFloat(embalajeLargo);
    if (Object.keys(embalajeObj).length > 0) {
      productoEditado.embalaje = embalajeObj;
    }

    try {
      // Llama a la función onConfirm que viene del padre (TablaProductos)
      // Enviamos el _id para que el backend sepa qué producto actualizar
      await onConfirm({ ...producto, ...productoEditado });
      setMensaje("✅ Cambios guardados correctamente");
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      setMensaje(`❌ Error al guardar: ${error.message}`);
    } finally {
      setGuardando(false);
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  // Estilos para el overlay y el modal
  const overlayStyle = {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
    justifyContent: "center", alignItems: "center", zIndex: 1000
  };
  const modalStyle = {
    background: "#fff", borderRadius: 8, padding: 30, width: "90%", maxWidth: 600,
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto"
  };
  // Estilos comunes para los campos
  const inputStyle = { width: "100%", padding: 8, marginBottom: 10, borderRadius: 4, border: "1px solid #ccc" };
  // Estilo para campos obligatorios
  const inputRequiredStyle = { ...inputStyle, border: "2px solid #dc3545", backgroundColor: "#fff5f5" };
  const labelStyle = { fontWeight: "bold", marginBottom: 3, display: "block" };
  // Estilo para etiquetas de campos obligatorios
  const labelRequiredStyle = { ...labelStyle, color: "#dc3545" };
  const sectionTitle = { fontSize: 16, fontWeight: "bold", margin: "18px 0 8px 0", color: "#2c3e50" };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        {/* Título del modal */}
        <h2 style={{ marginTop: 0, color: "#007bff" }}>✏️ Editar Producto</h2>

        {/* Sección: Información básica */}
        <div>
          <div style={sectionTitle}>Información básica</div>
          {/* Campo nombre */}
          <label style={labelRequiredStyle}>Nombre <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={inputRequiredStyle}
            placeholder="Ej: Ventilador de techo industrial"
            required
          />
          {/* Campo descripción */}
          <label style={labelStyle}>Descripción</label>
          <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Describe las características principales del producto..." />
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              {/* Selector de categoría */}
              <label style={labelRequiredStyle}>Categoría <span style={{ color: 'red' }}>*</span></label>
              <select
                value={categoria}
                onChange={e => { setCategoria(e.target.value); setSubcategoria(""); }}
                style={inputRequiredStyle}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              {/* Selector de subcategoría */}
              <label style={labelRequiredStyle}>Subcategoría <span style={{ color: 'red' }}>*</span></label>
              <select
                value={subcategoria}
                onChange={e => setSubcategoria(e.target.value)}
                style={{
                  ...inputRequiredStyle,
                  border: '2px solid #dc3545',
                  backgroundColor: '#fff5f5'
                }}
                disabled={!categoria}
                required
              >
                <option value="">Selecciona una subcategoría</option>
                {categoria && subcategoriasPorCategoria[categoria].map(subcat => <option key={subcat} value={subcat}>{subcat}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Sección: Precio y stock */}
        <div>
          <div style={sectionTitle}>Precio y stock</div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              {/* Campo precio */}
              <label style={labelRequiredStyle}>Precio (€) <span style={{ color: 'red' }}>*</span></label>
              <input
                type="number"
                value={precio}
                onChange={e => setPrecio(e.target.value)}
                style={inputRequiredStyle}
                min="0"
                step="0.01"
                placeholder="Ej: 29.99"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              {/* Campo stock */}
              <label style={labelStyle}>Stock</label>
              <input style={inputStyle} type="number" value={stock} onChange={e => setStock(e.target.value)} min="0" step="1" placeholder="Ej: 10" />
            </div>
          </div>
        </div>

        {/* Sección: Características técnicas */}
        <div>
          <div style={sectionTitle}>Características técnicas</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              {/* Campo marca */}
              <label style={labelStyle}>Marca</label>
              <input style={inputStyle} value={marca} onChange={e => setMarca(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              {/* Campo potencia */}
              <label style={labelStyle}>Potencia</label>
              <input style={inputStyle} value={potencia} onChange={e => setPotencia(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              {/* Campo peso */}
              <label style={labelStyle}>Peso (kg)</label>
              <input style={inputStyle} type="number" value={peso} onChange={e => setPeso(e.target.value)} min="0" step="0.1" />
            </div>
          </div>
        </div>

        {/* Sección: Medidas del producto */}
        <div>
          <div style={sectionTitle}>Medidas del producto</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              {/* Campo alto producto */}
              <label style={labelStyle}>Alto</label>
              <input style={inputStyle} type="number" value={medidasAlto} onChange={e => setMedidasAlto(e.target.value)} min="0" step="0.1" />
            </div>
            <div style={{ flex: 1 }}>
              {/* Campo ancho producto */}
              <label style={labelStyle}>Ancho</label>
              <input style={inputStyle} type="number" value={medidasAncho} onChange={e => setMedidasAncho(e.target.value)} min="0" step="0.1" />
            </div>
            <div style={{ flex: 1 }}>
              {/* Campo largo producto */}
              <label style={labelStyle}>Largo</label>
              <input style={inputStyle} type="number" value={medidasLargo} onChange={e => setMedidasLargo(e.target.value)} min="0" step="0.1" />
            </div>
          </div>
        </div>

        {/* Sección: Medidas del embalaje */}
        <div>
          <div style={sectionTitle}>Medidas del embalaje</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              {/* Campo alto embalaje */}
              <label style={labelStyle}>Alto</label>
              <input style={inputStyle} type="number" value={embalajeAlto} onChange={e => setEmbalajeAlto(e.target.value)} min="0" step="0.1" />
            </div>
            <div style={{ flex: 1 }}>
              {/* Campo ancho embalaje */}
              <label style={labelStyle}>Ancho</label>
              <input style={inputStyle} type="number" value={embalajeAncho} onChange={e => setEmbalajeAncho(e.target.value)} min="0" step="0.1" />
            </div>
            <div style={{ flex: 1 }}>
              {/* Campo largo embalaje */}
              <label style={labelStyle}>Largo</label>
              <input style={inputStyle} type="number" value={embalajeLargo} onChange={e => setEmbalajeLargo(e.target.value)} min="0" step="0.1" />
            </div>
          </div>
        </div>

        {/* Sección: Imagen y otros */}
        <div>
          <div style={sectionTitle}>Imagen y otros</div>
          {/* Campo imagen */}
          <label style={labelStyle}>URL de la imagen</label>
          <input style={inputStyle} value={imagen} onChange={e => setImagen(e.target.value)} />
          {/* Campo otros */}
          <label style={labelStyle}>Información adicional</label>
          <textarea style={{ ...inputStyle, minHeight: 40 }} value={otros} onChange={e => setOtros(e.target.value)} />
        </div>

        {/* Mensaje de validación o éxito */}
        {mensaje && (
          <div style={{
            padding: "10px", margin: "10px 0", borderRadius: "4px",
            backgroundColor: mensaje.includes("✅") ? "#d4edda" : "#f8d7da",
            color: mensaje.includes("✅") ? "#155724" : "#721c24",
            border: `1px solid ${mensaje.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {mensaje}
          </div>
        )}

        {/* Botones de acción */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
          <button
            onClick={onClose}
            disabled={guardando}
            style={{
              padding: "10px 20px", backgroundColor: "#6c757d", color: "white",
              border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer"
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            style={{
              padding: "10px 20px", backgroundColor: "#007bff", color: "white",
              border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer"
            }}
          >
            {guardando ? "⏳ Guardando..." : "💾 Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarProducto;