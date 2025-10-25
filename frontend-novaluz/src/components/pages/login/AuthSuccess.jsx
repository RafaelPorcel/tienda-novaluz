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
      localStorage.setItem('token', token);
      setToken(token);
      
      // Obtener datos completos del usuario desde el backend
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/perfil`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            
            // Redirigir al inicio después de 2 segundos
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            throw new Error('Error al obtener datos del usuario');
          }
        } catch (error) {
          console.error('Error obteniendo datos del usuario:', error);
          // Fallback: usar datos básicos del token
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const user = {
              id: payload.userId,
              email: payload.email,
              nombre: 'Usuario',
              apellidos: 'Google'
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } catch (tokenError) {
            console.error('Error procesando token:', tokenError);
            navigate('/login?error=auth_failed');
          }
        }
      };
      
      fetchUserData();
    } else {
      navigate('/login?error=auth_failed');
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
