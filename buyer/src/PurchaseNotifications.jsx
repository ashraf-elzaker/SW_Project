import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/useAuth';

const styles = {
  app: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 30px',
    minHeight: '100vh',
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    background: 'linear-gradient(135deg, #f5f0e6 0%, #e8d9cc 100%)',
    position: 'relative',
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
    padding: '12px 25px',
    borderRadius: '30px',
    border: 'none',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
  },
  heroSection: {
    background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
    borderRadius: '30px',
    padding: '60px 40px',
    marginBottom: '40px',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(139,69,19,0.3)',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 800,
    marginBottom: '15px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    animation: 'float 3s ease-in-out infinite',
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.95,
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  heroDecoration: {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '200px',
    height: '200px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    animation: 'rotate 20s linear infinite',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    background: 'white',
    padding: '25px 15px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
    border: '1px solid rgba(139,69,19,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#8B4513',
    marginBottom: '10px',
    position: 'relative',
    zIndex: 2,
  },
  statLabel: {
    fontSize: '14px',
    color: '#D2691E',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    position: 'relative',
    zIndex: 2,
  },
  filterSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    border: '1px solid rgba(139,69,19,0.1)',
  },
  filterGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '12px 25px',
    borderRadius: '30px',
    border: 'none',
    background: '#f5f0e6',
    color: '#8B4513',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(139,69,19,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
    transform: 'translateY(-2px)',
  },
  actionGroup: {
    display: 'flex',
    gap: '10px',
  },
  actionBtn: {
    padding: '12px 25px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  markAllBtn: {
    background: '#28a745',
    color: 'white',
  },
  clearAllBtn: {
    background: '#dc3545',
    color: 'white',
  },
  notificationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px',
    marginBottom: '40px',
  },
  notificationCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid rgba(139,69,19,0.1)',
    height: '100%',
  },
  notificationHeader: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  notificationIconWrapper: {
    width: '60px',
    height: '60px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    boxShadow: '0 8px 16px rgba(139,69,19,0.2)',
    transition: 'all 0.3s ease',
  },
  notificationTitleSection: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '5px',
    color: '#8B4513',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  notificationTime: {
    fontSize: '12px',
    color: '#D2691E',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  notificationMessage: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '10px',
    padding: '0 5px',
  },
  notificationBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    animation: 'pulse 2s infinite',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  badgeUnread: {
    background: '#8B4513',
    color: 'white',
    boxShadow: '0 4px 12px rgba(139,69,19,0.4)',
  },
  badgeRead: {
    background: '#28a745',
    color: 'white',
  },
  notificationFooter: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto',
    justifyContent: 'flex-end',
    borderTop: '1px solid rgba(139,69,19,0.1)',
    paddingTop: '15px',
  },
  cardActionBtn: {
    padding: '8px 15px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: '#f5f0e6',
  },
  markReadBtn: {
    color: '#28a745',
  },
  deleteBtn: {
    color: '#dc3545',
  },
  viewBtn: {
    color: '#8B4513',
  },
  emptyState: {
    gridColumn: 'span 3',
    textAlign: 'center',
    padding: '80px 20px',
    background: 'white',
    borderRadius: '30px',
    boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
    border: '1px solid rgba(139,69,19,0.1)',
    animation: 'float 4s ease-in-out infinite',
  },
  emptyIcon: {
    fontSize: '100px',
    marginBottom: '20px',
    color: '#8B4513',
    opacity: 0.5,
    animation: 'bounce 2s ease-in-out infinite',
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
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '40px',
  },
  pageBtn: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    border: 'none',
    background: 'white',
    color: '#8B4513',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(139,69,19,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnActive: {
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 20px rgba(139,69,19,0.3)',
  },
  floatingActionBtn: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(139,69,19,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    transition: 'all 0.3s ease',
    animation: 'pulse 2s infinite',
    zIndex: 1000,
  },
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStats, setShowStats] = useState(true);
  const notificationsPerPage = 9;

  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    orders: 0,
    messages: 0,
    promotions: 0,
    system: 0,
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    
    if (savedNotifications.length === 0) {
      const mockNotifications = [
        {
          id: 1,
          type: 'order',
          title: '✅ Order Confirmed',
          message: 'Your order #12345 has been confirmed and is being processed.',
          time: '5 minutes ago',
          read: false,
          icon: '📦',
        },
        {
          id: 2,
          type: 'message',
          title: '💬 New Message',
          message: 'Seller responded to your inquiry about "Vintage Wooden Chair".',
          time: '1 hour ago',
          read: false,
          icon: '💬',
        },
        {
          id: 3,
          type: 'promotion',
          title: '🎉 Special Offer',
          message: 'Get 20% off on all furniture items this weekend!',
          time: '3 hours ago',
          read: true,
          icon: '🎉',
        },
        {
          id: 4,
          type: 'order',
          title: '🚚 Shipping Update',
          message: 'Your order #12346 has been shipped and will arrive soon.',
          time: '1 day ago',
          read: false,
          icon: '🚚',
        },
        {
          id: 5,
          type: 'system',
          title: '⚙️ System Update',
          message: "We've updated our platform with new features. Check them out!",
          time: '2 days ago',
          read: true,
          icon: '⚙️',
        },
        {
          id: 6,
          type: 'message',
          title: '⭐ New Review',
          message: 'Someone left a review on your purchased item.',
          time: '3 days ago',
          read: false,
          icon: '⭐',
        },
        {
          id: 7,
          type: 'promotion',
          title: '⚡ Flash Sale',
          message: "Flash sale ends in 24 hours! Don't miss out on amazing deals.",
          time: '4 days ago',
          read: true,
          icon: '⚡',
        },
        {
          id: 8,
          type: 'order',
          title: '📝 Review Request',
          message: 'How was your experience with order #12344? Leave a review!',
          time: '5 days ago',
          read: false,
          icon: '📝',
        },
        {
          id: 9,
          type: 'system',
          title: '🔔 Reminder',
          message: 'You have 3 items in your cart. Complete your purchase now!',
          time: '6 days ago',
          read: true,
          icon: '🛒',
        },
        {
          id: 10,
          type: 'order',
          title: '💰 Payment Confirmed',
          message: 'Your payment for order #12347 has been confirmed.',
          time: '1 week ago',
          read: false,
          icon: '💳',
        },
        {
          id: 11,
          type: 'message',
          title: '🤝 Special Offer',
          message: 'Seller made you a special offer on "Wooden Table".',
          time: '1 week ago',
          read: true,
          icon: '🤝',
        },
        {
          id: 12,
          type: 'promotion',
          title: '🎁 Free Gift',
          message: 'Buy 2 items and get 1 free! Limited time offer.',
          time: '2 weeks ago',
          read: false,
          icon: '🎁',
        },
      ];
      
      setNotifications(mockNotifications);
      localStorage.setItem('notifications', JSON.stringify(mockNotifications));
      updateStats(mockNotifications);
    } else {
      setNotifications(savedNotifications);
      updateStats(savedNotifications);
    }
  };

  const updateStats = (notifs) => {
    setStats({
      total: notifs.length,
      unread: notifs.filter(n => !n.read).length,
      read: notifs.filter(n => n.read).length,
      orders: notifs.filter(n => n.type === 'order').length,
      messages: notifs.filter(n => n.type === 'message').length,
      promotions: notifs.filter(n => n.type === 'promotion').length,
      system: notifs.filter(n => n.type === 'system').length,
    });
  };

  const handleMarkAsRead = (id, e) => {
    e.stopPropagation();
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    updateStats(updated);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    updateStats(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    updateStats(updated);
  };

  const handleClearAll = () => {
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
    updateStats([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    if (filter === 'orders') return n.type === 'order';
    if (filter === 'messages') return n.type === 'message';
    if (filter === 'promotions') return n.type === 'promotion';
    return true;
  });

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);
  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

  const handleLogoClick = () => {
    navigate('/buyer');
  };

  const handleBackClick = () => {
    navigate('/buyer');
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo} onClick={handleLogoClick} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          ReValue
        </h1>
        <button 
          style={styles.backButton}
          onClick={handleBackClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,69,19,0.3)';
          }}
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroDecoration} />
        <h1 style={styles.heroTitle}>🔔 Notifications Center</h1>
        <p style={styles.heroSubtitle}>
          Stay updated with your orders, messages, and special offers
        </p>
      </section>

      {/* Stats Cards */}
      {showStats && (
        <section style={styles.statsContainer}>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139,69,19,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,69,19,0.1)';
            }}
          >
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total</div>
          </div>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139,69,19,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,69,19,0.1)';
            }}
          >
            <div style={{...styles.statNumber, color: '#8B4513'}}>{stats.unread}</div>
            <div style={styles.statLabel}>Unread</div>
          </div>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139,69,19,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,69,19,0.1)';
            }}
          >
            <div style={{...styles.statNumber, color: '#28a745'}}>{stats.read}</div>
            <div style={styles.statLabel}>Read</div>
          </div>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139,69,19,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,69,19,0.1)';
            }}
          >
            <div style={styles.statNumber}>{stats.orders}</div>
            <div style={styles.statLabel}>Orders</div>
          </div>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139,69,19,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,69,19,0.1)';
            }}
          >
            <div style={styles.statNumber}>{stats.messages}</div>
            <div style={styles.statLabel}>Messages</div>
          </div>
        </section>
      )}

      {/* Filters and Actions */}
      <section style={styles.filterSection}>
        <div style={styles.filterGroup}>
          <button
            style={{
              ...styles.filterBtn,
              ...(filter === 'all' ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter('all')}
            onMouseEnter={(e) => !filter === 'all' && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !filter === 'all' && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            All
          </button>
          <button
            style={{
              ...styles.filterBtn,
              ...(filter === 'unread' ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
          <button
            style={{
              ...styles.filterBtn,
              ...(filter === 'read' ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter('read')}
          >
            Read
          </button>
          <button
            style={{
              ...styles.filterBtn,
              ...(filter === 'orders' ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter('orders')}
          >
            Orders
          </button>
          <button
            style={{
              ...styles.filterBtn,
              ...(filter === 'messages' ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter('messages')}
          >
            Messages
          </button>
        </div>
        
        <div style={styles.actionGroup}>
          {stats.unread > 0 && (
            <button
              style={{
                ...styles.actionBtn,
                ...styles.markAllBtn,
              }}
              onClick={handleMarkAllAsRead}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ✓ Mark All as Read
            </button>
          )}
          {stats.total > 0 && (
            <button
              style={{
                ...styles.actionBtn,
                ...styles.clearAllBtn,
              }}
              onClick={handleClearAll}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🗑️ Clear All
            </button>
          )}
        </div>
      </section>

      {/* Notifications Grid */}
      <section style={styles.notificationsGrid}>
        {currentNotifications.length > 0 ? (
          currentNotifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                ...styles.notificationCard,
                transform: hoveredCard === notification.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredCard === notification.id ? '0 20px 40px rgba(139,69,19,0.2)' : '0 10px 30px rgba(139,69,19,0.1)',
              }}
              onMouseEnter={() => setHoveredCard(notification.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                if (!notification.read) {
                  handleMarkAsRead(notification.id, new Event('click'));
                }
              }}
            >
              <div style={{
                ...styles.notificationBadge,
                ...(notification.read ? styles.badgeRead : styles.badgeUnread),
              }}>
                {notification.read ? '✓ Read' : '● New'}
              </div>
              
              <div style={styles.notificationHeader}>
                <div style={{
                  ...styles.notificationIconWrapper,
                  transform: hoveredCard === notification.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
                }}>
                  {notification.icon}
                </div>
                
                <div style={styles.notificationTitleSection}>
                  <h3 style={styles.notificationTitle}>{notification.title}</h3>
                  <div style={styles.notificationTime}>
                    <span>🕒</span> {notification.time}
                  </div>
                </div>
              </div>
              
              <p style={styles.notificationMessage}>{notification.message}</p>
              
              <div style={styles.notificationFooter}>
                {!notification.read && (
                  <button
                    style={{
                      ...styles.cardActionBtn,
                      ...styles.markReadBtn,
                    }}
                    onClick={(e) => handleMarkAsRead(notification.id, e)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = '#28a74520';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = '#f5f0e6';
                    }}
                  >
                    ✓ Read
                  </button>
                )}
                <button
                  style={{
                    ...styles.cardActionBtn,
                    ...styles.viewBtn,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (notification.type === 'order') {
                      navigate('/buyer/purchases');
                    } else if (notification.type === 'message') {
                      navigate('/messages');
                    } else {
                      navigate('/products');
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = '#8B451320';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = '#f5f0e6';
                  }}
                >
                  👁️ View
                </button>
                <button
                  style={{
                    ...styles.cardActionBtn,
                    ...styles.deleteBtn,
                  }}
                  onClick={(e) => handleDelete(notification.id, e)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = '#dc354520';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = '#f5f0e6';
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <h2 style={styles.emptyTitle}>No Notifications</h2>
            <p style={styles.emptyText}>
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section style={styles.pagination}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              style={{
                ...styles.pageBtn,
                ...(currentPage === i + 1 ? styles.pageBtnActive : {}),
              }}
              onClick={() => setCurrentPage(i + 1)}
              onMouseEnter={(e) => {
                if (currentPage !== i + 1) {
                  e.currentTarget.style.background = '#f5f0e6';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== i + 1) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {i + 1}
            </button>
          ))}
        </section>
      )}

      {/* Floating Action Button */}
      {stats.unread > 0 && (
        <button
          style={styles.floatingActionBtn}
          onClick={() => setShowStats(!showStats)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(139,69,19,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(139,69,19,0.3)';
          }}
        >
          {showStats ? '📊' : '🔔'}
        </button>
      )}

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NotificationsPage;