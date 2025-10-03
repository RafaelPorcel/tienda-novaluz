import React, { useState, useEffect } from 'react';
import FiltrosProductos from '../components/pages/tienda/FiltrosProductos';
import ListaProductos from '../components/pages/tienda/ListaProductos';
import { getProductos } from '../utils/api';

function Tienda() {
  const [filtros, setFiltros] = useState({
    categoria: '',
    subcategoria: '',
    precioMin: '',
    precioMax: '',
    ordenar: 'nombre'
  });
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Tienda: Iniciando carga de productos...');
    console.log('API URL:', import.meta.env.VITE_API_URL);
    
    getProductos()
      .then(data => {
        console.log('Productos recibidos:', data);
        setProductos(data);
        // Extraer categorías únicas
        const cats = Array.from(new Set(data.map(p => p.categoria).filter(Boolean)));
        setCategorias(cats);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (filtros.categoria) {
      const subs = Array.from(new Set(productos
        .filter(p => p.categoria === filtros.categoria)
        .map(p => p.subcategoria)
        .filter(Boolean)));
      setSubcategorias(subs);
    } else {
      setSubcategorias([]);
    }
  }, [filtros.categoria, productos]);

  const handleFiltroChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  return (
    <div className="tienda">
      <div className="tienda-content">
        <div className="container">
          <div className="tienda-grid">
            <aside className="tienda-sidebar">
              <FiltrosProductos onFiltroChange={handleFiltroChange} categorias={categorias} subcategorias={subcategorias} loading={loading} filtros={filtros} />
            </aside>
            <main className="tienda-main">
              <ListaProductos filtros={filtros} productos={productos} loading={loading} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tienda; 