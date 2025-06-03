'use client';
import React from "react";

export default function SuccessSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px]">
          
          {/* Texto - Lado izquierdo con fondo teal */}
          <div className="rounded-l-2xl lg:rounded-r-none rounded-r-2xl p-8 sm:p-10 lg:p-12 flex flex-col justify-center" style={{backgroundColor: '#73BFB5'}}>
            <h2 className="text-gray-800 text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              ¡Vas por muy buen camino!
            </h2>
            
            <div className="space-y-6 text-gray-700 text-lg sm:text-xl leading-relaxed">
              <p>
                Te he enviado a tu correo electrónico una liga de confirmación para que podamos continuar con tu proceso.
              </p>
              
              <p className="font-semibold">
                Dale clic, y seguimos avanzando desde ahí.
              </p>
              
              <p className="font-bold text-xl sm:text-2xl text-gray-800">
                ¡Nos vemos en la liga que te envié!
              </p>
            </div>
          </div>

          {/* Imagen - Lado derecho con fondo naranja */}
          <div className="rounded-r-2xl lg:rounded-l-none rounded-l-2xl flex items-center justify-center p-8" style={{backgroundColor: '#DC5A38'}}>
            <div className="w-full max-w-[400px] h-[350px] sm:h-[400px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-center"
                alt="Persona meditando con las manos juntas"
                src="/Registration_section/HAPP014.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}