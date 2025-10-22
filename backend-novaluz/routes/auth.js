const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret para JWT (en producción debe estar en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambiar_en_produccion';

// Función para generar ID personalizado de usuario
function generarIdUsuario() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `U${timestamp}${random}`;
}

// Registro de usuario
router.post('/registro', async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const { nombre, apellidos, email, password, telefono, direccion, ciudad, codigoPostal } = req.body;

    // Validar campos requeridos
    if (!nombre || !apellidos || !email || !password || !telefono || !direccion || !ciudad || !codigoPostal) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email no válido' });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Validar formato de teléfono (9 dígitos)
    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefono)) {
      return res.status(400).json({ message: 'El teléfono debe tener 9 dígitos' });
    }

    // Validar código postal (5 dígitos)
    const codigoPostalRegex = /^\d{5}$/;
    if (!codigoPostalRegex.test(codigoPostal)) {
      return res.status(400).json({ message: 'El código postal debe tener 5 dígitos' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        id: generarIdUsuario(),
        nombre,
        apellidos,
        email,
        password: hashedPassword,
        telefono,
        direccion,
        ciudad,
        codigoPostal
      }
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // No devolver la contraseña
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      usuario: usuarioSinPassword
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(403).json({ message: 'Usuario desactivado' });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Actualizar último acceso
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { ultimoAcceso: new Date() }
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // No devolver la contraseña
    const { password: _, ...usuarioSinPassword } = usuario;

    res.json({
      message: 'Login exitoso',
      token,
      usuario: usuarioSinPassword
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

// Middleware para verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Obtener perfil de usuario (ruta protegida)
router.get('/perfil', verificarToken, async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuario.id },
      select: {
        id: true,
        nombre: true,
        apellidos: true,
        email: true,
        telefono: true,
        direccion: true,
        ciudad: true,
        codigoPostal: true,
        pais: true,
        rol: true,
        fechaRegistro: true,
        ultimoAcceso: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

// Actualizar perfil de usuario
router.put('/perfil', verificarToken, async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const { nombre, apellidos, telefono, direccion, ciudad, codigoPostal } = req.body;

    const usuarioActualizado = await prisma.usuario.update({
      where: { id: req.usuario.id },
      data: {
        nombre,
        apellidos,
        telefono,
        direccion,
        ciudad,
        codigoPostal
      },
      select: {
        id: true,
        nombre: true,
        apellidos: true,
        email: true,
        telefono: true,
        direccion: true,
        ciudad: true,
        codigoPostal: true,
        pais: true,
        rol: true
      }
    });

    res.json({
      message: 'Perfil actualizado exitosamente',
      usuario: usuarioActualizado
    });

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

// Cambiar contraseña
router.put('/cambiar-password', verificarToken, async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const { passwordActual, passwordNuevo } = req.body;

    if (!passwordActual || !passwordNuevo) {
      return res.status(400).json({ message: 'Ambas contraseñas son obligatorias' });
    }

    if (passwordNuevo.length < 6) {
      return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    // Obtener usuario
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuario.id }
    });

    // Verificar contraseña actual
    const passwordValido = await bcrypt.compare(passwordActual, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Encriptar nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordNuevo, salt);

    // Actualizar contraseña
    await prisma.usuario.update({
      where: { id: req.usuario.id },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Contraseña actualizada exitosamente' });

  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar contraseña', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
module.exports.verificarToken = verificarToken;




