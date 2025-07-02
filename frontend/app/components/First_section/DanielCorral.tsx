import React from "react";
import Image from "next/image";

const DanielCorral: React.FC = () => {
  return (
    <section id="DanielCorral">
      <div className="w-full min-h-screen" style={{ backgroundColor: '#272f54' }}>
        {/* Header con nombre - más espacio arriba */}
        <div className="w-full text-center py-22">
          <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-serif">
            Daniel Corral
          </h1>
          <div className="w-full h-2 bg-[#d54c4a] mt-4"></div>
        </div>

        {/* Grid principal - Solo la fila superior con 3 columnas */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            
            {/* Sección 1: Mentalidad (Izquierda) - Texto arriba, imagen más pequeña abajo */}
            <div className="bg-gray-200 relative overflow-hidden rounded-lg h-[600px] flex flex-col">
              {/* Texto centrado ocupando menos espacio para que la imagen suba */}
              <div className="px-8 py-6 text-center">
                <p className="text-black text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  ¿CÓMO PIENSO?<br />
                  ¿CÓMO TOMO DECISIONES?<br />
                  ¿CÓMO MANEJO EL ÉXITO<br />
                  Y EL FRACASO?
                </p>
              </div>
              
              {/* Imagen y título en la parte inferior - imagen más arriba */}
              <div className="flex flex-1 relative">
                <div className="relative flex-1 h-full">
                  <Image
                    src="/main_section/HAPP005.png"
                    alt="pensando"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                
                {/* Título vertical en el lado derecho */}
                <div className="flex flex-col justify-center items-center w-20 bg-gray-200">
                  <h2 
                    className="text-[#d54c4a] font-normal transform rotate-90 whitespace-nowrap" 
                    style={{ 
                      fontFamily: 'Michroma, sans-serif',
                      fontSize: '48px',
                      lineHeight: '36px',
                      letterSpacing: '0%'
                    }}
                  >
                    MENTALIDAD
                  </h2>
                </div>
              </div>
            </div>

            {/* Sección 2: Disciplina y Hábitos (Centro) - Imagen abajo */}
            <div className="bg-[#73bfb5] relative overflow-hidden rounded-lg h-[600px] flex flex-col">
              <div className="p-6 text-center flex-grow">
                <h2 className="text-[#d54c4a] font-normal mb-8" style={{ 
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '50px',
                  lineHeight: '50px',
                  letterSpacing: '0%'
                }}>
                  DISCIPLINA<br />
                  Y HÁBITOS
                </h2>
                <p className="text-black text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  ¿QUÉ HAGO DIARIAMENTE<br />
                  PARA MANTENERME<br />
                  MOTIVADO, PRODUCTIVO<br />
                  Y ENFOCADO?
                </p>
              </div>
              
              {/* Imagen circular más arriba */}
              <div className="flex justify-center items-start -mt-4">
                <div className="w-80 h-80 md:w-96 md:h-88 rounded-full overflow-hidden relative mx-4">
                  <Image
                    src="/main_section/HAPP006.jpg"
                    alt="ejercitándose"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Sección 3: Aprendizajes de vida (Derecha) - Imagen abajo */}
            <div className="bg-[#e8b258] relative overflow-hidden rounded-lg h-[600px] flex flex-col">
              <div className="p-6 text-center z-10 relative">
                <h2 className="text-[#d54c4a] font-normal mb-6" style={{ 
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '42px',
                  lineHeight: '50px',
                  letterSpacing: '0%'
                }}>
                  APRENDIZAJES<br />
                  DE VIDA
                </h2>
                <p className="text-black text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  ¿CÓMO SUPERÉ MOMENTOS<br />
                  DIFÍCILES?<br />
                  ¿QUÉ ERRORES COMETÍ?<br />
                  ¿QUÉ HARÍA DIFERENTE?
                </p>
              </div>
              
              {/* Imagen más grande y más arriba */}
              <div className="relative w-full flex-1 -mt-8">
                <Image
                  src="/main_section/HAPP007.png"
                  alt="Persona reflexionando"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Segunda fila - 3 secciones inferiores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-8">
            
            {/* Sección 4: Relación de Pareja (Izquierda Inferior) - Imagen abajo */}
            <div className="bg-pink-200 relative overflow-hidden rounded-lg h-[600px] flex flex-col">
              <div className="p-6 z-10 relative text-center">
                <h2 className="text-[#d54c4a] font-normal mb-6" style={{ 
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '50px',
                  lineHeight: '50px',
                  letterSpacing: '0%'
                }}>
                  RELACIÓN DE<br />
                  PAREJA
                </h2>
                <p className="text-black text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  ¿CÓMO MANEJO LAS<br />
                  DIFERENCIAS?<br />
                  ¿QUÉ ESTRATEGIAS USO<br />
                  PARA MANTENER UNA<br />
                  RELACIÓN SÓLIDA?
                </p>
              </div>
              
              {/* Imagen aún más arriba */}
              <div className="relative w-full flex-1 -mt-12">
                <Image
                  src="/main_section/HAPP008.png"
                  alt="Pareja"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Sección 5: Centro Inferior - Aspiracional con imagen ajustada a la izquierda */}
            <div className="bg-gray-200 relative overflow-hidden rounded-lg h-[600px] flex flex-col">
              {/* Texto centrado con más espacio para la imagen */}
              <div className="px-8 py-6 text-center">
                <p className="text-black text-xl md:text-2xl font-black leading-tight mb-4" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  HE LOGRADO LO QUE<br />
                  MUCHOS QUIEREN<br />
                  ALCANZAR.
                </p>
                <p className="text-black text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  HABLO DESDE<br />
                  LA EXPERIENCIA Y EL<br />
                  CRECIMIENTO QUE VIVO<br />
                  CONSTANTEMENTE.
                </p>
              </div>
              
              {/* Imagen y título en la parte inferior - mejor ajuste */}
              <div className="flex flex-1 relative">
                {/* Imagen ajustada para mostrar la cabeza completa */}
                <div className="relative flex-1 h-full -ml-8">
                  <Image
                    src="/main_section/HAPP009.png"
                    alt="Persona exitosa"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                
                {/* Título vertical en el lado derecho */}
                <div className="flex flex-col justify-center items-center w-20 bg-gray-200">
                  <h2 
                    className="text-[#d54c4a] font-normal transform rotate-90 whitespace-nowrap" 
                    style={{ 
                      fontFamily: 'Michroma, sans-serif',
                      fontSize: '40px',
                      lineHeight: '36px',
                      letterSpacing: '0%'
                    }}
                  >
                    ASPIRACIONAL
                  </h2>
                </div>
              </div>
            </div>

            {/* Sección 6: Visión del Éxito (Derecha Inferior) - Imagen abajo */}
            <div className="bg-[#73bfb5] relative overflow-hidden rounded-lg h-[600px] flex flex-col">
              <div className="p-6 z-10 relative text-center">
                <h2 className="text-[#d54c4a] font-normal mb-6" style={{ 
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '50px',
                  lineHeight: '50px',
                  letterSpacing: '0%'
                }}>
                  VISIÓN DEL ÉXITO
                </h2>
                <p className="text-black text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  NO SOLO EN LO<br />
                  DEPORTIVO,<br />
                  SINO EN LA VIDA Y<br />
                  EN LOS NEGOCIOS
                </p>
              </div>
              
              {/* Imagen un poco más abajo */}
              <div className="relative w-full flex-1 -mt-8">
                <Image
                  src="/main_section/HAPP010.png"
                  alt="Persona exitosa"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DanielCorral;