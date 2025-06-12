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
// COMPONENTE PRINCIPAL
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
  return (
    <>
      {/* Sección Hero con mensaje de bienvenida */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Texto de bienvenida */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              ¡Felicidades por llegar hasta aquí!
            </h1>
            
            <div className="space-y-4 text-lg">
              {/* Saludo personalizado */}
              <p className="font-semibold">
                Hola {userName || '[Cargando...]'}
              </p>
              
              {/* Mensaje motivacional actualizado */}
              <p>
                Permíteme decirte que estamos a un paso de liberar tu mejor versión de ti, en <span className="text-yellow-400 font-semibold">Happy Human</span> creemos que cada persona tiene un potencial enorme esperando ser liberado. Y con ello, juntos impulsaremos cambios reales en tu vida a través de pilares fundamentales como: <span className="text-yellow-400 font-semibold">la disciplina, la mentalidad, los hábitos y el propósito.</span>
              </p>
              
              <p>
                Aquí no se trata solo de alcanzar tus metas, sino de descubrir quién eres realmente y hacia dónde puedes llegar. Ya sea que quieras alcanzar nuevas metas, encontrar claridad o simplemente reconectar contigo, estaré encantado de acompañarte en este viaje.
              </p>
            </div>
          </div>
          
          {/* Columna derecha - Imagen del coach */}
          <div className="flex justify-center items-start">
            <div className="w-100 h-95 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
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

      {/* Sección de selección de sesión */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl font-bold mb-4 font-serif">Costos por Sesión</h2>
          <div className="flex justify-center">
            <div className="h-2 w-24 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Grid de opciones de sesión */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sessionOptions.map((session) => (
            <div 
              key={session.id}
              className={`bg-white rounded-lg p-8 shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col ${
                selectedSession === session.id 
                  ? 'ring-4 ring-yellow-400 shadow-2xl' 
                  : 'hover:shadow-2xl'
              }`}
              onClick={() => onSessionSelect(session.id)}
            >
              {/* Información de la sesión */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {session.title}
                </h3>
                <p className="text-gray-600 mb-4">{session.subtitle}</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${session.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">{session.currency}</span>
                </div>
              </div>
              
              {/* Lista de características incluidas */}
              <ul className="space-y-3 mb-8 text-sm text-gray-700 flex-grow">
                {session.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Botón de selección */}
              <button 
                className={`w-full py-3 px-6 rounded font-semibold transition-all duration-200 mt-auto ${
                  selectedSession === session.id
                    ? 'bg-yellow-500 text-black shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedSession === session.id ? '✓ Seleccionado' : 'Seleccionar'}
              </button>
            </div>
          ))}
        </div>

        {/* Botón para continuar (solo visible cuando hay selección) */}
        {selectedSession && (
          <div className="text-center mt-12">
            <button 
              onClick={onProceedToBooking}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
            >
              Continuar con la Reserva
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default SessionComponent;