import React, { useState } from 'react';

function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      alert('¡Mensaje enviado! Te responderemos pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
    }, 1500);
  };

  return (
    <div className="formulario-contacto">
      <h2>Envíanos un Mensaje</h2>
      <p>Rellena el formulario y nos pondremos en contacto contigo</p>
      
      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
            />
          </div>
          
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
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+34 600 000 000"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="asunto">Asunto *</label>
            <select
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta general</option>
              <option value="producto">Información de producto</option>
              <option value="pedido">Estado de pedido</option>
              <option value="devolucion">Devolución o cambio</option>
              <option value="tecnico">Soporte técnico</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Describe tu consulta o solicitud..."
          ></textarea>
        </div>

        <div className="form-options">
          <label className="checkbox-label">
            <input type="checkbox" required />
            <span className="checkmark"></span>
            Acepto la política de privacidad *
          </label>
          
          <label className="checkbox-label">
            <input type="checkbox" />
            <span className="checkmark"></span>
            Quiero recibir ofertas y novedades
          </label>
        </div>

        <button 
          type="submit" 
          className="btn-enviar"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Enviando...
            </>
          ) : (
            <>
              <span className="enviar-icon">📤</span>
              Enviar Mensaje
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormularioContacto; 