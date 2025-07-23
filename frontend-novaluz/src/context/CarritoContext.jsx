import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carritoItems, setCarritoItems] = useState([]);

  const añadirAlCarrito = (producto) => {
    setCarritoItems((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarritoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarritoItems((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarritoItems([]);

  return (
    <CarritoContext.Provider
      value={{
        carritoItems,
        añadirAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
