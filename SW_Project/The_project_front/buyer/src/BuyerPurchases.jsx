import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@seller/Services/api';
import product1 from './assets/product1.jpg.jpeg';

export default function BuyerPurchases() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [purchases, setPurchases] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiService.getMyOrders();
        if (mounted) setPurchases((data || []));
      } catch (e) {
        console.error('Failed to load purchases', e);
      }
    })();
    return () => { mounted = false };
  }, []);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];

  const filteredPurchases = filterStatus === 'All' 
    ? purchases 
    : purchases.filter(p => p.status === filterStatus);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Delivered':
        return { 
          background: 'linear-gradient(135deg, #28a745, #20c997)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)'
        };
      case 'Shipped':
        return { 
          background: 'linear-gradient(135deg, #17a2b8, #00c6ff)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)'
        };
      case 'Processing':
        return { 
          background: 'linear-gradient(135deg, #ffc107, #fd7e14)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)'
        };
      default:
        return { 
          background: '#e9ecef',
          color: '#495057'
        };
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return '✅';
      case 'Shipped': return '🚚';
      case 'Processing': return '⚙️';
      default: return '📦';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo} onClick={() => navigate('/buyer')}>ReValue</h1>
        <button 
          style={styles.backButton} 
          onClick={() => navigate('/buyer')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-5px)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #8B4513, #D2691E)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#8B4513';
          }}
        >
          ← Back to Dashboard
        </button>
      </header>

      <div style={styles.content}>
        {/* Title Section with Animation */}
        <div style={styles.titleSection}>
          <h2 style={styles.pageTitle}>My Purchases</h2>
          <p style={styles.pageSubtitle}>View and track your order history</p>
        </div>

        {/* Enhanced Filter Section */}
        <div style={styles.filterSection}>
          {statuses.map((status) => {
            const count = status === 'All' 
              ? purchases.length 
              : purchases.filter(p => p.status === status).length;
            
            return (
              <button
                key={status}
                style={{
                  ...styles.filterBtn,
                  ...(filterStatus === status ? styles.filterBtnActive : {}),
                  transform: hoveredFilter === status ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: hoveredFilter === status ? '0 8px 20px rgba(139,69,19,0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                }}
                onClick={() => setFilterStatus(status)}
                onMouseEnter={() => setHoveredFilter(status)}
                onMouseLeave={() => setHoveredFilter(null)}
              >
                <span>{status}</span>
                {count > 0 && <span style={styles.filterCount}>{count}</span>}
              </button>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📦</div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>{purchases.length}</div>
              <div style={styles.statLabel}>Total Orders</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🚚</div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>{purchases.filter(p => p.status === 'Shipped').length}</div>
              <div style={styles.statLabel}>In Transit</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>{purchases.filter(p => p.status === 'Delivered').length}</div>
              <div style={styles.statLabel}>Delivered</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💰</div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>
                EGP {purchases.reduce((sum, p) => sum + (p.total_price || 0), 0).toLocaleString()}
              </div>
              <div style={styles.statLabel}>Total Spent</div>
            </div>
          </div>
        </div>

        {/* Purchases List */}
        <div style={styles.purchasesList}>
          {filteredPurchases.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🛒</div>
              <h3 style={styles.emptyTitle}>No purchases yet</h3>
              <p style={styles.emptyText}>Start exploring amazing products and find your next treasure!</p>
              <button 
                style={styles.shopButton}
                onClick={() => navigate('/buyer')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,69,19,0.3)';
                }}
              >
                Start Shopping Now →
              </button>
            </div>
          ) : (
            filteredPurchases.map((purchase) => (
              <div
                key={purchase.id}
                style={{
                  ...styles.purchaseCard,
                  transform: hoveredCard === purchase.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredCard === purchase.id 
                    ? '0 20px 40px rgba(139,69,19,0.15)' 
                    : '0 10px 30px rgba(0,0,0,0.08)',
                  borderLeft: expandedCard === purchase.id ? '5px solid #8B4513' : '5px solid transparent',
                }}
                onMouseEnter={() => setHoveredCard(purchase.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Order Header */}
                <div style={styles.orderHeader}>
                  <div style={styles.orderInfo}>
                    <div style={styles.orderTitle}>
                      <h3 style={styles.orderId}>Order #{purchase.id}</h3>
                      <span style={styles.orderDate}>
                        <span style={styles.calendarIcon}>📅</span> {formatDate(purchase.created_at)}
                      </span>
                    </div>
                  </div>
                  <div style={styles.orderStatus}>
                    <span style={{
                      ...styles.statusBadge,
                      ...getStatusStyle(purchase.status)
                    }}>
                      {getStatusIcon(purchase.status)} {purchase.status}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div style={styles.itemsList}>
                  <div style={styles.itemRow}>
                    <div style={styles.itemImageContainer}>
                      <div style={styles.itemImage}>
                        <img 
                          src={purchase.product_info?.image || product1} 
                          alt={purchase.product_info?.name || 'Product'} 
                          style={{
                            ...styles.itemImg,
                            transform: hoveredCard === purchase.id ? 'scale(1.1)' : 'scale(1)',
                          }}
                        />
                      </div>
                    </div>
                    <div style={styles.itemDetails}>
                      <h4 style={styles.itemName}>{purchase.product_info?.name}</h4>
                      <div style={styles.itemMeta}>
                        <span style={styles.itemQuantity}>Quantity: {purchase.quantity}</span>
                        <span style={styles.itemSeller}>Seller: {purchase.seller_info?.name || 'Unknown'}</span>
                      </div>
                    </div>
                    <div style={styles.itemPrice}>
                      <span style={styles.priceLabel}>EGP</span>
                      <span style={styles.priceValue}>{purchase.total_price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div style={styles.orderFooter}>
                  <div style={styles.deliveryInfo}>
                    <div style={styles.deliveryProgress}>
                      <div style={{
                        ...styles.progressBar,
                        width: purchase.status === 'Delivered' ? '100%' : 
                               purchase.status === 'Shipped' ? '66%' : 
                               purchase.status === 'Processing' ? '33%' : '0%',
                      }} />
                    </div>
                    <div style={styles.deliverySteps}>
                      <span style={purchase.status !== 'Processing' ? styles.stepCompleted : styles.stepPending}>Processing</span>
                      <span style={purchase.status === 'Shipped' || purchase.status === 'Delivered' ? styles.stepCompleted : styles.stepPending}>Shipped</span>
                      <span style={purchase.status === 'Delivered' ? styles.stepCompleted : styles.stepPending}>Delivered</span>
                    </div>
                  </div>
                  <div style={styles.totalSection}>
                    <span style={styles.totalLabel}>Total:</span>
                    <span style={styles.totalAmount}>EGP {purchase.total_price?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                  <button 
                    style={styles.viewDetailsBtn}
                    onClick={() => navigate(`/buyer/purchases/${purchase.id}`)}
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
                    View Details
                  </button>
                  
                  {purchase.status === 'Delivered' && (
                    <button 
                      style={styles.reviewBtn}
                      onClick={() => navigate(`/product/${purchase.product_id}/review`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#28a745';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Write a Review
                    </button>
                  )}
                  
                  {purchase.status === 'Shipped' && (
                    <button 
                      style={styles.trackBtn}
                      onClick={() => navigate(`/buyer/purchases/${purchase.id}/track`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,69,19,0.3)';
                      }}
                    >
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .purchase-card {
            animation: slideIn 0.5s ease-out;
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
  backButton: {
    padding: '10px 20px',
    borderRadius: '30px',
    border: '2px solid #8B4513',
    background: 'transparent',
    color: '#8B4513',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  titleSection: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: '42px',
    fontWeight: 800,
    color: '#8B4513',
    margin: '0 0 10px 0',
    textShadow: '2px 2px 4px rgba(139,69,19,0.1)',
  },
  pageSubtitle: {
    fontSize: '18px',
    color: '#D2691E',
    margin: 0,
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    border: '1px solid rgba(139,69,19,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#8B4513',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#D2691E',
    fontWeight: 500,
  },
  filterSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filterBtn: {
    padding: '12px 30px',
    borderRadius: '40px',
    border: 'none',
    background: 'white',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#8B4513',
    boxShadow: '0 2px 8px rgba(139,69,19,0.1)',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
  },
  filterCount: {
    background: 'rgba(255,255,255,0.2)',
    padding: '2px 8px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  purchasesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  purchaseCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: '1px solid rgba(139,69,19,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid rgba(139,69,19,0.1)',
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  orderId: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#8B4513',
    margin: 0,
  },
  orderDate: {
    fontSize: '14px',
    color: '#D2691E',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  calendarIcon: {
    fontSize: '16px',
  },
  statusBadge: {
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  itemsList: {
    marginBottom: '20px',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  itemImageContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '16px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f5f0e6, #e8d9cc)',
    boxShadow: '0 8px 16px rgba(139,69,19,0.1)',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  itemImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  itemMeta: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  itemQuantity: {
    fontSize: '14px',
    color: '#7f8c8d',
    background: '#f5f0e6',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  itemSeller: {
    fontSize: '14px',
    color: '#D2691E',
    background: 'rgba(139,69,19,0.1)',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  itemPrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '5px',
  },
  priceLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  priceValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#8B4513',
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '2px solid rgba(139,69,19,0.1)',
    marginBottom: '20px',
  },
  deliveryInfo: {
    flex: 1,
    maxWidth: '400px',
  },
  deliveryProgress: {
    width: '100%',
    height: '4px',
    background: '#e9ecef',
    borderRadius: '2px',
    marginBottom: '10px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #8B4513, #D2691E)',
    borderRadius: '2px',
    transition: 'width 0.6s ease',
  },
  deliverySteps: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#7f8c8d',
  },
  stepCompleted: {
    color: '#8B4513',
    fontWeight: 600,
  },
  stepPending: {
    color: '#adb5bd',
  },
  totalSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  totalLabel: {
    fontSize: '16px',
    color: '#7f8c8d',
    fontWeight: 500,
  },
  totalAmount: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#8B4513',
  },
  actionButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
  },
  viewDetailsBtn: {
    padding: '14px 24px',
    border: '2px solid #8B4513',
    background: 'transparent',
    color: '#8B4513',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  reviewBtn: {
    padding: '14px 24px',
    border: 'none',
    background: '#28a745',
    color: 'white',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
  },
  trackBtn: {
    padding: '14px 24px',
    border: 'none',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'white',
    borderRadius: '30px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    border: '1px solid rgba(139,69,19,0.1)',
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
    marginBottom: '10px',
  },
  emptyText: {
    fontSize: '16px',
    color: '#D2691E',
    marginBottom: '30px',
  },
  shopButton: {
    padding: '16px 40px',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
  },
};