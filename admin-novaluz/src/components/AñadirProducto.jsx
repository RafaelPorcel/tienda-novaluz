// Importamos React y el hook useState para manejar los estados del formulario
import React, { useState } from "react";
import './AñadirProducto.css';
// Importamos la función para crear productos en el backend
import { crearProducto } from '../utils/api';

// Definimos las categorías y subcategorías disponibles en el sistema
const categorias = ["Ventiladores", "Lámparas", "Bombillas"];

const subcategoriasPorCategoria = {
  "Ventiladores": ["De techo aspas normales", "De techo aspas retráctiles", "De pie", "De sobremesa"],
  "Lámparas": ["De sobremesa", "Plafones", "Flexos"],
  "Bombillas": ["Halógenas", "LED", "Bajo consumo"]
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
  // Estado para controlar si se está enviando el formulario
  const [enviando, setEnviando] = useState(false);

  // Función para validar que los campos obligatorios estén completos
  const validarCamposObligatorios = () => {
    if (!nombre.trim()) return "El nombre es obligatorio";
    if (!categoria) return "La categoría es obligatoria";
    if (!subcategoria) return "La subcategoría es obligatoria";
    if (!precio || precio <= 0) return "El precio debe ser mayor a 0";
    return null;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    const error = validarCamposObligatorios();
    if (error) {
      setMensaje(`Error: ${error}`);
      return;
    }

    // Activar estado de envío
    setEnviando(true);
    setMensaje("Guardando producto...");

    try {
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

      // Enviar producto al backend
      const productoGuardado = await crearProducto(nuevoProducto);
      
      // Mostrar mensaje de éxito
      setMensaje("✅ Producto guardado correctamente en la base de datos");
      
      // Limpiar formulario después de guardar
      limpiarFormulario();
      
    } catch (error) {
      // Mostrar mensaje de error
      setMensaje(`❌ Error al guardar el producto: ${error.message}`);
    } finally {
      // Desactivar estado de envío
      setEnviando(false);
    }
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

  return (
    <div className="añadir-producto-container">
      <form onSubmit={handleSubmit}>
        {/* SECCIÓN 1: Información básica */}
        <div className="ap-section">
          <h3 className="ap-section-title">📋 Información Básica</h3>
          <div className="ap-row">
            <div className="ap-label-input-group">
              <label className="ap-label-left">Nombre *</label>
          <input
            type="text"
            value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="ap-input-required"
            required
                placeholder="Ej: Ventilador de techo industrial"
          />
        </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Categoría *</label>
          <select
            value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="ap-input-required"
            required
                aria-label="Categoría *"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Subcategoría *</label>
          <select
            value={subcategoria}
                onChange={(e) => setSubcategoria(e.target.value)}
                className="ap-input-required"
                disabled={!categoria}
            required
                aria-label="Subcategoría *"
          >
            <option value="">Selecciona una subcategoría</option>
                {categoria && subcategoriasPorCategoria[categoria]?.map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
          </select>
        </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Precio (€) *</label>
          <input
            type="number"
            value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="ap-input-required"
            min="0"
            step="0.01"
            required
                placeholder="Ej: 29.99"
          />
            </div>
          </div>
        </div>
        {/* SECCIÓN 2: Información adicional */}
        <div className="ap-section">
          <h3 className="ap-section-title">📝 Información Adicional</h3>
          <div className="ap-row">
            <div className="ap-label-input-group stock-group">
              <label className="ap-label-left">Stock</label>
          <input
            type="number"
            value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="ap-input"
            min="0"
            placeholder="Ej: 10"
              />
            </div>
            <div className="ap-label-input-group img-group">
              <label className="ap-label-left">Imagen (URL)</label>
              <input
                type="text"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                className="ap-input"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>
          <div className="ap-label-input-group descripcion-group">
            <label className="ap-label-left">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="ap-input"
              rows={2}
              placeholder="Añade una descripción..."
            />
          </div>
        </div>
        {/* SECCIÓN 3: Características técnicas */}
        <div className="ap-section">
          <h3 className="ap-section-title">⚙️ Características Técnicas</h3>
          <div className="ap-row">
            <div className="ap-label-input-group">
              <label className="ap-label-left">Marca</label>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="ap-input"
                placeholder="Ej: Osram, Philips..."
              />
            </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Potencia</label>
              <input
                type="text"
                value={potencia}
                onChange={(e) => setPotencia(e.target.value)}
                className="ap-input"
                placeholder="Ej: 60W, 100W..."
              />
            </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Peso (kg)</label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="ap-input"
                min="0"
                step="0.01"
                placeholder="Ej: 2.5"
              />
            </div>
          </div>
        </div>
        {/* SECCIÓN 4: Medidas del producto */}
        <div className="ap-section">
          <h3 className="ap-section-title">📏 Medidas del Producto</h3>
          <div className="ap-row">
            <div className="ap-label-input-group">
              <label className="ap-label-left">Alto (cm)</label>
              <input
                type="number"
                value={medidasAlto}
                onChange={(e) => setMedidasAlto(e.target.value)}
                className="ap-input"
                min="0"
                step="0.01"
                placeholder="Ej: 30.5"
              />
            </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Ancho (cm)</label>
              <input
                type="number"
                value={medidasAncho}
                onChange={(e) => setMedidasAncho(e.target.value)}
                className="ap-input"
                min="0"
                step="0.01"
                placeholder="Ej: 25.0"
              />
            </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Largo (cm)</label>
              <input
                type="number"
                value={medidasLargo}
                onChange={(e) => setMedidasLargo(e.target.value)}
                className="ap-input"
                min="0"
                step="0.01"
                placeholder="Ej: 15.2"
              />
            </div>
          </div>
        </div>
        {/* SECCIÓN 5: Medidas del embalaje */}
        <div className="ap-section">
          <h3 className="ap-section-title">📦 Medidas del Embalaje</h3>
          <div className="ap-row">
            <div className="ap-label-input-group">
              <label className="ap-label-left">Alto embalaje (cm)</label>
              <input
                type="number"
                value={embalajeAlto}
                onChange={(e) => setEmbalajeAlto(e.target.value)}
                className="ap-input"
                min="0"
                step="0.01"
                placeholder="Ej: 35.0"
              />
            </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Ancho embalaje (cm)</label>
              <input
                type="number"
                value={embalajeAncho}
                onChange={(e) => setEmbalajeAncho(e.target.value)}
                className="ap-input"
                min="0"
                step="0.01"
                placeholder="Ej: 30.0"
              />
            </div>
            <div className="ap-label-input-group">
              <label className="ap-label-left">Largo embalaje (cm)</label>
              <input
                type="number"
                value={embalajeLargo}
                onChange={(e) => setEmbalajeLargo(e.target.value)}
                className="ap-input"
                min="0"
                step="0.01"
                placeholder="Ej: 20.0"
              />
            </div>
          </div>
        </div>
        {/* SECCIÓN 6: Otros campos */}
        <div className="ap-section">
          <h3 className="ap-section-title">🗂️ Otros</h3>
          <div className="ap-row">
            <div className="ap-label-input-group otros-group">
              <label className="ap-label-left">Otros</label>
              <input
                type="text"
                value={otros}
                onChange={(e) => setOtros(e.target.value)}
                className="ap-input"
                placeholder="Cualquier información adicional..."
              />
            </div>
          </div>
        </div>
        {/* Mensaje de validación */}
        {mensaje && (
          <div className={`ap-mensaje${mensaje.includes('✅') ? ' exito' : ''}`}>{mensaje}</div>
        )}
        {/* Botón de enviar */}
        <button
          type="submit"
          className="ap-boton"
          disabled={enviando}
        >
          {enviando ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
}

export default AñadirProducto;