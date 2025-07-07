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
      <div className="añadir-cabecera-flex">
        <button
          onClick={() => navigate("/productos")}
          className="añadir-cabecera-volver"
        >
          ← Volver a Productos
        </button>
        <h1 className="añadir-cabecera-titulo">Panel de Administración NOVALUZ</h1>
      </div>
      <h2 className="añadir-cabecera-subtitulo">Añadir nuevo producto</h2>
      <AñadirProducto />
    </div>
  );
}

export default PageAñadirProducto; 