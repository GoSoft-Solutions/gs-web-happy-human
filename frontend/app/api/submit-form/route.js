// app/api/submit-form/route.js

// REEMPLAZA esta URL con la URL de tu Google Apps Script actualizado
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEEke2flXEn9X_SEDhAlnurgsTgn-d0J46JzNqMbjowy1RIdXCcCutZ_S5PRx6KmDE/exec';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, apellidos, countryCode, celular, email, ocupacion, motivacion } = body;

    // Validación básica
    if (!nombre || !apellidos || !celular || !email) {
      return Response.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validación adicional de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    console.log('Enviando datos para verificación a Google Apps Script:', {
      nombre,
      apellidos,
      email,
      celular
    });

    // Enviar datos a Google Apps Script para crear verificación
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        apellidos,
        countryCode,
        celular,
        email,
        ocupacion,
        motivacion,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || '',
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      })
    });

    const result = await response.json();
    console.log('Respuesta de Google Apps Script:', result);

    if (result.success) {
      return Response.json({ 
        success: true, 
        message: 'Correo de verificación enviado exitosamente. Revisa tu bandeja de entrada.',
        email: result.email
      });
    } else {
      return Response.json(
        { error: result.message || 'Error al procesar el formulario' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error en API Route:', error);
    return Response.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Opcional: manejar GET para testing
export async function GET() {
  return Response.json({ 
    message: 'API Happy Human funcionando correctamente',
    timestamp: new Date().toISOString()
  });
}