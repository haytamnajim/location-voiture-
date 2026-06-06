import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export default function Header({ language, setLanguage, theme, setTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [isShrunk, setIsShrunk] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const t = translations[language];

  // Scroll handler: header shrink + active section + progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Shrink header
      setIsShrunk(scrollY > 50);

      // Scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      // Highlight active link
      const sections = ['home', 'fleet', 'services', 'contact'];
      const scrollPosition = scrollY + 150;
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#home',         label: t.nav_home,         icon: 'fa-house' },
    { href: '#fleet',        label: t.nav_fleet,        icon: 'fa-car' },
    { href: '#services',     label: t.nav_services,     icon: 'fa-star' },
    { href: '#contact',      label: t.nav_contact,      icon: 'fa-envelope' },
  ];

  return (
    <>
      <header
        className="header"
        style={{
          background: isShrunk
            ? 'rgba(5, 5, 5, 0.88)'
            : 'rgba(10, 10, 10, 0.55)',
          boxShadow: isShrunk
            ? '0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(212,175,55,0.15)'
            : 'none',
        }}
      >
        {/* Scroll Progress Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-main), var(--gold-light))',
            transition: 'width 0.1s linear',
            zIndex: 10,
          }}
          aria-hidden="true"
        />

        <div className="container header-container">
          {/* Logo */}
          <a href="#" className="logo-container" id="logo-link" onClick={() => handleLinkClick('#home')}>
            <svg className="logo-svg" viewBox="0 0 200 200" width="56" height="56">
              <circle cx="100" cy="100" r="95" fill="#0f0f0f" stroke="url(#gold-gradient)" strokeWidth="2"/>
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#fdf6e2" />
                  <stop offset="30%"  stopColor="#d4af37" />
                  <stop offset="70%"  stopColor="#aa771c" />
                  <stop offset="100%" stopColor="#f5e5b8" />
                </linearGradient>
                <linearGradient id="gold-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#fdf6e2" />
                  <stop offset="50%"  stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#aa771c" />
                </linearGradient>
              </defs>
              <path d="M 55 100 C 60 90, 80 82, 100 82 C 115 82, 130 84, 142 90 C 147 92, 153 96, 155 102 C 152 101, 144 98, 135 100 C 125 102, 110 110, 105 110 C 95 110, 85 105, 80 105" fill="none" stroke="url(#gold-gradient)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M 142 90 L 155 83 M 155 83 L 150 83 M 155 83 L 155 88" fill="none" stroke="url(#gold-gradient)" strokeWidth="2.5" strokeLinecap="round"/>
              <g transform="translate(68, 100)">
                <circle cx="0" cy="0" r="9" fill="none" stroke="url(#gold-gradient)" strokeWidth="2"/>
                <path d="M 0 -8 C -4 -8, -4 -3, 0 5 C 4 -3, 4 -8, 0 -8 Z" fill="url(#gold-gradient)"/>
                <circle cx="0" cy="-4" r="1.5" fill="#0f0f0f"/>
              </g>
              <circle cx="128" cy="100" r="9" fill="none" stroke="url(#gold-gradient)" strokeWidth="2"/>
              <text x="100" y="132" fontFamily="'Playfair Display', serif" fontWeight="900" fontSize="28" fill="url(#gold-text-grad)" textAnchor="middle" letterSpacing="1">ANAS</text>
              <text x="100" y="152" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="11" fill="url(#gold-text-grad)" textAnchor="middle" letterSpacing="3.5">RENT CAR</text>
            </svg>
            <div className="brand-text">
              <span className="brand-title">ANAS</span>
              <span className="brand-subtitle">RENT CAR</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-menu" id="nav-menu">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            <button className="theme-toggle-btn" id="theme-toggle" onClick={toggleTheme} aria-label="Basculer le thème">
              <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            <div className="lang-switcher">
              <button className={`lang-btn ${language === 'fr' ? 'active' : ''}`} id="lang-btn-fr" onClick={() => setLanguage('fr')}>FR</button>
              <span className="lang-divider">/</span>
              <button className={`lang-btn ${language === 'ar' ? 'active' : ''}`} id="lang-btn-ar" onClick={() => setLanguage('ar')}>AR</button>
            </div>

            <a href="#fleet" className="btn btn-gold btn-nav" onClick={() => handleLinkClick('#fleet')}>
              <i className="fa-solid fa-calendar-days"></i>
              {t.nav_book}
            </a>

            {/* Hamburger */}
            <button
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              id="menu-toggle"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-nav">
        {/* Mobile Controls Row */}
        <div className="mobile-controls-row">
          <button className="theme-toggle-btn" id="theme-toggle-mobile" onClick={toggleTheme} aria-label="Basculer le thème">
            <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
            <span>{t.theme_text}</span>
          </button>
          <div className="lang-switcher">
            <button className={`lang-btn ${language === 'fr' ? 'active' : ''}`} id="lang-btn-fr-mobile" onClick={() => setLanguage('fr')}>FR</button>
            <span className="lang-divider">/</span>
            <button className={`lang-btn ${language === 'ar' ? 'active' : ''}`} id="lang-btn-ar-mobile" onClick={() => setLanguage('ar')}>AR</button>
          </div>
        </div>

        {/* Mobile Nav Links with icons */}
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link"
            onClick={() => handleLinkClick(link.href)}
          >
            <i className={`fa-solid ${link.icon}`} style={{ color: 'var(--gold-main)', width: '18px', textAlign: 'center' }}></i>
            {link.label}
          </a>
        ))}

        {/* CTA Reserve */}
        <a
          href="#fleet"
          className="btn btn-gold w-full text-center"
          style={{ marginTop: '12px', borderRadius: '50px', justifyContent: 'center' }}
          onClick={() => handleLinkClick('#fleet')}
        >
          <i className="fa-solid fa-calendar-days"></i>
          {t.nav_book_now}
        </a>
      </div>
    </>
  );
}
