'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCtaClick = () => {
    console.log('Navegando a /start');
    closeMenu();
    router.push('/start');
  };

  // Función para manejar clics en enlaces del menú móvil
  const handleMobileMenuClick = () => {
    // Permitir que el enlace funcione normalmente
    // Cerrar el menú después de un pequeño delay para permitir la navegación
    setTimeout(() => {
      closeMenu();
    }, 100);
  };

  return (
    <header className={`${isScrolled ? 'fixed' : 'sticky'} top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 z-50 transition-all duration-500 ease-in-out ${isScrolled
      ? 'bg-[#2f3362]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
      : 'bg-[#2f3362] border-b border-transparent'
      }`}>
      <div className="flex items-center justify-between w-full max-w-none mx-auto">
        {/* Logo */}
        <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
          <a
            href="#Inicio"
            className="text-[#c4a64b] font-bold tracking-widest text-sm sm:text-base md:text-lg lg:text-xl font-serif whitespace-nowrap transition-all duration-300 hover:text-[#d4b65b] cursor-pointer"
          >
            HAPPY HUMAN
          </a>
        </div>

        {/* Menú Desktop */}
        <nav className="hidden lg:flex gap-4 lg:gap-6 xl:gap-8 text-white text-sm lg:text-base font-source-sans font-medium">
          <a
            href="#Inicio"
            className="relative hover:text-[#c4a64b] transition-all duration-300 group py-1"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c4a64b] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#AcercaDe"
            className="relative hover:text-[#c4a64b] transition-all duration-300 group py-1"
          >
            ACERCA DE
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c4a64b] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#DanielCorral"
            className="relative hover:text-[#c4a64b] transition-all duration-300 group py-1"
          >
            DANIEL CORRAL
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c4a64b] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#Trabajo"
            className="relative hover:text-[#c4a64b] transition-all duration-300 group py-1"
          >
            TRABAJO
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c4a64b] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* CTA Desktop */}
        <button
          onClick={handleCtaClick}
          className="hidden lg:block bg-[#ffc438] hover:bg-[#e6ad33] text-[#4b2207] font-bold px-4 lg:px-5 py-2 text-sm lg:text-base rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
        >
          CAMBIA TU VIDA
        </button>

        {/* Botón Hamburguesa */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center w-7 h-7 space-y-1 focus:outline-none group"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Menú Móvil */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#2f3362] border-t border-white/10 transition-all duration-300 ease-in-out ${isMenuOpen
        ? 'opacity-100 translate-y-0 visible'
        : 'opacity-0 -translate-y-4 invisible'
        }`}>
        <div className="px-4 py-4 space-y-3">
          <nav className="space-y-1">
            <a
              href="#Inicio"
              onClick={handleMobileMenuClick}
              className="block text-white text-base font-source-sans font-medium py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[#c4a64b] transition-all duration-300"
            >
              HOME
            </a>
            <a
              href="#AcercaDe"
              onClick={handleMobileMenuClick}
              className="block text-white text-base font-source-sans font-medium py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[#c4a64b] transition-all duration-300"
            >
              ACERCA DE
            </a>
            <a
              href="#DanielCorral"
              onClick={handleMobileMenuClick}
              className="block text-white text-base font-source-sans font-medium py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[#c4a64b] transition-all duration-300"
            >
              DANIEL CORRAL
            </a>
            <a
              href="#Trabajo"
              onClick={handleMobileMenuClick}
              className="block text-white text-base font-source-sans font-medium py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[#c4a64b] transition-all duration-300"
            >
              TRABAJO
            </a>
          </nav>

          {/* CTA en menú móvil */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={handleCtaClick}
              className="w-full bg-[#ffc438] hover:bg-[#e6ad33] text-[#4b2207] font-bold px-4 py-2.5 text-base rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              CAMBIA TU VIDA
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menú */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
}