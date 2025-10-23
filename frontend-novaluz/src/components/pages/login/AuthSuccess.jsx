import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken, setUser } = useAuth();
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Guardar token y usuario en localStorage
      localStorage.setItem('token', token);
      
      // Decodificar el token para obtener información del usuario
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = {
          id: payload.userId,
          email: payload.email
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        
        // Redirigir al inicio después de 2 segundos
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Error procesando token:', error);
        navigate('/login?error=auth_failed');
      }
    } else {
      navigate('/login?error=no_token');
    }
  }, [token, navigate, setToken, setUser]);

  return (
    <section className="login-form-section">
      <div className="container">
        <div className="login-container">
          <div className="form-card">
            <div className="form-header">
              <h2>¡Autenticación exitosa!</h2>
              <p>Te has logueado correctamente con Google</p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <p style={{ fontSize: '1.1rem', color: '#2f855a' }}>
                Redirigiendo al inicio...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthSuccess;
