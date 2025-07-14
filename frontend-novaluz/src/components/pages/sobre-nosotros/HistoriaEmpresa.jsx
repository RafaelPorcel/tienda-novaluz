import React from 'react';

function HistoriaEmpresa() {
  return (
    <section className="historia-empresa">
      <div className="container">
        <div className="historia-content">
          <div className="historia-text">
            <h2>Nuestra Historia</h2>
            <p>
              Nova Luz nació en 2010 con la misión de proporcionar soluciones 
              de iluminación LED de alta calidad a precios accesibles. 
              Desde nuestros inicios, nos hemos comprometido con la innovación 
              y la sostenibilidad.
            </p>
            
            <div className="historia-momentos">
              <div className="momento">
                <div className="momento-fecha">2010</div>
                <div className="momento-content">
                  <h3>Fundación</h3>
                  <p>Nacimos como una pequeña tienda especializada en iluminación LED</p>
                </div>
              </div>
              
              <div className="momento">
                <div className="momento-fecha">2015</div>
                <div className="momento-content">
                  <h3>Expansión</h3>
                  <p>Ampliamos nuestro catálogo con ventilación y accesorios eléctricos</p>
                </div>
              </div>
              
              <div className="momento">
                <div className="momento-fecha">2020</div>
                <div className="momento-content">
                  <h3>Digitalización</h3>
                  <p>Lanzamos nuestra tienda online para llegar a más clientes</p>
                </div>
              </div>
              
              <div className="momento">
                <div className="momento-fecha">2024</div>
                <div className="momento-content">
                  <h3>Presente</h3>
                  <p>Somos líderes en iluminación LED con miles de clientes satisfechos</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="historia-stats">
            <div className="stat-item">
              <div className="stat-number">14+</div>
              <div className="stat-label">Años de experiencia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Clientes satisfechos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Productos en catálogo</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Soporte al cliente</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HistoriaEmpresa; 