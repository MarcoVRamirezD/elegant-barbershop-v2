import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2>Noir</h2>
          <p>Elegance and Precision</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Contact</h4>
            <p>123 Elegant Ave, Suite 100</p>
            <p>contact@noirbarbershop.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="footer-col">
            <h4>Hours</h4>
            <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
            <p>Sat: 9:00 AM - 6:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Noir Barbershop. All rights reserved.</p>
      </div>
    </footer>
  );
}
