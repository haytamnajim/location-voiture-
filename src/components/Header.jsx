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
            <img src="/assets/logo.png" alt="ANAS RENT CAR" className="logo-img" />
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
