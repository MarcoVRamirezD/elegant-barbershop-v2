import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
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
      <div className="auth-image-side"></div>
      
      <div className="auth-form-side">
        <Link to="/" className="back-home">← Back to Home</Link>
        
        <motion.div 
          className="auth-form-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to manage your appointments.</p>
          
          <form className="auth-form" onSubmit={handleLogin}>
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
            <button type="submit" className="btn-primary submit-btn">Sign In</button>
          </form>
          
          <div className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
