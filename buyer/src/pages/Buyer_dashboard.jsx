import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@seller/Services/api';
import { useAuth } from '../../src/useAuth';

const createProductArt = (title, subtitle, gradientA, gradientB, shape) => {
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${gradientA}'/>
        <stop offset='100%' stop-color='${gradientB}'/>
      </linearGradient>
      <filter id='soft' x='-20%' y='-20%' width='140%' height='140%'>
        <feDropShadow dx='0' dy='10' stdDeviation='12' flood-color='rgba(0,0,0,0.22)'/>
      </filter>
    </defs>
    <rect width='640' height='480' fill='url(#bg)'/>
    <rect x='24' y='24' width='592' height='432' rx='34' fill='rgba(255,255,255,0.14)'/>
    ${shape}
    <rect x='44' y='368' width='552' height='68' rx='18' fill='rgba(255,255,255,0.2)'/>
    <text x='64' y='400' font-size='32' font-family='Segoe UI, Arial, sans-serif' font-weight='700' fill='white'>${title}</text>
    <text x='64' y='426' font-size='18' font-family='Segoe UI, Arial, sans-serif' fill='rgba(255,255,255,0.92)'>${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const fallbackProductImages = [
  createProductArt(
    'Oak Dining Chair',
    'Solid wood, handcrafted finish',
    '#7a4a22',
    '#c87b36',
    "<g filter='url(#soft)'><rect x='230' y='120' width='180' height='120' rx='20' fill='rgba(255,255,255,0.88)'/><rect x='250' y='230' width='22' height='100' rx='10' fill='rgba(255,255,255,0.85)'/><rect x='368' y='230' width='22' height='100' rx='10' fill='rgba(255,255,255,0.85)'/><rect x='270' y='140' width='100' height='70' rx='14' fill='rgba(255,255,255,0.7)'/></g>"
  ),
  createProductArt(
    'Modern Steel Lamp',
    'Warm light with matte finish',
    '#2b3c4f',
    '#4f6f8f',
    "<g filter='url(#soft)'><rect x='304' y='122' width='32' height='150' rx='12' fill='rgba(255,255,255,0.86)'/><ellipse cx='320' cy='300' rx='100' ry='26' fill='rgba(255,255,255,0.8)'/><path d='M245 170 L395 170 L355 230 L285 230 Z' fill='rgba(255,255,255,0.9)'/></g>"
  ),
  createProductArt(
    'Soft Lounge Sofa',
    'Premium fabric and comfort',
    '#6d4f7d',
    '#b779c6',
    "<g filter='url(#soft)'><rect x='180' y='210' width='280' height='92' rx='36' fill='rgba(255,255,255,0.9)'/><rect x='160' y='180' width='320' height='70' rx='30' fill='rgba(255,255,255,0.82)'/><rect x='190' y='292' width='30' height='36' rx='10' fill='rgba(255,255,255,0.78)'/><rect x='420' y='292' width='30' height='36' rx='10' fill='rgba(255,255,255,0.78)'/></g>"
  ),
  createProductArt(
    'Glass Coffee Table',
    'Tempered top with wood base',
    '#495d4f',
    '#80a16d',
    "<g filter='url(#soft)'><rect x='170' y='174' width='300' height='42' rx='16' fill='rgba(255,255,255,0.72)'/><rect x='210' y='216' width='220' height='18' rx='8' fill='rgba(255,255,255,0.52)'/><path d='M248 234 L290 320 L270 320 L226 234 Z' fill='rgba(255,255,255,0.8)'/><path d='M392 234 L350 320 L370 320 L414 234 Z' fill='rgba(255,255,255,0.8)'/></g>"
  ),
  createProductArt(
    'Storage Cabinet',
    'Wide shelves, clean style',
    '#4a3a2a',
    '#a57645',
    "<g filter='url(#soft)'><rect x='220' y='110' width='200' height='224' rx='18' fill='rgba(255,255,255,0.88)'/><line x1='320' y1='110' x2='320' y2='334' stroke='rgba(93,58,27,0.5)' stroke-width='4'/><circle cx='300' cy='224' r='5' fill='rgba(93,58,27,0.45)'/><circle cx='340' cy='224' r='5' fill='rgba(93,58,27,0.45)'/></g>"
  ),
  createProductArt(
    'Minimal Work Desk',
    'Workspace with cable tray',
    '#2e515b',
    '#4ea0b5',
    "<g filter='url(#soft)'><rect x='160' y='180' width='320' height='34' rx='10' fill='rgba(255,255,255,0.9)'/><rect x='190' y='214' width='20' height='120' rx='8' fill='rgba(255,255,255,0.82)'/><rect x='430' y='214' width='20' height='120' rx='8' fill='rgba(255,255,255,0.82)'/><rect x='232' y='226' width='176' height='60' rx='10' fill='rgba(255,255,255,0.52)'/></g>"
  ),
];

const styles = {
  app: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 clamp(16px, 2.5vw, 40px)',
    minHeight: 'auto',
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    background: 'linear-gradient(135deg, #f5f0e6 0%, #e8d9cc 100%)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 0',
    borderBottom: '2px solid rgba(139,69,19,0.2)',
    marginBottom: '30px',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '0 0 20px 20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxShadow: '0 4px 20px rgba(139,69,19,0.1)',
  },
  logo: {
    color: '#8B4513',
    fontSize: '36px',
    fontWeight: 800,
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(139,69,19,0.2)',
    background: 'linear-gradient(45deg, #8B4513, #D2691E)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    cursor: 'pointer',
  },
  mainNav: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navItem: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#2c3e50',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '30px',
    fontWeight: 500,
    transition: 'all 0.3s',
    position: 'relative',
    overflow: 'hidden',
  },
  navItemHover: {
    backgroundColor: '#8B4513',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
  },
  cartButton: {
    background: 'linear-gradient(45deg, #8B4513, #D2691E)',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '10px 20px',
    borderRadius: '30px',
    transition: 'all 0.3s',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'pulse 1.5s infinite',
  },
  heroSection: {
    background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
    borderRadius: '30px',
    padding: '60px 40px',
    marginBottom: '50px',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(139,69,19,0.3)',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 800,
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '25px',
    marginBottom: '50px',
    flexWrap: 'wrap',
  },
  statCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: '1px solid rgba(139,69,19,0.1)',
    flex: '1 1 200px',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#8B4513',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '16px',
    color: '#D2691E',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  searchSection: {
    textAlign: 'center',
    marginBottom: '50px',
    position: 'relative',
    zIndex: 10,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: '60px',
    padding: '20px 30px',
    margin: '20px auto',
    cursor: 'pointer',
    transition: 'all 0.3s',
    maxWidth: '700px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    border: '2px solid transparent',
  },
  searchBarHover: {
    border: '2px solid #8B4513',
    transform: 'scale(1.02)',
    boxShadow: '0 15px 40px rgba(139,69,19,0.2)',
  },
  searchBarText: {
    color: '#7f8c8d',
    fontSize: '18px',
    margin: 0,
    flex: 1,
  },
  searchIcon: {
    fontSize: '24px',
    color: '#8B4513',
  },
  categoriesSection: {
    marginBottom: '50px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#8B4513',
    marginBottom: '30px',
    position: 'relative',
    paddingLeft: '20px',
    borderLeft: '5px solid #D2691E',
  },
  categoriesGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  categoryBtn: {
    padding: '15px 30px',
    borderRadius: '40px',
    backgroundColor: 'white',
    border: 'none',
    fontSize: '16px',
    fontWeight: 600,
    color: '#495057',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(139,69,19,0.1)',
  },
  categoryBtnActive: {
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(139,69,19,0.4)',
    transform: 'translateY(-2px)',
  },
  productsSection: {
    marginBottom: '60px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    transition: 'all 0.4s',
    cursor: 'pointer',
    border: '1px solid rgba(139,69,19,0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  productImage: {
    width: '100%',
    height: '220px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderBottom: '1px solid rgba(139,69,19,0.1)',
  },
  productImageTag: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    transition: 'transform 0.4s',
  },
  productBadge: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    backgroundColor: '#8B4513',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
  },
  productInfo: {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '10px',
    color: '#2c3e50',
    lineHeight: '1.4',
  },
  productPrice: {
    color: '#8B4513',
    fontWeight: 700,
    fontSize: '24px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  productSeller: {
    color: '#7f8c8d',
    fontSize: '13px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  productStock: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'inline-block',
    marginTop: 'auto',
  },
  inStock: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  outOfStock: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  footer: {
    background: 'white',
    padding: '30px 0',
    borderTop: '2px solid rgba(139,69,19,0.2)',
    marginTop: '40px',
    borderRadius: '30px 30px 0 0',
    boxShadow: '0 -10px 30px rgba(139,69,19,0.05)',
  },
  footerNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  footerItem: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#7f8c8d',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '30px',
    transition: 'all 0.3s',
    fontWeight: 500,
  },
  footerItemActive: {
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
  },
};

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Browse');
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchHover, setSearchHover] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  // Cart
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 1000);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  // Notifications
  useEffect(() => {
    const updateNotificationCount = () => {
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const unreadCount = notifications.filter(n => !n.read).length;
      setNotificationCount(unreadCount);
    };
    updateNotificationCount();
    window.addEventListener('storage', updateNotificationCount);
    const interval = setInterval(updateNotificationCount, 1000);
    return () => {
      window.removeEventListener('storage', updateNotificationCount);
      clearInterval(interval);
    };
  }, []);

  // Load products
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await apiService.getAllProducts();
        if (mounted) {
          let products = Array.isArray(data) ? data : [];
          
          if (products.length === 0) {
            const mockCategories = ['Wood', 'Metal', 'Furniture', 'Electronics'];
            const mockItems = [
              'Vintage Chair', 'Modern Table', 'Antique Cabinet', 'Luxury Bed', 
              'Designer Sofa', 'Classic Desk', 'Contemporary Lamp', 'Rustic Shelf',
              'Smart Phone', 'Gaming Laptop', '4K TV', 'Wireless Headphones'
            ];
            
            const mock = Array.from({length: 16}, (_, i) => ({
              id: `mock${i}`,
              name: `${mockCategories[i % 4]} ${mockItems[i % mockItems.length]}`,
              price: Math.floor(Math.random() * 1000) + 299,
              stock: Math.floor(Math.random() * 15) + 1,
              seller_email: `seller${i % 5}@example.com`,
              category: mockCategories[i % 4],
              rating: (Math.random() * 2 + 3).toFixed(1),
              sold: Math.floor(Math.random() * 50) + 10,
            }));
            products = mock;
          }
          setProducts(products);
        }
      } catch (e) {
        console.error('Could not load products', e);
        if (mounted) setProducts([]);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const getFallbackImage = (product) => {
    const source = `${product?.id || ''}-${product?.name || ''}-${product?.category || ''}`;
    let hash = 0;
    for (let i = 0; i < source.length; i += 1) {
      hash = (hash << 5) - hash + source.charCodeAt(i);
      hash |= 0;
    }
    const imageIndex = Math.abs(hash) % fallbackProductImages.length;
    return fallbackProductImages[imageIndex];
  };

  const getProductImage = (product) => {
    if (product?.image) return product.image;
    return getFallbackImage(product);
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((product) => (product.category || '').toLowerCase() === activeCategory.toLowerCase());

  const categories = ['All', 'Wood', 'Metal', 'Furniture', 'Electronics'];
  const navItems = ['Browse', 'My Purchases', 'Notifications', 'Sell', 'Profile'];
  const mainNavItems = ['Home', 'Categories', 'How it Works', 'Contact'];

  const handleNavClick = (item) => {
    setActiveNav(item);
    if (item === 'My Purchases') navigate('/buyer/purchases');
    else if (item === 'Notifications') navigate('/notifications');
    else if (item === 'Sell') navigate('/seller/dashboard');
    else if (item === 'Profile') navigate('/profile');
  };

  const handleProductClick = (productId) => navigate(`/product/${productId}`);
  const handleCartClick = () => navigate('/cart');
  const handleNotificationsClick = () => navigate('/notifications');
  const handleLogoClick = () => navigate('/buyer');

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo} onClick={handleLogoClick}>ReValue</h1>
        <nav style={styles.mainNav}>
          {mainNavItems.map((item) => (
            <button
              key={item}
              style={{
                ...styles.navItem,
                ...(hoveredNav === item ? styles.navItemHover : {}),
                backgroundColor: hoveredNav === item ? '#8B4513' : 'transparent',
                color: hoveredNav === item ? 'white' : '#2c3e50',
              }}
              onMouseEnter={() => setHoveredNav(item)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item}
            </button>
          ))}
          
          <button
            style={styles.cartButton}
            onClick={handleNotificationsClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,69,19,0.3)';
            }}
          >
            🔔 Notifications
            {notificationCount > 0 && (
              <span style={styles.cartBadge}>{notificationCount}</span>
            )}
          </button>
          
          <button
            style={styles.cartButton}
            onClick={handleCartClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,69,19,0.3)';
            }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span style={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
          
          <button
            style={{
              ...styles.cartButton,
              background: 'linear-gradient(45deg, #dc3545, #c82333)',
            }}
            onClick={() => { logout(); navigate('/'); }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(220,53,69,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(220,53,69,0.3)';
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Discover Amazing Products</h1>
        <p style={styles.heroSubtitle}>
          Explore our curated collection of unique items from trusted sellers around the world
        </p>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={styles.statNumber}>10K+</div>
          <div style={styles.statLabel}>Happy Customers</div>
        </div>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={styles.statNumber}>5K+</div>
          <div style={styles.statLabel}>Products</div>
        </div>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={styles.statNumber}>500+</div>
          <div style={styles.statLabel}>Sellers</div>
        </div>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={styles.statNumber}>24/7</div>
          <div style={styles.statLabel}>Support</div>
        </div>
      </section>

      {/* Search */}
      <section style={styles.searchSection}>
        <div
          style={{
            ...styles.searchBar,
            ...(searchHover ? styles.searchBarHover : {}),
          }}
          onMouseEnter={() => setSearchHover(true)}
          onMouseLeave={() => setSearchHover(false)}
        >
          <span style={styles.searchIcon}>🔍</span>
          <p style={styles.searchBarText}>Search for treasures, deals & more...</p>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Categories</h2>
        <div style={styles.categoriesGrid}>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                ...styles.categoryBtn,
                ...(activeCategory === category ? styles.categoryBtnActive : {}),
              }}
              onClick={() => setActiveCategory(category)}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,69,19,0.1)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <div style={styles.productsGrid}>
          {filteredProducts.slice(0, 16).map((product) => {
            const imageSrc = getProductImage(product);
            const fallbackSrc = getFallbackImage(product);
            
            return (
              <div
                key={product.id}
                style={{
                  ...styles.productCard,
                  transform: hoveredCard === product.id ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === product.id ? '0 20px 40px rgba(139,69,19,0.2)' : '0 10px 30px rgba(139,69,19,0.1)',
                }}
                onClick={() => handleProductClick(product.id)}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ position: 'relative' }}>
                  <div style={styles.productBadge}>
                    ⭐ {product.rating || '4.5'}
                  </div>
                  <div style={styles.productImage}>
                    <img 
                      src={imageSrc}
                      data-fallback={fallbackSrc}
                      alt={product.name}
                      style={{
                        ...styles.productImageTag,
                        transform: hoveredCard === product.id ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onError={(e) => {
                        const nextSrc = e.currentTarget.dataset.fallback;
                        if (nextSrc && e.currentTarget.src !== nextSrc) {
                          e.currentTarget.src = nextSrc;
                        }
                      }}
                    />
                  </div>
                </div>
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <div style={styles.productPrice}>
                    <span style={{fontSize: '14px', color: '#7f8c8d'}}>EGP</span>
                    {product.price.toLocaleString()}
                  </div>
                  <div style={styles.productSeller}>
                    <span>👤</span> {product.seller_email || 'Unknown Seller'}
                  </div>
                  <div style={{
                    ...styles.productStock,
                    ...(product.stock > 0 ? styles.inStock : styles.outOfStock),
                  }}>
                    {product.stock > 0 ? `📦 ${product.stock} in stock` : '❌ Out of Stock'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <nav style={styles.footerNav}>
          {navItems.map((item) => (
            <button
              key={item}
              style={{
                ...styles.footerItem,
                ...(activeNav === item ? styles.footerItemActive : {}),
              }}
              onClick={() => handleNavClick(item)}
              onMouseEnter={(e) => {
                if (activeNav !== item) {
                  e.currentTarget.style.backgroundColor = 'rgba(139,69,19,0.1)';
                  e.currentTarget.style.color = '#8B4513';
                }
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#7f8c8d';
                }
              }}
            >
              {item}
              {item === 'Notifications' && notificationCount > 0 && ` (${notificationCount})`}
            </button>
          ))}
        </nav>
      </footer>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BuyerDashboard;