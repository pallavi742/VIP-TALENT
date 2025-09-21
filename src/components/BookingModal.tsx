import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, Clock, DollarSign } from 'lucide-react';

interface Celebrity {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  description: string;
}

interface BookingModalProps {
  celebrity: Celebrity | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookingData: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  celebrity,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !celebrity) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.eventType.trim()) newErrors.eventType = 'Event type is required';
    if (!formData.eventDate.trim()) newErrors.eventDate = 'Event date is required';
    if (!formData.eventLocation.trim()) newErrors.eventLocation = 'Event location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit({
      ...formData,
      celebrity: celebrity.name,
      celebrityId: celebrity.id
    });
    
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      eventType: '',
      eventDate: '',
      eventLocation: '',
      guestCount: '',
      budget: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gradient-to-br from-purple-900/90 to-black border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
              Book {celebrity.name}
            </h2>
            <p className="text-gray-400">Fill out the form below to request a booking</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-400'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-400'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-400'
                  }`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-purple-500/30 focus:border-purple-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                    errors.eventType ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-400'
                  }`}
                >
                  <option value="">Select event type</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="private">Private Party</option>
                  <option value="charity">Charity Gala</option>
                  <option value="wedding">Wedding</option>
                  <option value="other">Other</option>
                </select>
                {errors.eventType && <p className="text-red-400 text-sm mt-1">{errors.eventType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                    errors.eventDate ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-400'
                  }`}
                />
                {errors.eventDate && <p className="text-red-400 text-sm mt-1">{errors.eventDate}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Location *
              </label>
              <input
                type="text"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                  errors.eventLocation ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-400'
                }`}
                placeholder="City, State or Full Address"
              />
              {errors.eventLocation && <p className="text-red-400 text-sm mt-1">{errors.eventLocation}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Guest Count
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-purple-500/30 focus:border-purple-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors"
                  placeholder="Number of guests"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-purple-500/30 focus:border-purple-400 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                >
                  <option value="">Select budget range</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k+">$250,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-black/50 border border-purple-500/30 focus:border-purple-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors resize-none"
                placeholder="Tell us more about your event, special requirements, or any questions you have..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-purple-500/30 hover:border-purple-400 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};