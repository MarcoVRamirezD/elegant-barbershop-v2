import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelBooking } from '../utils/mockDB';

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('userAppointments');
    if (data) {
      setAppointments(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleCancelAppointment = (indexToCancel) => {
    const appt = appointments[indexToCancel];
    // Remove from mock DB to free up the slot
    cancelBooking(appt.date, appt.barber, appt.time);
    
    // Remove from user array
    const updated = appointments.filter((_, idx) => idx !== indexToCancel);
    setAppointments(updated);
    localStorage.setItem('userAppointments', JSON.stringify(updated));
  };

  const handleBookNow = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="section-padding" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ margin: 0 }}>My Dashboard</h2>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
        
        <div className="services-grid">
          {appointments.length > 0 ? (
            appointments.map((appointment, idx) => (
              <div key={idx} className="service-card">
                <div className="service-header">
                  <h3>Appointment #{idx + 1}</h3>
                  <span className="price">Confirmed</span>
                </div>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Barber:</strong> {appointment.barber}</p>
                <button className="btn-secondary" onClick={() => handleCancelAppointment(idx)} style={{ marginTop: '1rem', width: '100%' }}>Cancel Appointment</button>
              </div>
            ))
          ) : (
            <div className="service-card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <p>You have no upcoming appointments.</p>
              <button className="btn-primary" onClick={handleBookNow} style={{ marginTop: '1rem' }}>Book Now</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
