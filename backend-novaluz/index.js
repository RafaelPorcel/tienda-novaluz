const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://tienda-novaluz.vercel.app',
  credentials: true
}));

app.use(express.json());

// Configurar sesiones
app.use(session({
  secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambiar_en_produccion',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

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