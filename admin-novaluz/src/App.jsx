import './App.css';
import Productos from './pages/Productos';

// Componente principal de la aplicación React
function App() {
  return (
    <div>
      {/* Título principal del panel de administración */}
      <h1>Panel de Administración NOVALUZ</h1>
      {/* Muestra la página de productos */}
      <Productos />
    </div>
  );
}

export default App;
