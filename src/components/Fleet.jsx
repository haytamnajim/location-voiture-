import React, { useState, useEffect } from 'react';
import { carFleet } from '../data/cars';
import { translations } from '../data/translations';

export default function Fleet({ language, activeCategory, setActiveCategory, onSelectCar }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedCars, setDisplayedCars] = useState(carFleet);

  const t = translations[language];

  // Trigger grid fade transitions when category or language changes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      const filtered = activeCategory === 'all' 
        ? carFleet 
        : carFleet.filter(car => car.category === activeCategory);
      setDisplayedCars(filtered);
      setIsTransitioning(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleTabChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section id="fleet" className="fleet-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tagline">
            {language === 'ar' ? 'اختيارنا المميز' : 'Notre Sélection'}
          </span>
          <h2 className="section-title">
            {language === 'ar' ? (
              <>اكتشف <span className="gold-gradient-text">أسطولنا الفاخر</span></>
            ) : (
              <>Découvrez Notre <span className="gold-gradient-text">Flotte Prestige</span></>
            )}
          </h2>
          <p className="section-description">
            {language === 'ar' 
              ? 'مجموعة مختارة من السيارات الاقتصادية والمدنية، المثالية لتنقلاتكم المهنية والشخصية في المغرب.' 
              : 'Une sélection de véhicules économiques et citadins, idéaux pour vos déplacements professionnels et personnels au Maroc.'}
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="fleet-tabs">
          <button 
            className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`} 
            onClick={() => handleTabChange('all')}
          >
            {language === 'ar' ? 'الكل' : 'Toutes'}
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'peugeot' ? 'active' : ''}`} 
            onClick={() => handleTabChange('peugeot')}
          >
            Peugeot
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'renault' ? 'active' : ''}`} 
            onClick={() => handleTabChange('renault')}
          >
            Renault
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'dacia' ? 'active' : ''}`} 
            onClick={() => handleTabChange('dacia')}
          >
            Dacia
          </button>
        </div>

        {/* Fleet Cars Grid */}
        <div 
          className="cars-grid" 
          id="cars-grid"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.25s ease, transform 0.25s ease'
          }}
        >
          {displayedCars.length === 0 ? (
            <div className="no-cars">
              {language === 'ar' 
                ? 'لا توجد سيارات متاحة في هذه الفئة حالياً.' 
                : 'Aucun véhicule disponible dans cette catégorie pour le moment.'}
            </div>
          ) : (
            displayedCars.map((car, index) => {
              const fromLabel = t.car_from || "À partir de";
              const reserveLabel = t.car_reserve_btn || "Réserver";

              return (
                <div 
                  key={car.id} 
                  className="car-card"
                  style={{
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'var(--transition-smooth)',
                    animationDelay: `${index * 80}ms`
                  }}
                >
                  <div className="car-img-wrapper">
                    <span className="car-tag">{car.tag}</span>
                    <img src={car.image} alt={car.name} loading="lazy" />
                  </div>
                  <div className="car-details">
                    <h3 className="car-name">{car.name}</h3>
                    <div className="car-rating">
                      <i className="fa-solid fa-star"></i>
                      <span>{car.rating}</span>
                    </div>
                    <div className="car-specs">
                      <div className="spec-item">
                        <i className="fa-solid fa-gauge-high"></i>
                        <span>{car.specs.engine}</span>
                      </div>
                      <div className="spec-item">
                        <i className="fa-solid fa-gears"></i>
                        <span>{car.specs.transmission}</span>
                      </div>
                      <div className="spec-item">
                        <i className="fa-solid fa-gas-pump"></i>
                        <span>{car.specs.fuel}</span>
                      </div>
                      <div className="spec-item">
                        <i className="fa-solid fa-users"></i>
                        <span>{car.specs.seats}</span>
                      </div>
                    </div>
                    <div className="car-price-row">
                      <div className="price-box">
                        <span className="price-label">{fromLabel}</span>
                        <span className="price-amount">{car.price} <span class="currency">DH/j</span></span>
                      </div>
                      <button 
                        className="btn btn-gold btn-rent" 
                        onClick={() => onSelectCar(car)}
                      >
                        <i className="fa-solid fa-calendar-days"></i> {reserveLabel}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
