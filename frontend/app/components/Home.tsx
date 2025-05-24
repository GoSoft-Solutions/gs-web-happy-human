"use client";

import Image from "next/image";

const Home = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1800px] mx-auto py-12 px-4 sm:px-6 lg:px-12">
      {/* —————————— Izquierda: texto y CTA —————————— */}
      <div className="flex flex-col gap-6 sm:gap-8 w-full md:w-1/2">
        {/* Título grande */}
        <div className="bg-[#202648] px-6 sm:px-12 py-8 sm:py-10">
          <h2 className="text-white font-extrabold 
                         text-3xl sm:text-4xl md:text-5xl lg:text-[80px] xl:text-[120px] 
                         leading-tight drop-shadow-lg">
            Desbloquea tu mejor versión en solo una sesión.
          </h2>
        </div>

        {/* Subtítulo */}
        <div className="bg-[#0e122d] px-6 sm:px-12 py-8 sm:py-10">
          <p className="text-[#8b7871] 
                        text-base sm:text-lg md:text-2xl lg:text-[47px] 
                        text-center font-semibold leading-snug">
            Claridad, dirección y una conversación honesta que te rete a ser{" "}
            <span className="italic font-bold text-lg sm:text-xl md:text-[53px]">
              quien sabes que puedes ser
            </span>
            .
          </p>
        </div>

        {/* Botón y enlace “Conoce más” */}
        <div className="bg-[#272f54] px-6 sm:px-12 py-12 sm:py-16 
                        flex flex-col gap-6 sm:gap-12 items-center">
          {/* Aquí puedes volver a habilitar <NavigateButton /> cuando lo necesites */}
          {/* <NavigateButton className="w-full sm:w-auto" /> */}

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[#b27451] font-handwriting 
                             text-2xl sm:text-4xl md:text-5xl lg:text-7xl">
              Conoce más
            </span>
            <Image src="/vector.svg" alt="Flecha" width={40} height={40}
                   className="sm:w-20 sm:h-20" />
          </div>
        </div>
      </div>

      {/* —————————— Derecha: imagen con bandas de color —————————— */}
      <div className="relative w-full md:w-1/2 
                      h-48 sm:h-64 md:h-[400px] lg:h-[800px] xl:h-[1200px] 
                      mt-8 md:mt-0">
        {/* Banda superior */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[#ffc13acc] z-10" />
        {/* Banda inferior */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#1f2547] z-10" />

        <Image
          src="/HAPP25.png"
          alt="Happy Session"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Home;