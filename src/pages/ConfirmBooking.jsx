import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockBookings } from '../utils/mockDB';
import './Auth.css'; // Reusing styles

export default function ConfirmBooking() {
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('pendingBooking');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // If no pending booking, go to home
      navigate('/');
    }
  }, [navigate]);

  const handleConfirm = () => {
    if (bookingData) {
      const { date, barber, time } = bookingData;
      
      // Save to mock DB
      if (!mockBookings[date]) mockBookings[date] = {};
      if (!mockBookings[date][barber]) mockBookings[date][barber] = [];
      mockBookings[date][barber].push(time);
      
      // Clear pending
      localStorage.removeItem('pendingBooking');
      
      // Add to mock user appointments array
      const existing = JSON.parse(localStorage.getItem('userAppointments') || '[]');
      existing.push(bookingData);
      localStorage.setItem('userAppointments', JSON.stringify(existing));
      
      navigate('/dashboard');
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('pendingBooking');
    navigate('/');
  };

  if (!bookingData) return null;

  return (
    <div className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        className="booking-form-container" 
        style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Finalize Your Appointment</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>You are almost there! Please review your selection.</p>
        
        <div style={{ textAlign: 'left', background: 'var(--color-bg-alt)', padding: '2rem', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
          <p><strong>Date:</strong> {bookingData.date}</p>
          <p><strong>Time:</strong> {bookingData.time}</p>
          <p><strong>Barber:</strong> {bookingData.barber}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleConfirm} className="btn-primary" style={{ flex: 1 }}>Confirm Appointment</button>
          <button onClick={handleCancel} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
}
