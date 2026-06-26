import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "services": "Services",
        "barbers": "Barbers",
        "book_now": "Book Now",
        "login": "Login",
        "profile": "Profile",
        "logout": "Logout"
      },
      "hero": {
        "title": "Precision.<br/>Elegance.<br/>Style.",
        "subtitle": "Experience the finest grooming tailored for the modern gentleman.",
        "book_btn": "Book an Appointment",
        "services_btn": "View Services"
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "home": "Inicio",
        "services": "Servicios",
        "barbers": "Barberos",
        "book_now": "Agendar",
        "login": "Entrar",
        "profile": "Mi Cuenta",
        "logout": "Salir"
      },
      "hero": {
        "title": "Precisión.<br/>Elegancia.<br/>Estilo.",
        "subtitle": "Experimenta el mejor cuidado personal diseñado para el caballero moderno.",
        "book_btn": "Agendar una Cita",
        "services_btn": "Ver Servicios"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
