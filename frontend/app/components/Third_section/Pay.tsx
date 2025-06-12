'use client';
import React from 'react';
import { CreditCard, Lock, AlertCircle, Calendar, Clock, Video, User, Mail, Phone } from 'lucide-react';

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

interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PayComponentProps {
  selectedSessionData: SessionOption | undefined;
  coachInfo: CoachInfo;
  selectedDate: string;
  selectedTime: string;
  paymentFormData: PaymentFormData;
  paymentErrors: Record<string, string>;
  isProcessingPayment: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBackToBooking: () => void;
  onCompletePayment: () => void;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const PayComponent: React.FC<PayComponentProps> = ({
  selectedSessionData,
  coachInfo,
  selectedDate,
  selectedTime,
  paymentFormData,
  paymentErrors,
  isProcessingPayment,
  onInputChange,
  onBackToBooking,
  onCompletePayment
}) => {
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

  if (!selectedSessionData) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Panel Izquierdo - Resumen de compra */}
          <div className="bg-indigo-600 text-white p-8 lg:w-1/3">
            {/* Información del coach */}
            <div className="flex items-center mb-6">
              <div className="bg-blue-500 rounded-full p-3 mr-4">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{coachInfo.businessName}</h3>
                <p className="text-indigo-200 text-sm">{coachInfo.name}</p>
              </div>
            </div>
            
            {/* Detalles de la reserva */}
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

            {/* Resumen de precio */}
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
            {/* Encabezado del formulario */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Información de Pago
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <Lock className="w-4 h-4 mr-2" />
                <span>Tus datos están protegidos con encriptación SSL</span>
              </div>
            </div>

            {/* Mensaje de error general */}
            {paymentErrors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 text-sm">{paymentErrors.general}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Sección: Información Personal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Campo: Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={paymentFormData.firstName}
                      onChange={onInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        paymentErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tu nombre"
                    />
                    {paymentErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.firstName}</p>
                    )}
                  </div>
                  
                  {/* Campo: Apellido */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={paymentFormData.lastName}
                      onChange={onInputChange}
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
                  {/* Campo: Email */}
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
                        onChange={onInputChange}
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
                  
                  {/* Campo: Teléfono (opcional) */}
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
                        onChange={onInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="+52 555 123 4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección: Información de Tarjeta */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Tarjeta</h3>
                
                {/* Campo: Número de tarjeta */}
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
                      onChange={onInputChange}
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
                  {/* Campo: Fecha de expiración */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Expiración *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentFormData.expiryDate}
                      onChange={onInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        paymentErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="MM/YY"
                    />
                    {paymentErrors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.expiryDate}</p>
                    )}
                  </div>
                  
                  {/* Campo: CVV */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentFormData.cvv}
                      onChange={onInputChange}
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

                {/* Campo: Nombre del titular */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Titular *
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={paymentFormData.cardholderName}
                    onChange={onInputChange}
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
                onClick={onBackToBooking}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ← Volver
              </button>
              
              <button
                onClick={onCompletePayment}
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
  );
};

export default PayComponent;