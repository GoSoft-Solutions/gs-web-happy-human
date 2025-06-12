'use client';
import React, { useState } from 'react';
import { Calendar, Clock, Video, User, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// INTERFACES
// ============================================

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

interface DayData {
  date: number;
  isCurrentMonth: boolean;
  fullDate: string;
  isAvailable?: boolean;
  isSelected?: boolean;
}

interface DateComponentProps {
  selectedSessionData: SessionOption | undefined;
  coachInfo: CoachInfo;
  availableDates: string[];
  timeSlots: Record<string, string[]>;
  selectedDate: string;
  selectedTime: string;
  calendarLoading: boolean;
  calendarError: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onBackToSelection: () => void;
  onProceedToPayment: () => void;
  onRefreshAvailability: () => void;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const DateComponent: React.FC<DateComponentProps> = ({
  selectedSessionData,
  coachInfo,
  availableDates,
  timeSlots,
  selectedDate,
  selectedTime,
  calendarLoading,
  calendarError,
  onDateSelect,
  onTimeSelect,
  onBackToSelection,
  onProceedToPayment,
  onRefreshAvailability
}) => {
  // ============================================
  // ESTADO LOCAL DEL CALENDARIO
  // ============================================
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 5));

  // ============================================
  // CONFIGURACIÓN DEL CALENDARIO
  // ============================================
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  // ============================================
  // FUNCIONES DEL CALENDARIO
  // ============================================

  /**
   * Genera un array con todos los días a mostrar en el calendario
   */
  const getDaysInMonth = (date: Date): DayData[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DayData[] = [];
    
    // Agregar días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      const prevDateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDateStr
      });
    }

    // Agregar días del mes actual
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

    // Agregar días del mes siguiente
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

  /**
   * Navega entre meses en el calendario
   */
  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  /**
   * Maneja la selección de una fecha en el calendario
   */
  const handleDateSelect = (day: DayData) => {
    if (day.isCurrentMonth && day.isAvailable) {
      onDateSelect(day.fullDate);
    }
  };

  /**
   * Formatea una fecha para mostrar al usuario
   */
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

  // Horarios disponibles para la fecha seleccionada
  const availableSlots = selectedDate && timeSlots[selectedDate] ? timeSlots[selectedDate] : [];

  if (!selectedSessionData) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-0 relative">
          
          {/* Panel Izquierdo - Información de la sesión */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 lg:p-12">
            {/* Información del coach */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{coachInfo.businessName}</h3>
                <p className="text-gray-600">{coachInfo.name}</p>
              </div>
            </div>

            {/* Detalles de la sesión */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">
                  {selectedSessionData.subtitle}
                </h4>
              </div>

              {/* Duración */}
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{selectedSessionData.duration} min</span>
              </div>

              {/* Plataforma */}
              <div className="flex items-center gap-3 text-gray-600">
                <Video className="w-5 h-5" />
                <span>Google Meet</span>
              </div>

              {/* Precio */}
              <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  ${selectedSessionData.price.toLocaleString()} {selectedSessionData.currency}
                </div>
                <p className="text-gray-600 text-sm">Pago único</p>
              </div>

              {/* Resumen de cita */}
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

            {/* Mensaje de advertencia si hay error de API */}
            {calendarError && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                <strong>Advertencia:</strong> {calendarError}. Mostrando datos de ejemplo.
              </div>
            )}

            {/* Header del calendario con navegación de meses */}
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
              {/* Encabezados de días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
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

            {/* Indicador de zona horaria */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Zona horaria - México & Canadá</span>
            </div>
          </div>

          {/* Panel Derecho - Horarios disponibles */}
          <div className="bg-gray-50 p-6 lg:p-8">
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                {selectedDate ? formatDateForDisplay(selectedDate) : 'Selecciona una fecha'}
              </h4>
            </div>

            {/* Estado de carga */}
            {calendarLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Cargando horarios...</p>
              </div>
            ) : selectedDate && availableSlots.length > 0 ? (
              /* Lista de horarios disponibles */
              <div className="space-y-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelect(time)}
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
              /* Mensaje cuando no hay horarios */
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No hay horarios disponibles para esta fecha</p>
                <button 
                  onClick={onRefreshAvailability}
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
                  disabled={calendarLoading}
                >
                  Refrescar disponibilidad
                </button>
              </div>
            ) : (
              /* Mensaje inicial */
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
            onClick={onBackToSelection}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Cambiar Sesión
          </button>
          
          {selectedDate && selectedTime && (
            <button 
              onClick={onProceedToPayment}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceder al Pago →
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DateComponent;