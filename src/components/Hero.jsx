import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

const heroBackgrounds = [
  "assets/peugeot_208_grey.png",
  "assets/peugeot_208_black.png",
  "assets/renault_clio_5_black.png",
  "assets/dacia_logan_black.png",
  "assets/dacia_sandero.png"
];

export default function Hero({ language, onSearch }) {
  const [bgIndex, setBgIndex] = useState(0);

  // Set default dates (today and tomorrow)
  const getTodayStr = () => new Date().toISOString().split("T")[0];
  const getTomorrowStr = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(getTodayStr());
  const [returnDate, setReturnDate] = useState(getTomorrowStr());
  const [category, setCategory] = useState('all');
  const [returnMinDate, setReturnMinDate] = useState(getTomorrowStr());

  const t = translations[language];

  // Background slideshow loop
  useEffect(() => {
    // Preload background images
    heroBackgrounds.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update return min date and value when pickup date changes
  const handlePickupDateChange = (e) => {
    const newPickupDate = e.target.value;
    setPickupDate(newPickupDate);

    const start = new Date(newPickupDate);
    const endMin = new Date(start);
    endMin.setDate(endMin.getDate() + 1);

    const endMinStr = endMin.toISOString().split("T")[0];
    setReturnMinDate(endMinStr);

    // If current return date is before or equal to new pickup date, advance it
    if (new Date(returnDate) <= start) {
      setReturnDate(endMinStr);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      pickupLocation,
      pickupDate,
      returnDate,
      category
    });
    
    // Smooth scroll to catalog
    const fleetEl = document.getElementById("fleet");
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="hero-section"
      style={{
        backgroundImage: `url('${heroBackgrounds[bgIndex]}')`,
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="hero-bg-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            <i className="fa-solid fa-crown gold-color"></i> <span>{t.hero_badge}</span>
          </span>
          <h1 
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: t.hero_title }}
          />
          <p className="hero-subtitle">{t.hero_subtitle}</p>
          <div className="hero-actions">
            <a href="#fleet" className="btn btn-gold">
              <i className="fa-solid fa-car"></i> <span>{t.hero_btn_fleet}</span>
            </a>
            <a href="#services" className="btn btn-outline">
              <i className="fa-solid fa-circle-info"></i> <span>{t.hero_btn_services}</span>
            </a>
          </div>
        </div>

        {/* Booking Search Bar (Glassmorphism) */}
        <div className="booking-search-card">
          <h3 className="search-card-title">
            <i className="fa-solid fa-calendar-check gold-color"></i> <span>{t.search_title}</span>
          </h3>
          <form className="search-form" id="hero-search-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="pickup-location">
                <i className="fa-solid fa-location-dot"></i> <span>{t.search_loc}</span>
              </label>
              <select 
                id="pickup-location" 
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
              >
                <option value="" disabled>{t.search_loc_placeholder}</option>
                <option value="casablanca">{t.city_casa}</option>
                <option value="marrakech">{t.city_kech}</option>
                <option value="rabat">{t.city_rabat}</option>
                <option value="tanger">{t.city_tanger}</option>
                <option value="agadir">{t.city_agadir}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pickup-date">
                <i className="fa-solid fa-calendar-days"></i> <span>{t.search_start}</span>
              </label>
              <input 
                type="date" 
                id="pickup-date" 
                value={pickupDate}
                min={getTodayStr()}
                onChange={handlePickupDateChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="return-date">
                <i className="fa-solid fa-calendar-days"></i> <span>{t.search_end}</span>
              </label>
              <input 
                type="date" 
                id="return-date" 
                value={returnDate}
                min={returnMinDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="car-category">
                <i className="fa-solid fa-sliders"></i> {language === 'ar' ? 'العلامة التجارية' : 'Marque'}
              </label>
              <select 
                id="car-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">{language === 'ar' ? 'جميع الماركات' : 'Toutes les marques'}</option>
                <option value="peugeot">Peugeot</option>
                <option value="renault">Renault</option>
                <option value="dacia">Dacia</option>
              </select>
            </div>
            <button type="submit" className="btn btn-gold btn-search">
              <i className="fa-solid fa-magnifying-glass"></i> {language === 'ar' ? 'بحث' : 'Rechercher'}
            </button>
          </form>
        </div>
      </div>
      {/* Scroll indicator */}
      <a href="#fleet" className="scroll-down">
        <span className="mouse">
          <span className="wheel"></span>
        </span>
      </a>
    </section>
  );
}
