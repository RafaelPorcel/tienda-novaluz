import React from 'react';
import HeroBanner from '../components/pages/inicio/HeroBanner';
import CategoriasSection from '../components/pages/inicio/CategoriasSection';
import ProductosDestacados from '../components/pages/inicio/ProductosDestacados';
import BeneficiosSection from '../components/pages/inicio/BeneficiosSection';
import ContactoHome from '../components/pages/inicio/ContactoHome';

function Inicio() {
  return (
    <div className="inicio">
      <HeroBanner />
      <CategoriasSection />
      <ProductosDestacados />
      <BeneficiosSection />
      <ContactoHome />
    </div>
  );
}

export default Inicio; 