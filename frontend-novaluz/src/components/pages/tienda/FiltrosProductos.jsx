import React, { useState, useEffect } from 'react';

function FiltrosProductos({ onFiltroChange, categorias = [], subcategorias = [], loading, filtros }) {
  const [filtrosLocal, setFiltrosLocal] = useState({
    categoria: '',
    subcategoria: '',
    precioMin: '',
    precioMax: '',
    ordenar: 'nombre'
  });

  useEffect(() => {
    setFiltrosLocal(filtros);
  }, [filtros]);

  const categoriasOptions = [
    { id: '', nombre: 'Todas las categorías' },
    ...categorias.map(cat => ({ id: cat, nombre: cat }))
  ];

  const subcategoriasOptions = [
    { id: '', nombre: 'Todas las subcategorías' },
    ...subcategorias.map(sub => ({ id: sub, nombre: sub }))
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevosFiltros = { ...filtrosLocal, [name]: value };
    // Si cambia la categoría, reiniciar subcategoría
    if (name === 'categoria') {
      nuevosFiltros.subcategoria = '';
    }
    setFiltrosLocal(nuevosFiltros);
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
              subcategoria: '',
              precioMin: '',
              precioMax: '',
              ordenar: 'nombre'
            };
            setFiltrosLocal(filtrosLimpios);
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
            value={filtrosLocal.categoria}
            onChange={handleChange}
            disabled={loading}
          >
            {categoriasOptions.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {filtrosLocal.categoria && (
          <div className="filtro-grupo">
            <label>Subcategoría:</label>
            <select
              name="subcategoria"
              value={filtrosLocal.subcategoria}
              onChange={handleChange}
              disabled={loading || subcategorias.length === 0}
            >
              {subcategoriasOptions.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="filtro-grupo">
          <label>Precio mínimo:</label>
          <input
            type="number"
            name="precioMin"
            value={filtrosLocal.precioMin}
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
            value={filtrosLocal.precioMax}
            onChange={handleChange}
            placeholder="€1000"
            min="0"
          />
        </div>

        <div className="filtro-grupo">
          <label>Ordenar por:</label>
          <select 
            name="ordenar" 
            value={filtrosLocal.ordenar}
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