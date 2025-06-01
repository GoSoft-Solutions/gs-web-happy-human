import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#2f3362] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Sombra de fondo detrás del logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-contain opacity-20"
          alt="Sombra de fondo"
          src="/Elipse_mask.png"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Contenedor principal del footer */}
        <div className="flex flex-col items-center gap-12 sm:gap-16 lg:gap-20">
          
          {/* Logo y redes sociales */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 w-full">
            
            {/* Logo HAPPY HUMAN como imagen - Más pequeño */}
            <div className="flex items-center justify-center">
              <img
                className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px] h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                alt="Happy Human Logo"
                src="/HappyHuman_Footer.svg"
              />
            </div>

            {/* Iconos de redes sociales - Más pequeños y nítidos */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-5">
              {/* Facebook */}
              <a 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group hover:scale-105 shadow-md hover:shadow-lg"
                aria-label="Facebook"
              >
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300"
                  alt="Facebook"
                  src="/icons/Social-facebook-1.svg"
                />
              </a>

              {/* Twitter */}
              <a 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group hover:scale-105 shadow-md hover:shadow-lg"
                aria-label="Twitter"
              >
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300"
                  alt="Twitter"
                  src="/icons/Social-twitter.svg"
                />
              </a>

              {/* Instagram */}
              <a 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group hover:scale-105 shadow-md hover:shadow-lg"
                aria-label="Instagram"
              >
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300"
                  alt="Instagram"
                  src="/icons/Social-Instagram.svg"
                />
              </a>

              {/* WhatsApp */}
              <a 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group hover:scale-105 shadow-md hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300"
                  alt="WhatsApp"
                  src="/icons/Social-Whatsapp.svg"
                />
              </a>
            </div>
          </div>

          {/* Copyright*/}
          <div className="flex items-center justify-center w-full pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
                © Copyright 2025 by{" "}
                <a 
                  href="https://happyhuman.com.mx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#c4a64b] transition-colors duration-300 hover:underline"
                >
                  Happy Human
                </a>
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