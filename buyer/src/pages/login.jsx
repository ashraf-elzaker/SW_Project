import React, { useState } from 'react';
import logo from '../../src/assets/logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../src/useAuth';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const data = await login(formData.username, formData.password);
      const user = data.user || {};

      
      if (user && user.id) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      console.log('Login successful, user type:', user.user_type);
      
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
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      
      <div style={styles.mainContent}>
        <div style={styles.brandSection}>
          <div style={styles.logo}>
            <img 
              src={logo} 
              alt="MarketApp" 
              style={styles.logoImage}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span 
              className="material-symbols-outlined" 
              style={{ display: 'none', fontSize: '3rem', color: 'white' }}
            >
              store
            </span>
            <h1 style={styles.clinicName}>MarketApp</h1>
          </div>
          <div style={styles.brandContent}>
            <h2 style={styles.welcomeText}>Welcome Back!</h2>
            <p style={styles.subtitle}>
              Sign in to continue buying and selling amazing products.
            </p>
            <div style={styles.features}>
              <div style={styles.featureItem}>
                ✓ Access your dashboard
              </div>
              <div style={styles.featureItem}>
                ✓ Manage your listings
              </div>
              <div style={styles.featureItem}>
                ✓ Track your orders
              </div>
            </div>
          </div>
        </div>

        <div style={styles.loginSection}>
          <div style={styles.loginCard}>
            <div style={styles.loginHeader}>
              <h2 style={styles.loginTitle}>Sign In</h2>
              <p style={styles.loginSubtitle}>Enter your credentials to continue</p>
            </div>

            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email or Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your email or username"
                  style={styles.input}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.forgotPassword}>
                <a href="#" style={styles.forgotLink}>Forgot password?</a>
              </div>

              <button 
                type="submit"
                style={styles.loginButton}
              >
                <span style={styles.buttonText}>Sign In</span>
                <span style={styles.buttonIcon}>→</span>
              </button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Don't have an account?{" "}
                <Link to="/signup" style={styles.footerLink}>Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: "#f8fafc",
    position: "relative",
    overflow: "hidden",
  },
  background: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.1,
    zIndex: 0,
  },
  mainContent: {
    display: "flex",
    width: "100%",
    maxWidth: "1200px",
    height: "700px",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    zIndex: 1,
    position: "relative",
  },
  brandSection: {
    flex: 1,
    background: "linear-gradient(135deg, #a0522d 0%, #8b4513 100%)",
    color: "white",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  logoImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  clinicName: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: 0,
  },
  brandContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: "2.5rem",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "1.125rem",
    opacity: 0.9,
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1rem",
    opacity: 0.9,
  },
  loginSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "white",
  },
  loginCard: {
    width: "100%",
    maxWidth: "450px",
  },
  loginHeader: {
    textAlign: "center",
    marginBottom: "32px",
  },
  loginTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },
  loginSubtitle: {
    fontSize: "1rem",
    color: "#64748b",
    margin: 0,
  },
  errorMessage: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "0.875rem",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    color: "#1f2937",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: "24px",
  },
  forgotLink: {
    fontSize: "0.875rem",
    color: "#a0522d",
    textDecoration: "none",
    fontWeight: "500",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#a0522d",
    color: "white",
    border: "none",
    padding: "16px 24px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  buttonText: {
    fontSize: "1rem",
  },
  buttonIcon: {
    fontSize: "1.25rem",
  },
  footer: {
    textAlign: "center",
  },
  footerText: {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: 0,
  },
  footerLink: {
    color: "#a0522d",
    textDecoration: "none",
    fontWeight: "500",
  },
};