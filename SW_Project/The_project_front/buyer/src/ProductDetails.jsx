import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock products data for fallback
  const mockProducts = {
    mock0: {
      id: 'mock0',
      name: 'Wooden Vintage Chair',
      price: 573,
      category: 'Wood',
      description: 'Beautiful vintage wooden chair with intricate carvings. Perfect for adding a touch of elegance to any room. Handcrafted from premium oak wood with a rich walnut finish.',
      stock: 8,
      seller_email: 'seller1@example.com',
      rating: 4.5,
      reviews: 128,
      image: '/assets/products/product-1.jpg',
      oldPrice: 699,
      brand: 'Heritage Crafts',
      material: 'Oak Wood',
      condition: 'Excellent',
      warranty: '12 months',
      delivery: '2-3 business days'
    },
    mock1: {
      id: 'mock1',
      name: 'Metal Table',
      price: 634,
      category: 'Metal',
      description: 'Sturdy metal table with modern design. Ideal for dining or workspace. Features a powder-coated finish for durability and scratch resistance.',
      stock: 5,
      seller_email: 'seller2@example.com',
      rating: 4.3,
      reviews: 95,
      image: '/assets/products/product-2.jpg',
      brand: 'Modern Living',
      material: 'Stainless Steel',
      condition: 'Like New',
      warranty: '24 months',
      delivery: '3-5 business days'
    },
    mock2: {
      id: 'mock2',
      name: 'Furniture Cabinet',
      price: 899,
      category: 'Furniture',
      description: 'Spacious wooden cabinet with multiple compartments. Great for storage and organization. Features soft-close drawers and adjustable shelves.',
      stock: 3,
      seller_email: 'seller3@example.com',
      rating: 4.7,
      reviews: 210,
      image: '/assets/products/product-3.jpg',
      brand: 'Home Essentials',
      material: 'Solid Wood',
      condition: 'New',
      warranty: '36 months',
      delivery: '5-7 business days'
    },
    mock3: {
      id: 'mock3',
      name: 'Electronics Headphones',
      price: 299,
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation and long battery life. 40mm drivers deliver exceptional sound quality with deep bass.',
      stock: 15,
      seller_email: 'seller4@example.com',
      rating: 4.8,
      reviews: 342,
      image: '/assets/products/product-4.jpg',
      brand: 'SoundMaster',
      material: 'Premium Plastic/Metal',
      condition: 'New',
      warranty: '12 months',
      delivery: '1-2 business days'
    },
    mock4: {
      id: 'mock4',
      name: 'Wooden Desk',
      price: 750,
      category: 'Wood',
      description: 'Solid wooden desk with drawers. Perfect for home office or study. Features cable management holes and a smooth writing surface.',
      stock: 4,
      seller_email: 'seller1@example.com',
      rating: 4.4,
      reviews: 76,
      image: '/assets/products/product-5.jpg',
      brand: 'Office Pro',
      material: 'Mahogany Wood',
      condition: 'Excellent',
      warranty: '24 months',
      delivery: '4-6 business days'
    },
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    
    (async () => {
      try {
        // Try to fetch from API
        const api = await import('@seller/Services/api').then(m => m.apiService);
        const data = await api.getListing(id);
        if (mounted) {
          setProduct(data);
          setLoading(false);
        }
      } catch (e) {
        console.error('Failed to load product from API, using mock data', e);
        // Use mock data as fallback
        if (mounted && mockProducts[id]) {
          setProduct(mockProducts[id]);
          setLoading(false);
        } else if (mounted) {
          // Generate a generic product for unknown IDs
          const genericId = id?.replace('mock', '') || '0';
          const mockIndex = parseInt(genericId) % 5;
          const mockKeys = ['mock0', 'mock1', 'mock2', 'mock3', 'mock4'];
          setProduct(mockProducts[mockKeys[mockIndex]] || {
            id: id,
            name: `Premium Product ${id}`,
            price: Math.floor(Math.random() * 500) + 299,
            category: 'General',
            description: 'This premium product offers exceptional quality and value. Perfect for your needs, it combines durability with elegant design.',
            stock: Math.floor(Math.random() * 10) + 1,
            seller_email: 'seller@example.com',
            rating: 4.2,
            reviews: Math.floor(Math.random() * 100) + 20,
            image: `/assets/products/product-${mockIndex + 1}.jpg`,
            brand: 'ReValue Collection',
            material: 'Premium Quality',
            condition: 'Like New',
            warranty: '12 months',
            delivery: '2-4 business days'
          });
          setLoading(false);
        }
      }
    })();
    
    return () => { mounted = false };
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>😕</div>
        <h2 style={styles.errorTitle}>Product Not Found</h2>
        <p style={styles.errorText}>The product you're looking for doesn't exist or has been removed.</p>
        <button 
          style={styles.errorButton}
          onClick={() => navigate('/buyer')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #8B4513, #D2691E)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#8B4513';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const current = product;
  
  // Generate multiple product images
  const productImages = [
    current.image || `/assets/products/product-1.jpg`,
    `/assets/products/product-2.jpg`,
    `/assets/products/product-3.jpg`,
    `/assets/products/product-4.jpg`,
  ];

  const features = [
    'High quality materials',
    'Excellent condition',
    'Fast delivery available',
    'Secure payment',
    'Return policy included',
    '24/7 customer support',
    'Authenticity guaranteed',
  ];

  const specifications = [
    { label: 'Brand', value: current.brand || 'ReValue Premium' },
    { label: 'Material', value: current.material || 'Premium quality' },
    { label: 'Condition', value: current.condition || 'Like New' },
    { label: 'Warranty', value: current.warranty || '12 months' },
    { label: 'Delivery', value: current.delivery || '2-3 business days' },
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    const maxQty = current.stock || 10;
    if (newQuantity >= 1 && newQuantity <= maxQty) {
      setQuantity(newQuantity);
    } else if (newQuantity > maxQty) {
      alert(`⚠️ Only ${maxQty} available in stock`);
    }
  };

  const handleAddToCart = () => {
    if (quantity > (current.stock || 0)) {
      alert(`⚠️ Only ${current.stock} available in stock`);
      return;
    }
    
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === current.id);
    
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: current.id,
        name: current.name,
        price: current.price,
        stock: current.stock,
        img: current.image || current.id,
        category: current.category,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    setAddedToCart(true);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  const handleBuyNow = () => {
    if (quantity > (current.stock || 0)) {
      alert(`⚠️ Only ${current.stock} available in stock`);
      return;
    }
    
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === current.id);
    
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: current.id,
        name: current.name,
        price: current.price,
        stock: current.stock,
        img: current.image || current.id,
        category: current.category,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/cart');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('½');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  const handleImageError = (e, index) => {
    e.target.src = `https://via.placeholder.com/600x600?text=Product+Image+${index + 1}`;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 
          style={styles.logo} 
          onClick={() => navigate('/buyer')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ReValue
        </h1>
        <div style={styles.headerButtons}>
          <button 
            style={styles.cartButton} 
            onClick={() => navigate('/cart')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #8B4513, #D2691E)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#8B4513';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🛒 Cart
            {(() => {
              const cart = JSON.parse(localStorage.getItem('cart')) || [];
              const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
              return itemCount > 0 ? (
                <span style={styles.cartBadge}>{itemCount}</span>
              ) : null;
            })()}
          </button>
          <button 
            style={styles.backButton} 
            onClick={() => navigate('/buyer')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-5px)';
              e.currentTarget.style.color = '#D2691E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.color = '#8B4513';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* Success Message */}
      {showSuccessMessage && (
        <div style={styles.successMessage}>
          <span style={styles.successIcon}>✅</span>
          Added {quantity} {quantity > 1 ? 'items' : 'item'} to cart successfully!
        </div>
      )}

      <div style={styles.content}>
        {/* Image Section */}
        <div style={styles.imageSection}>
          <div 
            style={styles.mainImage}
            onMouseEnter={() => setHoveredSection('image')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <img 
              src={productImages[selectedImage]} 
              alt={current.name}
              style={{
                ...styles.mainImageImg,
                transform: hoveredSection === 'image' ? 'scale(1.05)' : 'scale(1)',
              }}
              onError={(e) => handleImageError(e, selectedImage)}
            />
            {current.stock < 5 && current.stock > 0 && (
              <div style={styles.lowStockBadge}>
                ⚡ Only {current.stock} left!
              </div>
            )}
            {current.oldPrice && (
              <div style={styles.saleBadge}>
                🔥 SALE
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          <div style={styles.thumbnails}>
            {productImages.map((img, index) => (
              <div
                key={index}
                style={{
                  ...styles.thumbnail,
                  ...(selectedImage === index ? styles.thumbnailActive : {}),
                  transform: selectedImage === index ? 'scale(1.05)' : 'scale(1)',
                }}
                onClick={() => setSelectedImage(index)}
                onMouseEnter={(e) => {
                  if (selectedImage !== index) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.borderColor = '#D2691E';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedImage !== index) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <img 
                  src={img} 
                  alt={`${current.name} view ${index + 1}`} 
                  style={styles.thumbnailImg}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/150x150?text=View+${index + 1}`;
                  }}
                />
              </div>
            ))}
          </div>

          {/* Share buttons */}
          <div style={styles.shareSection}>
            <span style={styles.shareLabel}>Share:</span>
            <button style={styles.shareBtn} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>📱</button>
            <button style={styles.shareBtn} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>📘</button>
            <button style={styles.shareBtn} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>📸</button>
            <button style={styles.shareBtn} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>📌</button>
          </div>
        </div>

        {/* Info Section */}
        <div style={styles.infoSection}>
          <div style={styles.categoryRow}>
            <span style={styles.categoryBadge}>{current.category}</span>
            <span style={styles.skuBadge}>SKU: REV-{String(current.id).replace('mock', '') || '001'}</span>
          </div>
          
          <h1 style={styles.productTitle}>{current.name}</h1>
          
          <div style={styles.rating}>
            <span style={styles.stars}>{renderStars(current.rating || 4.5)}</span>
            <span style={styles.ratingText}>({current.reviews || 128} reviews)</span>
          </div>

          <div style={styles.priceSection}>
            <div style={styles.priceWrapper}>
              <span style={styles.priceCurrency}>EGP</span>
              <span style={styles.priceValue}>{current.price.toLocaleString()}</span>
            </div>
            {current.oldPrice && (
              <span style={styles.oldPrice}>EGP {current.oldPrice.toLocaleString()}</span>
            )}
          </div>

          <div style={styles.stockInfo}>
            <div style={{
              ...styles.stockBadge,
              backgroundColor: current.stock > 0 ? '#d4edda' : '#f8d7da',
              color: current.stock > 0 ? '#155724' : '#721c24',
            }}>
              {current.stock > 0 ? (
                <span>✓ {current.stock} In Stock</span>
              ) : (
                <span>✗ Out of Stock</span>
              )}
            </div>
            <div style={styles.sellerInfo}>
              <span style={styles.sellerIcon}>👤</span>
              <span style={styles.sellerName}>{current.seller_email?.split('@')[0] || 'ReValue Seller'}</span>
            </div>
          </div>

          {/* Specifications */}
          <div style={styles.specsGrid}>
            {specifications.map((spec, index) => (
              <div key={index} style={styles.specItem}>
                <span style={styles.specLabel}>{spec.label}:</span>
                <span style={styles.specValue}>{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📝 Description</h3>
            <p style={styles.description}>{current.description}</p>
          </div>

          {/* Key Features */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>✨ Key Features</h3>
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} style={styles.featureItem}>
                  <span style={styles.featureIcon}>✓</span>
                  <span style={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div style={styles.quantitySection}>
            <label style={styles.quantityLabel}>Quantity:</label>
            <div style={styles.quantityControls}>
              <button 
                style={styles.quantityButton}
                onClick={() => handleQuantityChange(-1)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#8B4513';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#8B4513';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                −
              </button>
              <span style={styles.quantityDisplay}>{quantity}</span>
              <button 
                style={styles.quantityButton}
                onClick={() => handleQuantityChange(1)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#8B4513';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#8B4513';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                +
              </button>
            </div>
            <span style={styles.maxStock}>Max: {current.stock || 10}</span>
          </div>

          {/* Action Buttons */}
          <div style={styles.actions}>
            <button 
              style={{
                ...styles.addToCartButton,
                backgroundColor: addedToCart ? '#28a745' : 'white',
                color: addedToCart ? 'white' : '#8B4513',
                borderColor: addedToCart ? '#28a745' : '#8B4513',
              }}
              onClick={handleAddToCart}
              onMouseEnter={(e) => {
                if (!addedToCart) {
                  e.currentTarget.style.backgroundColor = '#8B4513';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!addedToCart) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#8B4513';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
            <button 
              style={styles.buyNowButton}
              onClick={handleBuyNow}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.3)';
              }}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Payment Methods */}
          <div style={styles.paymentMethods}>
            <span style={styles.paymentLabel}>Secure payment with:</span>
            <div style={styles.paymentIcons}>
              <span style={styles.paymentIcon}>💳</span>
              <span style={styles.paymentIcon}>📱</span>
              <span style={styles.paymentIcon}>🏦</span>
              <span style={styles.paymentIcon}>🔒</span>
            </div>
          </div>

          {/* Delivery Promise */}
          <div style={styles.deliveryPromise}>
            <span style={styles.deliveryIcon}>🚚</span>
            <span style={styles.deliveryText}>Free shipping on orders over EGP 500</span>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f0e6 0%, #e8d9cc 100%)',
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f0e6 0%, #e8d9cc 100%)',
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '5px solid #f5f0e6',
    borderTop: '5px solid #8B4513',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  loadingText: {
    color: '#8B4513',
    fontSize: '18px',
    fontWeight: 500,
  },
  errorContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f0e6 0%, #e8d9cc 100%)',
    padding: '20px',
  },
  errorIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    color: '#8B4513',
  },
  errorTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#8B4513',
    marginBottom: '10px',
  },
  errorText: {
    fontSize: '16px',
    color: '#D2691E',
    marginBottom: '30px',
    textAlign: 'center',
  },
  errorButton: {
    padding: '16px 40px',
    border: 'none',
    background: '#8B4513',
    color: 'white',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid rgba(139,69,19,0.2)',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(139,69,19,0.1)',
  },
  logo: {
    fontSize: '32px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  headerButtons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  cartButton: {
    background: 'white',
    border: '2px solid #8B4513',
    color: '#8B4513',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '10px 20px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
  backButton: {
    background: 'none',
    border: 'none',
    color: '#8B4513',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '8px 16px',
    transition: 'all 0.3s ease',
  },
  successMessage: {
    position: 'fixed',
    top: '100px',
    right: '30px',
    background: 'linear-gradient(135deg, #28a745, #20c997)',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(40, 167, 69, 0.3)',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease-out',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 600,
  },
  successIcon: {
    fontSize: '20px',
  },
  content: {
    maxWidth: '1400px',
    margin: '40px auto',
    padding: '0 30px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  mainImage: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: 'white',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(139,69,19,0.15)',
    position: 'relative',
    border: '1px solid rgba(139,69,19,0.1)',
  },
  mainImageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  lowStockBadge: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    background: 'linear-gradient(135deg, #ff6b6b, #f03e3e)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(240, 62, 62, 0.3)',
    animation: 'pulse 2s infinite',
  },
  saleBadge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'linear-gradient(135deg, #f59f00, #f76707)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(247, 103, 7, 0.3)',
  },
  thumbnails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
  },
  thumbnail: {
    aspectRatio: '1',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '3px solid transparent',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 16px rgba(139,69,19,0.1)',
  },
  thumbnailActive: {
    border: '3px solid #8B4513',
    transform: 'scale(1.05)',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  shareSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 0',
  },
  shareLabel: {
    color: '#8B4513',
    fontWeight: 600,
  },
  shareBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    background: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(139,69,19,0.1)',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '30px',
    boxShadow: '0 20px 40px rgba(139,69,19,0.1)',
    border: '1px solid rgba(139,69,19,0.1)',
  },
  categoryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  categoryBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 600,
  },
  skuBadge: {
    color: '#7f8c8d',
    fontSize: '14px',
    padding: '8px 16px',
    backgroundColor: '#f5f0e6',
    borderRadius: '30px',
  },
  productTitle: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#2c3e50',
    margin: '0 0 15px 0',
    lineHeight: '1.3',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  stars: {
    color: '#f39c12',
    fontSize: '24px',
    letterSpacing: '2px',
  },
  ratingText: {
    color: '#7f8c8d',
    fontSize: '14px',
  },
  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  priceWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '5px',
  },
  priceCurrency: {
    fontSize: '20px',
    color: '#7f8c8d',
  },
  priceValue: {
    fontSize: '48px',
    fontWeight: 800,
    color: '#8B4513',
    lineHeight: '1',
  },
  oldPrice: {
    fontSize: '20px',
    color: '#e74c3c',
    textDecoration: 'line-through',
  },
  stockInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    padding: '15px',
    backgroundColor: '#f5f0e6',
    borderRadius: '16px',
  },
  stockBadge: {
    padding: '8px 16px',
    borderRadius: '30px',
    fontWeight: 600,
    fontSize: '14px',
  },
  sellerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sellerIcon: {
    fontSize: '18px',
  },
  sellerName: {
    color: '#8B4513',
    fontWeight: 600,
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f5f0e6',
    borderRadius: '20px',
  },
  specItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  specLabel: {
    fontSize: '13px',
    color: '#7f8c8d',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  specValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#8B4513',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#8B4513',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  description: {
    color: '#7f8c8d',
    lineHeight: '1.8',
    fontSize: '16px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#f5f0e6',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    color: '#28a745',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  featureText: {
    color: '#666',
    fontSize: '14px',
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f5f0e6',
    borderRadius: '20px',
  },
  quantityLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#8B4513',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '40px',
    boxShadow: '0 4px 12px rgba(139,69,19,0.1)',
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    border: '2px solid #8B4513',
    backgroundColor: 'white',
    borderRadius: '50%',
    fontSize: '20px',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#8B4513',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityDisplay: {
    minWidth: '40px',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '18px',
    color: '#8B4513',
  },
  maxStock: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  actions: {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px',
  },
  addToCartButton: {
    flex: 1,
    padding: '18px',
    border: '2px solid #8B4513',
    backgroundColor: 'white',
    color: '#8B4513',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  buyNowButton: {
    flex: 1,
    padding: '18px',
    border: 'none',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(139,69,19,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  paymentMethods: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f5f0e6',
    borderRadius: '16px',
    marginBottom: '15px',
  },
  paymentLabel: {
    color: '#7f8c8d',
    fontSize: '14px',
  },
  paymentIcons: {
    display: 'flex',
    gap: '10px',
  },
  paymentIcon: {
    fontSize: '24px',
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
  },
  deliveryPromise: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    borderRadius: '30px',
    justifyContent: 'center',
  },
  deliveryIcon: {
    fontSize: '20px',
  },
  deliveryText: {
    fontSize: '14px',
    fontWeight: 600,
  },
};