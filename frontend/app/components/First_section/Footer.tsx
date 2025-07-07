'use client';
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    // Verificar si estamos en la página principal tanto por URL como por contenido
    const urlIsHome = pathname === '/' || pathname === '/home' || pathname === '/inicio';
    const hasHomeSection = document.getElementById('Inicio') !== null;

    setIsHomePage(urlIsHome && hasHomeSection);
  }, [pathname]);

  return (
    <footer className="w-full bg-[#2f3362] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-20">

        {/* Contenedor principal del footer */}
        <div className="flex flex-col items-center gap-12 sm:gap-16 lg:gap-20">

          {/* Logo y redes sociales */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 w-full">

            {/* Logo HAPPY HUMAN como imagen - Más pequeño */}
            <div className="flex items-center justify-center">
              {isHomePage ? (
                // Si estamos en home, hacer scroll interno
                <a href="#Inicio">
                  <img
                    className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px] h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                    alt="Happy Human Logo"
                    src="/HappyHuman_Footer.svg"
                  />
                </a>
              ) : (
                // Si estamos en otra página, abrir nueva ventana
                <a href="https://happyhuman.com.mx" target="_blank" rel="noopener noreferrer">
                  <img
                    className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px] h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                    alt="Happy Human Logo"
                    src="/HappyHuman_Footer.svg"
                  />
                </a>
              )}
            </div>

            {/* Iconos de redes sociales - Solo iconos con máscara */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-10">
              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#c4a64b] transition-colors duration-300 hover:underline"
                aria-label="Facebook"
              >
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert"
                  alt="Facebook"
                  src="/icons/facebook.png"
                />
              </a>

              {/* Twitter */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#c4a64b] transition-colors duration-300 hover:underline"
                aria-label="Twitter"
              >
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert"
                  alt="Twitter"
                  src="/icons/twiter.png"
                />
              </a>

              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#c4a64b] transition-colors duration-300 hover:underline" 
                aria-label="Instagram"
              >
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert"
                  alt="Instagram"
                  src="/icons/Instagram.png"
                />
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#c4a64b] transition-colors duration-300 hover:underline" 
                aria-label="WhatsApp"
              >
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert"
                  alt="WhatsApp"
                  src="/icons/whatsapp.png"
                />
              </a>
            </div>
          </div>

          {/* Copyright*/}
          <div className="flex items-center justify-center w-full pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
                © Copyright 2025 by{" "}
                {isHomePage ? (
                  // Si estamos en home, hacer scroll interno
                  <a
                    href="#Inicio"
                    className="text-white hover:text-[#c4a64b] transition-all duration-300 hover:underline"
                  >
                    Happy Human
                  </a>
                ) : (
                  // Si estamos en otra página, abrir nueva ventana
                  <a
                    href="https://happyhuman.com.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#c4a64b] transition-all duration-300 hover:underline"
                  >
                    Happy Human
                  </a>
                )}
                . Designed & Developed by{" "}
                <a
                  href="https://gosoftsolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#c4a64b] transition-colors duration-300 hover:underline"
                >
                  GoSoft Solutions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;