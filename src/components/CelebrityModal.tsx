import React from 'react';
import { X, Star, Calendar, Users, Phone, Mail } from 'lucide-react';

interface Celebrity {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  description: string;
  bio?: string;
  achievements?: string[];
  availability?: string;
  specialties?: string[];
}

interface CelebrityModalProps {
  celebrity: Celebrity | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (celebrity: Celebrity) => void;
}

export const CelebrityModal: React.FC<CelebrityModalProps> = ({
  celebrity,
  isOpen,
  onClose,
  onBookNow
}) => {
  if (!isOpen || !celebrity) return null;

  const handleBookNow = () => {
    onBookNow(celebrity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gradient-to-br from-purple-900/90 to-black border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div>
            <img
              src={celebrity.image}
              alt={celebrity.name}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
              {celebrity.name}
            </h2>
            
            <div className="flex items-center mb-4">
              <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm capitalize">
                {celebrity.category}
              </span>
              <span className="ml-4 text-gold-400 font-semibold text-lg">
                {celebrity.price}
              </span>
            </div>

            <p className="text-gray-300 mb-6">{celebrity.description}</p>

            {celebrity.bio && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Biography</h3>
                <p className="text-gray-400">{celebrity.bio}</p>
              </div>
            )}

            {celebrity.achievements && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Achievements</h3>
                <ul className="space-y-1">
                  {celebrity.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center text-gray-400">
                      <Star className="w-4 h-4 text-gold-400 mr-2" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {celebrity.specialties && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {celebrity.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-gold-600/20 text-gold-300 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Book Now
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-purple-500/30 hover:border-purple-400 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};