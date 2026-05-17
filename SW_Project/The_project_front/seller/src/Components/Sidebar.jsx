import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { 
  Grid, List, Package, Mail, BarChart3, Settings, 
  ShoppingBag, DollarSign, Users
} from 'lucide-react';

const navItems = [
  { to: '/seller', icon: Grid, label: 'Dashboard', color: '#FF6B6B' },
  { to: '/seller/listings', icon: List, label: 'Listings', badge: 12, color: '#4ECDC4' },
  { to: '/seller/orders', icon: Package, label: 'Orders', badge: 5, color: '#834d9b' },
  { to: '/seller/messages', icon: Mail, label: 'Messages', badge: 3, color: '#2193b0' },
  { to: '/seller/analytics', icon: BarChart3, label: 'Analytics', color: '#FFE66D' },
  { to: '/seller/settings', icon: Settings, label: 'Settings', color: '#134e5e' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{
        width: 250,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,248,235,0.9))',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(139,90,43,0.15)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 900,
        padding: '80px 0 20px 0', // Space for header
        boxShadow: '5px 0 25px rgba(139,90,43,0.1)',
        overflowY: 'auto',
      }}
    >
      {/* Quick Stats */}
      <div style={{ padding: '0 20px 30px' }}>
        <div style={{ fontSize: '0.85rem', color: '#8B5A2B', fontWeight: 600, marginBottom: '15px' }}>
          Quick Stats
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: ShoppingBag, value: '156', label: 'Sales', color: '#FF6B6B' },
            { icon: DollarSign, value: '$12.4k', label: 'Revenue', color: '#4ECDC4' },
            { icon: Users, value: '24', label: 'Customers', color: '#834d9b' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 15px',
                background: stat.color + '15',
                borderRadius: '12px',
                border: `1px solid ${stat.color}30`,
              }}
              whileHover={{ background: stat.color + '25', x: 5 }}
            >
              <stat.icon size={16} color={stat.color} />
              <div>
                <div style={{ fontWeight: 700, color: stat.color, fontSize: '0.9rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#666' }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '0 15px' }}>
        <div style={{ fontSize: '0.85rem', color: '#8B5A2B', fontWeight: 600, marginBottom: '20px', paddingLeft: '5px' }}>
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={{ textDecoration: 'none', display: 'block', marginBottom: '8px' }}
            >
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: isActive ? item.color + '20' : 'transparent',
                  color: isActive ? item.color : '#555',
                  border: isActive ? `1px solid ${item.color}40` : '1px solid transparent',
                  position: 'relative',
                }}
                whileHover={{ 
                  background: item.color + '15',
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: item.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  whileHover={{ background: item.color + '30' }}
                >
                  <Icon size={18} color={item.color} />
                </motion.div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: isActive ? 600 : 500, fontSize: '0.95rem' }}>
                    {item.label}
                  </div>
                </div>
                
                {item.badge && (
                  <motion.div
                    style={{
                      background: '#FF6B6B',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      minWidth: 24,
                      textAlign: 'center',
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {item.badge}
                  </motion.div>
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
}