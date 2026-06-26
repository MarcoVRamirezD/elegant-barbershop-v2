import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    setIsOpen(false);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    setIsOpen(false);
    navigate('/');
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setIsOpen(false);
    navigate('/');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('isAuthenticated');
    setIsOpen(false);
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
          <h2>Noir</h2>
          <span>Barbershop</span>
        </Link>
        
        <div className={`navbar-menu-wrapper ${isOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li><a href="#home" onClick={scrollTo('home')}>{t('nav.home')}</a></li>
            <li><a href="#services" onClick={scrollTo('services')}>{t('nav.services')}</a></li>
            <li><a href="#barbers" onClick={scrollTo('barbers')}>{t('nav.barbers')}</a></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>{t('nav.profile')}</Link></li>
                <li><a href="#logout" onClick={handleLogout}>{t('nav.logout')}</a></li>
              </>
            ) : (
              <li><Link to="/login" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link></li>
            )}
          </ul>
          
          <div className="navbar-actions">
            <button onClick={toggleLanguage} className="lang-toggle">
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>
            <a href="#booking" onClick={handleBookNow} className="btn-primary">{t('nav.book_now')}</a>
          </div>
        </div>
        
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
