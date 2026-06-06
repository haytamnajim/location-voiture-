import React from 'react';
import { carFleet } from '../data/cars';

const wheelCoordinates = {
  "peugeot-208-grey": {
    front: { left: "17.6%", bottom: "4.2%", size: "17.2%" },
    rear: { left: "72.4%", bottom: "4.2%", size: "17.2%" }
  },
  "peugeot-208-black": {
    front: { left: "17.6%", bottom: "4.2%", size: "17.2%" },
    rear: { left: "72.4%", bottom: "4.2%", size: "17.2%" }
  },
  "renault-clio-5": {
    front: { left: "17.5%", bottom: "4.2%", size: "17.2%" },
    rear: { left: "72.0%", bottom: "4.2%", size: "17.2%" }
  },
  "dacia-logan": {
    front: { left: "18.2%", bottom: "4.0%", size: "17.4%" },
    rear: { left: "72.8%", bottom: "4.0%", size: "17.4%" }
  },
  "dacia-sandero": {
    front: { left: "17.8%", bottom: "4.0%", size: "17.5%" },
    rear: { left: "72.8%", bottom: "4.0%", size: "17.5%" }
  }
};

const SpinningWheel = () => (
  <svg className="spinning-wheel" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Outer tire */}
    <circle cx="50" cy="50" r="46" fill="#121212" stroke="#1c1c1c" strokeWidth="2" />
    <circle cx="50" cy="50" r="41" fill="none" stroke="#2a2a2a" strokeWidth="4" />
    {/* Rim Outer Ring */}
    <circle cx="50" cy="50" r="33" fill="#222" stroke="url(#goldGradMarquee)" strokeWidth="2" />
    
    {/* Gold Gradient Definitions */}
    <defs>
      <linearGradient id="goldGradMarquee" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#aa7c11" />
        <stop offset="30%" stopColor="#f3d078" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="70%" stopColor="#f3d078" />
        <stop offset="100%" stopColor="#aa7c11" />
      </linearGradient>
    </defs>
    
    {/* Alloy Spokes (Multi-spoke premium sports wheel) */}
    <g stroke="url(#goldGradMarquee)" strokeWidth="2.5" strokeLinecap="round">
      <line x1="50" y1="17" x2="50" y2="83" />
      <line x1="17" y1="50" x2="83" y2="50" />
      
      <line x1="26.7" y1="26.7" x2="73.3" y2="73.3" />
      <line x1="26.7" y1="73.3" x2="73.3" y2="26.7" />
      
      <line x1="37.5" y1="19.3" x2="62.5" y2="80.7" />
      <line x1="62.5" y1="19.3" x2="37.5" y2="80.7" />
      
      <line x1="19.3" y1="37.5" x2="80.7" y2="62.5" />
      <line x1="80.7" y1="37.5" x2="19.3" y2="62.5" />
    </g>
    
    {/* Inner brake rotor disc (adds depth) */}
    <circle cx="50" cy="50" r="15" fill="#333" stroke="url(#goldGradMarquee)" strokeWidth="1" opacity="0.8" />
    {/* Center Hub Cap */}
    <circle cx="50" cy="50" r="8" fill="#121212" stroke="url(#goldGradMarquee)" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="3" fill="#d4af37" />
  </svg>
);

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
            {marqueeList.map((car, idx) => {
              const wheels = wheelCoordinates[car.id] || {
                front: { left: "18%", bottom: "4.5%", size: "17%" },
                rear: { left: "73%", bottom: "4.5%", size: "17%" }
              };

              return (
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

                    <img src={car.image} alt={car.name} className="marquee-car-body" />
                    
                    {/* Superimposed rotating wheel - Front */}
                    <div 
                      className="marquee-wheel wheel-front"
                      style={{
                        left: wheels.front.left,
                        bottom: wheels.front.bottom,
                        width: wheels.front.size,
                        height: wheels.front.size
                      }}
                    >
                      <SpinningWheel />
                    </div>

                    {/* Superimposed rotating wheel - Rear */}
                    <div 
                      className="marquee-wheel wheel-rear"
                      style={{
                        left: wheels.rear.left,
                        bottom: wheels.rear.bottom,
                        width: wheels.rear.size,
                        height: wheels.rear.size
                      }}
                    >
                      <SpinningWheel />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
