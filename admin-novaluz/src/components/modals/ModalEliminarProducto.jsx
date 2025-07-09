// Importamos React y los hooks necesarios
import React, { useState, useEffect } from "react";

// Componente modal para confirmar la eliminación de un producto
function ModalEliminarProducto({ producto, isOpen, onClose, onConfirm }) {
  // Estado para el nombre de confirmación que debe escribir el usuario
  const [nombreConfirmacion, setNombreConfirmacion] = useState("");
  // Estado para controlar si se está eliminando el producto
  const [eliminando, setEliminando] = useState(false);
  // Estado para mensajes de error o éxito
  const [mensaje, setMensaje] = useState("");

  // Limpiar el campo de confirmación cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setNombreConfirmacion("");
      setMensaje("");
      setEliminando(false);
    }
  }, [isOpen]);

  // Verificar si el nombre de confirmación coincide exactamente con el nombre del producto
  const nombreCoincide = nombreConfirmacion.trim() === producto?.nombre;

  // Función para manejar la confirmación de eliminación
  const handleConfirmarEliminacion = async () => {
    if (!nombreCoincide) {
      setMensaje("❌ El nombre no coincide. Escribe exactamente el nombre del producto.");
      return;
    }

    setEliminando(true);
    setMensaje("⏳ Eliminando producto...");

    try {
      // Llamar a la función de confirmación que viene del componente padre
      await onConfirm(producto.id);
      setMensaje("✅ Producto eliminado correctamente");
      
      // Cerrar el modal después de un breve delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      setMensaje(`❌ Error al eliminar el producto: ${error.message}`);
    } finally {
      setEliminando(false);
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  // Estilos para el modal
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: nombreCoincide ? "2px solid #28a745" : "2px solid #dc3545",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: nombreCoincide ? "#f8fff9" : "#fff5f5"
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold"
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        {/* Título del modal */}
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: "20px", 
          color: "#dc3545",
          fontSize: "20px"
        }}>
          ⚠️ Confirmar Eliminación
        </h3>

        {/* Información del producto a eliminar */}
        <div style={{ 
          backgroundColor: "#f8f9fa", 
          padding: "15px", 
          borderRadius: "4px", 
          marginBottom: "20px" 
        }}>
          <p style={{ margin: "5px 0", fontWeight: "bold" }}>
            Producto: <span style={{ color: "#dc3545" }}>{producto?.nombre}</span>
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
            Categoría: {producto?.categoria} - {producto?.subcategoria}
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
            Precio: €{producto?.precio}
          </p>
        </div>

        {/* Advertencia */}
        <div style={{ 
          backgroundColor: "#fff3cd", 
          border: "1px solid #ffeaa7", 
          padding: "15px", 
          borderRadius: "4px", 
          marginBottom: "20px" 
        }}>
          <p style={{ margin: 0, color: "#856404", fontWeight: "bold" }}>
            ⚠️ Esta acción no se puede deshacer
          </p>
          <p style={{ margin: "5px 0 0 0", color: "#856404", fontSize: "14px" }}>
            Para confirmar la eliminación, escribe exactamente el nombre del producto:
          </p>
        </div>

        {/* Campo de confirmación */}
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "bold",
            color: nombreCoincide ? "#28a745" : "#dc3545"
          }}>
            {nombreCoincide ? "✅ Nombre correcto" : "❌ Escribe el nombre exacto"}
          </label>
          <input
            type="text"
            value={nombreConfirmacion}
            onChange={(e) => setNombreConfirmacion(e.target.value)}
            style={inputStyle}
            placeholder={`Escribe: "${producto?.nombre}"`}
            disabled={eliminando}
          />
        </div>

        {/* Mensajes de estado */}
        {mensaje && (
          <div style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            backgroundColor: mensaje.includes("✅") ? "#d4edda" : "#f8d7da",
            color: mensaje.includes("✅") ? "#155724" : "#721c24",
            border: `1px solid ${mensaje.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {mensaje}
          </div>
        )}

        {/* Botones de acción */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            disabled={eliminando}
            style={{
              ...buttonStyle,
              backgroundColor: "#6c757d",
              color: "white"
            }}
          >
            Cancelar
          </button>
          
          <button
            onClick={handleConfirmarEliminacion}
            disabled={!nombreCoincide || eliminando}
            style={{
              ...buttonStyle,
              backgroundColor: nombreCoincide && !eliminando ? "#dc3545" : "#6c757d",
              color: "white",
              cursor: nombreCoincide && !eliminando ? "pointer" : "not-allowed"
            }}
          >
            {eliminando ? "⏳ Eliminando..." : "🗑️ Eliminar Producto"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEliminarProducto; 