import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@seller/Services/api';
import { useAuth } from '../../src/useAuth';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + change);
          if (newQty > item.stock) {
            alert(`Only ${item.stock} available in stock`);
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setShowClearConfirm(false);
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save20') {
      setDiscount(0.2);
      setCouponApplied(true);
      alert('✅ Coupon applied! 20% discount added.');
    } else if (couponCode.toLowerCase() === 'save10') {
      setDiscount(0.1);
      setCouponApplied(true);
      alert('✅ Coupon applied! 10% discount added.');
    } else {
      alert('❌ Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.14;
  const discountAmount = subtotal * discount;
  const total = subtotal + shipping + tax - discountAmount;

  const { logout } = useAuth();

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
            style={styles.logoutButton} 
            onClick={() => { logout(); navigate('/'); }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #8B4513, #D2691E)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#8B4513';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Logout
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

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalIcon}>🗑️</div>
            <h3 style={styles.modalTitle}>Clear Cart?</h3>
            <p style={styles.modalText}>Are you sure you want to remove all items from your cart?</p>
            <div style={styles.modalButtons}>
              <button 
                style={styles.modalCancelBtn}
                onClick={() => setShowClearConfirm(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e9ecef';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Cancel
              </button>
              <button 
                style={styles.modalConfirmBtn}
                onClick={confirmClearCart}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#c82333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc3545';
                }}
              >
                Yes, Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.content}>
        {/* Title Section */}
        <div style={styles.titleSection}>
          <div>
            <h2 style={styles.title}>Shopping Cart</h2>
            <p style={styles.itemCount}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          {cartItems.length > 0 && (
            <button 
              style={styles.clearButton} 
              onClick={clearCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fee';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🗑️ Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={styles.emptyIcon}>🛒</div>
            <h3 style={styles.emptyTitle}>Your cart is empty</h3>
            <p style={styles.emptyText}>Looks like you haven't added any items yet</p>
            <button 
              style={styles.shopButton} 
              onClick={() => navigate('/buyer')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.3)';
              }}
            >
              Browse Products →
            </button>
          </div>
        ) : (
          <div style={styles.mainContent}>
            {/* Cart Items Section */}
            <div style={styles.cartSection}>
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  style={{
                    ...styles.cartItem,
                    transform: hoveredItem === item.id ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: hoveredItem === item.id 
                      ? '0 15px 30px rgba(139,69,19,0.15)' 
                      : '0 5px 15px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <img 
                    src={item.img || `https://via.placeholder.com/120x120?text=Product+${item.id}`} 
                    alt={item.name} 
                    style={{
                      ...styles.itemImage,
                      transform: hoveredItem === item.id ? 'scale(1.05)' : 'scale(1)',
                    }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                  
                  <div style={styles.itemInfo}>
                    <h3 
                      style={styles.itemName}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.name}
                    </h3>
                    <div style={styles.itemMeta}>
                      <span style={styles.itemCategory}>{item.category}</span>
                      {item.stock < 5 && (
                        <span style={styles.lowStock}>⚡ Low Stock</span>
                      )}
                    </div>
                    <div style={styles.itemPriceRow}>
                      <span style={styles.itemPrice}>EGP {item.price}</span>
                      <span style={styles.itemStock}>Stock: {item.stock}</span>
                    </div>
                  </div>

                  <div style={styles.itemActions}>
                    <div style={styles.quantityControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, -1)} 
                        style={styles.qtyButton}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #8B4513, #D2691E)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#f5f0e6';
                          e.currentTarget.style.color = '#8B4513';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        −
                      </button>
                      <span style={styles.quantity}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)} 
                        style={styles.qtyButton}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #8B4513, #D2691E)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#f5f0e6';
                          e.currentTarget.style.color = '#8B4513';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <div style={styles.itemTotal}>
                      <span style={styles.totalLabel}>Total:</span>
                      <span style={styles.totalAmount}>EGP {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)} 
                      style={styles.removeButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#dc3545';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#8B4513';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div style={styles.summarySection}>
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>
                
                {/* Coupon Section */}
                <div style={styles.couponSection}>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={styles.couponInput}
                    disabled={couponApplied}
                  />
                  <button
                    style={styles.couponButton}
                    onClick={applyCoupon}
                    disabled={couponApplied}
                    onMouseEnter={(e) => {
                      if (!couponApplied) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #8B4513, #D2691E)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!couponApplied) {
                        e.currentTarget.style.background = '#8B4513';
                      }
                    }}
                  >
                    {couponApplied ? '✓ Applied' : 'Apply'}
                  </button>
                </div>
                
                <div style={styles.summaryDetails}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Subtotal</span>
                    <span style={styles.summaryValue}>EGP {subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div style={{...styles.summaryRow, color: '#28a745'}}>
                      <span style={styles.summaryLabel}>Discount ({discount * 100}%)</span>
                      <span style={styles.summaryValue}>-EGP {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Shipping</span>
                    <span style={styles.summaryValue}>
                      {shipping === 0 ? (
                        <span style={{color: '#28a745'}}>FREE</span>
                      ) : (
                        `EGP ${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Tax (14%)</span>
                    <span style={styles.summaryValue}>EGP {tax.toFixed(2)}</span>
                  </div>
                  
                  <div style={styles.divider}></div>
                  
                  <div style={{...styles.summaryRow, ...styles.summaryTotal}}>
                    <span style={styles.totalLabel}>Total</span>
                    <span style={styles.totalValue}>EGP {total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <div style={styles.freeShippingBadge}>
                    🎉 You've qualified for FREE shipping!
                  </div>
                )}

                <button 
                  style={styles.checkoutButton} 
                  onClick={async () => {
                    if (!window.confirm('Ready to complete your purchase?')) return;
                    try {
                      for (const item of cartItems) {
                        if (item.quantity > item.stock) {
                          alert(`Only ${item.stock} of "${item.name}" in stock. Please adjust quantity.`);
                          return;
                        }
                        await apiService.createOrder({ product: item.id, quantity: item.quantity });
                      }
                      
                      setCartItems([]);
                      localStorage.removeItem('cart');
                      alert('🎉 Order placed successfully!');
                      navigate('/buyer/purchases');
                    } catch (e) {
                      console.error('Checkout error', e);
                      if (e.response?.status === 401) {
                        alert('Please log in before checking out.');
                        navigate('/login');
                      } else {
                        alert('Failed to place order. Please try again.');
                      }
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.3)';
                  }}
                >
                  Proceed to Checkout →
                </button>
                
                <button 
                  style={styles.continueButton} 
                  onClick={() => navigate('/buyer')}
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
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div style={styles.trustBadges}>
                  <div style={styles.badge}>
                    <span style={styles.badgeIcon}>🔒</span>
                    <div style={styles.badgeInfo}>
                      <span style={styles.badgeTitle}>Secure Payment</span>
                      <span style={styles.badgeDesc}>256-bit SSL encrypted</span>
                    </div>
                  </div>
                  <div style={styles.badge}>
                    <span style={styles.badgeIcon}>📦</span>
                    <div style={styles.badgeInfo}>
                      <span style={styles.badgeTitle}>Fast Shipping</span>
                      <span style={styles.badgeDesc}>2-3 business days</span>
                    </div>
                  </div>
                  <div style={styles.badge}>
                    <span style={styles.badgeIcon}>↩️</span>
                    <div style={styles.badgeInfo}>
                      <span style={styles.badgeTitle}>Easy Returns</span>
                      <span style={styles.badgeDesc}>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
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
  logoutButton: {
    background: 'transparent',
    border: '2px solid #8B4513',
    color: '#8B4513',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '8px 20px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '40px',
    borderRadius: '30px',
    textAlign: 'center',
    maxWidth: '400px',
    animation: 'slideIn 0.3s ease-out',
  },
  modalIcon: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#8B4513',
    marginBottom: '10px',
  },
  modalText: {
    color: '#666',
    marginBottom: '30px',
  },
  modalButtons: {
    display: 'flex',
    gap: '15px',
  },
  modalCancelBtn: {
    flex: 1,
    padding: '12px',
    border: '2px solid #8B4513',
    background: 'white',
    color: '#8B4513',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modalConfirmBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    background: '#dc3545',
    color: 'white',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  clearButton: {
    background: 'transparent',
    border: '2px solid #dc3545',
    color: '#dc3545',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '12px 24px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  content: {
    maxWidth: '1400px',
    margin: '40px auto',
    padding: '0 30px',
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#8B4513',
    margin: '0 0 8px 0',
  },
  itemCount: {
    fontSize: '16px',
    color: '#D2691E',
    margin: 0,
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '30px',
  },
  cartSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cartItem: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    display: 'grid',
    gridTemplateColumns: '120px 1fr auto',
    gap: '20px',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(139,69,19,0.1)',
  },
  itemImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 16px rgba(139,69,19,0.1)',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#8B4513',
    margin: 0,
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  itemMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  itemCategory: {
    fontSize: '14px',
    color: '#D2691E',
    background: '#f5f0e6',
    padding: '4px 12px',
    borderRadius: '20px',
    margin: 0,
  },
  lowStock: {
    fontSize: '12px',
    color: '#e74c3c',
    background: '#fdf0ed',
    padding: '4px 12px',
    borderRadius: '20px',
    animation: 'pulse 2s infinite',
  },
  itemPriceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '8px',
  },
  itemPrice: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#8B4513',
    margin: 0,
  },
  itemStock: {
    fontSize: '13px',
    color: '#7f8c8d',
    background: '#f5f0e6',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '15px',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#f5f0e6',
    padding: '8px 15px',
    borderRadius: '40px',
  },
  qtyButton: {
    width: '35px',
    height: '35px',
    border: 'none',
    background: '#f5f0e6',
    borderRadius: '50%',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#8B4513',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '16px',
    color: '#8B4513',
  },
  itemTotal: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  totalLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  totalAmount: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#8B4513',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#8B4513',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  summarySection: {
    position: 'sticky',
    top: '20px',
    height: 'fit-content',
  },
  summaryCard: {
    background: 'white',
    borderRadius: '30px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    border: '1px solid rgba(139,69,19,0.1)',
  },
  summaryTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#8B4513',
    marginBottom: '20px',
  },
  couponSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
  },
  couponInput: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #f5f0e6',
    borderRadius: '30px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  couponButton: {
    padding: '12px 24px',
    background: '#8B4513',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  summaryDetails: {
    marginBottom: '20px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  summaryLabel: {
    fontSize: '16px',
    color: '#7f8c8d',
  },
  summaryValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2c3e50',
  },
  divider: {
    height: '2px',
    background: '#f5f0e6',
    margin: '15px 0',
  },
  summaryTotal: {
    paddingTop: '10px',
  },
  totalLabel: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#8B4513',
  },
  totalValue: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#8B4513',
  },
  freeShippingBadge: {
    background: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '30px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '20px',
    animation: 'pulse 2s infinite',
  },
  checkoutButton: {
    width: '100%',
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
    marginBottom: '12px',
  },
  continueButton: {
    width: '100%',
    padding: '16px',
    background: 'white',
    color: '#8B4513',
    border: '2px solid #8B4513',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  trustBadges: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '2px solid #f5f0e6',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '10px 0',
  },
  badgeIcon: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f0e6',
    borderRadius: '12px',
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#8B4513',
    display: 'block',
    marginBottom: '4px',
  },
  badgeDesc: {
    fontSize: '12px',
    color: '#7f8c8d',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'white',
    borderRadius: '30px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    border: '1px solid rgba(139,69,19,0.1)',
    animation: 'slideIn 0.5s ease-out',
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    color: '#8B4513',
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#8B4513',
    margin: '0 0 10px 0',
  },
  emptyText: {
    fontSize: '16px',
    color: '#D2691E',
    marginBottom: '30px',
  },
  shopButton: {
    padding: '16px 40px',
    border: 'none',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(139,69,19,0.3)',
  },
};