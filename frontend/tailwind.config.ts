/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Fuentes personalizadas de Anima
      fontFamily: {
        'dm-serif': ['DM Serif Display', 'serif'],
        'merienda': ['Merienda One', 'cursive'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      // Colores personalizados + Footer
      colors: {
        'teal-custom': '#0f766e', // Ajusta según tu teal-700
        'red-custom': '#d54c4a',
        'text-primary': '#f5f7fa',
        'text-secondary': '#ffffffa3',
        'text-dark': '#292928',
        'border-custom': '#202648',
        'glass-bg': '#ffffff05',
        'glass-border': '#ffffff0a',
        'glass-shadow': '#ffffff14',
        'blue-custom': '#1a4d7a',
        // Nuevos colores para Footer
        'footer-bg': '#2f3362',
        'footer-link': '#c4a64b',
        'footer-link-hover': '#d4b65b',
      },
      // Espaciado personalizado + Footer
      spacing: {
        '18': '72px',
        '21': '84px',
        '22': '88px',
        '42': '171px',
        // Nuevos para Footer
        '14': '3.5rem', // 56px para iconos medianos
        '15': '3.75rem', // 60px
        '17': '4.25rem', // 68px
      },
      // Width y Height personalizados para iconos Footer
      width: {
        '18': '4.5rem', // 72px
      },
      height: {
        '18': '4.5rem', // 72px  
      },
      // Max width personalizado - AGREGADO
      maxWidth: {
        '7xl': '80rem', // 1280px
        '8xl': '88rem', // 1408px
      },
      // Border radius personalizado
      borderRadius: {
        'custom-tl': '198px 0px 323px 0px',
        'custom-ellipse': '442.5px/178.11px',
      },
      // Box shadows personalizados + Footer
      boxShadow: {
        'glass': 'inset 0px 1px 0px #ffffff14',
        // Nuevas para Footer
        'footer-icon': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'footer-icon-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      // Backdrop blur
      backdropBlur: {
        'glass': '32px',
      },
      // Tamaños de texto personalizados
      fontSize: {
        '6xl-custom': ['90px', { lineHeight: 'normal', letterSpacing: '-1.80px' }],
        '4xl-custom': ['60px', { lineHeight: 'normal', letterSpacing: '-1.20px' }],
        '3xl-custom': ['42px', { lineHeight: '63px' }],
        '4xl-bold': ['44px', { lineHeight: '66px' }],
        '7xl-custom': ['100px', { lineHeight: 'normal' }],
        '8xl-custom': ['110px', { lineHeight: 'normal' }],
      },
    },
  },
  plugins: [],
};