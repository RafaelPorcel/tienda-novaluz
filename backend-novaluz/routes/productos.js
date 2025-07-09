const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mapas de códigos para categorías y subcategorías
const codigosCategoria = {
  "Ventiladores": 1,
  "Bombillas": 2,
  "Lámparas": 3,
  // Añade más según tus necesidades
};
const codigosSubcategoria = {
  "De techo": 1,
  "De pie": 2,
  "LED": 1,
  "Halógenas": 2,
  "De sobremesa": 3,
  "Plafones": 4,
  "Flexos": 5,
  // Añade más según tus necesidades
};
function generarIdPersonalizado(categoria, subcategoria) {
  const cat = codigosCategoria[categoria] || 9;
  const subcat = codigosSubcategoria[subcategoria] || 9;
  const aleatorio = Math.floor(10000000 + Math.random() * 90000000); // 8 dígitos
  return `${cat}${subcat}${aleatorio}`;
}

const categoriasValidas = ["Ventiladores", "Lámparas", "Bombillas"];

const subcategoriasPorCategoria = {
  "Ventiladores": [
    "De techo aspas normales",
    "De techo aspas retráctiles",
    "De pie",
    "De sobremesa"
  ],
  "Lámparas": [
    "De sobremesa",
    "Plafones",
    "Flexos"
  ],
  "Bombillas": [
    "Halógenas",
    "LED",
    "Bajo consumo"
  ]
};

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un producto nuevo
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Validar todas las categorías y subcategorías
      for (const prod of req.body) {
        if (!categoriasValidas.includes(prod.categoria)) {
          return res.status(400).json({ message: `Categoría no válida: ${prod.categoria}` });
        }
        if (!subcategoriasPorCategoria[prod.categoria]?.includes(prod.subcategoria)) {
          return res.status(400).json({ message: `Subcategoría no válida para la categoría ${prod.categoria}: ${prod.subcategoria}` });
        }
      }
      // Si es un array, insertamos todos los productos
      const productosConId = req.body.map(prod => ({
        ...prod,
        id: prod.id || generarIdPersonalizado(prod.categoria, prod.subcategoria)
      }));
      const productos = await prisma.producto.createMany({ data: productosConId });
      res.status(201).json(productos);
    } else {
      // Validar categoría y subcategoría individual
      const data = req.body;
      if (!categoriasValidas.includes(data.categoria)) {
        return res.status(400).json({ message: `Categoría no válida: ${data.categoria}` });
      }
      if (!subcategoriasPorCategoria[data.categoria]?.includes(data.subcategoria)) {
        return res.status(400).json({ message: `Subcategoría no válida para la categoría ${data.categoria}: ${data.subcategoria}` });
      }
      // Si es un solo producto, insertamos uno
      if (!data.id) {
        data.id = generarIdPersonalizado(data.categoria, data.subcategoria);
      }
      const producto = await prisma.producto.create({ data });
      res.status(201).json(producto);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Editar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await prisma.producto.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(productoActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borrar un producto
router.delete('/:id', async (req, res) => {
  try {
    await prisma.producto.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;