// Importamos el hook useNavigate de React Router para poder navegar entre páginas
import { useNavigate } from "react-router-dom";
// Importamos el componente que contiene el formulario de alta de producto
import AñadirProducto from '../components/AñadirProducto';

// Página para añadir un nuevo producto al sistema
function PageAñadirProducto() {
  // Hook de React Router que nos permite cambiar de página programáticamente
  const navigate = useNavigate();

  return (
    <div>
      {/* Título de la página */}
      <h2>Añadir nuevo producto</h2>
      
      {/* Botón de navegación para volver a la página de productos */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate("/productos")} // Al hacer clic, navega a la ruta /productos
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#6c757d', // Color gris para diferenciarlo de botones de acción
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Volver a Productos {/* Flecha indica que es un botón de "volver" */}
        </button>
      </div>
      
      {/* Renderiza el componente que contiene el formulario de alta de producto */}
      <AñadirProducto />
    </div>
  );
}

export default PageAñadirProducto; 