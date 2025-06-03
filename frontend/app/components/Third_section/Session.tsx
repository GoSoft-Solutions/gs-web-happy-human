'use client';
import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle, Calendar, User, Mail, Phone, Clock, Video, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// 🔄 INTEGRACIÓN CON GOOGLE CALENDAR API
// ============================================

interface AvailabilitySlot {
  date: string;
  timeSlots: string[];
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

interface CoachInfo {
  name: string;
  businessName: string;
  avatar?: string;
}

interface SessionOption {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
}

// Hook personalizado para manejar la API de Google Calendar
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

      const data: AvailabilitySlot[] = await response.json();
      
      const dates = data.map(slot => slot.date);
      const slots = data.reduce((acc, slot) => {
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

// Hook para obtener información del coach
const useCoachInfo = () => {
  const [coachInfo, setCoachInfo] = useState<CoachInfo>({
    name: 'Cargando...',
    businessName: 'Happy Human'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoachInfo = async () => {
      try {
        // 🔄 CONECTAR CON TU API BACKEND
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
        // Fallback data
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

const IntegratedBookingPayment = () => {
  // Estados principales del flujo
  const [currentStep, setCurrentStep] = useState<'selection' | 'booking' | 'payment' | 'confirmation'>('selection');
  const [userName, setUserName] = useState<string>('');
  
  // Estados de selección
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Estados del calendario
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 5));
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  
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

  // 🔄 CONFIGURACIÓN DE SESIONES - Ahora dinámico
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

  // Configuración de calendario
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  // Cargar información del usuario
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // 🔄 CONECTAR CON TU API DE USUARIO
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const userData = await response.json();
          setUserName(userData.name);
          // Pre-llenar datos de pago si están disponibles
          setPaymentFormData(prev => ({
            ...prev,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || ''
          }));
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUserName('María González'); // Fallback
      }
    };
    fetchUserName();
  }, []);

  // Cargar disponibilidad al montar
  useEffect(() => {
    fetchAvailability();
  }, []);

  // Actualizar slots disponibles cuando cambie la fecha
  useEffect(() => {
    if (selectedDate && timeSlots[selectedDate]) {
      setAvailableSlots(timeSlots[selectedDate]);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, timeSlots]);

  // Funciones del calendario
  interface DayData {
    date: number;
    isCurrentMonth: boolean;
    fullDate: string;
    isAvailable?: boolean;
    isSelected?: boolean;
  }

  const getDaysInMonth = (date: Date): DayData[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DayData[] = [];
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      const prevDateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDateStr
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: fullDate,
        isAvailable: availableDates.includes(fullDate),
        isSelected: selectedDate === fullDate
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      const nextDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: nextDateStr
      });
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateSelect = (day: DayData) => {
    if (day.isCurrentMonth && day.isAvailable) {
      setSelectedDate(day.fullDate);
      setSelectedTime('');
    }
  };

  const formatDateForDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month - 1 porque los meses en Date van de 0-11
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  // Funciones de navegación entre pasos
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

      // 1. Crear la cita en Google Calendar
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

      // 2. Procesar el pago
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

  // Obtener datos de la sesión seleccionada
  const selectedSessionData = sessionOptions.find(s => s.id === selectedSession);

  // Función helper para determinar el estado de cada paso
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

  // Renderizado condicional basado en el paso actual
  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Reserva Confirmada!</h2>
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

  return (
    <div 
      className="min-h-screen w-full fixed inset-0 overflow-auto" 
      style={{ 
        backgroundColor: '#272F54',
        margin: 0,
        padding: 0
      }}
    >
      {/* Header - Logo */}
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

      {/* Indicador de progreso - CORREGIDO */}
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

      {/* Contenido principal basado en el paso actual */}
      {currentStep === 'selection' && (
        <>
          {/* Sección Hero */}
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  ¡Felicidades por llegar hasta aquí!
                </h1>
                
                <div className="space-y-4 text-lg">
                  <p className="font-semibold">
                    Hola {userName || '[Cargando...]'}
                  </p>
                  
                  <p>
                    Permíteme decirte que estamos a un paso de 
                    liberar tu mejor versión de ti, en <span className="text-yellow-400 font-semibold">{coachInfo.businessName}</span> 
                    creemos que cada persona tiene un potencial 
                    enorme esperando ser liberado.
                  </p>
                  
                  <p>
                    Con {coachLoading ? 'nuestro coach' : coachInfo.name} lograrás impulsar cambios reales en 
                    tu vida a través de pilares fundamentales como: 
                    <span className="text-yellow-400 font-semibold"> la disciplina, la mentalidad, los hábitos y el propósito.</span>
                  </p>
                  
                  <p>
                    Aquí no se trata solo de alcanzar tus metas, sino 
                    de descubrir quién eres realmente y hacia dónde 
                    puedes llegar.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-80 h-96 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
                  {coachInfo.avatar ? (
                    <img 
                      src={coachInfo.avatar} 
                      alt={coachInfo.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-6xl">
                      👨‍💼
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Sección Selección de Sesión */}
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-white text-4xl font-bold mb-4 font-serif">Costos por Sesión</h2>
              <div className="flex justify-center">
                <div className="h-2 w-24 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {sessionOptions.map((session) => (
                <div 
                  key={session.id}
                  className={`bg-white rounded-lg p-8 shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col ${
                    selectedSession === session.id 
                      ? 'ring-4 ring-yellow-400 shadow-2xl' 
                      : 'hover:shadow-2xl'
                  }`}
                  onClick={() => selectSession(session.id)}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{session.subtitle}</p>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      ${session.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">{session.currency}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-sm text-gray-700 flex-grow">
                    {session.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-3 px-6 rounded font-semibold transition-all duration-200 mt-auto ${
                      selectedSession === session.id
                        ? 'bg-yellow-500 text-black shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {selectedSession === session.id ? '✓ Seleccionado' : 'Seleccionar'}
                  </button>
                </div>
              ))}
            </div>

            {selectedSession && (
              <div className="text-center mt-12">
                <button 
                  onClick={proceedToBooking}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
                >
                  Continuar con la Reserva
                </button>
              </div>
            )}
          </section>
        </>
      )}

      {currentStep === 'booking' && selectedSessionData && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-3 gap-0 relative">
              
              {/* Panel Izquierdo - Información */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{coachInfo.businessName}</h3>
                    <p className="text-gray-600">{coachInfo.name}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">
                      {selectedSessionData.subtitle}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{selectedSessionData.duration} min</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Video className="w-5 h-5" />
                    <span>Google Meet</span>
                  </div>

                  <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ${selectedSessionData.price.toLocaleString()} {selectedSessionData.currency}
                    </div>
                    <p className="text-gray-600 text-sm">Pago único</p>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-green-500">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-800">Cita programada</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {formatDateForDisplay(selectedDate)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {selectedTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Panel Central - Calendario */}
              <div className="p-6 lg:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Selecciona una Fecha y Hora
                  </h3>
                </div>

                {calendarError && (
                  <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                    <strong>Advertencia:</strong> {calendarError}. Mostrando datos de ejemplo.
                  </div>
                )}

                {/* Header del calendario */}
                <div className="flex items-center justify-between mb-6">
                  <button 
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    disabled={calendarLoading}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <h4 className="text-lg font-semibold text-gray-800">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h4>
                  
                  <button 
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    disabled={calendarLoading}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Grid del calendario */}
                <div className="mb-6">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((day, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(day)}
                        disabled={!day.isCurrentMonth || !day.isAvailable || calendarLoading}
                        className={`
                          aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
                          ${!day.isCurrentMonth 
                            ? 'text-gray-300 cursor-default' 
                            : day.isAvailable
                            ? day.isSelected
                              ? 'bg-blue-600 text-white font-semibold shadow-lg'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                          }
                          ${calendarLoading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        {day.date}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Zona horaria - México & Canadá</span>
                </div>
              </div>

              {/* Panel Derecho - Horarios */}
              <div className="bg-gray-50 p-6 lg:p-8">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {selectedDate ? formatDateForDisplay(selectedDate) : 'Selecciona una fecha'}
                  </h4>
                </div>

                {calendarLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Cargando horarios...</p>
                  </div>
                ) : selectedDate && availableSlots.length > 0 ? (
                  <div className="space-y-3">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          w-full py-3 px-4 rounded-lg text-left transition-all duration-200 font-medium
                          ${selectedTime === time
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : selectedDate ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No hay horarios disponibles para esta fecha</p>
                    <button 
                      onClick={fetchAvailability}
                      className="mt-4 text-blue-600 hover:text-blue-800 underline"
                      disabled={calendarLoading}
                    >
                      Refrescar disponibilidad
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Selecciona una fecha para ver los horarios disponibles</p>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="p-6 bg-gray-50 border-t flex justify-between">
              <button 
                onClick={backToSelection}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ← Cambiar Sesión
              </button>
              
              {selectedDate && selectedTime && (
                <button 
                  onClick={proceedToPayment}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Proceder al Pago →
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {currentStep === 'payment' && selectedSessionData && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Panel Izquierdo - Resumen de compra */}
              <div className="bg-indigo-600 text-white p-8 lg:w-1/3">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{coachInfo.businessName}</h3>
                    <p className="text-indigo-200 text-sm">{coachInfo.name}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{selectedSessionData.subtitle}</h2>
                  <div className="flex items-center text-indigo-200 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{selectedDate && formatDateForDisplay(selectedDate)}</span>
                  </div>
                  <div className="flex items-center text-indigo-200 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{selectedTime} - {selectedSessionData.duration} minutos</span>
                  </div>
                  <div className="flex items-center text-indigo-200">
                    <Video className="w-4 h-4 mr-2" />
                    <span>Google Meet</span>
                  </div>
                </div>

                <div className="border-t border-indigo-500 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span>Subtotal:</span>
                    <span>${selectedSessionData.price.toLocaleString()} {selectedSessionData.currency}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>${selectedSessionData.price.toLocaleString()} {selectedSessionData.currency}</span>
                  </div>
                </div>
              </div>

              {/* Panel Derecho - Formulario de pago */}
              <div className="p-8 lg:w-2/3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Información de Pago
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <Lock className="w-4 h-4 mr-2" />
                    <span>Tus datos están protegidos con encriptación SSL</span>
                  </div>
                </div>

                {paymentErrors.general && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700 text-sm">{paymentErrors.general}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Información Personal */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={paymentFormData.firstName}
                          onChange={handlePaymentInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            paymentErrors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Tu nombre"
                        />
                        {paymentErrors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{paymentErrors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={paymentFormData.lastName}
                          onChange={handlePaymentInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            paymentErrors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Tu apellido"
                        />
                        {paymentErrors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{paymentErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={paymentFormData.email}
                            onChange={handlePaymentInputChange}
                            className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                              paymentErrors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="tu@email.com"
                          />
                        </div>
                        {paymentErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{paymentErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={paymentFormData.phone}
                            onChange={handlePaymentInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="+52 555 123 4567"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información de Tarjeta */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Tarjeta</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Tarjeta *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentFormData.cardNumber}
                          onChange={handlePaymentInputChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            paymentErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      {paymentErrors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Expiración *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentFormData.expiryDate}
                          onChange={handlePaymentInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            paymentErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {paymentErrors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1">{paymentErrors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentFormData.cvv}
                          onChange={handlePaymentInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            paymentErrors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        {paymentErrors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{paymentErrors.cvv}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del Titular *
                      </label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={paymentFormData.cardholderName}
                        onChange={handlePaymentInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          paymentErrors.cardholderName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nombre como aparece en la tarjeta"
                      />
                      {paymentErrors.cardholderName && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.cardholderName}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botones de navegación */}
                <div className="flex justify-between pt-6 mt-8 border-t border-gray-200">
                  <button
                    onClick={backToBooking}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ← Volver
                  </button>
                  
                  <button
                    onClick={handleCompleteBookingAndPayment}
                    disabled={isProcessingPayment}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      `Confirmar y Pagar ${selectedSessionData.price.toLocaleString()}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default IntegratedBookingPayment;