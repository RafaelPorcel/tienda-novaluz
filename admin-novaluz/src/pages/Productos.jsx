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
            <div className="cabecera-flex">
                <h1 className="cabecera-titulo">Panel de Administración NOVALUZ</h1>
            </div>
            <h2 className="cabecera-subtitulo">Tabla de Productos</h2>
            <TablaProductos />
        </div>
    );
}

export default Productos;