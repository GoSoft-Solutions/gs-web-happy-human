// app/components/IntroSection.tsx
import React from "react";
import Image from "next/image";

const IntroSection: React.FC = () => {
  return (
    <div className="bg-[#363D69] w-full min-h-screen flex items-center justify-center p-8 bg-gray-100">
      {/* Contenedor principal con posición relativa */}
      <div className="relative w-full max-w-8xl h-[900px]">
        
        {/* Grid principal con sombra y bordes redondeados */}
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Cuadrante 1: Superior Izquierdo - Amarillo */}
          <div className="bg-[#e8b258] flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                En una conversación <br />
                te compartiré:
              </h2>
              <h3 className="text-[#292928] text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                Los principios que <br />
                me llevaron a la cima
              </h3>
            </div>
          </div>

          {/* Cuadrante 2: Superior Derecho - Verde/Teal */}
          <div className="bg-[#73bfb5] flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-[#292928] text-2xl md:text-3xl lg:text-4xl font-black italic leading-tight">
                Esto no es solo <br />
                una plática ... <br />
                <br />
                ¡Es el inicio de tu <br />
                transformación!
              </p>
            </div>
          </div>

          {/* Cuadrante 3: Inferior Izquierdo - Verde/Teal */}
          <div className="bg-[#73bfb5] flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Tendrás las herramientas <br />
                necesarias para superar <br />
                cualquier situación de tu <br />
                vida y convertirla en tu <br />
                <br />
                <span className="text-[#292928] text-3xl md:text-4xl lg:text-5xl font-black">Éxito</span>
              </p>
            </div>
          </div>

          {/* Cuadrante 4: Inferior Derecho - Fondo coral */}
          <div className="bg-[#dc5a38]">
            {/* Solo el fondo coral, la imagen estará posicionada absolutamente */}
          </div>
        </div>

        {/* Imagen posicionada absolutamente para sobreponerse */}
        <div className="absolute bottom-0 right-0 w-1/2 h-[600px] z-10 -translate-y-0">
          <div className="relative w-full h-full">
            <Image
              src="/main_section/HAPP002.png"
              alt="Persona sonriendo"
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center 20%',
              }}
              className="rounded-br-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;