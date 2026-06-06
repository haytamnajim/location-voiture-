import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export default function Header({ language, setLanguage, theme, setTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [isShrunk, setIsShrunk] = useState(false);

  const t = translations[language];

  // Scroll handler for header shrinking and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Shrink header
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }

      // Highlight active link
      const sections = ['home', 'fleet', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className="header" 
        style={{ 
          padding: isShrunk ? '10px 0' : '0', 
          boxShadow: isShrunk ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
          transition: 'padding 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <div className="container header-container">
          <a href="#" className="logo-container" id="logo-link" onClick={() => handleLinkClick('#home')}>
            {/* Custom SVG replicating the user's logo */}
            <svg className="logo-svg" viewBox="0 0 200 200" width="60" height="60">
              <circle cx="100" cy="100" r="95" fill="#0f0f0f" stroke="url(#gold-gradient)" stroke-width="2"/>
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fdf6e2" />
                  <stop offset="30%" stop-color="#d4af37" />
                  <stop offset="70%" stop-color="#aa771c" />
                  <stop offset="100%" stop-color="#f5e5b8" />
                </linearGradient>
                <linearGradient id="gold-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#fdf6e2" />
                  <stop offset="50%" stop-color="#d4af37" />
                  <stop offset="100%" stop-color="#aa771c" />
                </linearGradient>
              </defs>
              <path d="M 55 100 C 60 90, 80 82, 100 82 C 115 82, 130 84, 142 90 C 147 92, 153 96, 155 102 C 152 101, 144 98, 135 100 C 125 102, 110 110, 105 110 C 95 110, 85 105, 80 105" fill="none" stroke="url(#gold-gradient)" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M 142 90 L 155 83 M 155 83 L 150 83 M 155 83 L 155 88" fill="none" stroke="url(#gold-gradient)" stroke-width="2.5" stroke-linecap="round"/>
              <g transform="translate(68, 100)">
                <circle cx="0" cy="0" r="9" fill="none" stroke="url(#gold-gradient)" stroke-width="2"/>
                <path d="M 0 -8 C -4 -8, -4 -3, 0 5 C 4 -3, 4 -8, 0 -8 Z" fill="url(#gold-gradient)"/>
                <circle cx="0" cy="-4" r="1.5" fill="#0f0f0f"/>
              </g>
              <circle cx="128" cy="100" r="9" fill="none" stroke="url(#gold-gradient)" stroke-width="2"/>
              <text x="100" y="132" font-family="'Playfair Display', serif" font-weight="900" font-size="28" fill="url(#gold-text-grad)" text-anchor="middle" letter-spacing="1">ANAS</text>
              <text x="100" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="11" fill="url(#gold-text-grad)" text-anchor="middle" letter-spacing="3.5">RENT CAR</text>
            </svg>
            <div className="brand-text">
              <span className="brand-title">ANAS</span>
              <span className="brand-subtitle">RENT CAR</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-menu" id="nav-menu">
            <a 
              href="#home" 
              className={`nav-link ${activeLink === '#home' ? 'active' : ''}`}
              onClick={() => handleLinkClick('#home')}
            >
              {t.nav_home}
            </a>
            <a 
              href="#fleet" 
              className={`nav-link ${activeLink === '#fleet' ? 'active' : ''}`}
              onClick={() => handleLinkClick('#fleet')}
            >
              {t.nav_fleet}
            </a>
            <a 
              href="#services" 
              className={`nav-link ${activeLink === '#services' ? 'active' : ''}`}
              onClick={() => handleLinkClick('#services')}
            >
              {t.nav_services}
            </a>
            <a 
              href="#testimonials" 
              className={`nav-link ${activeLink === '#testimonials' ? 'active' : ''}`}
              onClick={() => handleLinkClick('#testimonials')}
            >
              {t.nav_testimonials}
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activeLink === '#contact' ? 'active' : ''}`}
              onClick={() => handleLinkClick('#contact')}
            >
              {t.nav_contact}
            </a>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle-btn" id="theme-toggle" onClick={toggleTheme} aria-label="Basculer le thème">
              <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <div className="lang-switcher">
              <button 
                className={`lang-btn ${language === 'fr' ? 'active' : ''}`} 
                id="lang-btn-fr" 
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
              <span className="lang-divider">/</span>
              <button 
                className={`lang-btn ${language === 'ar' ? 'active' : ''}`} 
                id="lang-btn-ar" 
                onClick={() => setLanguage('ar')}
              >
                AR
              </button>
            </div>
            <a href="#fleet" className="btn btn-gold btn-nav" onClick={() => handleLinkClick('#fleet')}>
              {t.nav_book}
            </a>
            {/* Hamburger Menu */}
            <button 
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
              id="menu-toggle" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Ouvrir le menu"
            >
              <span className="bar" style={isMobileMenuOpen ? { transform: 'rotate(45deg) translate(5px, 6px)' } : {}}></span>
              <span className="bar" style={isMobileMenuOpen ? { opacity: 0 } : {}}></span>
              <span className="bar" style={isMobileMenuOpen ? { transform: 'rotate(-45deg) translate(5px, -6px)' } : {}}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-nav">
        <div className="mobile-controls-row">
          <button className="theme-toggle-btn" id="theme-toggle-mobile" onClick={toggleTheme} aria-label="Basculer le thème">
            <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i> <span>{t.theme_text}</span>
          </button>
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${language === 'fr' ? 'active' : ''}`} 
              id="lang-btn-fr-mobile" 
              onClick={() => setLanguage('fr')}
            >
              FR
            </button>
            <span className="lang-divider">/</span>
            <button 
              className={`lang-btn ${language === 'ar' ? 'active' : ''}`} 
              id="lang-btn-ar-mobile" 
              onClick={() => setLanguage('ar')}
            >
              AR
            </button>
          </div>
        </div>
        <a href="#home" className="mobile-link" onClick={() => handleLinkClick('#home')}>{t.nav_home}</a>
        <a href="#fleet" class="mobile-link" onClick={() => handleLinkClick('#fleet')}>{t.nav_fleet}</a>
        <a href="#services" className="mobile-link" onClick={() => handleLinkClick('#services')}>{t.nav_services}</a>
        <a href="#testimonials" className="mobile-link" onClick={() => handleLinkClick('#testimonials')}>{t.nav_testimonials}</a>
        <a href="#contact" className="mobile-link" onClick={() => handleLinkClick('#contact')}>{t.nav_contact}</a>
        <a href="#fleet" className="btn btn-gold w-full text-center mt-6" onClick={() => handleLinkClick('#fleet')}>
          {t.nav_book_now}
        </a>
      </div>
    </>
  );
}
