import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
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
            setUserData(userData);
            setIsLoading(false);
            
            // Usuario logueado exitosamente - mostrar mensaje
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
            setUserData(user);
            setIsLoading(false);
            
            // Usuario logueado exitosamente - mostrar mensaje
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
            
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <p style={{ fontSize: '1.1rem', color: '#666' }}>
                  Cargando datos del usuario...
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <p style={{ fontSize: '1.1rem', color: '#2f855a', marginBottom: '1rem' }}>
                  ¡Bienvenido, {userData?.nombre || 'Usuario'}!
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '2rem' }}>
                  Email: {userData?.email}
                </p>
                <button 
                  onClick={() => navigate('/')}
                  style={{
                    background: 'linear-gradient(135deg, rgb(192, 45, 45) 0%, #c82333 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(192, 45, 45, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Ir al Inicio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthSuccess;
