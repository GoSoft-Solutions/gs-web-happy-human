// app/verificar/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UserData {
  nombreCompleto: string;
  nombre: string;
  email: string;
}

// ✅ COMPONENTE SEPARADO QUE USA useSearchParams
const VerificarContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [estado, setEstado] = useState<'cargando' | 'exito' | 'error' | 'redirigiendo'>('cargando');
  const [mensaje, setMensaje] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  useEffect(() => {
    const verificarToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setEstado('error');
        setMensaje('Token de verificación no encontrado.');
        return;
      }

      try {
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEEke2flXEn9X_SEDhAlnurgsTgn-d0J46JzNqMbjowy1RIdXCcCutZ_S5PRx6KmDE/exec';
        
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?verify=true&token=${token}`, {
          method: 'GET',
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Respuesta del servidor:', responseData);
          
          if (responseData.success && responseData.verified) {
            setUserData(responseData.userData);
            setIsAlreadyVerified(responseData.already_verified || false);
            
            // ✅ FIX: Redirigir automáticamente SIN mostrar verificación
            if (responseData.already_verified) {
              // Usuario ya verificado - redirección inmediata
              console.log('Usuario ya verificado, redirigiendo inmediatamente...');
              setEstado('redirigiendo');
              setMensaje(`Redirigiendo a tu página personalizada, ${responseData.userData.nombre}...`);
              
              // Redirección inmediata para usuarios ya verificados
              setTimeout(() => {
                router.push(responseData.redirectUrl);
              }, 1000); // Solo 1 segundo
              
            } else {
              // Primera verificación - mostrar mensaje de éxito
              setEstado('exito');
              setMensaje(responseData.message);
              
              // Redirección después de mostrar éxito
              setTimeout(() => {
                router.push(responseData.redirectUrl);
              }, 3000);
            }
            
          } else {
            // Error en la verificación
            setEstado('error');
            setMensaje(responseData.message || 'Error al verificar el token.');
          }
        } else {
          setEstado('error');
          setMensaje('Error al procesar la verificación.');
        }
        
      } catch (error) {
        console.error('Error al verificar token:', error);
        setEstado('error');
        setMensaje('Error de conexión. Por favor intenta nuevamente.');
      }
    };

    verificarToken();
  }, [searchParams, router]);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleContinuar = () => {
    if (estado === 'exito' && userData) {
      router.push(`/Suscription?nombre=${encodeURIComponent(userData.nombreCompleto)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#363d69] relative flex flex-col">
      
      {/* Header con Logo HAPPY HUMAN */}
      <header className="relative z-50 w-full py-6 sm:py-8 lg:py-12">
        <div className="flex items-center justify-center">
          <div
            onClick={handleLogoClick}
            className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {/* Palabra HAPPY */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {['H', 'A', 'P', 'P', 'Y'].map((letter, index) => (
                <span key={index} className="font-serif font-bold text-[#c4a64b] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wider hover:text-[#d4b65b] transition-colors duration-300">
                  {letter}
                </span>
              ))}
            </div>
            {/* Palabra HUMAN */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {['H', 'U', 'M', 'A', 'N'].map((letter, index) => (
                <span key={index} className="font-serif font-bold text-[#c4a64b] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wider hover:text-[#d4b65b] transition-colors duration-300">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Tarjeta de verificación */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/20 text-center">
            
            {/* Estado de carga */}
            {estado === 'cargando' && (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#c4a64b] mx-auto mb-6"></div>
                <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                  Verificando tu acceso...
                </h1>
                <p className="text-white/80 text-lg">
                  Por favor espera mientras procesamos tu verificación.
                </p>
              </>
            )}

            {/* ✅ NUEVO: Estado de redirección para usuarios ya verificados */}
            {estado === 'redirigiendo' && (
              <>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                
                <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                  ¡Bienvenido de vuelta{userData?.nombre ? `, ${userData.nombre}` : ''}!
                </h1>
                
                <p className="text-white/80 text-lg mb-6">
                  {mensaje}
                </p>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-blue-300 font-medium">
                    🚀 Redirigiendo a tu experiencia personalizada...
                  </p>
                </div>
              </>
            )}

            {/* Estado de éxito (solo para primera verificación) */}
            {estado === 'exito' && (
              <>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                  {userData?.nombre ? `¡Perfecto ${userData.nombre}!` : '¡Verificación Exitosa!'}
                </h1>
                
                <p className="text-white/80 text-lg mb-6">
                  {mensaje}
                </p>
                
                {/* Mensaje de éxito personalizado */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-300 font-medium">
                    {isAlreadyVerified ? (
                      <>
                        ¡Bienvenido de vuelta! Tu acceso está activo y listo para usar. 
                        {userData?.nombre && ` ${userData.nombre}, tu experiencia personalizada te está esperando.`}
                      </>
                    ) : (
                      <>
                        ¡Genial! Tu correo ha sido verificado exitosamente. 
                        {userData?.nombre && ` ${userData.nombre}, tu experiencia personalizada está lista.`}
                      </>
                    )}
                  </p>
                </div>
                
                {/* Mensaje personalizado con datos reales */}
                {userData?.nombre && (
                  <div className="bg-[#c4a64b]/20 border border-[#c4a64b]/30 rounded-lg p-4 mb-6">
                    <p className="text-[#c4a64b] font-medium">
                      🎉 {userData.nombre}, tu experiencia personalizada con Happy Human está lista. 
                      ¡Prepárate para liberar tu mejor versión!
                    </p>
                  </div>
                )}
                
                {/* Información del enlace permanente */}
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-blue-300 font-medium text-sm">
                    💡 <strong>Acceso Permanente:</strong> Guarda este enlace en favoritos. 
                    Podrás usarlo siempre para acceder directamente a tu área personalizada.
                  </p>
                </div>
              </>
            )}

            {/* Estado de error */}
            {estado === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                  Error en la Verificación
                </h1>
                <p className="text-white/80 text-lg mb-6">
                  {mensaje}
                </p>
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-300 font-medium">
                    Si el problema persiste, puedes volver a registrarte desde el inicio o contactar nuestro soporte.
                  </p>
                </div>
              </>
            )}

            {/* Botón de acción */}
            {(estado === 'exito' || estado === 'error') && (
              <button
                onClick={handleContinuar}
                className="bg-[#c4a64b] hover:bg-[#d4b65b] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg"
              >
                {estado === 'exito' ? (
                  userData?.nombre ? 
                    `Continuar a Mi Experiencia, ${userData.nombre}` : 
                    'Continuar a Mi Experiencia'
                ) : (
                  'Volver al Inicio'
                )}
              </button>
            )}

            {/* Contador regresivo */}
            {estado === 'exito' && (
              <p className="text-white/60 text-sm mt-4">
                Redirigiendo automáticamente en unos segundos...
              </p>
            )}

            {estado === 'redirigiendo' && (
              <p className="text-white/60 text-sm mt-4">
                Redirigiendo en 1 segundo...
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-white/60 text-sm">
          © 2025 Happy Human - Liberando tu mejor versión
        </p>
      </footer>
    </div>
  );
};

// ✅ COMPONENTE PRINCIPAL CON SUSPENSE
const VerificarPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-[#363d69] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#c4a64b] mx-auto mb-6"></div>
          <h1 className="text-white text-2xl font-bold mb-4">
            Cargando verificación...
          </h1>
          <p className="text-white/80">
            Preparando tu experiencia personalizada
          </p>
        </div>
      </div>
    }>
      <VerificarContent />
    </Suspense>
  );
};

export default VerificarPage;