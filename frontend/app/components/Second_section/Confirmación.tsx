'use client';
import React from "react";

{/* Success Section - Vas por muy buen camino */ }
<section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Texto */}
            <div className="bg-teal-500 rounded-2xl p-6 sm:p-8 lg:p-12">
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    ¡Vas por muy buen camino!
                </h2>
                <div className="space-y-4 text-white/90 text-base sm:text-lg leading-relaxed">
                    <p>
                        Te he enviado a tu correo electrónico toda la información de confirmación para que podamos continuar con tu proceso.
                    </p>
                    <p className="font-semibold">
                        Dale clic y seguimos avanzando desde ahí.
                    </p>
                    <p className="font-bold text-lg sm:text-xl">
                        ¡Nos vemos en la liga que te envié!
                    </p>
                </div>
            </div>

            {/* Imagen */}
            <div className="flex justify-center">
                <div className="w-[280px] sm:w-[320px] md:w-[380px] h-[350px] sm:h-[400px] md:h-[480px] rounded-2xl overflow-hidden bg-orange-400">
                    <img
                        className="w-full h-full object-cover"
                        alt="Persona meditando"
                        src="/main_section/HAPP007.png"
                    />
                </div>
            </div>
        </div>
    </div>
</section>