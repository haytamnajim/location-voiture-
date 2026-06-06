import React from 'react';

const footerData = {
  fr: {
    desc: "ANAS RENT CAR est votre partenaire de confiance au Maroc pour la location de véhicules haut de gamme, de prestige et sportifs.",
    quickLinks: "Liens Rapides",
    brands: "Marques",
    cities: "Nos Villes",
    rights: "© 2026 ANAS RENT CAR. Tous droits réservés.",
    terms: "Conditions Générales de Vente",
    privacy: "Politique de Confidentialité",
    legal: "Mentions Légales",
    home: "Accueil",
    fleet: "Notre Flotte",
    services: "Nos Services",
    testimonials: "Avis Clients",
    contact: "Contact & Réservations"
  },
  ar: {
    desc: "أناس لتأجير السيارات هو شريككم الموثوق في المغرب لكراء السيارات الفاخرة، المتميزة والرياضية.",
    quickLinks: "روابط سريعة",
    brands: "العلامات التجارية",
    cities: "مدننا",
    rights: "© 2026 أناس لتأجير السيارات. جميع الحقوق محفوظة.",
    terms: "شروط البيع العامة",
    privacy: "سياسة الخصوصية",
    legal: "إشعار قانوني",
    home: "الرئيسية",
    fleet: "أسطولنا",
    services: "خدماتنا",
    testimonials: "آراء العملاء",
    contact: "الاتصال والحجز"
  }
};

export default function Footer({ language, setActiveCategory }) {
  const content = footerData[language] || footerData.fr;

  const handleBrandClick = (category) => {
    setActiveCategory(category);
    const fleetEl = document.getElementById("fleet");
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="logo-container">
            {/* Footer Logo */}
            <svg className="logo-svg" viewBox="0 0 200 200" width="50" height="50">
              <circle cx="100" cy="100" r="95" fill="#0f0f0f" stroke="url(#gold-gradient)" stroke-width="2"/>
              <path d="M 55 100 C 60 90, 80 82, 100 82 C 115 82, 130 84, 142 90 C 147 92, 153 96, 155 102 C 152 101, 144 98, 135 100 C 125 102, 110 110, 105 110 C 95 110, 85 105, 80 105" fill="none" stroke="url(#gold-gradient)" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="128" cy="100" r="9" fill="none" stroke="url(#gold-gradient)" stroke-width="2"/>
              <g transform="translate(68, 100)">
                <circle cx="0" cy="0" r="9" fill="none" stroke="url(#gold-gradient)" stroke-width="2"/>
                <path d="M 0 -8 C -4 -8, -4 -3, 0 5 C 4 -3, 4 -8, 0 -8 Z" fill="url(#gold-gradient)"/>
              </g>
              <text x="100" y="135" font-family="'Playfair Display', serif" font-weight="900" font-size="28" fill="url(#gold-text-grad)" text-anchor="middle" letter-spacing="1">ANAS</text>
              <text x="100" y="155" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="10" fill="url(#gold-text-grad)" text-anchor="middle" letter-spacing="2.5">RENT CAR</text>
            </svg>
            <div className="brand-text">
              <span className="brand-title text-sm">ANAS</span>
              <span className="brand-subtitle text-xs">RENT CAR</span>
            </div>
          </div>
          <p className="footer-desc">{content.desc}</p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="social-icon" aria-label="Linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
            <a 
              href="https://wa.me/212632230098?text=Bonjour%20ANAS%20RENT%20CAR%2C%20je%20souhaite%20me%20renseigner%20sur%20vos%20voitures%20de%20location." 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon" 
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">{content.quickLinks}</h4>
          <ul className="footer-links">
            <li><a href="#home">{content.home}</a></li>
            <li><a href="#fleet">{content.fleet}</a></li>
            <li><a href="#services">{content.services}</a></li>
            <li><a href="#testimonials">{content.testimonials}</a></li>
            <li><a href="#contact">{content.contact}</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">{content.brands}</h4>
          <ul className="footer-links">
            <li>
              <button onClick={() => handleBrandClick('peugeot')} className="link-btn-unstyled hover-gold">
                Peugeot
              </button>
            </li>
            <li>
              <button onClick={() => handleBrandClick('renault')} className="link-btn-unstyled hover-gold">
                Renault
              </button>
            </li>
            <li>
              <button onClick={() => handleBrandClick('dacia')} className="link-btn-unstyled hover-gold">
                Dacia
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">{content.cities}</h4>
          <ul className="footer-links">
            <li><a href="#fleet">Casablanca</a></li>
            <li><a href="#fleet">Marrakech</a></li>
            <li><a href="#fleet">Rabat</a></li>
            <li><a href="#fleet">Tanger</a></li>
            <li><a href="#fleet">Agadir</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>{content.rights}</p>
          <div className="footer-bottom-links">
            <a href="#">{content.legal}</a>
            <a href="#">{content.terms}</a>
            <a href="#">{content.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
