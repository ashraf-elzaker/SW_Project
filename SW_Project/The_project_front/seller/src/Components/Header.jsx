import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, List, Package, Mail, Settings, PlusCircle, 
  LogOut, Bell, User, ChevronDown, Menu, X, 
  Sparkles, Search, ShoppingBag, TrendingUp, Star,
  Moon, Sun, Award, Shield, HelpCircle, Zap,
  BarChart3, Clock, DollarSign, Heart, Globe,
  Rocket, Gem, Crown, Flame, Diamond, Orbit
} from 'lucide-react';
import { useAuth } from '../../../src/useAuth';

const navItems = [
  { to: '/seller', icon: Grid, label: 'Dashboard', badge: null, color: '#FF6B6B' },
  { to: '/seller/listings', icon: List, label: 'My Listings', badge: 12, color: '#4ECDC4' },
  { to: '/seller/orders', icon: Package, label: 'Orders', badge: 5, color: '#834d9b' },
  { to: '/seller/messages', icon: Mail, label: 'Messages', badge: 3, color: '#2193b0' },
  { to: '/seller/analytics', icon: BarChart3, label: 'Analytics', badge: null, color: '#FFE66D' },
  { to: '/seller/settings', icon: Settings, label: 'Settings', badge: null, color: '#134e5e' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [theme, setTheme] = useState('light');
  const [searchFocused, setSearchFocused] = useState(false);
  const [timeGreeting, setTimeGreeting] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting('Good Morning');
    else if (hour < 18) setTimeGreeting('Good Afternoon');
    else setTimeGreeting('Good Evening');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const quickStats = [
    { icon: ShoppingBag, value: '156', label: 'Sales', color: '#FF6B6B', change: '+12%' },
    { icon: Star, value: '4.8', label: 'Rating', color: '#4ECDC4', change: '+0.3' },
    { icon: DollarSign, value: '$12.4k', label: 'Revenue', color: '#FFD700', change: '+23%' },
  ];

  // حساب تأثير الماوس على الخلفية
  const backgroundX = (mousePosition.x / window.innerWidth) * 20 - 10;
  const backgroundY = (mousePosition.y / window.innerHeight) * 20 - 10;

  return (
    <>
      {/* خلفية كونية متحركة */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        pointerEvents: 'none', 
        zIndex: 0,
        overflow: 'hidden',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,107,107,0.05) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(78,205,196,0.05) 0%, transparent 50%)',
      }}>
        {/* نجوم متحركة */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${navItems[i % navItems.length].color}, #C49A6C)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* سديم متحرك */}
        <motion.div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)',
            left: '20%',
            top: '30%',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)',
            right: '20%',
            bottom: '30%',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 20px',
          perspective: '1000px',
        }}
      >
        <motion.div
          animate={{
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
            background: isScrolled 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,248,235,0.98))' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,248,235,0.9))',
            boxShadow: isScrolled 
              ? '0 20px 50px -15px rgba(139, 90, 43, 0.4), 0 0 0 1px rgba(196, 154, 108, 0.1)' 
              : '0 15px 40px -15px rgba(139, 90, 43, 0.2), 0 0 0 1px rgba(196, 154, 108, 0.05)',
            borderRadius: isScrolled ? '0 0 30px 30px' : '30px 30px 30px 30px',
            marginTop: isScrolled ? '0' : '15px',
            rotateX: isScrolled ? 0 : 2,
            y: isScrolled ? 0 : -5,
          }}
          style={{
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(196, 154, 108, 0.2)',
            position: 'relative',
            transition: 'all 0.3s ease',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* تأثيرات إضاءة متحركة */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              zIndex: 0,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-50%',
              right: '-10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(78,205,196,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              zIndex: 0,
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* شريط ليزري متحرك */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #FF6B6B, #4ECDC4, #FFD700, #FF6B6B, transparent)',
              borderRadius: '2px',
              filter: 'blur(1px)',
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* القسم الأيسر - شعار كريستالي */}
          <motion.div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 20,
              cursor: 'pointer',
              position: 'relative',
              zIndex: 2,
            }}
            onClick={() => navigate('/seller')}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8B5A2B, #C49A6C, #FF6B6B, #4ECDC4)',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 15px 30px -8px #8B5A2B, 0 0 0 2px rgba(255,255,255,0.5) inset',
                backgroundSize: '300% 300%',
                position: 'relative',
                overflow: 'hidden',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                backgroundPosition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {/* جزيئات متلألئة داخل الشعار */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'white',
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
              <Crown size={28} color="white" />
            </motion.div>
            
            <div>
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <motion.h2 
                  style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #8B5A2B, #C49A6C, #FF6B6B, #4ECDC4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0,
                    backgroundSize: '300% 300%',
                    letterSpacing: '-0.5px',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Seller Hub
                </motion.h2>
                <motion.div
                  style={{
                    padding: '4px 12px',
                    background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    color: 'white',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    boxShadow: '0 5px 15px #FF6B6B80',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Gem size={12} />
                  PREMIUM
                </motion.div>
              </motion.div>
              
              <motion.p 
                style={{ 
                  fontSize: '0.85rem', 
                  color: '#8B5A2B', 
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  opacity: 0.9,
                }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Rocket size={14} color="#FF6B6B" />
                {timeGreeting}, <span style={{ fontWeight: 700 }}>{user?.username?.split(' ')[0] || 'Seller'}</span>! 
                <Flame size={14} color="#FFD700" />
              </motion.p>
            </div>
          </motion.div>

          {/* القائمة الرئيسية - تصميم مستقبلي */}
          <motion.nav 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              background: 'rgba(255, 255, 255, 0.5)',
              padding: '8px',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(139, 90, 43, 0.15)',
              position: 'relative',
              zIndex: 2,
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.5) inset',
            }}
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              const isHovered = hoveredItem === item.to;
              
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={{ textDecoration: 'none' }}
                >
                  <motion.div
                    onHoverStart={() => setHoveredItem(item.to)}
                    onHoverEnd={() => setHoveredItem(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 20px',
                      borderRadius: '40px',
                      background: isActive 
                        ? `linear-gradient(135deg, ${item.color}, ${item.color}CC)` 
                        : 'transparent',
                      color: isActive ? 'white' : '#555',
                      position: 'relative',
                      cursor: 'pointer',
                      border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                      overflow: 'hidden',
                    }}
                    whileHover={{ 
                      y: -3,
                      background: isActive 
                        ? `linear-gradient(135deg, ${item.color}, ${item.color}CC)` 
                        : 'rgba(139, 90, 43, 0.1)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* تأثير توهج عند التحويم */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="navGlow"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `radial-gradient(circle at 50% 50%, ${item.color}20, transparent)`,
                          zIndex: -1,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    
                    <Icon size={18} />
                    <span style={{ fontWeight: isActive ? '600' : '500', fontSize: '0.9rem' }}>
                      {item.label}
                    </span>
                    
                    {item.badge && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                          color: 'white',
                          fontSize: '0.6rem',
                          fontWeight: '600',
                          padding: '2px 6px',
                          borderRadius: '12px',
                          minWidth: '18px',
                          textAlign: 'center',
                          border: '2px solid white',
                          boxShadow: '0 5px 10px #FF6B6B80',
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        {item.badge}
                      </motion.div>
                    )}
                  </motion.div>
                </NavLink>
              );
            })}
          </motion.nav>

          {/* القسم الأيمن - إجراءات متطورة */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 15,
            position: 'relative',
            zIndex: 2,
          }}>
            {/* إحصائيات سريعة بتصميم كروي */}
            <div style={{ display: 'flex', gap: 8 }}>
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 14px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '40px',
                    border: '1px solid rgba(139, 90, 43, 0.15)',
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.02)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{ 
                    y: -4,
                    scale: 1.05,
                    background: 'white',
                    boxShadow: `0 15px 30px ${stat.color}30`,
                  }}
                >
                  {/* دائرة توهج خلفية */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: stat.color,
                      filter: 'blur(15px)',
                      opacity: 0.2,
                      left: '10%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  
                  <stat.icon size={16} color={stat.color} />
                  <div>
                    <span style={{ fontWeight: '800', fontSize: '1rem', color: stat.color }}>
                      {stat.value}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#4CAF50', marginLeft: 4, fontWeight: '600' }}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* بحث متطور */}
            <motion.div
              animate={{ width: searchFocused ? 300 : 200 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ position: 'relative' }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  color: searchFocused ? '#8B5A2B' : '#999',
                }}
                animate={{
                  rotate: searchFocused ? 360 : 0,
                  scale: searchFocused ? 1.1 : 1,
                }}
              >
                <Orbit size={16} />
              </motion.div>
              
              <input
                type="text"
                placeholder="Search the universe..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 45px',
                  borderRadius: '50px',
                  border: '2px solid',
                  borderColor: searchFocused ? '#8B5A2B' : 'rgba(139, 90, 43, 0.15)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: searchFocused ? '0 10px 30px rgba(139,69,19,0.2)' : 'none',
                }}
              />
              
              <motion.div
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.7rem',
                  color: '#999',
                  background: 'rgba(0,0,0,0.03)',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                animate={{
                  opacity: searchFocused ? 0 : 1,
                }}
              >
                <Zap size={12} />
                ⌘K
              </motion.div>
            </motion.div>

            {/* أيقونات تفاعلية */}
            <div style={{ display: 'flex', gap: 8 }}>
              {/* إشعارات */}
              <motion.div
                style={{ position: 'relative', cursor: 'pointer' }}
                whileHover={{ scale: 1.1, y: -3, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '22.5px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,248,235,0.9))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(139, 90, 43, 0.15)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.02)',
                  backdropFilter: 'blur(5px)',
                }}>
                  <Bell size={22} color="#8B5A2B" />
                </div>
                
                {notifications > 0 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      minWidth: '22px',
                      textAlign: 'center',
                      border: '2px solid white',
                    }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {notifications}
                  </motion.div>
                )}
              </motion.div>

              {/* ثيم */}
              <motion.div
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.1, rotate: 180, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '22.5px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,248,235,0.9))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(139, 90, 43, 0.15)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.02)',
                  backdropFilter: 'blur(5px)',
                }}>
                  {theme === 'light' ? <Moon size={22} color="#8B5A2B" /> : <Sun size={22} color="#8B5A2B" />}
                </div>
              </motion.div>
            </div>

            {/* زر إضافة منتج - متطور */}
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                to="/seller/create-listing"
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #8B5A2B, #C49A6C, #FF6B6B, #4ECDC4)',
                    borderRadius: '50px',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1rem',
                    boxShadow: '0 15px 30px -8px #8B5A2B, 0 0 0 1px rgba(255,255,255,0.3) inset',
                    backgroundSize: '300% 300%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  animate={{
                    boxShadow: [
                      '0 15px 30px -8px #8B5A2B',
                      '0 20px 40px -8px #FF6B6B',
                      '0 15px 30px -8px #8B5A2B'
                    ],
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                    },
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  {/* جزيئات متحركة داخل الزر */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'white',
                        left: `${10 + i * 30}%`,
                        top: '20%',
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                  
                  <PlusCircle size={22} />
                  <span>Create Listing</span>
                  <Diamond size={16} />
                </motion.div>
              </NavLink>
            </motion.div>

            {/* قائمة المستخدم - متطورة */}
            {user && (
              <motion.div
                style={{ position: 'relative' }}
                onHoverStart={() => setShowUserMenu(true)}
                onHoverEnd={() => setShowUserMenu(false)}
              >
                <motion.div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 12px 6px 6px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,248,235,0.9))',
                    borderRadius: '50px',
                    border: '1px solid rgba(139, 90, 43, 0.15)',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.02)',
                    backdropFilter: 'blur(5px)',
                  }}
                  whileHover={{ 
                    background: 'white',
                    boxShadow: '0 15px 30px rgba(139,69,19,0.15)',
                    y: -3,
                  }}
                >
                  <motion.div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #8B5A2B, #C49A6C, #FF6B6B)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      backgroundSize: '200% 200%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {user.username ? user.username[0].toUpperCase() : 'U'}
                    
                    {/* نقطة حالة متصلة */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#4CAF50',
                        border: '2px solid white',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  
                  <div>
                    <div style={{ 
                      fontWeight: '700', 
                      fontSize: '0.9rem', 
                      color: '#2D2D2D',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      {user.username || 'Seller'}
                      <Shield size={12} color="#4CAF50" />
                    </div>
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: '#8B5A2B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}>
                      <Crown size={10} color="#FFD700" />
                      Elite Seller
                    </div>
                  </div>
                  <ChevronDown size={14} color="#666" />
                </motion.div>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: 15,
                        width: 280,
                        background: 'rgba(255,255,255,0.98)',
                        borderRadius: '24px',
                        padding: '10px',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(139,90,43,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                      }}
                    >
                      {/* رأس القائمة */}
                      <div style={{
                        padding: '15px',
                        background: 'linear-gradient(135deg, #8B5A2B10, #C49A6C20)',
                        borderRadius: '16px',
                        marginBottom: '10px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '15px',
                            background: 'linear-gradient(135deg, #8B5A2B, #C49A6C)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                          }}>
                            {user.username ? user.username[0].toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#2D2D2D' }}>
                              {user.username || 'Seller Name'}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>
                              {user.email || 'seller@example.com'}
                            </div>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 4, 
                              marginTop: 4,
                              fontSize: '0.7rem',
                              color: '#4CAF50',
                              background: '#4CAF5020',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              width: 'fit-content',
                            }}>
                              <Shield size={10} />
                              Verified Account
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* عناصر القائمة */}
                      {[
                        { icon: User, label: 'Profile', to: '/seller/profile', badge: null },
                        { icon: Shield, label: 'Verification', to: '/seller/verification', badge: 'Verified' },
                        { icon: Award, label: 'Achievements', to: '/seller/achievements', badge: '3 New' },
                        { icon: Gem, label: 'Subscription', to: '/seller/subscription', badge: 'Premium' },
                        { icon: Globe, label: 'Store Settings', to: '/seller/store', badge: null },
                        { icon: HelpCircle, label: 'Support', to: '/seller/help', badge: null },
                        { icon: LogOut, label: 'Logout', onClick: handleLogout, badge: null },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 15px',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            marginBottom: '2px',
                          }}
                          whileHover={{ 
                            background: 'linear-gradient(135deg, #8B5A2B10, #C49A6C20)',
                            x: 3,
                          }}
                          onClick={() => {
                            if (item.onClick) item.onClick();
                            else if (item.to) navigate(item.to);
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <item.icon size={16} color="#8B5A2B" />
                            <span style={{ fontSize: '0.9rem', color: '#2D2D2D' }}>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span style={{
                              fontSize: '0.7rem',
                              background: item.badge === 'Verified' ? '#4CAF5020' : 
                                         item.badge === '3 New' ? '#FF6B6B20' : '#FFD70020',
                              color: item.badge === 'Verified' ? '#4CAF50' : 
                                     item.badge === '3 New' ? '#FF6B6B' : '#FFD700',
                              padding: '3px 10px',
                              borderRadius: '20px',
                              fontWeight: '600',
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.header>

      {/* زر القائمة للجوال - متطور */}
      <motion.button
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          width: '65px',
          height: '65px',
          borderRadius: '32.5px',
          background: 'linear-gradient(135deg, #8B5A2B, #C49A6C, #FF6B6B, #4ECDC4)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 20px 40px #8B5A2B80, 0 0 0 2px rgba(255,255,255,0.3) inset',
          display: 'none',
          zIndex: 1001,
          backgroundSize: '300% 300%',
        }}
        animate={{
          boxShadow: [
            '0 20px 40px #8B5A2B80',
            '0 25px 50px #FF6B6B80',
            '0 20px 40px #8B5A2B80'
          ],
          backgroundPosition: ['0% 0%', '100% 100%'],
          rotate: [0, 360],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
          },
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          },
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      {/* قائمة جوال */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '350px',
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 1000,
              padding: '25px',
              boxShadow: '-20px 0 50px rgba(0,0,0,0.2)',
              borderLeft: '1px solid rgba(139,90,43,0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '22.5px',
                  border: '1px solid rgba(139,90,43,0.15)',
                  background: 'white',
                  cursor: 'pointer',
                }}
              >
                <X size={20} color="#8B5A2B" />
              </motion.button>
            </div>
            
            <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', color: '#8B5A2B' }}>
              Menu
            </div>
            
            {/* محتوى القائمة للجوال */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}