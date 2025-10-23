import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function LoginForm() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case 'telefono':
        if (value && !/^\d{9}$/.test(value)) {
          errors.telefono = 'Debe tener exactamente 9 dígitos';
        } else {
          delete errors.telefono;
        }
        break;
      case 'codigoPostal':
        if (value && !/^\d{5}$/.test(value)) {
          errors.codigoPostal = 'Debe tener exactamente 5 dígitos';
        } else {
          delete errors.codigoPostal;
        }
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Formato de email no válido';
        } else {
          delete errors.email;
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validar campo en tiempo real
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        // Iniciar sesión
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
          navigate('/');
        } else {
          setError(result.message);
        }
      } else {
        // Registro
        if (formData.password !== formData.confirmPassword) {
          setError('Las contraseñas no coinciden');
          setIsSubmitting(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
          setIsSubmitting(false);
          return;
        }

        const result = await register(
          formData.nombre, 
          formData.apellidos, 
          formData.email, 
          formData.password, 
          formData.telefono, 
          formData.direccion, 
          formData.ciudad, 
          formData.codigoPostal
        );
        
        if (result.success) {
          navigate('/');
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('Error al procesar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      apellidos: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      codigoPostal: ''
    });
    
    // Scroll hacia arriba siempre que cambies de modo
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="login-form-section">
      <div className="container">
        <div className="login-container">
          <div className="form-card">
            <div className="form-header">
              <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
              <p>{isLogin ? 'Accede a tu cuenta' : 'Únete a Nova Luz'}</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {!isLogin && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellidos">Apellidos *</label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required={!isLogin}
                    placeholder="123456789"
                    maxLength="9"
                    className={fieldErrors.telefono ? 'error' : ''}
                  />
                  {fieldErrors.telefono && (
                    <div className="field-error">{fieldErrors.telefono}</div>
                  )}
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="direccion">Dirección *</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required={!isLogin}
                    placeholder="Calle, número, piso"
                  />
                </div>
              )}

              {!isLogin && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ciudad">Ciudad *</label>
                    <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="Tu ciudad"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="codigoPostal">Código Postal *</label>
                    <input
                      type="text"
                      id="codigoPostal"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="12345"
                      maxLength="5"
                      className={fieldErrors.codigoPostal ? 'error' : ''}
                    />
                    {fieldErrors.codigoPostal && (
                      <div className="field-error">{fieldErrors.codigoPostal}</div>
                    )}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className={fieldErrors.email ? 'error' : ''}
                />
                {fieldErrors.email && (
                  <div className="field-error">{fieldErrors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña *</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Tu contraseña"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="Confirma tu contraseña"
                    />
                  </div>
                </div>
              )}

                     {isLogin && (
                       <div className="form-options">
                         <label className="checkbox-label">
                           <input type="checkbox" />
                           <span className="checkmark"></span>
                           Recordarme
                         </label>
                         <button 
                           type="button" 
                           className="forgot-password"
                           onClick={() => navigate('/forgot-password')}
                         >
                           ¿Olvidaste tu contraseña?
                         </button>
                       </div>
                     )}

              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                  </>
                ) : (
                  <>
                    <span className="submit-icon">
                      {isLogin ? '🔐' : '✅'}
                    </span>
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </>
                )}
              </button>
            </form>

            <div className="form-divider">
              <span>o</span>
            </div>

                   <div className="social-login">
                     <button 
                       type="button" 
                       className="btn-social btn-google"
                       onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`}
                     >
                       <span className="social-icon">🔍</span>
                       Continuar con Google
                     </button>
                     <button className="btn-social btn-facebook">
                       <span className="social-icon">📘</span>
                       Continuar con Facebook
                     </button>
                   </div>

            <div className="form-footer">
              <p>
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                <button 
                  type="button" 
                  className="toggle-mode"
                  onClick={toggleMode}
                >
                  {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm; 