// Importamos el hook useNavigate de React Router para poder navegar entre páginas
import { useNavigate } from "react-router-dom";
// Importamos el componente que contiene la tabla y filtros de productos
import TablaProductos from '../components/TablaProductos';

// Página principal de gestión de productos - muestra la tabla y botones de navegación
function Productos() {
    // Hook de React Router que nos permite cambiar de página programáticamente
    const navigate = useNavigate();

    return (
        <div>
            {/* Título de la página de gestión de productos */}
            <h2>Gestión de Productos</h2>
            
            {/* Botón de navegación para ir a la página de añadir producto */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => navigate("/productos/nuevo")} // Al hacer clic, navega a la ruta /productos/nuevo
                    style={{
                        marginRight: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#28a745', // Color verde para indicar acción positiva (añadir)
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Añadir Producto {/* Texto del botón */}
                </button>
            </div>
            
            {/* Renderiza el componente que contiene la tabla de productos y los filtros */}
            <TablaProductos />
        </div>
    );
}

export default Productos;