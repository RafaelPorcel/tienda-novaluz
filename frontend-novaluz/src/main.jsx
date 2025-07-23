import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

import { CarritoProvider } from './context/CarritoContext'; //Importamos el contexto


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider> {/* Envolvemos toda la app */}
      <App />
    </CarritoProvider>
  </React.StrictMode>
);
