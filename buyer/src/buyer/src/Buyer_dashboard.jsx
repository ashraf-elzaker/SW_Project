import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@seller/Services/api';
import { useAuth } from '../../src/useAuth';
import './Buyer_dashboard.css';
import { productImages, fallbackImage, heroImage } from './productImageLibrary';

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
    '#5f3a1f',
    '#a2683a',
    "<g filter='url(#soft)'><rect x='230' y='120' width='180' height='120' rx='20' fill='rgba(255,255,255,0.88)'/><rect x='250' y='230' width='22' height='100' rx='10' fill='rgba(255,255,255,0.85)'/><rect x='368' y='230' width='22' height='100' rx='10' fill='rgba(255,255,255,0.85)'/><rect x='270' y='140' width='100' height='70' rx='14' fill='rgba(255,255,255,0.7)'/></g>"
  ),
  createProductArt(
    'Minimal Work Desk',
    'Workspace with cable tray',
    '#6d4627',
    '#bb8656',
    "<g filter='url(#soft)'><rect x='160' y='180' width='320' height='34' rx='10' fill='rgba(255,255,255,0.9)'/><rect x='190' y='214' width='20' height='120' rx='8' fill='rgba(255,255,255,0.82)'/><rect x='430' y='214' width='20' height='120' rx='8' fill='rgba(255,255,255,0.82)'/><rect x='232' y='226' width='176' height='60' rx='10' fill='rgba(255,255,255,0.52)'/></g>"
  ),
  createProductArt(
    'Storage Cabinet',
    'Wide shelves, clean style',
    '#3e2a1d',
    '#8d633f',
    "<g filter='url(#soft)'><rect x='220' y='110' width='200' height='224' rx='18' fill='rgba(255,255,255,0.88)'/><line x1='320' y1='110' x2='320' y2='334' stroke='rgba(93,58,27,0.5)' stroke-width='4'/><circle cx='300' cy='224' r='5' fill='rgba(93,58,27,0.45)'/><circle cx='340' cy='224' r='5' fill='rgba(93,58,27,0.45)'/></g>"
  ),
];

const staticTags = ['Black', 'Blue', 'Silver', 'Gold', 'Headphone', 'Phone', 'Watch', 'Laptop'];
const sizeFilters = ['S', 'M', 'L', 'XL'];
const colorFilters = ['#161616', '#ca2129', '#e7cf30', '#7ec95c', '#226ad6', '#7d49c8', '#ff8fd2', '#f3f3f3'];
const mockImagePool = productImages;

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const updateNotificationCount = () => {
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const unreadCount = notifications.filter((notification) => !notification.read).length;
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

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const data = await apiService.getAllProducts();
        if (!mounted) return;

        let loadedProducts = Array.isArray(data) ? data : [];
        if (loadedProducts.length === 0) {
          const mockCategories = ['Wood', 'Metal', 'Furniture', 'Electronics'];
          const mockItems = [
            'Vintage Chair',
            'Modern Table',
            'Antique Cabinet',
            'Luxury Bed',
            'Designer Sofa',
            'Classic Desk',
            'Contemporary Lamp',
            'Rustic Shelf',
          ];

          loadedProducts = Array.from({ length: 18 }, (_, i) => ({
            id: `mock-${i}`,
            name: `${mockCategories[i % 4]} ${mockItems[i % mockItems.length]}`,
            price: Math.floor(Math.random() * 1000) + 250,
            stock: Math.floor(Math.random() * 15) + 1,
            seller_email: `seller${i % 5}@example.com`,
            category: mockCategories[i % 4],
            image: mockImagePool[i % mockImagePool.length],
          }));
        }

        loadedProducts = loadedProducts.map((product, index) => ({
          ...product,
          image: getCategoryImage(product, index),
        }));

        setProducts(loadedProducts);
      } catch (error) {
        console.error('Could not load products', error);
        if (mounted) setProducts([]);
      }
    }

    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const dynamicCategories = new Set(products.map((product) => product.category).filter(Boolean));
    return ['All', ...Array.from(dynamicCategories)];
  }, [products]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [activeCategory, categories]);

  const getFallbackImage = (product) => {
    const source = `${product?.id || ''}-${product?.name || ''}-${product?.category || ''}`;
    let hash = 0;

    for (let i = 0; i < source.length; i += 1) {
      hash = (hash << 5) - hash + source.charCodeAt(i);
      hash |= 0;
    }

    return fallbackImage;
  };

  const normalizeImageUrl = (image) => {
    if (!image || typeof image !== 'string') return null;
    if (image.startsWith('data:') || image.startsWith('blob:')) return image;
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (image.startsWith('/assets/')) return image;
    if (image.startsWith('/')) return `http://127.0.0.1:8000${image}`;
    return `http://127.0.0.1:8000/${image}`;
  };

  const getProductImage = (product) => normalizeImageUrl(product?.image) || getFallbackImage(product);

  const getDashboardCardImage = (index) => productImages[index % productImages.length] || fallbackImage;

  const getCategoryImage = (product, index) => {
    const category = (product?.category || '').toLowerCase();

    const imageGroups = {
      wood: productImages.slice(0, 3),
      metal: productImages.slice(3, 7),
      furniture: productImages.slice(15, 21),
      electronics: productImages.slice(21, 26),
    };

    const selectedGroup = imageGroups[category] || productImages.slice(26);
    const group = selectedGroup.length > 0 ? selectedGroup : productImages;
    return group[index % group.length] || fallbackImage;
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === 'All' ||
        (product.category || '').toLowerCase() === activeCategory.toLowerCase();
      const searchMatch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, products, searchTerm]);

  const cartItems = useMemo(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.slice(0, 4);
  }, [cartCount]);

  const cartSubtotal = useMemo(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0), 0);
  }, [cartCount]);

  const categoryStats = useMemo(() => {
    return categories
      .filter((category) => category !== 'All')
      .slice(0, 5)
      .map((category) => ({
        label: category,
        count: products.filter((product) => (product.category || '').toLowerCase() === category.toLowerCase()).length,
      }));
  }, [categories, products]);

  const handleProductClick = (productId, imageSrc) => navigate(`/product/${productId}`, { state: { image: imageSrc } });

  return (
    <div className="store-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="hero-label">Shop the latest picks</span>
          <h1>Find products that match your real value and smart choices.</h1>
          <p>Browse curated recommendations, trending collections, and top categories in one place.</p>
          <div className="hero-search">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products, categories, or brands"
            />
            <button type="button" onClick={() => {}}>Search</button>
          </div>
        </div>
        <div className="dashboard-hero-image">
          <div className="hero-image-overlay">
            <div className="hero-logo" onClick={() => navigate('/buyer')} role="button" tabIndex={0}>
              <span className="logo-dot" />
              <strong>Drou</strong>
            </div>
            <div className="hero-action-list">
              <button type="button" onClick={() => navigate('/notifications')}>
                Alerts
                {notificationCount > 0 ? <span>{notificationCount}</span> : null}
              </button>
              <button type="button" onClick={() => navigate('/cart')}>
                Cart
                {cartCount > 0 ? <span>{cartCount}</span> : null}
              </button>
            </div>
          </div>
          <img src={heroImage || fallbackImage} alt="Featured product" />
        </div>
      </section>

      <div className="category-buttons">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={activeCategory === category ? 'category-btn active' : 'category-btn'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <main className="store-content">
        <section className="catalog-panel">
          <div className="catalog-toolbar">
            <div className="toolbar-left">
              <div className="view-icons" aria-hidden="true">
                <span />
                <span />
              </div>
              <p>Showing 1 - {Math.min(9, filteredProducts.length)} of {filteredProducts.length} result</p>
            </div>
            <select defaultValue="alphabetical-az" aria-label="Sort products">
              <option value="alphabetical-az">Sort by: Alphabetically, A-Z</option>
              <option value="alphabetical-za">Sort by: Alphabetically, Z-A</option>
              <option value="price-low">Sort by: Price low to high</option>
              <option value="price-high">Sort by: Price high to low</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.slice(0, 9).map((product, index) => {
              const imageSrc = getDashboardCardImage(index);
              const productCode = product.code || 1254654 + index;
              const availableQty = product.stock || 200;

              return (
                <article
                  key={product.id}
                  className="catalog-card"
                  style={{ '--delay': `${index * 70}ms` }}
                  onClick={() => handleProductClick(product.id, imageSrc)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleProductClick(product.id, imageSrc);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="catalog-image-wrap">
                    <img
                      src={imageSrc}
                      alt={product.name}
                    />
                    <button type="button" className="catalog-fav" aria-label="Add to favorites">☆</button>
                  </div>

                  <div className="catalog-card-content">
                    <p className="catalog-product-name">{product.name || 'Product full name goes here'}</p>
                    <div className="catalog-meta">
                      <span>Code: {productCode}</span>
                      <span>Available: {availableQty}</span>
                    </div>

                    <div className="catalog-price-row">
                      <span className="catalog-price">${Number(product.price || 0).toLocaleString()}</span>
                      <span className="catalog-old-price">${(Number(product.price || 0) * 1.18).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="related-products-section">
            <h3>You May Also Like</h3>
            <div className="related-products-grid">
              {[
                { name: 'Lottie', price: 250.99, image: productImages[0], number: 1 },
                { name: 'Primrose', price: 320.99, image: productImages[1], number: 2 },
                { name: 'Lettie', price: 243.99, image: productImages[2], number: 3 },
              ].map((item, idx) => (
                <div
                  key={item.name}
                  className="related-product-card"
                  onClick={() => handleProductClick(`mock${idx}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleProductClick(`mock${idx}`);
                  }}
                >
                  <div className="related-number">{item.number}</div>
                  <img src={item.image} alt={item.name} />
                  <div className="related-info">
                    <h4>{item.name}</h4>
                    <p className="related-price">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="catalog-pagination">
            <button type="button" className="is-active">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </div>
        </section>
      </main>

      <footer className="store-footer">
        <section>
          <h4>Contact Us</h4>
          <p>Demo Store, New York</p>
          <p>+1 555 774 8554</p>
          <p>demo@webshop.com</p>
        </section>
        <section>
          <h4>Information</h4>
          <p>Privacy Policy</p>
          <p>Refund</p>
          <p>Terms</p>
        </section>
        <section>
          <h4>Customer Service</h4>
          <p>Search Terms</p>
          <p>Orders</p>
          <p>Contact Us</p>
        </section>
        <section>
          <h4>Your Cart</h4>
          <p>{cartCount} items</p>
          <p>Total: ${cartSubtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </section>
      </footer>
    </div>
  );
};

export default BuyerDashboard;
