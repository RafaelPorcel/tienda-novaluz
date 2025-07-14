import React, { useState } from 'react';

function FiltrosProductos({ onFiltroChange }) {
  const [filtros, setFiltros] = useState({
    categoria: '',
    precioMin: '',
    precioMax: '',
    ordenar: 'nombre'
  });

  const categorias = [
    { id: '', nombre: 'Todas las categorías' },
    { id: 'iluminacion', nombre: 'Iluminación LED' },
    { id: 'ventilacion', nombre: 'Ventilación' },
    { id: 'accesorios', nombre: 'Accesorios' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);
    onFiltroChange(nuevosFiltros);
  };

  return (
    <div className="filtros-productos">
      <div className="filtros-header">
        <h3>Filtros</h3>
        <button 
          className="btn-limpiar-filtros"
          onClick={() => {
            const filtrosLimpios = {
              categoria: '',
              precioMin: '',
              precioMax: '',
              ordenar: 'nombre'
            };
            setFiltros(filtrosLimpios);
            onFiltroChange(filtrosLimpios);
          }}
        >
          Limpiar Filtros
        </button>
      </div>

      <div className="filtros-content">
        <div className="filtro-grupo">
          <label>Categoría:</label>
          <select 
            name="categoria" 
            value={filtros.categoria}
            onChange={handleChange}
          >
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Precio mínimo:</label>
          <input
            type="number"
            name="precioMin"
            value={filtros.precioMin}
            onChange={handleChange}
            placeholder="€0"
            min="0"
          />
        </div>

        <div className="filtro-grupo">
          <label>Precio máximo:</label>
          <input
            type="number"
            name="precioMax"
            value={filtros.precioMax}
            onChange={handleChange}
            placeholder="€1000"
            min="0"
          />
        </div>

        <div className="filtro-grupo">
          <label>Ordenar por:</label>
          <select 
            name="ordenar" 
            value={filtros.ordenar}
            onChange={handleChange}
          >
            <option value="nombre">Nombre A-Z</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="popularidad">Más Populares</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FiltrosProductos; 