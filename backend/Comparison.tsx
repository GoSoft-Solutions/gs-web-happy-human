{"use client";
import Image from "next/image";
import ellipse1 from "@/public/ellipse-1.svg";
import x61 from "@/public/6-1.png";

const Comparison = () => {
  return (
    <section className="relative w-full max-w-[1800px] mx-auto py-24 px-6">
      {/* Título */}
      <div className="text-center text-[64px] md:text-[100px] font-serif text-[#f5f7fa] mb-10">
        HAPPY HUMAN
      </div>

      <div className="flex flex-col md:flex-row gap-10 justify-between">
        {/* SÍ es para ti */}
        <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-2xl shadow-inner p-12 flex flex-col gap-12">
          <h2 className="text-[#d9d9d9] text-[45px] md:text-[65px] text-center font-extrabold">
            SÍ <span className="font-semibold text-[40px]">ES PARA TI...</span>
          </h2>
          <p className="text-white/70 text-xl md:text-3xl text-center leading-[2.5rem]">
            Si buscas ayuda y quieres superarte. <br />
            Quienes quieren aprender de la mentalidad de un{" "}
            <span className="font-black text-3xl">atleta olímpico</span>.
            <br />
            Quienes están dispuestos a invertir y trabajar en sí mismos. <br />
            Emprendedores, atletas, influencers, profesionistas...{" "}
            <span className="font-black text-3xl">es para TODOS.</span>
          </p>
        </div>

        {/* NO es para ti */}
        <div className="w-full md:w-1/2 bg-[#1a4d7a] border border-white/10 rounded-[32px] backdrop-blur-2xl shadow-inner p-12 flex flex-col gap-12">
          <h2 className="text-[#d9d9d9] text-[45px] md:text-[65px] text-center font-extrabold">
            NO <span className="font-semibold text-[40px]">ES PARA TI...</span>
          </h2>
          <p className="text-white/70 text-xl md:text-3xl text-center leading-[2.5rem]">
            Si buscas <span className="font-bold">una solución mágica sin esfuerzo</span>. <br />
            Quienes no están{" "}
            <span className="font-bold">dispuestos a trabajar y hacer cambios</span>. <br />
            Solo buscas algo muy "general". <br />
            Personas que quieren servicios baratos y no invierten en sí mismas.
          </p>
        </div>
      </div>

      {/* Imagen decorativa inferior */}
      <div className="relative mt-20 w-full h-[865px]">
        <div className="absolute w-full h-[356px] bottom-0 rounded-full bg-gradient-radial from-white/70 to-transparent opacity-20" />
        <Image
          src={ellipse1}
          alt="Efecto circular"
          width={807}
          height={360}
          className="absolute bottom-[40px] left-1/2 -translate-x-1/2"
        />
        <Image
          src={x61}
          alt="Persona central"
          width={645}
          height={804}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain"
        />
      </div>
    </section>
  );
};

export default Comparison;
