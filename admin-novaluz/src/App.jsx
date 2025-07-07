// Importamos los estilos globales de la aplicación
import './App.css';
// Importamos los componentes de React Router para gestionar las rutas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Importamos las páginas/componentes principales
import Productos from './pages/Productos';
import PageAñadirProducto from './pages/AñadirProducto';

// Componente principal de la aplicación React
function App() {
  return (
    // BrowserRouter envuelve toda la app y habilita la navegación entre páginas
    <BrowserRouter>
      <div>
        {/* Definición de las rutas de la aplicación */}
        <Routes>
          {/* Si la ruta es '/', redirige automáticamente a '/productos' */}
          <Route path="/" element={<Navigate to="/productos" />} />
          {/* Ruta para la página de gestión de productos (tabla y filtros) */}
          <Route path="/productos" element={<Productos />} />
          {/* Ruta para la página de añadir un nuevo producto */}
          <Route path="/productos/nuevo" element={<PageAñadirProducto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;