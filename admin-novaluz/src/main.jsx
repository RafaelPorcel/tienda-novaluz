import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Busca el div con id 'root' en index.html y renderiza ahí el componente App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* React.StrictMode ayuda a detectar problemas potenciales en desarrollo */}
    <App /> {/* Componente principal de la aplicación */}
  </StrictMode>,
)