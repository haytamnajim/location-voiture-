import React from 'react';
import { carFleet } from '../data/cars';

export default function CarMarquee({ language, onSelectCar }) {
  // Triple the array to ensure seamless infinite looping animation
  const marqueeList = [...carFleet, ...carFleet, ...carFleet];

  return (
    <section className="marquee-section reveal">
      <div className="container">
        <div className="section-header centered">
          <span className="section-tagline">
            {language === 'ar' ? 'رحلتكم تبدأ هنا' : 'Votre Voyage Commence Ici'}
          </span>
          <h2 className="section-title">
            {language === 'ar' ? (
              <>اضغط واحجز <span className="gold-gradient-text">سيارتك المفضلة</span> مباشرة</>
            ) : (
              <>Cliquez et Réservez <span className="gold-gradient-text">Votre Voiture</span> en Direct</>
            )}
          </h2>
          <p className="section-description">
            {language === 'ar'
              ? 'أسطولنا في حركة مستمرة لتلبية احتياجاتكم. اختر أي سيارة وهي تسير لحجزها فوراً.'
              : 'Notre flotte est en mouvement continu pour vous servir. Cliquez sur le véhicule de votre choix pendant son passage pour le réserver.'}
          </p>
        </div>
      </div>

      <div className="highway-container">
        {/* Road Track background with moving dashed lines */}
        <div className="highway-track">
          <div className="highway-lines"></div>
          
          <div className="marquee-track">
            {marqueeList.map((car, idx) => (
              <div 
                key={`${car.id}-${idx}`}
                className="marquee-car-wrapper"
                onClick={() => onSelectCar(car)}
                title={language === 'ar' ? `احجز ${car.name}` : `Réserver ${car.name}`}
              >
                <div className="marquee-car-card">
                  {/* Floating Price Tag */}
                  <div className="marquee-car-badge">
                    <span className="badge-name">{car.name.split(' ')[0]}</span>
                    <span className="badge-price">{car.price} DH/j</span>
                  </div>

                  {/* Speed lines behind car for motion illusion */}
                  <div className="speed-lines" aria-hidden="true">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                  </div>

                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="marquee-car-body"
                    style={{ transform: car.facesRight ? 'scaleX(-1)' : 'none' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
