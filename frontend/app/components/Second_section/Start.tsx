'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

// Lista de países con códigos y banderas
const countries = [
  { code: '+52', name: 'México', flag: '🇲🇽' },
  { code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+1', name: 'Canadá', flag: '🇨🇦' },
  { code: '+34', name: 'España', flag: '🇪🇸' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+51', name: 'Perú', flag: '🇵🇪' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
  { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
  { code: '+595', name: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+506', name: 'Costa Rica', flag: '🇨🇷' },
  { code: '+507', name: 'Panamá', flag: '🇵🇦' },
  { code: '+503', name: 'El Salvador', flag: '🇸🇻' },
  { code: '+502', name: 'Guatemala', flag: '🇬🇹' },
  { code: '+504', name: 'Honduras', flag: '🇭🇳' },
  { code: '+505', name: 'Nicaragua', flag: '🇳🇮' },
  { code: '+33', name: 'Francia', flag: '🇫🇷' },
  { code: '+49', name: 'Alemania', flag: '🇩🇪' },
  { code: '+39', name: 'Italia', flag: '🇮🇹' },
  { code: '+44', name: 'Reino Unido', flag: '🇬🇧' }
];

export const StartPage: React.FC = () => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    countryCode: '+52', // México por defecto
    celular: '',
    email: '',
    ocupacion: '',
    motivacion: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showCountryDropdown && !target.closest('.country-selector')) {
        setShowCountryDropdown(false);
      }
    };

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    console.log('País seleccionado:', countryCode); // Para debug
    setFormData(prev => ({
      ...prev,
      countryCode: countryCode
    }));
    setShowCountryDropdown(false);
    // Limpiar error de teléfono si existe
    if (errors.celular) {
      setErrors(prev => ({
        ...prev,
        celular: ''
      }));
    }
  };

  const getSelectedCountryFlag = () => {
    const country = countries.find(c => c.code === formData.countryCode);
    return country ? country.flag : '🌍'; // Emoji genérico si no encuentra el país
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validar email con regex más estricto y dominios comunes
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const commonDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com', 'msn.com', 'aol.com', 'protonmail.com', 'zoho.com'];
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido (ej: daniel@gmail.com)';
    } else {
      // Validar que el dominio sea común o tenga formato válido
      const domain = formData.email.split('@')[1]?.toLowerCase();
      const isCommonDomain = commonDomains.includes(domain);
      const hasValidFormat = domain && domain.includes('.') && domain.length >= 4;
      
      if (!isCommonDomain && !hasValidFormat) {
        newErrors.email = 'Usa un correo de un proveedor válido (Gmail, Hotmail, etc.)';
      }
    }

    // Validar teléfono (al menos 7 dígitos después del código de país)
    const phoneRegex = /^[\d\s\-]{7,}$/;
    if (!formData.celular) {
      newErrors.celular = 'El teléfono es requerido';
    } else if (!phoneRegex.test(formData.celular.replace(/\s/g, ''))) {
      newErrors.celular = 'Ingresa un teléfono válido (mínimo 7 dígitos)';
    }

    // Validar campos requeridos
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.ocupacion.trim()) newErrors.ocupacion = 'La ocupación es requerida';
    if (!formData.motivacion.trim()) newErrors.motivacion = 'Este campo es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Combinar código de país con número de teléfono
      const cleanCountryCode = formData.countryCode.replace('-CA', ''); // Limpiar el sufijo -CA para Canadá
      const fullPhoneNumber = `${cleanCountryCode} ${formData.celular}`;
      
      const dataToSend = {
        ...formData,
        celular: fullPhoneNumber // Enviar el teléfono completo
      };

      // Aquí puedes descomentar cuando tengas tu API lista
      /*
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el formulario');
      }
      */

      // Por ahora solo simular envío
      console.log('Datos del formulario:', dataToSend);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar la sección de confirmación
      setShowConfirmation(true);
      
      // Hacer scroll suave hacia la sección de confirmación
      setTimeout(() => {
        const confirmationSection = document.getElementById('confirmation-section');
        if (confirmationSection) {
          confirmationSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitError(error instanceof Error ? error.message : 'Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#363d69] relative">

      {/* Header con Logo HAPPY HUMAN */}
      <header className="relative z-50 w-full py-6 sm:py-8 lg:py-12">
        <div className="flex items-center justify-center">
          <div
            onClick={handleLogoClick}
            className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {/* Palabra HAPPY */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {['H', 'A', 'P', 'P', 'Y'].map((letter, index) => (
                <span key={index} className="font-serif font-bold text-[#c4a64b] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wider hover:text-[#d4b65b] transition-colors duration-300">
                  {letter}
                </span>
              ))}
            </div>
            {/* Palabra HUMAN */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {['H', 'U', 'M', 'A', 'N'].map((letter, index) => (
                <span key={index} className="font-serif font-bold text-[#c4a64b] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wider hover:text-[#d4b65b] transition-colors duration-300">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - ¿Estás listo para juntos liberar tu mejor versión? */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Título principal */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              ¿Estás listo para juntos<br />liberar tu mejor versión?
            </h1>
            <p className="text-white/80 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto">
              Durante este viaje hacia <span className="text-red-500 font-semibold underline">liberar la mejor versión de ti</span>, encontrarás:
            </p>
          </div>

          {/* Grid con imagen central y textos alrededor */}
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

              {/* Columna izquierda */}
              <div className="space-y-8 lg:space-y-12">
                {/* Dirección */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-left">Dirección</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    ¿Estás listo para actuar con claridad y efectividad cada día?
                  </p>
                </div>

                {/* Estrategias Prácticas */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-left">Estrategias<br />Prácticas</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    ¿Qué transformarías en tu vida si aplicaras principios que funcionan?
                  </p>
                </div>
              </div>

              {/* Imagen central */}
              <div className="flex justify-center">
                <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[350px] sm:h-[400px] md:h-[480px] lg:h-[520px]">
                  {/* Fondo naranja */}
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-400 to-orange-600 rounded-[20px] sm:rounded-[30px]"></div>

                  {/* Imagen de la persona */}
                  <div className="absolute inset-x-4 bottom-0 top-12">
                    <img
                      className="w-full h-full object-cover object-center rounded-[15px] sm:rounded-[20px]"
                      alt="Persona con mochila"
                      src="/main_section/HAPP005.png"
                    />
                  </div>

                  {/* Texto central superpuesto */}
                  <div className="absolute top-4 left-4 right-4 text-center">
                    <h2 className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold">
                      Cambio de<br />Mentalidad
                    </h2>
                  </div>

                  {/* Texto inferior */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm sm:text-base font-medium">
                      ¿Estás Listo?
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-8 lg:space-y-12">
                {/* Un Plan de Acción */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-right lg:text-left">Un Plan<br />de Acción</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed text-right lg:text-left">
                    ¿Qué cambios lograrías si tuvieras herramientas accionables para alinear cada área de tu vida con tu propósito?
                  </p>
                </div>

                {/* Motivación Aplicable */}
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-right lg:text-left">Motivación<br />Aplicable</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed text-right lg:text-left">
                    ¿Estás dispuesto a ver tu propósito desde una nueva perspectiva y saber qué pasos tomar para ser quien realmente puedes ser?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comencemos Section - Formulario */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Título de sección */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-red-500 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              ¡Comencemos!
            </h2>
            <div className="w-full max-w-md mx-auto h-1 bg-red-500"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Formulario */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
                <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
                  Para poder ayudarte mejor en esta travesía, necesito algunos datos tuyos que me ayudarán a saber cómo iniciar, cómo personalizar nuestra charla en base a tus necesidades y así tener la mejor experiencia para <span className="font-bold text-white">¡dar inicio a tu transformación!</span>
                </p>

                <p className="text-white text-base sm:text-lg mb-6 font-medium">
                  Por ello, ayúdame con llenar con la siguiente información:
                </p>

                {/* Mensaje de error general */}
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Nombre (ej: Daniel)"
                      required
                      className={`w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.nombre ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Apellidos (ej: Corral)"
                      required
                      className={`w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.apellidos ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.apellidos && <p className="text-red-400 text-sm mt-1">{errors.apellidos}</p>}
                  </div>

                  {/* Input del teléfono con selector de país */}
                  <div className="relative">
                    <div className="flex">
                      {/* Selector de código de país */}
                      <div className="relative country-selector">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className={`flex items-center gap-2 px-3 py-3 bg-gray-100 border-r border-gray-300 rounded-l-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.celular ? 'border-2 border-red-500' : ''}`}
                        >
                          <span className="text-lg">{getSelectedCountryFlag()}</span>
                          <span className="text-gray-700 font-medium">{formData.countryCode}</span>
                          <svg 
                            className={`w-4 h-4 text-gray-500 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Dropdown de países */}
                        {showCountryDropdown && (
                          <div className="absolute top-full left-0 w-32 z-[9999] bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {countries.map((country, index) => (
                              <button
                                key={`${country.code}-${index}`}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleCountrySelect(country.code);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
                              >
                                <span className="text-lg">{country.flag}</span>
                                <span className="font-medium text-gray-700 text-sm">{country.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Input del número de teléfono */}
                      <input
                        type="tel"
                        name="celular"
                        value={formData.celular}
                        onChange={handleInputChange}
                        placeholder="Número de teléfono"
                        required
                        className={`flex-1 px-4 py-3 bg-white rounded-r-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.celular ? 'border-2 border-red-500' : 'border-l-0'}`}
                      />
                    </div>
                    
                    {/* Mensaje de error */}
                    {errors.celular && <p className="text-red-400 text-sm mt-1">{errors.celular}</p>}
                    
                    {/* Texto de ayuda */}
                    <p className="text-white/60 text-xs mt-1">
                      Ejemplo: {formData.countryCode.replace('-CA', '')} {formData.countryCode === '+52' ? '55 1234 5678' : formData.countryCode === '+34' ? '91 234 5678' : '123 456 7890'}
                    </p>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico (ej: Daniel@gmail.com)"
                      required
                      className={`w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    <p className="text-white/60 text-xs mt-1">
                      Usa un correo válido con el que pueda continuar tu seguimiento
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="ocupacion"
                      value={formData.ocupacion}
                      onChange={handleInputChange}
                      placeholder="Ocupación (ej: Ingeniero, Médico, Estudiante)"
                      required
                      className={`w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.ocupacion ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.ocupacion && <p className="text-red-400 text-sm mt-1">{errors.ocupacion}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="motivacion"
                      value={formData.motivacion}
                      onChange={handleInputChange}
                      placeholder="¿Qué te motivo a reservar? (Crecer profesionalmente, mejorar mi bienestar)"
                      required
                      className={`w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.motivacion ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.motivacion && <p className="text-red-400 text-sm mt-1">{errors.motivacion}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-800 font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg"
                  >
                    {isSubmitting ? 'Enviando...' : '¡Listo, empecemos este viaje!'}
                  </button>
                </form>
              </div>
            </div>

            {/* Imagen del formulario */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-[280px] sm:w-[320px] md:w-[550px] h-[350px] sm:h-[400px] md:h-[730px] rounded-2xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Persona trabajando"
                  src="/Registration_section/HAPP013.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Confirmación - Aparece después del envío exitoso del formulario */}
      {showConfirmation && (
        <section 
          id="confirmation-section" 
          className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px] shadow-2xl rounded-2xl overflow-hidden">
              
              {/* Texto - Lado izquierdo con fondo teal */}
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center" style={{backgroundColor: '#73BFB5'}}>
                <h2 className="text-gray-800 text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                  ¡Vas por muy buen camino!
                </h2>
                
                <div className="space-y-6 text-gray-700 text-lg sm:text-xl leading-relaxed">
                  <p>
                    Te he enviado a tu correo electrónico <span className="font-semibold text-gray-800">{formData.email}</span> una liga de confirmación para que podamos continuar con tu proceso.
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
              <div className="flex items-center justify-center p-8" style={{backgroundColor: '#DC5A38'}}>
                <div className="w-full max-w-[400px] h-[350px] sm:h-[400px] flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover object-center rounded-2xl shadow-lg"
                    alt="Persona meditando con las manos juntas"
                    src="/Registration_section/HAPP014.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Estilos de animación */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StartPage;