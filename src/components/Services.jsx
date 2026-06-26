import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

export default function Services() {
  const services = [
    { title: "Classic Haircut", price: "$40", desc: "A tailored haircut including wash, style, and hot towel finish." },
    { title: "Beard Trim", price: "$25", desc: "Precision beard shaping with straight razor line up." },
    { title: "The Noir Package", price: "$60", desc: "Premium haircut and beard trim combo with scalp massage." },
    { title: "Hot Towel Shave", price: "$35", desc: "Traditional straight razor shave with essential oils." }
  ];

  return (
    <section id="services" className="section-padding services-section">
      <div className="container">
        <motion.h2 
          className="text-center section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        <div className="services-grid">
          {services.map((svc, index) => (
            <motion.div 
              key={index} 
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-header">
                <h3>{svc.title}</h3>
                <span className="price">{svc.price}</span>
              </div>
              <p>{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
