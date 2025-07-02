'use client'
import React from "react";

export const Home = () => {
  return (
    <div id="Inicio" className="flex flex-col lg:flex-row min-h-screen w-full">
      
      {/* Sección izquierda - Contenido de texto */}
      <div className="flex flex-col w-full lg:w-1/2 order-2 lg:order-1 h-screen lg:h-auto">
        
        {/* Título principal - MÁS PRESENCIA */}
        <div className="bg-[#202648] flex-[1.5] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6">
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight sm:leading-tight md:leading-tight text-center lg:text-left [text-shadow:0px_4px_4px_#00000040] max-w-full">
            Desbloquea tu mejor versión en solo una sesión.
          </h1>
        </div>

        {/* Subtítulo - COMPACTO */}
        <div className="bg-[#0e122d] flex-[0.8] flex items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4">
          <p className="text-[#8b7871] text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl leading-relaxed text-center lg:text-left">
            <span className="font-semibold">
              Claridad, dirección y una conversación honesta que te rete a ser quien sabes que{" "}
            </span>
            <span className="font-bold italic text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl">
              puedes ser
            </span>
          </p>
        </div>

{/* Sección CTA - CENTRADA HACIA LA IZQUIERDA */}
<div className="bg-[#272f54] flex-[1] flex flex-col justify-center items-start px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6">
  
  {/* Botón principal - CENTRADO EN EL ÁREA */}
  <div className="w-full flex justify-start pl-0 sm:pl-4 md:pl-8 lg:pl-12 mb-6 sm:mb-8">
    <button className="bg-[#ffc13a] hover:bg-[#e6ad33] text-[#202648] font-bold text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full transition-all duration-300 min-w-[200px] sm:min-w-[250px] md:min-w-[280px] hover:scale-105 shadow-xl hover:shadow-2xl">
      Reserva tu sesión
    </button>
  </div>
  
  {/* Imagen "Conoce más" - ALINEADA CON EL BOTÓN */}
  <div className="w-full flex justify-start pl-0 sm:pl-4 md:pl-8 lg:pl-12">
    <img
      className="h-14 sm:h-20 w-auto object-contain"
      alt="Conoce más"
      src="/main_section/conocemas.png"
    />
  </div>
</div>
    </div>

      {/* Sección derecha - Imagen con fondos */}
      <div className="relative w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-auto overflow-hidden order-1 lg:order-2">
        
        {/* Fondos de color superpuestos */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#ffc13a]" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#1f2547]" />
        </div>
        
        {/* Imagen principal superpuesta */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <img
            className="max-w-full max-h-full object-cover object-center"
            alt="Camisa blanca"
            src="/main_section/HAPP001.png"
          />
        </div>

        {/* Overlay sutil para mejor contraste en móvil */}
        <div className="absolute inset-0 z-5 bg-black/5 lg:bg-transparent"></div>
      </div>

      {/* Elementos decorativos responsivos */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#ffc13a] rounded-full opacity-20 z-20"></div>
    </div>
  );
};

export default Home;