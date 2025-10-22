const sgMail = require('@sendgrid/mail');

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Función para enviar email de recuperación de contraseña
const enviarEmailRecuperacion = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Recuperar contraseña - Nova Luz',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://tienda-novaluz.vercel.app/logo_novaluz.png" alt="Nova Luz" style="height: 60px; width: auto; display: block; margin: 0 auto; border: none;" width="auto" height="60">
        </div>
        
        <h2 style="color: #c02d2d; text-align: center;">Recuperar tu contraseña</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          Hola,<br><br>
          Has solicitado recuperar tu contraseña en Nova Luz. 
          Haz clic en el botón de abajo para crear una nueva contraseña:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background: linear-gradient(135deg, #c02d2d 0%, #c82333 100%); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    display: inline-block;">
            Recuperar Contraseña
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          Si no solicitaste este cambio, puedes ignorar este email.<br>
          Este enlace expirará en 1 hora por seguridad.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          Nova Luz - Más de 20 años iluminando tu hogar<br>
          Avda. Villanueva de Córdoba, 43 - Pozoblanco<br>
          Tel: 957 130 334
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  enviarEmailRecuperacion
};
