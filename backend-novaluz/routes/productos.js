const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un producto nuevo
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Si es un array, insertamos todos los productos
      const productos = await Producto.insertMany(req.body);
      res.status(201).json(productos);
    } else {
      // Si es un solo producto, insertamos uno
      const producto = new Producto(req.body);
      await producto.save();
      res.status(201).json(producto);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Editar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(productoActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borrar un producto
router.delete('/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;