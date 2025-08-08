'use client';
import React from 'react';

// ============================================
// INTERFACES
// ============================================

interface SessionOption {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
}

interface CoachInfo {
  name: string;
  businessName: string;
  avatar?: string;
}

interface SessionComponentProps {
  userName: string;
  coachInfo: CoachInfo;
  coachLoading: boolean;
  sessionOptions: SessionOption[];
  selectedSession: string;
  onSessionSelect: (sessionId: string) => void;
  onProceedToBooking: () => void;
}

// ============================================
// COMPONENTE PRINCIPAL MEJORADO
// ============================================

const SessionComponent: React.FC<SessionComponentProps> = ({
  userName,
  coachInfo,
  coachLoading,
  sessionOptions,
  selectedSession,
  onSessionSelect,
  onProceedToBooking
}) => {
  // ✅ FIX: Función mejorada para determinar personalización
  const shouldPersonalize = userName && 
    userName !== 'Usuario' && 
    userName !== '[Cargando...]' && 
    userName !== 'Cargando...' &&
    userName.trim().length > 0;
  
  // ✅ FIX: Extraer solo el primer nombre REAL del usuario
  const firstName = shouldPersonalize ? userName.split(' ')[0] : null;
  
  console.log('🎯 SessionComponent - Datos recibidos:', {
    userName,
    shouldPersonalize,
    firstName
  });
  
  return (
    <>
      {/* Sección Hero con mensaje de bienvenida ÉPICO */}
      <section className="max-w-6xl mx-auto px-6 py-15">
        {/* ✨ TÍTULO PERSONALIZADO ÉPICO - ARRIBA DE TODO */}
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-24 text-center">
          ¡Felicidades por llegar hasta aquí!
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Columna izquierda - Texto de bienvenida personalizado */}
          <div className="text-white space-y-6">
            
            <div className="space-y-6 text-lg">
              {/* ✨ SALUDO PERSONALIZADO - ÚNICA VEZ QUE APARECE EL NOMBRE */}
              <p className="font-semibold text-2xl text-[#c4a64b] mb-14">
                Hola {shouldPersonalize && firstName ? firstName : '[Nombre]'}
              </p>
              
              {/* ✨ NUEVO MENSAJE DE LA IMAGEN */}
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Permíteme decirte que estamos a un paso de liberar tu mejor versión de ti, en <span className="text-[#c4a64b] font-semibold">Happy Human</span> creemos que cada persona tiene un potencial enorme esperando ser liberado.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Y con ello, juntos impulsaremos cambios reales en tu vida a través de pilares fundamentales como: <span className="text-red-400 font-semibold">la disciplina, la mentalidad, los hábitos y el propósito</span>.
                </p>
                
                <p className="text-lg leading-relaxed italic">
                  "Aquí no se trata solo de alcanzar tus metas, sino de descubrir quién eres realmente y hacia dónde puedes llegar."
                </p>
                
                <p className="text-lg leading-relaxed">
                  Ya sea que quieras alcanzar nuevas metas, encontrar claridad o simplemente reconectar contigo, estaré encantado de acompañarte en este viaje.
                </p>
                
                {/* ✨ FIRMA */}
                <div className="pt-6">
                  <p className="text-blue-400 font-semibold text-lg">Daniel Corral</p>
                  <p className="text-blue-300 text-sm">CEO & Director of Happy Human</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Imagen del coach */}
          <div className="flex justify-center items-start">
            <div className="w-[450px] h-[550px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              {coachInfo.avatar ? (
                <img 
                  src={coachInfo.avatar} 
                  alt={coachInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="/Schedule_section/HAPP015.jpg"
                  alt="Daniel Corral"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sección de selección de sesión SIN personalización excesiva */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        
        {/* ✨ TÍTULO DE SECCIÓN SIN NOMBRE DEL USUARIO */}
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl font-bold mb-4 font-serif">
            Elige tu Sesión de Transformación
          </h2>
          
          {/* Subtítulo sin personalización */}
          <p className="text-white/80 text-lg mb-6">
            Cada opción está diseñada para impulsar tu crecimiento personal
          </p>
          
          <div className="flex justify-center">
            <div className="h-2 w-24 bg-gradient-to-r from-yellow-400 to-[#c4a64b] rounded-full"></div>
          </div>
        </div>
        
        {/* Grid de opciones de sesión MEJORADO */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sessionOptions.map((session) => (
            <div 
              key={session.id}
              className={`bg-white rounded-xl p-8 shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col relative overflow-hidden ${
                selectedSession === session.id 
                  ? 'ring-4 ring-[#c4a64b] shadow-2xl bg-gradient-to-br from-white to-yellow-50' 
                  : 'hover:shadow-2xl'
              }`}
              onClick={() => onSessionSelect(session.id)}
            >
              {/* Indicador de selección SIN personalización */}
              {selectedSession === session.id && (
                <div className="absolute top-4 right-4 bg-[#c4a64b] text-white px-3 py-1 rounded-full text-sm font-bold">
                  Seleccionado
                </div>
              )}
              
              {/* Información de la sesión */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {session.title}
                </h3>
                <p className="text-gray-600 mb-4">{session.subtitle}</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${session.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">{session.currency}</span>
                </div>
                <p className="text-sm text-gray-500">{session.duration} minutos de transformación</p>
              </div>
              
              {/* Lista de características incluidas */}
              <ul className="space-y-3 mb-8 text-sm text-gray-700 flex-grow">
                {session.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#c4a64b] mr-2 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Botón de selección SIN personalización */}
              <button 
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mt-auto transform hover:scale-105 ${
                  selectedSession === session.id
                    ? 'bg-gradient-to-r from-[#c4a64b] to-yellow-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedSession === session.id 
                  ? '✓ Seleccionado'
                  : 'Seleccionar esta opción'
                }
              </button>
            </div>
          ))}
        </div>

        {/* ✨ BOTÓN PARA CONTINUAR SIN personalización excesiva */}
        {selectedSession && (
          <div className="text-center mt-15">
            
            
            <button 
              onClick={onProceedToBooking}
              className="bg-gradient-to-r from-[#c4a64b] to-yellow-500 hover:from-yellow-500 hover:to-[#c4a64b] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Continuar con la Reserva
            </button>
            
            {/* Mensaje motivacional final SIN personalización */}
            <p className="text-white/80 text-sm mt-4 italic">
              Tu mejor versión te está esperando ✨
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default SessionComponent;