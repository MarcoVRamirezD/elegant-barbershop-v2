import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <motion.div 
        className="container hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
        <p>{t('hero.subtitle')}</p>
        <div className="hero-actions">
          <a href="#booking" className="btn-primary">{t('hero.book_btn')}</a>
          <a href="#services" className="btn-secondary">{t('hero.services_btn')}</a>
        </div>
      </motion.div>
    </section>
  );
}
