import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Contacto from './pages/Contacto';
import SobreNosotros from './pages/SobreNosotros';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import ForgotPassword from './components/pages/login/ForgotPassword';
import ResetPassword from './components/pages/login/ResetPassword';
import ScrollToTop from './components/ScrollToTop';
// Importar estilos
import './styles/components/Layout.css';
import './styles/components/Nav.css';
import './styles/components/Footer.css';
import './styles/pages/Inicio.css';
import './styles/pages/Tienda.css';
import './styles/pages/Contacto.css';
import './styles/pages/SobreNosotros.css';
import './styles/pages/Login.css';
import './styles/pages/Carrito.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
