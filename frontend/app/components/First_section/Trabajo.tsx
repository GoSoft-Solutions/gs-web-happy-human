'use client';
import React from "react";
import { useRouter } from 'next/navigation';

export const Endsection: React.FC = () => {
  const router = useRouter();

  const handleReservaClick = () => {
    console.log('Navegando a /start');
    router.push('/start');
  };

  return (
    <div id="Trabajo" className="flex flex-col w-full mx-auto items-center relative bg-[#272F54] min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col h-auto items-start gap-2.5 px-3 sm:px-6 md:px-12 lg:px-[120px] xl:px-[180px] py-6 sm:py-8 md:py-12 lg:py-16 relative w-full max-w-[1983px] mx-auto bg-teal-700 rounded-[40px_0px_60px_0px] sm:rounded-[80px_0px_120px_0px] md:rounded-[120px_0px_180px_0px] lg:rounded-[198px_0px_323px_0px] border border-solid border-[#202648] mt-4 sm:mt-8 lg:mt-16">
              <div className="flex flex-col w-full max-w-[1602px] mx-auto items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 relative">
                {/* Main Heading */}
                <div className="relative w-full">
                  <div className="relative w-full max-w-[1241px] mx-auto px-2 sm:px-4">
                    <h1 className="relative w-full font-['DM_Serif_Display'] font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center tracking-[0.5px] sm:tracking-[0.3px] md:tracking-[0px] lg:tracking-[-0.5px] leading-relaxed sm:leading-normal drop-shadow-2xl z-20 mb-3 sm:mb-4">
                      Empieza a Transformar tu vida con tres pasos:
                    </h1>
                    <img
                      className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1230px] h-0.5 sm:h-1 lg:h-1.5 xl:h-2 mx-auto block z-10"
                      alt="Decorative element"
                      src="/Underlined2.png"
                    />
                  </div>
                </div>

                {/* Three Steps - Layout responsivo mejorado */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 relative w-full px-2 sm:px-4">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white font-['Merienda_One'] font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center tracking-[-0.3px] sm:tracking-[-0.5px] lg:tracking-[-0.8px] leading-normal whitespace-nowrap">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">📆</span>
                    <span>Reserva</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white font-['Merienda_One'] font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center tracking-[-0.3px] sm:tracking-[-0.5px] lg:tracking-[-0.8px] leading-normal whitespace-nowrap">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">📞</span>
                    <span>Videollamada</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white font-['Merienda_One'] font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center tracking-[-0.3px] sm:tracking-[-0.5px] lg:tracking-[-0.8px] leading-normal whitespace-nowrap">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">🚀</span>
                    <span>Crecimiento</span>
                  </div>
                </div>

                {/* Botón responsive mejorado */}
                <button 
                  onClick={handleReservaClick}
                  className="bg-[#ffc13a] hover:bg-[#e6ad33] text-[#202648] font-bold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-colors duration-300 w-full max-w-[280px] sm:max-w-[320px] md:max-w-none md:w-auto shadow-lg"
                >
                  Reserva tu sesión
                </button>
              </div>
            </section>

      {/* Main Content Section */}
      <section className="relative w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32">
        {/* Header Section - HAPPY HUMAN responsive */}
        <div className="relative w-full h-auto mb-8 sm:mb-12 lg:mb-16">
          <div className="relative w-full max-w-[1000px] mx-auto px-4">
            {/* Título HAPPY HUMAN */}
            <h2 className="relative w-full font-playfair font-normal text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl-custom text-center tracking-0 leading-tight sm:leading-normal px-2 sm:px-4 mb-2">
              HAPPY HUMAN
            </h2>
            
            {/* Subrayado responsive */}
            <img
              className="w-full max-w-[300px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] h-1 sm:h-1.5 lg:h-2 mx-auto block"
              alt="Underline decoration"
              src="/Underlined2.png"
            />
          </div>
        </div>

        {/* Cards Container*/}
        <div className="relative w-full max-w-[1560px] mx-auto">
          {/* Layout responsivo para tarjetas e imagen */}
          <div className="flex flex-col lg:flex-row items-end gap-4 sm:gap-6 lg:gap-0 relative">
            {/* "Sí es para ti" Card - Responsiva */}
            <div className="flex flex-col w-full lg:w-[45%] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16 bg-white/5 rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-xl lg:shadow-2xl backdrop-blur-[32px] overflow-hidden relative">
              <img
                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-[40px] sm:h-[50px] md:h-[60px] object-contain"
                alt="Sí es para ti"
                src="/main_section/SIesparati.png"
              />
              <div className="font-source-sans font-normal text-white/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center leading-relaxed">
                <p className="mb-3 sm:mb-4 lg:mb-6">
                  Si buscas ayuda y quieres superarte.
                </p>
                <p className="mb-3 sm:mb-4 lg:mb-6">
                  Quienes quieren aprender de la mentalidad de un{' '}
                  <span className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-white">atleta olímpico</span>.
                </p>
                <p className="mb-3 sm:mb-4 lg:mb-6">
                  Quienes están dispuestos a invertir y trabajar en sí mismos.
                </p>
                <p>
                  Emprendedores, atletas, influencers, profesionistas...{' '}
                  <span className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-white">es para TODOS</span>.
                </p>
              </div>
            </div>

            {/* Image Section - Responsive positioning */}
            <div className="relative w-full lg:w-[25%] flex justify-center items-end lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:bottom-0 z-20 mt-4 lg:mt-0">
              <div className="relative w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
                {/* Imagen de sombra responsive */}
                <img
                  className="absolute w-[180px] sm:w-[220px] md:w-[260px] lg:w-[320px] xl:w-[360px] h-[90px] sm:h-[110px] md:h-[130px] lg:h-[160px] xl:h-[180px] bottom-0 left-1/2 transform -translate-x-1/2 z-5"
                  alt="Shadow mask"
                  src="/Elipse_mask.png"
                />
                
                {/* Main image responsive */}
                <img
                  className="absolute w-full h-full object-contain object-bottom bottom-0 left-1/2 transform -translate-x-1/2 z-10"
                  alt="Person"
                  src="/main_section/HAPP011.png"
                />
              </div>
            </div>

            {/* "No es para ti" Card - Responsiva */}
            <div className="flex flex-col w-full lg:w-[45%] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16 bg-[#1A4D7A] rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-xl lg:shadow-2xl backdrop-blur-[32px] overflow-hidden relative lg:ml-auto mt-4 lg:mt-0">
              <img
                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-[32px] sm:h-[40px] md:h-[47.32px] object-contain"
                alt="No es para ti"
                src="/main_section/NOesparati.png"
              />
              <div className="font-source-sans font-normal text-white/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center leading-relaxed">
                <p className="mb-3 sm:mb-4 lg:mb-6">
                  Si buscas{' '}
                  <span className="font-bold text-white">una solución mágica sin esfuerzo</span>.
                </p>
                <p className="mb-3 sm:mb-4 lg:mb-6">
                  Quienes no están{' '}
                  <span className="font-bold text-white">dispuestos a trabajar y hacer cambios en su vida</span>.
                </p>
                <p className="mb-3 sm:mb-4 lg:mb-6">
                  Solo buscas algo muy "general".
                </p>
                <p>
                  Personas que no están dispuestas a invertir en ellas y quieren servicios baratos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Totalmente responsiva con más espacio */}
      <section className="flex flex-col w-full bg-teal-700 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20 mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative w-full max-w-5xl mx-auto">
          {/* Título responsive */}
          <h2 className="font-dm-serif font-normal text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center leading-tight px-2 sm:px-4">
            ¿Cuánto vale para ti <span className="text-red-500">desbloquear</span> tu máximo potencial?
          </h2>
          
          {/* Botón responsive */}
          <button 
            onClick={handleReservaClick}
            className="bg-[#ffc13a] hover:bg-[#e6ad33] text-[#202648] font-bold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-colors duration-300 min-w-[200px] sm:min-w-[240px] w-full max-w-[300px] sm:max-w-none sm:w-auto"
          >
            Reserva tu sesión
          </button>
        </div>
      </section>
    </div>
  );
};

export default Endsection;