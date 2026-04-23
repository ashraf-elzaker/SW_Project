import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Mail, Lock, Eye, EyeOff, Loader2, Phone, Calendar, Chrome, Apple, AlertCircle, CheckCircle, Recycle } from 'lucide-react';
import { useAuth } from '../../src/useAuth';
import './AuthStyles.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    dateOfBirth: "",
    loading: false,
    errors: {},
    passwordStrength: 0
  });
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
    if (name === 'password') calculatePasswordStrength(value);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setFormData(prev => ({ ...prev, passwordStrength: strength }));
  };

  const validateField = (name, value) => {
    const newErrors = { ...formData.errors };
    switch (name) {
      case 'username':
        newErrors[name] = !value.trim() ? 'Username is required' : '';
        break;
      case 'email':
        newErrors[name] = !value || !/\S+@\S+\.\S+/.test(value) ? 'Valid email required' : '';
        break;
      case 'password':
        newErrors[name] = !value ? 'Password is required' : value.length < 8 ? 'Min 8 chars' : '';
        break;
      case 'confirmPassword':
        newErrors[name] = !value || value !== formData.password ? "Passwords don't match" : '';
        break;
    }
    setFormData(prev => ({ ...prev, errors: newErrors }));
  };

  const validateForm = () => {
    const keys = ['username', 'email', 'password', 'confirmPassword', 'role'];
    let valid = true;
    const newErrors = {};
    keys.forEach(key => {
      if (!formData[key] || formData.errors[key]) {
        valid = false;
        newErrors[key] = formData.errors[key] || `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setFormData(prev => ({ ...prev, errors: newErrors }));
    return valid && formData.passwordStrength >= 3;
  };

  const setRole = (role) => setFormData(prev => ({ ...prev, role }));

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormData(prev => ({ ...prev, loading: true }));

    const payload = {
      username: formData.username.trim(),
      email: formData.email,
      password: formData.password,
      user_type: formData.role.toLowerCase(),
    };

    try {
      await register(payload);
      const u = JSON.parse(localStorage.getItem('currentUser')) || {};
      setTimeout(() => {
        if (u.user_type === 'buyer') navigate('/buyer', { replace: true });
        else if (u.user_type === 'seller') navigate('/seller', { replace: true });
        else navigate('/', { replace: true });
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registration failed';
      setFormData(prev => ({ ...prev, errors: { ...prev.errors, general: msg }, loading: false }));
    }
  };

  const getStrengthClass = () => {
    const s = formData.passwordStrength;
    if (s <= 2) return 'strength-weak';
    if (s <= 3) return 'strength-medium';
    return 'strength-strong';
  };

  return (
    <div className="auth-container signup-container furniture-auth-container">
      <motion.div className="auth-main signup-main furniture-auth-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="brand-section signup-brand-section furniture-brand-section">
          <div className="brand-logo">
            <div className="recycle-logo" aria-hidden="true">
              <Recycle size={38} />
            </div>
            <h1 className="brand-name">Welcome to MarketApp</h1>
          </div>
          <div className="brand-content">
            <h2>Welcome to MarketApp</h2>
            <p className="brand-subtitle">
              Create account to buy &amp; sell locally.
            </p>
            <div className="features">
              <div className="feature-item">✓ Easy listings</div>
              <div className="feature-item">✓ Local deals</div>
              <div className="feature-item">✓ Secure connections</div>
            </div>
          </div>
        </div>

        <div className="form-section signup-form-section furniture-form-section">
          <motion.div className="form-card" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
            <div className="form-header">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">Join thousands of local traders</p>
            </div>

            <AnimatePresence>
              {formData.errors.general && (
                <motion.div className="error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {formData.errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label className="floating-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className={`input-field ${formData.errors.username ? 'error' : formData.username ? 'valid' : ''}`}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={(e) => {
                    setTouched(prev => ({ ...prev, username: true }));
                    validateField('username', e.target.value);
                  }}
                />
                <CheckCircle className={`input-icon ${!formData.errors.username && formData.username ? '' : 'hidden'}`} />
                <AlertCircle className={`input-icon ${formData.errors.username ? '' : 'hidden'}`} />
              </div>

              <div className="form-group">
                <label className="floating-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`input-field ${formData.errors.email ? 'error' : formData.email ? 'valid' : ''}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={(e) => {
                    setTouched(prev => ({ ...prev, email: true }));
                    validateField('email', e.target.value);
                  }}
                />
                <Mail className="input-icon" />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1, marginRight: '12px' }}>
                  <label className="floating-label">Phone (optional)</label>
                  <input type="tel" name="phone" className="input-field" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                  <Phone className="input-icon" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="floating-label">Date of Birth</label>
                  <input type="date" name="dateOfBirth" className="input-field" placeholder="Select date of birth" value={formData.dateOfBirth} onChange={handleChange} />
                  <Calendar className="input-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="floating-label" style={{ position: 'static', marginBottom: '12px', display: 'block' }}>Select Role *</label>
                <div className="role-grid">
                  <motion.div 
                    className={`role-card ${formData.role === 'Buyer' ? 'active' : ''}`}
                    onClick={() => setRole('Buyer')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="role-icon" />
                    <div style={{ fontWeight: 600, marginTop: '8px' }}>Buyer</div>
                  </motion.div>
                  <motion.div 
                    className={`role-card ${formData.role === 'Seller' ? 'active' : ''}`}
                    onClick={() => setRole('Seller')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag className="role-icon" />
                    <div style={{ fontWeight: 600, marginTop: '8px' }}>Seller</div>
                  </motion.div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1, marginRight: '12px' }}>
                  <label className="floating-label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    className={`input-field ${formData.errors.password ? 'error' : formData.passwordStrength >= 3 ? 'valid' : ''}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={(e) => {
                      setTouched(prev => ({ ...prev, password: true }));
                      validateField('password', e.target.value);
                    }}
                  />
                  <Lock className="input-icon" />
                  {formData.password && (
                    <div className={`password-strength`}>
                      <div className={`strength-bar ${getStrengthClass()}`} />
                    </div>
                  )}
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="floating-label">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`input-field ${formData.errors.confirmPassword ? 'error' : formData.confirmPassword === formData.password ? 'valid' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={(e) => {
                      setTouched(prev => ({ ...prev, confirmPassword: true }));
                      validateField('confirmPassword', e.target.value);
                    }}
                  />
                  <Lock className="input-icon" />
                </div>
              </div>

              <motion.button 
                type="submit"
                className={`cta-btn ${formData.loading ? 'loading' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formData.loading}
              >
                {formData.loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Creating...
                  </>
                ) : (
                  <>
                    Sign Up
                    <span>→</span>
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                className="secondary-auth-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
              >
                Go to Login
              </motion.button>
            </form>

            <div className="social-section">
              <p className="social-title">Or sign up with</p>
              <motion.button className="social-btn social-google" whileHover={{ scale: 1.02 }}>
                <Chrome size={20} />
                Google
              </motion.button>
            </div>

            <p className="footer-text">
              Already have account? <Link to="/login" className="footer-link">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
