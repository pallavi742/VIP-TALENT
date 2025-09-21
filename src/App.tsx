import React, { useState, useEffect } from 'react';
import { Star, Play, Calendar, Users, Award, Phone, Mail, MapPin, ChevronRight, Menu, X, ArrowUp } from 'lucide-react';
import { CelebrityModal } from './components/CelebrityModal';
import { BookingModal } from './components/BookingModal';
import { SuccessModal } from './components/SuccessModal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCelebrity, setSelectedCelebrity] = useState<any>(null);
  const [isCelebrityModalOpen, setIsCelebrityModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add('visible');
        }
      });

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced celebrity data with more details
  const celebrities = [
    {
      id: 1,
      name: "A-List Movie Stars",
      category: "actors",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      price: "Starting at $50,000",
      description: "Hollywood's biggest names for your premiere events",
      bio: "Award-winning actors with decades of experience in blockbuster films and critically acclaimed performances.",
      achievements: ["Academy Award Winner", "Golden Globe Winner", "Screen Actors Guild Award"],
      specialties: ["Red Carpet Events", "Award Shows", "Corporate Keynotes", "Film Premieres"]
    },
    {
      id: 2,
      name: "Music Legends",
      category: "musicians", 
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
      price: "Starting at $75,000",
      description: "Chart-topping artists and Grammy winners",
      bio: "Multi-platinum recording artists who have topped charts worldwide and sold millions of albums.",
      achievements: ["Grammy Award Winner", "Billboard #1 Albums", "Multi-Platinum Sales"],
      specialties: ["Live Performances", "Private Concerts", "Music Festivals", "Corporate Events"]
    },
    {
      id: 3,
      name: "Sports Icons",
      category: "athletes",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg",
      price: "Starting at $25,000", 
      description: "Championship athletes and Olympic champions",
      bio: "World-class athletes who have competed at the highest levels and achieved legendary status in their sports.",
      achievements: ["Olympic Gold Medalist", "World Champion", "Hall of Fame Inductee"],
      specialties: ["Motivational Speaking", "Sports Events", "Corporate Training", "Charity Events"]
    },
    {
      id: 4,
      name: "Comedy Stars",
      category: "comedians",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
      price: "Starting at $30,000",
      description: "Stand-up legends and comedy show favorites",
      bio: "Hilarious performers who have headlined major comedy clubs and starred in popular TV shows and films.",
      achievements: ["Comedy Central Specials", "Late Night TV Appearances", "Sold-Out Tours"],
      specialties: ["Stand-Up Comedy", "Corporate Entertainment", "Roasts", "Comedy Shows"]
    },
    {
      id: 5,
      name: "TV Personalities",
      category: "tv",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      price: "Starting at $40,000",
      description: "Popular hosts and reality TV stars",
      bio: "Charismatic television personalities who have hosted popular shows and captivated audiences nationwide.",
      achievements: ["Emmy Nominations", "People's Choice Awards", "Daytime TV Awards"],
      specialties: ["Event Hosting", "Meet & Greets", "Brand Partnerships", "Media Appearances"]
    },
    {
      id: 6,
      name: "Social Media Influencers",
      category: "influencers",
      image: "https://images.pexels.com/photos/1181563/pexels-photo-1181563.jpeg",
      price: "Starting at $15,000",
      description: "Viral sensations and brand ambassadors",
      bio: "Digital creators with millions of followers who have mastered the art of social media engagement.",
      achievements: ["Millions of Followers", "Viral Content Creator", "Brand Partnership Expert"],
      specialties: ["Social Media Campaigns", "Product Launches", "Digital Marketing", "Content Creation"]
    }
  ];

  const filteredCelebrities = activeCategory === 'all' 
    ? celebrities 
    : celebrities.filter(celeb => celeb.category === activeCategory);

  const handleCelebrityClick = (celebrity: any) => {
    setSelectedCelebrity(celebrity);
    setIsCelebrityModalOpen(true);
  };

  const handleBookNow = (celebrity: any) => {
    setSelectedCelebrity(celebrity);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (data: any) => {
    setBookingData(data);
    setIsSuccessModalOpen(true);
    setIsBookingModalOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
              VIP TALENT
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-purple-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('celebrities')} className="hover:text-purple-400 transition-colors">Celebrities</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-purple-400 transition-colors">Services</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition-colors">Contact</button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block hover:text-purple-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('celebrities')} className="block hover:text-purple-400 transition-colors">Celebrities</button>
              <button onClick={() => scrollToSection('services')} className="block hover:text-purple-400 transition-colors">Services</button>
              <button onClick={() => scrollToSection('contact')} className="block hover:text-purple-400 transition-colors">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" 
            alt="Luxury Event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-black/70 to-black/90"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-gold-400 bg-clip-text text-transparent animate-pulse">
            VIP TALENT
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 fade-in">
            Exclusive Celebrity Bookings for Extraordinary Events
          </p>
          <p className="text-lg mb-12 text-gray-400 fade-in">
            Connect with A-list celebrities, music legends, sports icons, and entertainment stars for your once-in-a-lifetime events
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in">
            <button 
              onClick={() => scrollToSection('celebrities')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Browse Celebrities
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 fade-in">
            Premium <span className="bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 fade-in">
            Tailored celebrity experiences for every occasion
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 fade-in">
              <Calendar className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Corporate Events</h3>
              <p className="text-gray-400 mb-6">Elevate your corporate gatherings with celebrity keynote speakers, performers, and brand ambassadors.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Keynote Speakers</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Product Launches</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Award Ceremonies</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-black border border-pink-500/20 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 fade-in">
              <Users className="w-12 h-12 text-pink-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Private Parties</h3>
              <p className="text-gray-400 mb-6">Create unforgettable memories with celebrity performances and meet & greets for your special celebrations.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Birthday Parties</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Anniversaries</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Exclusive Gatherings</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gold-900/30 to-black border border-gold-500/20 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/20 fade-in">
              <Award className="w-12 h-12 text-gold-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Charity Galas</h3>
              <p className="text-gray-400 mb-6">Amplify your cause with celebrity supporters who can draw attention and donations to your charitable initiatives.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Fundraising Events</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Awareness Campaigns</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-gold-400 mr-2" /> Benefit Concerts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Showcase */}
      <section id="celebrities" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 fade-in">
            Our <span className="bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">Stars</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 fade-in">
            Access to entertainment's biggest names
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['all', 'actors', 'musicians', 'athletes', 'comedians', 'tv', 'influencers'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-purple-500/30 text-gray-400 hover:border-purple-500 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Celebrity Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCelebrities.map((celebrity) => (
              <div
                key={celebrity.id}
                className="group relative bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 fade-in cursor-pointer"
                onClick={() => handleCelebrityClick(celebrity)}
              >
                <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                  <img
                    src={celebrity.image}
                    alt={celebrity.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-16 h-16 text-white bg-purple-600/80 rounded-full p-4" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{celebrity.name}</h3>
                  <p className="text-gray-400 mb-4">{celebrity.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-400 font-semibold">{celebrity.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCelebrityClick(celebrity);
                      }}
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 fade-in">
            Client <span className="bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">Success</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 p-8 rounded-2xl fade-in">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">"VIP Talent delivered beyond our expectations. The celebrity appearance transformed our corporate event into an unforgettable experience."</p>
              <p className="font-semibold">- Fortune 500 CEO</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-black border border-pink-500/20 p-8 rounded-2xl fade-in">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">"Professional, seamless, and absolutely magical. Our charity gala raised 300% more than expected thanks to our celebrity guest."</p>
              <p className="font-semibold">- Charity Foundation Director</p>
            </div>

            <div className="bg-gradient-to-br from-gold-900/30 to-black border border-gold-500/20 p-8 rounded-2xl fade-in">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">"The personal touch and attention to detail made all the difference. Our private event was truly once-in-a-lifetime."</p>
              <p className="font-semibold">- Private Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="fade-in">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Let's Create <span className="bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">Magic</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Ready to book your dream celebrity? Get in touch with our expert team for a personalized consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-purple-400 mr-4" />
                  <span>1-800-VIP-STAR</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-purple-400 mr-4" />
                  <span>booking@viptalent.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-purple-400 mr-4" />
                  <span>Beverly Hills, CA</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 p-8 rounded-2xl fade-in">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Event Type"
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your event and celebrity preferences..."
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-300">
                  Request Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-purple-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent mb-4">
                VIP TALENT
              </div>
              <p className="text-gray-400">Connecting you with entertainment's biggest stars for extraordinary events.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Corporate Events</li>
                <li>Private Parties</li>
                <li>Charity Galas</li>
                <li>Product Launches</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Movie Stars</li>
                <li>Musicians</li>
                <li>Athletes</li>
                <li>Comedians</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1-800-VIP-STAR</li>
                <li>booking@viptalent.com</li>
                <li>Beverly Hills, CA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VIP Talent. All rights reserved. Making dreams come true, one event at a time.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 z-40"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Modals */}
      <CelebrityModal
        celebrity={selectedCelebrity}
        isOpen={isCelebrityModalOpen}
        onClose={() => setIsCelebrityModalOpen(false)}
        onBookNow={handleBookNow}
      />

      <BookingModal
        celebrity={selectedCelebrity}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSubmit={handleBookingSubmit}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        bookingData={bookingData}
      />
    </div>
  );
}

export default App;