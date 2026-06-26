import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { mockBookings } from '../utils/mockDB';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

export default function Booking() {
  const [date, setDate] = useState(null);
  const [barber, setBarber] = useState(null);
  const [time, setTime] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const barbersOptions = [
    { value: "Arthur Pendelton", label: "Arthur Pendelton" },
    { value: "Julian Thorne", label: "Julian Thorne" },
    { value: "Mateo Silva", label: "Mateo Silva" }
  ];

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  useEffect(() => {
    if (date && barber) {
      const dateStr = date.toISOString().split('T')[0];
      const dayBookings = mockBookings[dateStr] || {};
      setBookedSlots(dayBookings[barber.value] || []);
      setTime(''); // Reset time when date or barber changes
    } else {
      setBookedSlots([]);
    }
  }, [date, barber]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (date && barber && time) {
      const dateStr = date.toISOString().split('T')[0];
      
      if (!isAuthenticated) {
        // Save pending booking to localStorage and redirect
        localStorage.setItem('pendingBooking', JSON.stringify({
          date: dateStr,
          barber: barber.value,
          time: time
        }));
        navigate('/login?redirect=booking');
        return;
      }

      setIsBooked(true);
      
      // Update mock DB in memory for this session
      if (!mockBookings[dateStr]) mockBookings[dateStr] = {};
      if (!mockBookings[dateStr][barber.value]) mockBookings[dateStr][barber.value] = [];
      mockBookings[dateStr][barber.value].push(time);
      
      // Also save to user appointments array
      const existing = JSON.parse(localStorage.getItem('userAppointments') || '[]');
      existing.push({
        date: dateStr,
        barber: barber.value,
        time: time
      });
      localStorage.setItem('userAppointments', JSON.stringify(existing));

      setTimeout(() => {
        setIsBooked(false);
        setDate(null);
        setBarber(null);
        setTime('');
      }, 3000);
    }
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderColor: state.isFocused ? 'var(--color-text)' : 'var(--color-border)',
      boxShadow: 'none',
      padding: '0.4rem',
      cursor: 'pointer',
      borderRadius: '0',
      transition: 'border-color var(--transition-fast)',
      '&:hover': {
        borderColor: 'var(--color-text-muted)'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'var(--color-text)' 
        : state.isFocused 
          ? 'var(--color-border)' 
          : 'var(--color-bg)',
      color: state.isSelected 
        ? 'var(--color-bg)' 
        : 'var(--color-text)',
      cursor: 'pointer',
      padding: '1rem',
      transition: 'background-color var(--transition-fast)'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--color-text)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-bg)',
      borderRadius: '0',
      border: '1px solid var(--color-border)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0
    })
  };

  const isTimeInPast = (timeStr, selectedDate) => {
    if (!selectedDate) return false;
    const now = new Date();
    if (
      selectedDate.getDate() === now.getDate() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getFullYear() === now.getFullYear()
    ) {
      const [timePart, period] = timeStr.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);
      return slotTime < now;
    }
    return false;
  };

  const isNotSunday = (d) => {
    return d.getDay() !== 0;
  };

  const maxBookingDate = new Date();
  maxBookingDate.setDate(maxBookingDate.getDate() + 15);

  return (
    <section id="booking" className="section-padding booking-section">
      <div className="container">
        <div className="booking-wrapper">
          <div className="booking-info">
            <h2 className="section-title">Reserve Your Time</h2>
            <p>Select your preferred barber and time slot. Our master barbers are ready to provide you with an exceptional experience.</p>
          </div>
          
          <div className="booking-form-container">
            {isBooked ? (
              <div className="success-message fade-in">
                <h3>Booking Confirmed!</h3>
                <p>We look forward to seeing you.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleBooking}>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <DatePicker 
                    selected={date} 
                    onChange={(d) => setDate(d)} 
                    minDate={new Date()}
                    maxDate={maxBookingDate}
                    filterDate={isNotSunday}
                    placeholderText="Select a Date"
                    className="custom-datepicker"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="barber">Barber</label>
                  <Select 
                    id="barber"
                    options={barbersOptions}
                    value={barber}
                    onChange={setBarber}
                    styles={selectStyles}
                    placeholder="Select a Barber"
                    isSearchable={false}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Time Slot</label>
                  <div className="time-slots">
                    {timeSlots.map((t, i) => {
                      const isOccupied = bookedSlots.includes(t) || isTimeInPast(t, date);
                      return (
                        <button 
                          type="button" 
                          key={i} 
                          disabled={isOccupied}
                          className={`time-btn ${time === t ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                          onClick={() => setTime(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  {!time && <span className="time-error">Please select a time slot</span>}
                </div>
                
                <button type="submit" className="btn-primary submit-btn" disabled={!date || !barber || !time}>
                  {isAuthenticated ? 'Confirm Appointment' : 'Login to Continue'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
