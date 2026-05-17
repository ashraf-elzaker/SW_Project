import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Package, Mail, ShoppingCart, 
  TrendingUp, TrendingDown, Activity, Sparkles,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  RefreshCw, Eye, Heart, Star, Users, Clock,
  Calendar, Award, Target, Zap, Shield, Gift,
  CreditCard, Truck, MessageCircle, CheckCircle,
  AlertCircle, BarChart3, PieChart, LineChart
} from 'lucide-react';
import { apiService } from '../Services/api';

// Modern color palette with gradients
const cardThemes = [
  { 
    name: 'sunset',
    primary: '#FF6B6B', 
    secondary: '#4ECDC4', 
    accent: '#FFE66D',
    gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    darkGradient: 'linear-gradient(135deg, #FF6B6B20, #4ECDC420)'
  },
  { 
    name: 'ocean',
    primary: '#2193b0', 
    secondary: '#6dd5ed', 
    accent: '#ffffff',
    gradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
    darkGradient: 'linear-gradient(135deg, #2193b020, #6dd5ed20)'
  },
  { 
    name: 'royal',
    primary: '#834d9b', 
    secondary: '#d04ed6', 
    accent: '#f9c851',
    gradient: 'linear-gradient(135deg, #834d9b, #d04ed6)',
    darkGradient: 'linear-gradient(135deg, #834d9b20, #d04ed620)'
  },
  { 
    name: 'forest',
    primary: '#134e5e', 
    secondary: '#71b280', 
    accent: '#e8f5e9',
    gradient: 'linear-gradient(135deg, #134e5e, #71b280)',
    darkGradient: 'linear-gradient(135deg, #134e5e20, #71b28020)'
  },
  { 
    name: 'peach',
    primary: '#ff6e7f', 
    secondary: '#bfe9ff', 
    accent: '#fff1eb',
    gradient: 'linear-gradient(135deg, #ff6e7f, #bfe9ff)',
    darkGradient: 'linear-gradient(135deg, #ff6e7f20, #bfe9ff20)'
  },
  { 
    name: 'midnight',
    primary: '#2C3E50', 
    secondary: '#3498DB', 
    accent: '#ECF0F1',
    gradient: 'linear-gradient(135deg, #2C3E50, #3498DB)',
    darkGradient: 'linear-gradient(135deg, #2C3E5020, #3498DB20)'
  }
];

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return (
    <motion.span
      key={end}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}

function GlowingOrb({ color, delay = 0 }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
        x: ['-30%', '30%', '-30%'],
        y: ['-30%', '30%', '-30%'],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

function MetricBadge({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: `${color}10`,
        borderRadius: '16px',
        border: `1px solid ${color}20`,
        fontSize: '0.8rem',
      }}
      whileHover={{ scale: 1.03, background: `${color}20` }}
    >
      <Icon size={12} color={color} />
      <span style={{ color: '#666' }}>{label}:</span>
      <span style={{ color, fontWeight: '500' }}>{value}</span>
    </motion.div>
  );
}

function SparkleEffect({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ scale: 1.01 }}
    >
      {children}
    </motion.div>
  );
}

function Card({ title, value, icon: Icon, index, previousValue, trend = 'up' }) {
  const numericValue = parseFloat(value) || 0;
  const previousNumeric = parseFloat(previousValue) || 0;
  const isMoney = title.includes('Revenue') || title.includes('Sales');
  const theme = cardThemes[index % cardThemes.length];
  
  const percentChange = previousNumeric !== 0 
    ? ((numericValue - previousNumeric) / previousNumeric * 100).toFixed(1)
    : 0;
  
  const isPositiveTrend = percentChange >= 0;
  const DecorIcon = [Star, Heart, Eye, Zap][index % 4];
  
  // Dynamic achievements based on values
  const getAchievement = () => {
    if (numericValue > 10000) return { icon: Award, text: 'Excellent!', color: '#FFD700' };
    if (numericValue > 5000) return { icon: Target, text: 'Great!', color: '#4CAF50' };
    if (numericValue > 1000) return { icon: TrendingUp, text: 'Good', color: '#2196F3' };
    return null;
  };
  
  const achievement = getAchievement();

  return (
    <motion.div 
      className="stat-card"
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400 }
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.primary}20`,
        borderRadius: '20px',
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 10px 25px -10px ${theme.primary}60`,
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.darkGradient,
          zIndex: 0,
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: theme.accent,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header with icon and title */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div 
              style={{ 
                width: '48px', 
                height: '48px', 
                background: theme.gradient,
                borderRadius: '14px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: `0 8px 16px -4px ${theme.primary}`,
              }}
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <Icon size={22} color="white" />
            </motion.div>
            
            <div>
              <motion.div 
                className="stat-title"
                style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600',
                  color: theme.primary,
                  marginBottom: '2px'
                }}
              >
                {title}
              </motion.div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DecorIcon size={12} color={theme.primary} />
                <span style={{ fontSize: '0.75rem', color: '#999' }}>
                  30d
                </span>
              </div>
            </div>
          </div>
          
          {/* Achievement badge */}
          {achievement && (
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '3px 8px',
                background: `${achievement.color}15`,
                borderRadius: '16px',
                border: `1px solid ${achievement.color}30`,
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <achievement.icon size={10} color={achievement.color} />
              <span style={{ fontSize: '0.7rem', color: achievement.color, fontWeight: '500' }}>
                {achievement.text}
              </span>
            </motion.div>
          )}
        </div>

        {/* Main value */}
        <div style={{ marginBottom: '12px' }}>
          <motion.div 
            style={{ 
              fontSize: '2.2rem', 
              fontWeight: '700',
              background: theme.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              lineHeight: 1.1,
            }}
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isMoney ? (
              <AnimatedCounter end={numericValue} prefix="$" />
            ) : (
              <AnimatedCounter end={numericValue} />
            )}
          </motion.div>
        </div>

        {/* Metrics row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          {/* Change indicator */}
          <motion.div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              padding: '4px 10px',
              background: isPositiveTrend ? '#4CAF5010' : '#F4433610',
              borderRadius: '20px',
              border: `1px solid ${isPositiveTrend ? '#4CAF5030' : '#F4433630'}`,
            }}
            animate={{ 
              x: [0, isPositiveTrend ? 2 : -2, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isPositiveTrend ? 
              <ArrowUpRight size={14} color="#4CAF50" /> : 
              <ArrowDownRight size={14} color="#F44336" />
            }
            <span style={{ 
              color: isPositiveTrend ? '#4CAF50' : '#F44336',
              fontWeight: '500',
              fontSize: '0.85rem'
            }}>
              {Math.abs(percentChange)}%
            </span>
          </motion.div>

          {/* Quick actions */}
          <motion.button
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.primary,
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            whileHover={{ 
              rotate: 180,
              background: `${theme.primary}10`
            }}
            transition={{ duration: 0.5 }}
          >
            <RefreshCw size={14} />
          </motion.button>
        </div>

        {/* Progress bar */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `${theme.primary}15`,
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: theme.gradient,
              borderRadius: '0 3px 3px 0',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(100, (numericValue / 10000) * 100)}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function DashboardCards() {
  const [metrics, setMetrics] = useState({
    total_revenue: '0.00',
    active_listings: 0,
    unread_messages: 0,
    pending_orders: 0,
  });
  const [previousMetrics, setPreviousMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [timeRange, setTimeRange] = useState('30d');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await apiService.getSellerMetrics();
        if (mounted && data) {
          setPreviousMetrics(metrics);
          setMetrics(data);
          setLastUpdate(new Date());
        }
      } catch (e) {
        console.error('Failed to load dashboard metrics', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    load();
    const interval = setInterval(load, 30000);
    
    const welcomeTimer = setTimeout(() => setShowWelcome(false), 5000);
    
    return () => { 
      mounted = false; 
      clearInterval(interval);
      clearTimeout(welcomeTimer);
    };
  }, []);

  // Loading skeleton with animation
  if (loading) {
    return (
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i} 
              style={{
                height: '160px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                borderRadius: '20px',
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    { 
      title: 'Total Revenue', 
      value: parseFloat(metrics.total_revenue || 0),
      previousValue: parseFloat(previousMetrics.total_revenue || 0),
      icon: DollarSign,
    },
    { 
      title: 'Active Products', 
      value: metrics.active_listings || 0,
      previousValue: previousMetrics.active_listings || 0,
      icon: Package,
    },
    { 
      title: 'New Messages', 
      value: metrics.unread_messages || 0,
      previousValue: previousMetrics.unread_messages || 0,
      icon: Mail,
    },
    { 
      title: 'Orders Pending', 
      value: metrics.pending_orders || 0,
      previousValue: previousMetrics.pending_orders || 0,
      icon: ShoppingCart,
    }
  ];

  return (
    <div style={{ 
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 30px',
      minHeight: 'auto',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    }}>
      {/* Background glowing orbs */}
      <GlowingOrb color="#FF6B6B" delay={0} />
      <GlowingOrb color="#4ECDC4" delay={2} />
      <GlowingOrb color="#834d9b" delay={4} />

      {/* Animated background grid */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(#8B5A2B08 1px, transparent 1px),
            linear-gradient(90deg, #8B5A2B08 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Welcome banner */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #8B5A2B, #C49A6C)',
                borderRadius: '30px',
                padding: '40px',
                marginBottom: '50px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(139,69,19,0.3)',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-10%',
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <Sparkles size={28} />
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
                    Welcome back! 👋
                  </h2>
                </div>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px' }}>
                  Here's what's happening with your store today
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with controls */}
        <motion.div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px',
            padding: '0 5px',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1 
              style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #8B5A2B, #C49A6C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px',
              }}
              animate={{ 
                textShadow: ['0 0 20px #C49A6C80', '0 0 40px #C49A6C40', '0 0 20px #C49A6C80']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Dashboard Overview
            </motion.h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <MetricBadge 
                icon={Clock} 
                label="Last update" 
                value={lastUpdate.toLocaleTimeString()} 
                color="#8B5A2B"
              />
              <MetricBadge 
                icon={Calendar} 
                label="Period" 
                value={timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : '90 days'} 
                color="#4ECDC4"
              />
            </div>
          </div>

          {/* Time range selector */}
          <div style={{ display: 'flex', gap: '8px', background: '#f5f5f5', padding: '4px', borderRadius: '30px' }}>
            {['7d', '30d', '90d'].map((range) => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: timeRange === range ? 'white' : 'transparent',
                  color: timeRange === range ? '#8B5A2B' : '#666',
                  fontWeight: timeRange === range ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: timeRange === range ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {range}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '25px',
            marginBottom: '50px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {cards.map((card, index) => (
            <SparkleEffect key={card.title} delay={index * 0.15}>
              <Card {...card} index={index} />
            </SparkleEffect>
          ))}
        </motion.div>

        {/* Quick insights section */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
            marginBottom: '40px',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Performance insights */}
          <motion.div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(139, 90, 43, 0.15)',
              boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
            }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(139,69,19,0.15)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <BarChart3 size={20} color="white" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2D2D2D' }}>
                Performance Insights
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { label: 'Conversion Rate', value: '4.8%', trend: '+0.5%', icon: TrendingUp },
                { label: 'Avg. Order Value', value: '$124.50', trend: '+$12.30', icon: DollarSign },
                { label: 'Customer Satisfaction', value: '4.8/5', trend: '+0.2', icon: Star },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                  }}
                  whileHover={{ x: 5, background: '#f0f0f0' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={16} color="#8B5A2B" />
                    <span style={{ color: '#666', fontSize: '0.95rem' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '600', color: '#2D2D2D' }}>{item.value}</span>
                    <span style={{ color: '#4CAF50', fontSize: '0.85rem' }}>{item.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(139, 90, 43, 0.15)',
              boxShadow: '0 10px 30px rgba(139,69,19,0.1)',
            }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(139,69,19,0.15)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Activity size={20} color="white" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2D2D2D' }}>
                Recent Activity
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { time: '5 min ago', action: 'New order received', icon: ShoppingCart },
                { time: '15 min ago', action: 'Message from customer', icon: MessageCircle },
                { time: '1 hour ago', action: 'Product viewed 50 times', icon: Eye },
                { time: '2 hours ago', action: 'Order #1234 completed', icon: CheckCircle },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '10px',
                  }}
                  whileHover={{ background: '#f5f5f5' }}
                >
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: '#f0f0f0',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <item.icon size={16} color="#8B5A2B" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', color: '#2D2D2D' }}>{item.action}</div>
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>{item.time}</div>
                  </div>
                  <motion.div
                    style={{
                      width: '8px',
                      height: '8px',
                      background: '#4CAF50',
                      borderRadius: '50%',
                    }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px',
            padding: '20px 0',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: 'Total Sales', value: '1,234', change: '+12%' },
            { label: 'New Customers', value: '89', change: '+23%' },
            { label: 'Avg. Rating', value: '4.8', change: '+0.3' },
            { label: 'Repeat Rate', value: '67%', change: '+5%' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(139,69,19,0.05)',
              }}
              whileHover={{ y: -3 }}
            >
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>{stat.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#8B5A2B' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#4CAF50' }}>{stat.change}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}