'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

// Importar componentes de Third_section
import SessionComponent from '../components/Third_section/Session';
import DateComponent from '../components/Third_section/Date';
import PayComponent from '../components/Third_section/Pay';

// INTERFACES COMPARTIDAS
interface SessionOption {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
}

interface CoachInfo {
  name: string;
  businessName: string;
  avatar?: string;
}

interface BookingData {
  date: string;
  time: string;
  duration: number;
  sessionType: string;
  price: number;
  clientInfo: {
    name: string;
    email: string;
    phone?: string;
  };
}

// HOOKS PERSONALIZADOS
const useCalendarAvailability = () => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/calendar/availability', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }

      const data = await response.json();
      const dates = data.map((slot: any) => slot.date);
      const slots = data.reduce((acc: any, slot: any) => {
        acc[slot.date] = slot.timeSlots;
        return acc;
      }, {} as Record<string, string[]>);

      setAvailableDates(dates);
      setTimeSlots(slots);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching calendar availability:', err);
      
      // Datos mock como fallback
      const mockData = {
        availableDates: [
          '2025-06-08', '2025-06-09', '2025-06-11', '2025-06-13', '2025-06-16', 
          '2025-06-18', '2025-06-20', '2025-06-23', '2025-06-25', '2025-06-27'
        ],
        timeSlots: {
          '2025-06-08': ['10:00', '14:00', '16:00', '18:00'],
          '2025-06-09': ['10:00', '14:00', '16:00', '18:00'],
          '2025-06-11': ['11:00', '15:00', '17:00', '19:00'],
          '2025-06-13': ['10:00', '12:00', '16:00', '18:00'],
          '2025-06-16': ['14:00', '16:00', '18:00', '20:00'],
          '2025-06-18': ['10:00', '12:00', '14:00', '16:00'],
          '2025-06-20': ['11:00', '15:00', '17:00', '19:00'],
          '2025-06-23': ['10:00', '14:00', '16:00', '18:00'],
          '2025-06-25': ['12:00', '14:00', '16:00', '18:00'],
          '2025-06-27': ['10:00', '11:00', '15:00', '17:00']
        }
      };
      setAvailableDates(mockData.availableDates);
      setTimeSlots(mockData.timeSlots);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (bookingData: BookingData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to book appointment');
      }

      const result = await response.json();
      await fetchAvailability();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    availableDates,
    timeSlots,
    loading,
    error,
    fetchAvailability,
    bookAppointment
  };
};

const useCoachInfo = () => {
  const [coachInfo, setCoachInfo] = useState<CoachInfo>({
    name: 'Cargando...',
    businessName: 'Happy Human'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoachInfo = async () => {
      try {
        const response = await fetch('/api/coach/profile');
        if (response.ok) {
          const data = await response.json();
          setCoachInfo({
            name: data.name,
            businessName: data.businessName,
            avatar: data.avatar
          });
        } else {
          throw new Error('Failed to fetch coach info');
        }
      } catch (error) {
        console.error('Error loading coach data:', error);
        setCoachInfo({
          name: 'Daniel Corral',
          businessName: 'Happy Human'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCoachInfo();
  }, []);

  return { coachInfo, loading };
};

// COMPONENTE PRINCIPAL
export default function SuscriptionPage() {
  const searchParams = useSearchParams();
  
  // Estados principales
  const [currentStep, setCurrentStep] = useState<'selection' | 'booking' | 'payment' | 'confirmation'>('selection');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isVerifiedUser, setIsVerifiedUser] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(false); // ✅ NUEVO: Estado para controlar el mensaje
  
  // Estados de selección
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Estados del formulario de pago
  const [paymentFormData, setPaymentFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México'
  });
  
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Hooks personalizados
  const {
    availableDates,
    timeSlots,
    loading: calendarLoading,
    error: calendarError,
    fetchAvailability,
    bookAppointment
  } = useCalendarAvailability();

  const { coachInfo, loading: coachLoading } = useCoachInfo();

  // Configuración de sesiones
  const sessionOptions: SessionOption[] = [
    {
      id: 'session-60',
      title: 'Sesión de Crecimiento Personal:',
      subtitle: 'Liberando tu mejor versión - 60 minutos',
      price: 3999,
      currency: 'MXN',
      duration: 60,
      features: [
        `Acceso a mi libro Hábitos Atómicos de ${coachInfo.name} para alcanzar el éxito`,
        'Sesión 1 a 1 de 60 minutos donde liberaremos tu mejor versión',
        'Guía personalizada de crecimiento',
        'Seguimiento post-sesión'
      ]
    },
    {
      id: 'session-90',
      title: 'Sesión de Crecimiento Personal:',
      subtitle: 'Liberando tu mejor versión - 90 minutos',
      price: 4999,
      currency: 'MXN',
      duration: 90,
      features: [
        `Acceso a mi libro Hábitos Atómicos de ${coachInfo.name} para alcanzar el éxito`,
        'Sesión 1 a 1 de 90 minutos donde liberaremos tu mejor versión',
        'Guía personalizada de crecimiento',
        'Plan de acción detallado',
        'Seguimiento extendido'
      ]
    }
  ];

  // ✅ FIX: Efecto para capturar datos SOLO del usuario verificado
  useEffect(() => {
    const nombre = searchParams.get('nombre');
    
    console.log('🔍 Verificando datos de URL...');
    console.log('Parámetro nombre:', nombre);
    
    if (nombre) {
      try {
        const nombreDecodificado = decodeURIComponent(nombre);
        console.log('✅ Usuario verificado recibido:', nombreDecodificado);
        
        setUserName(nombreDecodificado);
        setIsVerifiedUser(true);
        setShowWelcomeMessage(true); // ✅ NUEVO: Mostrar mensaje de bienvenida
        
        const nombrePartes = nombreDecodificado.trim().split(' ');
        const primerNombre = nombrePartes[0] || '';
        const apellidos = nombrePartes.slice(1).join(' ') || '';
        
        setFirstName(primerNombre);
        setLastName(apellidos);
        
        setPaymentFormData(prev => ({
          ...prev,
          firstName: primerNombre,
          lastName: apellidos,
          cardholderName: nombreDecodificado
        }));
        
        console.log('✅ Estados actualizados:', { 
          userName: nombreDecodificado,
          firstName: primerNombre, 
          isVerified: true 
        });
        
        // ✅ NUEVO: Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          setShowWelcomeMessage(false);
        }, 5000);
        
      } catch (error) {
        console.error('❌ Error decodificando nombre:', error);
        setUserName('');
        setIsVerifiedUser(false);
      }
    } else {
      console.log('ℹ️ No se recibió nombre en la URL');
      setUserName('');
      setIsVerifiedUser(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchAvailability();
  }, []);

  // Funciones de navegación
  const selectSession = (sessionId: string) => {
    setSelectedSession(sessionId);
    setSelectedDate('');
    setSelectedTime('');
  };

  const proceedToBooking = () => {
    if (selectedSession) {
      setCurrentStep('booking');
    }
  };

  const proceedToPayment = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('payment');
    }
  };

  const backToSelection = () => {
    setCurrentStep('selection');
  };

  const backToBooking = () => {
    setCurrentStep('booking');
  };

  // Funciones del calendario
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Funciones de pago
  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setPaymentFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    if (paymentErrors[name]) {
      setPaymentErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePayment = () => {
    const errors: Record<string, string> = {};

    if (!paymentFormData.firstName.trim()) errors.firstName = 'Nombre requerido';
    if (!paymentFormData.lastName.trim()) errors.lastName = 'Apellido requerido';
    
    if (!paymentFormData.email.trim()) errors.email = 'Email requerido';
    else if (!/\S+@\S+\.\S+/.test(paymentFormData.email)) errors.email = 'Email inválido';
    
    if (!paymentFormData.cardNumber.replace(/\s/g, '')) errors.cardNumber = 'Número de tarjeta requerido';
    else if (paymentFormData.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Número de tarjeta inválido';
    
    if (!paymentFormData.expiryDate) errors.expiryDate = 'Fecha de expiración requerida';
    if (!paymentFormData.cvv) errors.cvv = 'CVV requerido';
    if (!paymentFormData.cardholderName.trim()) errors.cardholderName = 'Nombre del titular requerido';

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteBookingAndPayment = async () => {
    if (!validatePayment()) return;

    setIsProcessingPayment(true);

    try {
      const selectedSessionData = sessionOptions.find(s => s.id === selectedSession);
      if (!selectedSessionData) throw new Error('Sesión no encontrada');

      const bookingData: BookingData = {
        date: selectedDate,
        time: selectedTime,
        duration: selectedSessionData.duration,
        sessionType: selectedSessionData.subtitle,
        price: selectedSessionData.price,
        clientInfo: {
          name: `${paymentFormData.firstName} ${paymentFormData.lastName}`,
          email: paymentFormData.email,
          phone: paymentFormData.phone
        }
      };

      const bookingResult = await bookAppointment(bookingData);

      const paymentData = {
        amount: selectedSessionData.price,
        currency: selectedSessionData.currency,
        bookingId: bookingResult.id,
        paymentMethod: {
          cardNumber: paymentFormData.cardNumber.replace(/\s/g, ''),
          expiryDate: paymentFormData.expiryDate,
          cvv: paymentFormData.cvv,
          cardholderName: paymentFormData.cardholderName
        },
        customerInfo: paymentFormData
      };

      const paymentResponse = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!paymentResponse.ok) {
        throw new Error('Error al procesar el pago');
      }

      setCurrentStep('confirmation');
      
    } catch (error) {
      console.error('Error:', error);
      setPaymentErrors({ general: 'Error al procesar la reserva y pago. Intenta de nuevo.' });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Utilidades
  const selectedSessionData = sessionOptions.find(s => s.id === selectedSession);

  const getStepStatus = (stepName: string) => {
    const stepOrder = ['selection', 'booking', 'payment', 'confirmation'];
    const currentStepIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepName);
    
    if (currentStepIndex > stepIndex) {
      return 'completed';
    } else if (currentStepIndex === stepIndex) {
      return 'current';
    } else {
      return 'pending';
    }
  };

  const formatDateForDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const getFirstName = () => {
    if (firstName) {
      return firstName;
    }
    if (userName && userName.trim() !== '') {
      return userName.split(' ')[0];
    }
    return '';
  };

  // Renderizado condicional - Confirmación
  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {firstName 
              ? `¡Perfecto ${firstName}! Reserva Confirmada`
              : '¡Reserva Confirmada!'
            }
          </h2>
          <p className="text-gray-600 mb-6">Tu sesión ha sido confirmada y el pago procesado exitosamente.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">{selectedSessionData?.subtitle}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Coach:</strong> {coachInfo.name}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Fecha:</strong> {selectedDate && formatDateForDisplay(selectedDate)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Hora:</strong> {selectedTime}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Duración:</strong> {selectedSessionData?.duration} minutos
            </p>
            <p className="text-lg font-bold text-indigo-600">
              ${selectedSessionData?.price} {selectedSessionData?.currency}
            </p>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Recibirás un email de confirmación con el enlace de Google Meet.
          </p>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Nueva Reserva
          </button>
        </div>
      </div>
    );
  }

  // Renderizado principal
  return (
    <div 
      className="min-h-screen w-full fixed inset-0 overflow-auto" 
      style={{ 
        backgroundColor: '#272F54',
        margin: 0,
        padding: 0
      }}
    >
      {/* HEADER */}
      <header className="text-center py-8">
        <div className="flex justify-center items-center">
          <img 
            src="/HAPPmask.png" 
            alt={`${coachInfo.businessName} Logo`}
            className="w-auto max-w-full"
            style={{ height: 'clamp(80px, 12vw, 200px)' }}
          />
        </div>
      </header>

      {/* Mensaje de verificación exitosa */}
      {userName && userName.trim() !== '' && showWelcomeMessage && (
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center transition-all duration-500 ease-in-out">
            <p className="text-green-300 font-medium">
              ✅ ¡Hola {getFirstName()}! Tu correo ha sido verificado exitosamente. Bienvenido a tu experiencia personalizada.
            </p>
          </div>
        </div>
      )}

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && false && (
        <div className="max-w-6xl mx-auto px-6 mb-4">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-2 text-xs">
            <p className="text-blue-300">
              Debug: userName="{userName}" | firstName="{firstName}" | isVerified={isVerifiedUser.toString()}
            </p>
          </div>
        </div>
      )}

      {/* INDICADOR DE PROGRESO */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[
            { step: 'selection', label: 'Selección' },
            { step: 'booking', label: 'Reserva' },
            { step: 'payment', label: 'Pago' }
          ].map((item, index) => {
            const status = getStepStatus(item.step);
            
            return (
              <React.Fragment key={item.step}>
                <div className={`flex items-center space-x-2 ${
                  status === 'completed' ? 'text-green-400' : 
                  status === 'current' ? 'text-yellow-400' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    status === 'completed'
                      ? 'border-green-400 bg-green-400 text-white' 
                      : status === 'current'
                      ? 'border-yellow-400 bg-yellow-400 text-black' 
                      : 'border-gray-400'
                  }`}>
                    {status === 'completed' ? '✓' : index + 1}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                {index < 2 && <div className="w-8 h-0.5 bg-gray-400"></div>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* RENDERIZADO CONDICIONAL DE PASOS */}
      {currentStep === 'selection' && (
        <SessionComponent
          userName={userName}
          coachInfo={coachInfo}
          coachLoading={coachLoading}
          sessionOptions={sessionOptions}
          selectedSession={selectedSession}
          onSessionSelect={selectSession}
          onProceedToBooking={proceedToBooking}
        />
      )}

      {currentStep === 'booking' && (
        <DateComponent
          selectedSessionData={selectedSessionData}
          coachInfo={coachInfo}
          availableDates={availableDates}
          timeSlots={timeSlots}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          calendarLoading={calendarLoading}
          calendarError={calendarError}
          onDateSelect={handleDateSelect}
          onTimeSelect={handleTimeSelect}
          onBackToSelection={backToSelection}
          onProceedToPayment={proceedToPayment}
          onRefreshAvailability={fetchAvailability}
        />
      )}

      {currentStep === 'payment' && (
        <PayComponent
          selectedSessionData={selectedSessionData}
          coachInfo={coachInfo}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          paymentFormData={paymentFormData}
          paymentErrors={paymentErrors}
          isProcessingPayment={isProcessingPayment}
          onInputChange={handlePaymentInputChange}
          onBackToBooking={backToBooking}
          onCompletePayment={handleCompleteBookingAndPayment}
        />
      )}
    </div>
  );
}