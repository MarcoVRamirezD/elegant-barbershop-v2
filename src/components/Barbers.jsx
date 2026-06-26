import React from 'react';
import { motion } from 'framer-motion';
import './Barbers.css';

export default function Barbers() {
  const barbers = [
    { name: "Arthur Pendelton", role: "Master Barber", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Julian Thorne", role: "Senior Barber", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Mateo Silva", role: "Style Specialist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <section id="barbers" className="section-padding barbers-section">
      <div className="container">
        <motion.h2 
          className="text-center section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.h2>
        <div className="barbers-grid">
          {barbers.map((barber, index) => (
            <motion.div 
              key={index} 
              className="barber-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="barber-img-wrapper">
                <img src={barber.img} alt={barber.name} />
              </div>
              <div className="barber-info">
                <h3>{barber.name}</h3>
                <p>{barber.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
