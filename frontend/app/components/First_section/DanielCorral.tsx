import React from "react";
import Image from "next/image";

const DanielCorral: React.FC = () => {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#272f54' }}>
      {/* Header con nombre */}
      <div className="w-full text-center py-8">
        <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-serif">
          Daniel Corral
        </h1>
        <div className="w-full h-2 bg-[#d54c4a] mt-4"></div>
      </div>

      {/* Grid principal - 3 columnas, 2 filas */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-auto">
          
          {/* Sección 1: Mentalidad (Izquierda Superior) */}
          <div className="bg-gray-300 relative overflow-hidden rounded-lg min-h-[600px] flex flex-col">
            <div className="p-6 flex-1">
              <h2 className="text-black text-2xl md:text-3xl font-black mb-6">
                ¿CÓMO PIENSO?<br />
                ¿CÓMO TOMO DECISIONES?<br />
                ¿CÓMO MANEJO EL ÉXITO<br />
                Y EL FRACASO?
              </h2>
            </div>
            
            {/* Texto vertical "Mentalidad" */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90">
              <span className="text-[#d54c4a] text-3xl font-bold">Mentalidad</span>
            </div>
            
            {/* Imagen - ARREGLADO: Contenedor con relative explícito */}
            <div className="relative w-full h-1/2 mt-auto">
              <Image
                src="/main_section/HAPP005.png"
                alt="pensando"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Sección 2: Disciplina y Hábitos (Centro Superior) */}
          <div className="bg-[#73bfb5] relative overflow-hidden rounded-lg min-h-[600px] flex flex-col">
            <div className="p-6 text-center">
              <h2 className="text-[#d54c4a] text-3xl md:text-4xl font-bold mb-4">
                Disciplina<br />
                y Hábitos
              </h2>
              <p className="text-black text-xl md:text-2xl font-bold">
                ¿QUÉ HAGO DIARIAMENTE<br />
                PARA MANTENERME<br />
                MOTIVADO, PRODUCTIVO<br />
                Y ENFOCADO?
              </p>
            </div>
            
            {/* Imagen circular en el centro - ARREGLADO */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full overflow-hidden relative">
              <Image
                src="/main_section/HAPP006.jpg"
                alt="ejercitándose"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Sección 3: Aprendizajes de vida (Derecha Superior) */}
          <div className="bg-[#e8b258] relative overflow-hidden rounded-lg min-h-[600px] flex flex-col">
            <div className="p-6 text-center">
              <h2 className="text-[#d54c4a] text-3xl md:text-4xl font-bold mb-4">
                Aprendizajes<br />
                de vida
              </h2>
              <p className="text-black text-xl md:text-2xl font-bold mb-6">
                ¿CÓMO SUPERÉ MOMENTOS<br />
                DIFÍCILES?<br /><br />
                ¿QUÉ ERRORES COMETÍ?<br /><br />
                ¿QUÉ HARÍA DIFERENTE?
              </p>
            </div>
            
            {/* Imagen - ARREGLADO */}
            <div className="relative w-full h-1/2 mt-auto">
              <Image
                src="/main_section/HAPP007.png"
                alt="Persona reflexionando"
                fill
                className="object-cover object-top"
              />
            </div>
            
            {/* Elemento "MENTAL" en esquina */}
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded">
              <span className="text-black font-bold text-sm">MENTAL</span>
            </div>
          </div>

          {/* Banda separadora oscura */}
          <div className="col-span-full bg-[#0e122d] bg-opacity-60 h-16 rounded-lg"></div>

          {/* Sección 4: Relación de Pareja (Izquierda Inferior) */}
          <div className="bg-pink-200 relative overflow-hidden rounded-lg min-h-[600px] flex flex-col">
            <div className="p-6">
              <h2 className="text-[#d54c4a] text-2xl md:text-3xl font-bold mb-4">
                Relación de<br />
                Pareja
              </h2>
              <p className="text-black text-xl md:text-2xl font-bold">
                ¿CÓMO MANEJO LAS<br />
                DIFERENCIAS?<br /><br />
                ¿QUÉ ESTRATEGIAS USO<br />
                PARA MANTENER UNA<br />
                RELACIÓN SÓLIDA?
              </p>
            </div>
            
            {/* Imagen - ARREGLADO */}
            <div className="relative w-full h-1/2 mt-auto">
              <Image
                src="/main_section/HAPP008.png"
                alt="Pareja"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Sección 5: Centro Inferior */}
          <div className="bg-gray-200 relative overflow-hidden rounded-lg min-h-[600px] flex flex-col justify-center items-center">
            <div className="text-center p-6">
              <p className="text-black text-xl md:text-2xl font-bold mb-6">
                HE LOGRADO LO QUE<br />
                MUCHOS QUIEREN<br />
                ALCANZAR.
              </p>
              <p className="text-black text-lg md:text-xl font-medium">
                HABLO DESDE<br />
                LA EXPERIENCIA Y EL<br />
                CRECIMIENTO QUE VIVO<br />
                CONSTANTEMENTE.
              </p>
            </div>
            
            {/* Imagen - ARREGLADO */}
            <div className="relative w-full h-1/2">
              <Image
                src="/main_section/HAPP009.png"
                alt="Persona exitosa"
                fill
                className="object-cover object-top"
              />
            </div>
            
            {/* Texto vertical "Aspiracional" */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90">
              <span className="text-[#d54c4a] text-2xl font-bold">Aspiracional</span>
            </div>
          </div>

          {/* Sección 6: Visión del Éxito (Derecha Inferior) */}
          <div className="bg-[#73bfb5] relative overflow-hidden rounded-lg min-h-[600px] flex flex-col">
            <div className="p-6">
              <h2 className="text-[#d54c4a] text-2xl md:text-3xl font-bold mb-4">
                Visión del Éxito
              </h2>
              <p className="text-black text-xl md:text-2xl font-bold">
                NO SOLO EN LO<br />
                DEPORTIVO,<br />
                SINO EN LA VIDA Y<br />
                EN LOS NEGOCIOS
              </p>
            </div>
            
            {/* Imagen - ARREGLADO */}
            <div className="relative w-full h-1/2 mt-auto">
              <Image
                src="/main_section/HAPP010.png"
                alt="Persona exitosa"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DanielCorral;