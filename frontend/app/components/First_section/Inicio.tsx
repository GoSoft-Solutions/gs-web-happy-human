import React from "react";

export const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      
      {/* Sección izquierda - Contenido de texto */}
      <div className="flex flex-col w-full lg:w-1/2 order-2 lg:order-1">
        
        {/* Título principal */}
        <div className="bg-[#202648] flex-1 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-12 lg:py-16">
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight text-center lg:text-left [text-shadow:0px_4px_4px_#00000040]">
            Desbloquea tu mejor versión en solo una sesión.
          </h1>
        </div>

        {/* Subtítulo */}
        <div className="bg-[#0e122d] px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8">
          <p className="text-[#8b7871] text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl leading-relaxed text-center lg:text-left">
            <span className="font-semibold">
              Claridad, dirección y una conversación honesta que te rete a ser quien sabes que{" "}
            </span>
            <span className="font-bold italic text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl">
              puedes ser
            </span>
          </p>
        </div>

        {/* Sección CTA */}
        <div className="bg-[#272f54] px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 lg:py-12 flex flex-col items-center lg:items-start gap-4 sm:gap-6">
          
          {/* Botón principal */}
          <button className="bg-[#ffc13a] hover:bg-[#e6ad33] text-[#202648] font-bold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 min-w-[200px] sm:min-w-[240px] hover:scale-105 shadow-lg">
            Reserva tu sesión
          </button>
          
          {/* Texto "Conoce más" con flecha */}
          <div className="flex items-end gap-3 sm:gap-4 lg:gap-6 mt-2 sm:mt-4">
            <div className="text-[#b27451] text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal transform rotate-[-0.08deg] [font-family:'Figma_Hand-Regular',Helvetica] tracking-[-1px] sm:tracking-[-2.16px] leading-tight sm:leading-[79.2px]">
              Conoce más
            </div>
            <img
              className="w-8 h-10 sm:w-10 sm:h-12 lg:w-12 lg:h-16 mb-1 sm:mb-2"
              alt="Flecha curvada"
              src="Flecha.png"
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
            className="w-full h-full object-cover object-center lg:object-center"
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