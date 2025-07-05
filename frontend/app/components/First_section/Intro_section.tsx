import React from "react";
import Image from "next/image";

const IntroSection: React.FC = () => {
  return (
    <section id="Inicio" className="main-section">
      <div className="bg-[#363D69] w-full min-h-screen flex items-center justify-center py-4 sm:py-6 lg:py-8">
        {/* Contenedor principal */}
        <div className="relative w-full max-w-full mx-auto px-2 sm:px-4 lg:px-6 h-full">
          
          {/* MÓVIL: Layout vertical simple */}
          <div className="md:hidden w-full space-y-4 sm:space-y-6">
            
            {/* 1. Amarillo - En una conversación */}
            <div className="bg-[#e8b258] w-full p-6 sm:p-8 rounded-2xl">
              <div className="text-center">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                  En una conversación <br />
                  te compartiré:
                </h2>
                <h3 className="text-[#292928] text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                  Los principios que <br />
                  me llevaron a la cima
                </h3>
              </div>
            </div>

            {/* 2. Verde - Tendrás las herramientas */}
            <div className="bg-[#73bfb5] w-full p-6 sm:p-8 rounded-2xl">
              <div className="text-center">
                <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                  Tendrás las herramientas <br />
                  necesarias para superar <br />
                  cualquier situación de tu <br />
                  vida y convertirla en tu <br />
                  <br />
                  <span className="text-[#292928] text-2xl sm:text-3xl md:text-4xl font-black">Éxito</span>
                </p>
              </div>
            </div>

            {/* 3. Verde - Esto no es solo una plática */}
            <div className="bg-[#73bfb5] w-full p-6 sm:p-8 rounded-2xl">
              <div className="text-center">
                <p className="text-[#292928] text-xl sm:text-2xl md:text-3xl font-black italic leading-tight">
                  Esto no es solo <br />
                  una plática ... <br />
                  <br />
                  ¡Es el inicio de tu <br />
                  transformación!
                </p>
              </div>
            </div>

            {/* 4. Imagen */}
            <div className="bg-[#dc5a38] w-full h-[450px] sm:h-[650px] relative rounded-2xl overflow-hidden">
              <Image
                src="/main_section/HAPP002.png"
                alt="Daniel"
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </div>
          </div>

          {/* Cuadros ocupan casi todo el espacio */}
          <div className="hidden md:block w-full h-full">
            <div className="relative w-full h-full min-h-[85vh] lg:min-h-[90vh] xl:min-h-[95vh]">
              
              {/* Grid 2x2 que ocupa casi todo el espacio disponible con altura responsiva */}
              <div className="grid grid-cols-2 grid-rows-2 rounded-2xl overflow-hidden h-[85vh] lg:h-[90vh] xl:h-[95vh] w-full">
                
                {/* Superior Izquierdo - Amarillo */}
                <div className="bg-[#e8b258] flex items-center justify-center p-6 lg:p-8 xl:p-12">
                  <div className="text-center">
                    <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight mb-4 lg:mb-6">
                      En una conversación <br />
                      te compartiré:
                    </h2>
                    <h3 className="text-[#292928] text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-tight">
                      Los principios que <br />
                      me llevaron a la cima
                    </h3>
                  </div>
                </div>

                {/* Superior Derecho - Verde */}
                <div className="bg-[#73bfb5] flex items-center justify-center p-6 lg:p-8 xl:p-12">
                  <div className="text-center">
                    <p className="text-[#292928] text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black italic leading-tight">
                      Esto no es solo <br />
                      una plática ... <br />
                      <br />
                      ¡Es el inicio de tu <br />
                      transformación!
                    </p>
                  </div>
                </div>

                {/* Inferior Izquierdo - Verde */}
                <div className="bg-[#73bfb5] flex items-center justify-center p-6 lg:p-8 xl:p-12">
                  <div className="text-center">
                    <p className="text-white text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight">
                      Tendrás las herramientas <br />
                      necesarias para superar <br />
                      cualquier situación de tu <br />
                      vida y convertirla en tu <br />
                      <br />
                      <span className="text-[#292928] text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black">Éxito</span>
                    </p>
                  </div>
                </div>

                {/* Inferior Derecho - Coral */}
                <div className="bg-[#dc5a38] relative">
                  {/* Solo el fondo coral */}
                </div>
              </div>

              {/* Imagen que sale del cuadrante coral como en el diseño original */}
              <div className="absolute bottom-[0%] right-[0%] w-[45%] h-[62%] z-20">
                <Image
                  src="/main_section/HAPP002.png"
                  alt="Daniel"
                  fill
                  priority
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 26%',
                  }}
                  className="rounded-br-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;