import React from 'react';
import { CheckCircle, X, Calendar, Phone, Mail } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData?: any;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  bookingData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gradient-to-br from-green-900/90 to-black border border-green-500/30 rounded-2xl max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-green-400">
              Booking Request Submitted!
            </h2>
            <p className="text-gray-300">
              Thank you for your interest in booking {bookingData?.celebrity}. 
              We've received your request and will contact you within 24 hours.
            </p>
          </div>

          <div className="bg-black/30 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-3 text-green-400">What happens next?</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-green-400" />
                Our team will review your request within 24 hours
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-400" />
                We'll call you to discuss availability and details
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-400" />
                You'll receive a formal quote via email
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Reference ID: <span className="text-green-400 font-mono">VIP-{Date.now().toString().slice(-6)}</span>
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};