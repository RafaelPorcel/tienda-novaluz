import React, { useState } from 'react';
import FiltrosProductos from '../components/pages/tienda/FiltrosProductos';
import ListaProductos from '../components/pages/tienda/ListaProductos';

function Tienda() {
  const [filtros, setFiltros] = useState({
    categoria: '',
    precioMin: '',
    precioMax: '',
    ordenar: 'nombre'
  });

  const handleFiltroChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  return (
    <div className="tienda">
      <div className="tienda-content">
        <div className="container">
          <div className="tienda-grid">
            <aside className="tienda-sidebar">
              <FiltrosProductos onFiltroChange={handleFiltroChange} />
            </aside>
            <main className="tienda-main">
              <ListaProductos filtros={filtros} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tienda; 