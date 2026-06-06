import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import Services from './components/Services';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import SuccessModal from './components/SuccessModal';

export default function App() {
  // Init language from localStorage or default to 'fr'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('arcLang') || 'fr';
  });

  // Init theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('arcTheme') || 'dark';
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Search values from Hero search form
  const [initialSearchValues, setInitialSearchValues] = useState({
    pickupLocation: '',
    pickupDate: '',
    returnDate: ''
  });

  // Sync theme changes to document attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('arcTheme', theme);
  }, [theme]);

  // Sync language changes to document attributes
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('arcLang', language);

    // Optional: toggle text direction for Arabic
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [language]);

  const handleSearch = ({ pickupLocation, pickupDate, returnDate, category }) => {
    setInitialSearchValues({ pickupLocation, pickupDate, returnDate });
    setActiveCategory(category);
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (details) => {
    setBookingDetails(details);
    setIsSuccessOpen(true);
  };

  return (
    <>
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme} 
        setTheme={setTheme} 
      />
      
      <main>
        <Hero 
          language={language} 
          onSearch={handleSearch} 
        />
        
        <Fleet 
          language={language} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          onSelectCar={handleSelectCar} 
        />
        
        <Services language={language} />
        
        <Stats language={language} />
        
        <Testimonials language={language} />
        
        <Contact language={language} />
      </main>

      <Footer 
        language={language} 
        setActiveCategory={setActiveCategory} 
      />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        car={selectedCar} 
        language={language} 
        initialSearchValues={initialSearchValues} 
        onBookingSuccess={handleBookingSuccess} 
      />

      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        details={bookingDetails} 
        language={language} 
      />
    </>
  );
}
