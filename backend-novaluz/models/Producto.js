const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  categoria: { type: String, required: true },
  subcategoria: String,
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imagen: String,
  medidas: {
    alto: Number,
    ancho: Number,
    largo: Number
  },
  embalaje: {
    alto: Number,
    ancho: Number,
    largo: Number
  },
  peso: Number,
  marca: String,
  potencia: String,
  otros: String // Puedes cambiarlo a Array u Objeto si lo prefieres
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;