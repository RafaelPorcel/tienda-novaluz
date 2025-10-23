const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configurar estrategia de Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    // Buscar usuario existente por Google ID
    let usuario = await prisma.usuario.findFirst({
      where: {
        OR: [
          { googleId: profile.id },
          { email: profile.emails[0].value }
        ]
      }
    });

    if (usuario) {
      // Usuario existe, actualizar Google ID si no lo tiene
      if (!usuario.googleId) {
        usuario = await prisma.usuario.update({
          where: { id: usuario.id },
          data: { googleId: profile.id }
        });
      }
      await prisma.$disconnect();
      return done(null, usuario);
    } else {
      // Crear nuevo usuario
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          nombre: profile.name.givenName,
          apellidos: profile.name.familyName || '',
          email: profile.emails[0].value,
          password: '', // No hay contraseña para usuarios de Google
          telefono: '',
          direccion: '',
          ciudad: '',
          codigoPostal: '',
          googleId: profile.id,
          activo: true
        }
      });
      
      await prisma.$disconnect();
      return done(null, nuevoUsuario);
    }
  } catch (error) {
    console.error('Error en Google OAuth:', error);
    return done(error, null);
  }
}));

// Serializar usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar usuario de la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const usuario = await prisma.usuario.findUnique({
      where: { id }
    });
    
    await prisma.$disconnect();
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
