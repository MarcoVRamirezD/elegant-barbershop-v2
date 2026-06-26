import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      
      const searchParams = new URLSearchParams(location.search);
      const redirect = searchParams.get('redirect');
      
      if (redirect === 'booking') {
        navigate('/confirm-booking');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image-side" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')" }}></div>
      
      <div className="auth-form-side">
        <Link to="/" className="back-home">← Back to Home</Link>
        
        <motion.div 
          className="auth-form-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="auth-title">Join Noir</h2>
          <p className="auth-subtitle">Create an account to experience the finest grooming.</p>
          
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                placeholder="Full Name" 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder="Email Address" 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                placeholder="Password" 
              />
            </div>
            <button type="submit" className="btn-primary submit-btn">Create Account</button>
          </form>
          
          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
