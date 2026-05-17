import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye, EyeOff, Loader2, Chrome, Apple, Recycle } from 'lucide-react';
import { useAuth } from '../../src/useAuth';
import './AuthStyles.css';

export default function Login() {
  const [formData, setFormData, isValid] = useState({
    username: '', 
    password: '',
    showPassword: false,
    loading: false,
    errors: {}
  });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    if (touched[name]) validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...formData.errors };
    if (!value.trim()) {
      newErrors[name] = `${name === 'username' ? 'Email/Username' : 'Password'} is required`;
    } else {
      delete newErrors[name];
    }
    setFormData(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const togglePassword = () => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, loading: true }));

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setFormData(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      const data = await login(formData.username, formData.password);
      const user = data.user || {};
      
      if (user && user.id) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      if (user && user.user_type === 'buyer') {
        navigate('/buyer', { replace: true });
      } else if (user && user.user_type === 'seller') {
        navigate('/seller', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setFormData(prev => ({ ...prev, loading: false }));
    }
  };

  const getFieldError = (name) => formData.errors[name];

  return (
    <div className="auth-container furniture-auth-container">
      <motion.div 
        className="auth-main furniture-auth-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="brand-section furniture-brand-section">
          <div className="brand-logo">
            <div className="recycle-logo" aria-hidden="true">
              <Recycle size={38} />
            </div>
            <h1 className="brand-name">Welcome to MarketApp</h1>
          </div>
          <div className="brand-content">
            <h2>Welcome to MarketApp</h2>
            <p className="brand-subtitle">
              Login to continue buying and selling amazing products with ease.
            </p>
            <div className="features">
              <div className="feature-item">✓ Secure & Fast Login</div>
              <div className="feature-item">✓ Access Your Dashboard</div>
              <div className="feature-item">✓ Track Orders Instantly</div>
            </div>
          </div>
        </div>

        <div className="form-section furniture-form-section">
          <motion.div className="form-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="form-header">
              <h2 className="form-title">Login</h2>
              <p className="form-subtitle">Enter your credentials to continue</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="error-msg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="floating-label">Email or Username</label>
                <input
                  type="text"
                  name="username"
                  className={`input-field ${getFieldError('username') ? 'error' : formData.username ? 'valid' : ''}`}
                  placeholder="Enter your email or username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={(e) => setTouched({...touched, username: true}) && validateField('username', e.target.value)}
                />
                <Mail className="input-icon" />
              </div>

              <div className="form-group">
                <label className="floating-label">Password</label>
                <input
                  type={formData.showPassword ? 'text' : 'password'}
                  name="password"
                  className={`input-field ${getFieldError('password') ? 'error' : formData.password ? 'valid' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={(e) => setTouched({...touched, password: true}) && validateField('password', e.target.value)}
                />
                {formData.showPassword ? <EyeOff className="input-icon" onClick={togglePassword} style={{ cursor: 'pointer' }} /> : <Eye className="input-icon" onClick={togglePassword} style={{ cursor: 'pointer' }} />}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label className="checkbox-label">
                  <input type="checkbox" style={{ marginRight: '8px' }} />
                  Remember me
                </label>
                <Link href="#" className="footer-link" style={{ fontSize: '0.9rem' }}>Forgot password?</Link>
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
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <span>→</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="social-section">
              <p className="social-title">Or continue with</p>
              <motion.button className="social-btn social-google" whileHover={{ scale: 1.02 }}>
                <Chrome size={20} />
                Continue with Google
              </motion.button>
              <motion.button className="social-btn social-apple" whileHover={{ scale: 1.02 }}>
                <Apple size={20} />
                Continue with Apple
              </motion.button>
            </div>

            <p className="footer-text">
              Don't have an account? <Link to="/signup" className="footer-link">Sign Up</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
