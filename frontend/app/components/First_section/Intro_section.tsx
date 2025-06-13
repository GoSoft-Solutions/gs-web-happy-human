import React from "react";
import Image from "next/image";

const IntroSection: React.FC = () => {
  return (
    <section id="Inicio" className="main-section">
      <div className="bg-[#363D69] w-full min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20">
        {/* Contenedor principal */}
        <div className="relative w-full">
          
          {/* MÓVIL: Layout vertical simple */}
          <div className="md:hidden w-full space-y-6">
            
            {/* 1. Amarillo - En una conversación */}
            <div className="bg-[#e8b258] w-full p-6 sm:p-8 mx-4 rounded-2xl">
              <div className="text-center">
                <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-4">
                  En una conversación <br />
                  te compartiré:
                </h2>
                <h3 className="text-[#292928] text-2xl sm:text-3xl font-black leading-tight">
                  Los principios que <br />
                  me llevaron a la cima
                </h3>
              </div>
            </div>

            {/* 2. Verde - Tendrás las herramientas */}
            <div className="bg-[#73bfb5] w-full p-6 sm:p-8 mx-4 rounded-2xl">
              <div className="text-center">
                <p className="text-white text-xl sm:text-2xl font-bold leading-tight">
                  Tendrás las herramientas <br />
                  necesarias para superar <br />
                  cualquier situación de tu <br />
                  vida y convertirla en tu <br />
                  <br />
                  <span className="text-[#292928] text-2xl sm:text-3xl font-black">Éxito</span>
                </p>
              </div>
            </div>

            {/* 3. Verde - Esto no es solo una plática */}
            <div className="bg-[#73bfb5] w-full p-6 sm:p-8 mx-4 rounded-2xl">
              <div className="text-center">
                <p className="text-[#292928] text-xl sm:text-2xl font-black italic leading-tight">
                  Esto no es solo <br />
                  una plática ... <br />
                  <br />
                  ¡Es el inicio de tu <br />
                  transformación!
                </p>
              </div>
            </div>

            {/* 4. Imagen */}
            <div className="bg-[#dc5a38] w-full h-[400px] relative mx-4 rounded-2xl overflow-hidden">
              <Image
                src="/main_section/HAPP002.png"
                alt="Daniel"
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center bottom',
                }}
              />
            </div>
          </div>

          {/* DESKTOP: Recreado exacto al diseño */}
          <div className="hidden md:block w-full max-w-6xl mx-auto px-8">
            {/* Contenedor con borde azul como en el diseño */}
            <div className="bg-[#363D69] p-8 rounded-3xl shadow-2xl">
              <div className="relative">
                
                {/* Grid 2x2 exacto - SIN ESPACIOS */}
                <div className="grid grid-cols-2 grid-rows-2 rounded-2xl overflow-hidden h-[600px] lg:h-[700px]">
                  
                  {/* Superior Izquierdo - Amarillo */}
                  <div className="bg-[#e8b258] flex items-center justify-center p-8">
                    <div className="text-center">
                      <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-4">
                        En una conversación <br />
                        te compartiré:
                      </h2>
                      <h3 className="text-[#292928] text-2xl lg:text-3xl xl:text-4xl font-black leading-tight">
                        Los principios que <br />
                        me llevaron a la cima
                      </h3>
                    </div>
                  </div>

                  {/* Superior Derecho - Verde */}
                  <div className="bg-[#73bfb5] flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="text-[#292928] text-xl lg:text-2xl xl:text-3xl font-black italic leading-tight">
                        Esto no es solo <br />
                        una plática ... <br />
                        <br />
                        ¡Es el inicio de tu <br />
                        transformación!
                      </p>
                    </div>
                  </div>

                  {/* Inferior Izquierdo - Verde */}
                  <div className="bg-[#73bfb5] flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="text-white text-xl lg:text-2xl xl:text-3xl font-bold leading-tight">
                        Tendrás las herramientas <br />
                        necesarias para superar <br />
                        cualquier situación de tu <br />
                        vida y convertirla en tu <br />
                        <br />
                        <span className="text-[#292928] text-2xl lg:text-3xl xl:text-4xl font-black">Éxito</span>
                      </p>
                    </div>
                  </div>

                  {/* Inferior Derecho - Coral */}
                  <div className="bg-[#dc5a38]">
                    {/* Solo el fondo coral */}
                  </div>
                </div>

                {/* Imagen que sale del cuadrante - EXACTO AL DISEÑO */}
                <div className="absolute bottom-0 right-0 w-[50%] h-[60%] z-20">
                  <Image
                    src="/main_section/HAPP002.png"
                    alt="Daniel"
                    fill
                    priority
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center bottom',
                    }}
                    className="rounded-br-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;