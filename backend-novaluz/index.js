const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://tienda-novaluz.vercel.app',
  credentials: true
}));

app.use(express.json());

const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');

app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Arranca el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});