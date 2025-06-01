'use client';
import React from "react";
import { useRouter } from 'next/navigation';

export const StartPage: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#363d69] relative">

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

      {/* Hero Section - ¿Estás listo para juntos liberar tu mejor versión? */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Título principal */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              ¿Estás listo para juntos<br />liberar tu mejor versión?
            </h1>
            <p className="text-white/80 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto">
              Durante este viaje hacia <span className="text-red-500 font-semibold underline">liberar la mejor versión de ti</span>, encontrarás:
            </p>
          </div>

          {/* Grid con imagen central y textos alrededor */}
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

              {/* Columna izquierda */}
              <div className="space-y-8 lg:space-y-12">
                {/* Dirección */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-left">Dirección</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    ¿Estás listo para actuar con claridad y efectividad cada día?
                  </p>
                </div>

                {/* Estrategias Prácticas */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-left">Estrategias<br />Prácticas</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    ¿Qué transformarías en tu vida si aplicaras principios que funcionan?
                  </p>
                </div>
              </div>

              {/* Imagen central */}
              <div className="flex justify-center">
                <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[350px] sm:h-[400px] md:h-[480px] lg:h-[520px]">
                  {/* Fondo naranja */}
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-400 to-orange-600 rounded-[20px] sm:rounded-[30px]"></div>

                  {/* Imagen de la persona */}
                  <div className="absolute inset-x-4 bottom-0 top-12">
                    <img
                      className="w-full h-full object-cover object-center rounded-[15px] sm:rounded-[20px]"
                      alt="Persona con mochila"
                      src="/main_section/HAPP005.png"
                    />
                  </div>

                  {/* Texto central superpuesto */}
                  <div className="absolute top-4 left-4 right-4 text-center">
                    <h2 className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold">
                      Cambio de<br />Mentalidad
                    </h2>
                  </div>

                  {/* Texto inferior */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm sm:text-base font-medium">
                      ¿Estás Listo?
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-8 lg:space-y-12">
                {/* Un Plan de Acción */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-right lg:text-left">Un Plan<br />de Acción</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed text-right lg:text-left">
                    ¿Qué cambios lograrías si tuvieras herramientas accionables para alinear cada área de tu vida con tu propósito?
                  </p>
                </div>

                {/* Motivación Aplicable */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-right lg:text-left">Motivación<br />Aplicable</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed text-right lg:text-left">
                    ¿Estás dispuesto a ver tu propósito desde una nueva perspectiva y saber qué pasos tomar para ser quien realmente puedes ser?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comencemos Section - Formulario */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Título de sección */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-red-500 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              ¡Comencemos!
            </h2>
            <div className="w-full max-w-md mx-auto h-1 bg-red-500"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Formulario */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
                <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
                  Para poder ayudarte mejor en esta travesía, necesito algunos datos tuyos que me ayudarán a saber cómo iniciar, cómo personalizar nuestra charla en base a tus necesidades y así tener la mejor experiencia para <span className="font-bold text-white">¡dar inicio a tu transformación!</span>
                </p>

                <p className="text-white text-base sm:text-lg mb-6 font-medium">
                  Por ello, ayúdame con llenar con la siguiente información:
                </p>

                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Apellidos"
                      className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Celular"
                      className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Ocupación"
                      className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="¿Qué es lo que más te motiva a agendar?"
                      className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg"
                  >
                    ¡Listo, empecemos este viaje!
                  </button>
                </form>
              </div>
            </div>

            {/* Imagen del formulario */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-[280px] sm:w-[320px] md:w-[380px] h-[350px] sm:h-[400px] md:h-[480px] rounded-2xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Persona trabajando"
                  src="/main_section/HAPP006.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartPage;