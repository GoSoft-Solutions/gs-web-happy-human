import React from "react";

export const HeroSection = () => {
  return (
    <section id="AcercaDe" className="main-section">
      <div className="w-full bg-[#A65014] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
        {/* Título principal */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif leading-tight">
            Al final de la sesión:
          </h1>
        </div>

        {/* Contenedor principal responsive */}
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          
          {/* Sección superior - Puntos 01, 02, 03 con imagen izquierda */}
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            
            {/* Imagen con sombra - EXACTO AL DISEÑO */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-start relative">
              <div className="relative">
                {/* Imagen principal con bordes redondeados como el diseño */}
                <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[420px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[480px] xl:h-[520px] rounded-[40px] sm:rounded-[50px] lg:rounded-[60px] overflow-hidden transform -translate-x-6 sm:-translate-x-8 lg:-translate-x-12 shadow-2xl">
                  <img
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    alt="Persona trabajando en laptop"
                    src="/main_section/HAPP003.jpg"
                  />
                </div>
                
                {/* Sombra lateral derecha */}
                <img
                  className="absolute -right-2 sm:-right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 w-[40px] sm:w-[60px] lg:w-[80px] xl:w-[100px] h-[200px] sm:h-[250px] lg:h-[300px] xl:h-[350px] object-contain opacity-70 z-10"
                  alt="Sombra lateral"
                  src="/Sombra_mask.png"
                />
              </div>
            </div>

            {/* Contenido de texto */}
            <div className="w-full lg:w-3/5 space-y-12 sm:space-y-14 lg:space-y-16">
              
              {/* Punto 01 - Claridad y Dirección */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/30 leading-none flex-shrink-0 mt-2">
                    01
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-2 sm:mb-3">
                      Claridad y Dirección
                    </h2>
                    <img
                      className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] h-1 sm:h-1.5 object-contain"
                      alt="Subrayado decorativo"
                      src="/underlined.png"
                    />
                  </div>
                </div>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  A veces la gente está perdida en su camino y necesita de alguien que haya pasado por el proceso de lucha, disciplina y éxito para ayudarles a encontrar su rumbo.
                  <br /><br />
                  Yo puedo ser ese "alguien" que todos en algún momento de nuestras vidas necesitamos.
                </p>
              </div>

              {/* Punto 02 - Cambio de mentalidad */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/30 leading-none flex-shrink-0 mt-2">
                    02
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-2 sm:mb-3">
                      Cambio de mentalidad
                    </h2>
                    <img
                      className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] h-1 sm:h-1.5 object-contain"
                      alt="Subrayado decorativo"
                      src="/underlined.png"
                    />
                  </div>
                </div>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  Después de la sesión comenzarás a ver las cosas de una manera diferente, desbloqueando creencias limitantes o dudas que te detenían.
                </p>
              </div>

              {/* Punto 03 - Estrategias Prácticas */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/30 leading-none flex-shrink-0 mt-2">
                    03
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-2 sm:mb-3">
                      Estrategias Prácticas
                    </h2>
                    <img
                      className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] h-1 sm:h-1.5 object-contain"
                      alt="Subrayado decorativo"
                      src="/underlined.png"
                    />
                  </div>
                </div>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  <span className="font-black text-base sm:text-lg lg:text-xl xl:text-2xl text-white">NO solo es inspiración.</span>
                  <br /><br />
                  Son, herramientas específicas para mejorar tu disciplina, enfoque, relación o tu forma de enfrentar los desafíos.
                </p>
              </div>
            </div>
          </div>

          {/* Sección inferior - Puntos 04, 05 con imagen derecha */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-12 lg:gap-16">
            
            {/* Imagen con sombra - Cortada hacia el borde derecho */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end relative">
              <div className="relative">
                {/* Imagen principal cortada hacia el borde */}
                <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[420px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[480px] xl:h-[520px] rounded-[40px] sm:rounded-[50px] lg:rounded-[60px] overflow-hidden transform translate-x-6 sm:translate-x-8 lg:translate-x-12 shadow-2xl">
                  <img
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    alt="Persona leyendo documentos"
                    src="/main_section/HAPP004.jpg"
                  />
                </div>
                
                {/* Sombra lateral izquierda */}
                <img
                  className="absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 scale-x-[-1] w-[40px] sm:w-[90px] lg:w-[80px] xl:w-[100px] h-[200px] sm:h-[250px] lg:h-[300px] xl:h-[350px] object-contain opacity-70 z-10"
                  alt="Sombra lateral"
                  src="/Sombra_mask.png"
                />
              </div>
            </div>

            {/* Contenido de texto */}
            <div className="w-full lg:w-3/5 space-y-12 sm:space-y-14 lg:space-y-16">
              
              {/* Punto 04 - Motivación Realista */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/30 leading-none flex-shrink-0 mt-2">
                    04
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-2 sm:mb-3">
                      Motivación Realista<br />y Aplicable
                    </h2>
                    <img
                      className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] h-1 sm:h-1.5 object-contain"
                      alt="Subrayado decorativo"
                      src="/underlined.png"
                    />
                  </div>
                </div>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  <span className="font-bold text-white">No se trata del "tú puedes"</span>
                  <br /><br />
                  Sino de una visión concreta basada en lo que realmente funciona en la vida y en el alto rendimiento.
                </p>
              </div>

              {/* Punto 05 - Un Plan de Acción */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/30 leading-none flex-shrink-0 mt-2">
                    05
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-2 sm:mb-3">
                      Un Plan de Acción
                    </h2>
                    <img
                      className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] h-1 sm:h-1.5 object-contain"
                      alt="Subrayado decorativo"
                      src="/underlined.png"
                    />
                  </div>
                </div>
                <div className="text-white/90 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed space-y-4">
                  <p>
                    Una experiencia con <span className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-white">resultados reales</span>
                  </p>
                  <p>
                    Algo tangible con lo que puedas salir y aplicar en tu vida, relación, negocio, mentalidad o propósito.
                  </p>
                  <p>
                    Porque no se trata solo de aprender,
                  </p>
                  <p>
                    <span className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-white">Sino de transformar.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;