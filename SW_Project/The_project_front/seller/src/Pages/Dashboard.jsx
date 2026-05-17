import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, Package, Users, DollarSign, AlertCircle,
  Clock, Calendar, ArrowUpRight, Activity, Zap, 
  ChevronRight, ArrowRight, FileText, AlertTriangle,
  Target, Award, Clock3, Bell, Search, 
  RefreshCw, Plus, Edit, User, Tag, ShoppingBag,
  BarChart3, Star, Gift, Percent, CreditCard,
  ShoppingCart, Store, MapPin, PhoneCall, Mail, 
  Download, Filter, EyeOff, TrendingDown, Wallet, Receipt,
  Sparkles, Rocket, Crown, Flame, Gem, Zap as ZapIcon,
  CircleDollarSign, TrendingUp as TrendUp, Users2,
  Boxes, BadgeDollarSign, ShoppingBasket, HeartHandshake,
  Gift as GiftIcon, PartyPopper, Smile, ThumbsUp
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
  BarChart, Bar, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Legend
} from 'recharts';

// Enhanced color palette with more vibrant colors
const colors = {
  primary: {
    50: '#FDF6E3',
    100: '#F5F5DC', 
    200: '#DEB887',
    300: '#D2B48C',
    400: '#A0522D',
    500: '#D2691E',
    600: '#8B4513',
    700: '#654321',
    800: '#5D4037',
    900: '#4A2C20',
  },
  success: {
    50: '#F5F6F5',
    100: '#EDE4D9',
    200: '#D7CDB8',
    300: '#C4B5A1',
    400: '#A68A64',
    500: '#8B7355',
    600: '#6F5C46',
    700: '#5A4D3D',
    800: '#4A3E32',
    900: '#3B3228',
  },
  warning: {
    50: '#FDFAF5',
    100: '#FAF2E8',
    200: '#F0E6D4',
    300: '#E0D4C5',
    400: '#CBB9A1',
    500: '#B89D7C',
    600: '#947D62',
    700: '#7A644F',
    800: '#66543F',
    900: '#4E4132',
  },
  danger: {
    50: '#FDF4F2',
    100: '#FADBD4',
    200: '#E6B8B0',
    300: '#D6958F',
    400: '#B8726B',
    500: '#A0524D',
    600: '#7F3F3B',
    700: '#663333',
    800: '#502B29',
    900: '#3D2321',
  },
  beige: {
    50: '#FEFEFD',
    100: '#F9F7F2',
    200: '#F0EDE4',
    300: '#E3DDD1',
    400: '#C6BDB0',
    500: '#A89F8F',
    600: '#85716D',
    700: '#69594D',
    800: '#52473E',
    900: '#423832',
  },
  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },
  pink: {
    50: '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899',
    600: '#DB2777',
    700: '#BE185D',
    800: '#9D174D',
    900: '#831843',
  },
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  orange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  gold: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  }
};

// Product categories with enhanced styling
const productCategories = [
  { id: 'electronics', name: 'Electronics', color: colors.primary[500], bg: colors.primary[100], icon: '📱', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'fashion', name: 'Fashion', color: colors.pink[500], bg: colors.pink[100], icon: '👕', gradient: 'from-pink-500 to-rose-500' },
  { id: 'home', name: 'Home & Living', color: colors.warning[500], bg: colors.warning[100], icon: '🏠', gradient: 'from-amber-500 to-orange-500' },
  { id: 'beauty', name: 'Beauty', color: colors.purple[500], bg: colors.purple[100], icon: '💄', gradient: 'from-purple-500 to-pink-500' },
  { id: 'sports', name: 'Sports', color: colors.success[500], bg: colors.success[100], icon: '⚽', gradient: 'from-green-500 to-emerald-500' },
  { id: 'books', name: 'Books', color: colors.indigo[500], bg: colors.indigo[100], icon: '📚', gradient: 'from-indigo-500 to-purple-500' },
];

// Enhanced CSS styles as a string - ULTRA CREATIVE & INTERACTIVE
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .dashboard-container {
    position: relative;
    min-height: 100vh;
    width: 100%;
    max-width: none;
    font-size: 17px;
    background: linear-gradient(135deg, #f8f5ec 0%, #f0e9db 50%, #e8dfcd 100%);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .dashboard-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0 L100 100 M100 0 L0 100" stroke="rgba(139,69,19,0.05)" stroke-width="1"/></svg>');
    background-size: 30px 30px;
    pointer-events: none;
  }

  /* Animated background shapes */
  .floating-shape {
    position: absolute;
    background: rgba(210, 180, 140, 0.1);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -150px;
    background: radial-gradient(circle, rgba(210,180,140,0.2) 0%, rgba(210,180,140,0) 70%);
    animation: float 20s infinite;
  }

  .shape-2 {
    width: 400px;
    height: 400px;
    bottom: -200px;
    left: -200px;
    background: radial-gradient(circle, rgba(210,180,140,0.15) 0%, rgba(210,180,140,0) 70%);
    animation: float 25s infinite reverse;
  }

  .shape-3 {
    width: 200px;
    height: 200px;
    top: 50%;
    left: 30%;
    background: radial-gradient(circle, rgba(210,180,140,0.1) 0%, rgba(210,180,140,0) 70%);
    animation: float 15s infinite 2s;
  }

  /* New creative shapes */
  .shape-4 {
    width: 150px;
    height: 150px;
    top: 20%;
    right: 10%;
    background: radial-gradient(circle, ${colors.gold[300]}20 0%, transparent 70%);
    animation: float 18s infinite 1s;
  }

  .shape-5 {
    width: 250px;
    height: 250px;
    bottom: 30%;
    right: 20%;
    background: radial-gradient(circle, ${colors.purple[300]}15 0%, transparent 70%);
    animation: float 22s infinite 0.5s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -50px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    padding: 1rem 1.5rem;
    width: 100%;
    margin: 0;
  }

  /* Glassmorphism Effects with creative hover */
  .glass-card {
    background: rgba(245, 245, 220, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(210, 180, 140, 0.4);
    border-radius: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .glass-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .glass-card:hover::after {
    left: 100%;
  }

  .glass-card:hover {
    background: rgba(245, 245, 220, 0.6);
    border-color: rgba(210, 180, 140, 0.8);
    box-shadow: 0 20px 40px rgba(139,69,19,0.25);
    transform: translateY(-2px);
  }

  .glass-card-light {
    background: rgba(253, 246, 227, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(210, 180, 140, 0.3);
    transition: all 0.3s ease;
  }

  .glass-card-light:hover {
    background: rgba(253, 246, 227, 1);
    border-color: rgba(210, 180, 140, 0.6);
    box-shadow: 0 10px 30px rgba(139,69,19,0.15);
  }

  /* Stat Card Styles - ULTRA CREATIVE */
  .stat-card {
    background: linear-gradient(135deg, rgba(253,246,227,0.95) 0%, rgba(245,245,220,0.98) 100%);
    border-radius: 1.5rem;
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(210,180,140,0.4);
    box-shadow: 0 10px 30px rgba(139,69,19,0.15);
    height: 100%;
    cursor: pointer;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255,255,255,0.1) 50%,
      transparent 100%
    );
    transform: rotate(45deg);
    animation: shimmer 6s infinite;
  }

  .stat-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${colors.primary[500]}, ${colors.gold[500]}, ${colors.primary[500]}, transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .stat-card:hover::after {
    transform: scaleX(1);
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }

  .stat-card:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 40px 60px rgba(139,69,19,0.35);
    border-color: ${colors.primary[500]};
  }

  .stat-card:active {
    transform: translateY(-5px) scale(0.99);
  }

  .stat-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .stat-card:hover .stat-icon {
    transform: scale(1.15) rotate(8deg);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .stat-icon::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
    border-radius: inherit;
  }

  /* Quick Action Button - CREATIVE */
  .quick-action-btn {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(210,180,140,0.3);
    border-radius: 1.25rem;
    padding: 1.25rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    height: 100%;
  }

  .quick-action-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(210,180,140,0.2) 0%, rgba(210,180,140,0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .quick-action-btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(210,180,140,0.2);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  .quick-action-btn:hover::after {
    width: 200px;
    height: 200px;
  }

  .quick-action-btn:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 25px 45px rgba(139,69,19,0.25);
    border-color: ${colors.primary[500]};
  }

  .quick-action-btn:hover::before {
    opacity: 1;
  }

  .quick-action-btn:active {
    transform: translateY(-3px) scale(0.98);
  }

  .quick-action-btn .stat-icon {
    transition: all 0.3s ease;
  }

  .quick-action-btn:hover .stat-icon {
    transform: scale(1.2) rotate(-8deg);
  }

  /* Progress Bar - CREATIVE */
  .progress-bar {
    height: 0.4rem;
    background: rgba(210,180,140,0.2);
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #D2691E, #8B4513, #D2691E);
    border-radius: 1rem;
    position: relative;
    animation: progressPulse 2s infinite, gradientMove 3s linear infinite;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    background-size: 200% 100%;
  }

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .progress-bar:hover .progress-fill {
    background: linear-gradient(90deg, #E67E22, #9C5518, #E67E22);
    background-size: 200% 100%;
    filter: brightness(1.2);
    animation: gradientMove 2s linear infinite;
  }

  @keyframes progressPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.9; }
  }

  /* Chart Container - CREATIVE */
  .chart-container {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    padding: 1.5rem;
    border: 1px solid rgba(210,180,140,0.3);
    box-shadow: 0 15px 30px rgba(139,69,19,0.1);
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .chart-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${colors.primary[500]}, ${colors.purple[500]}, ${colors.primary[500]}, transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .chart-container:hover::before {
    transform: translateX(100%);
  }

  .chart-container:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 60px rgba(139,69,19,0.25);
    border-color: ${colors.primary[500]};
  }

  /* Pulse Animation - CREATIVE */
  .pulse {
    animation: creativePulse 2s infinite;
  }

  @keyframes creativePulse {
    0% { 
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(210,180,140,0.7);
    }
    50% { 
      transform: scale(1.15);
      box-shadow: 0 0 20px 5px rgba(210,180,140,0.3);
    }
    100% { 
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(210,180,140,0.7);
    }
  }

  /* Floating Animation - CREATIVE */
  .floating {
    animation: creativeFloat 3s infinite ease-in-out;
  }

  @keyframes creativeFloat {
    0%, 100% { 
      transform: translateY(0) rotate(0deg);
    }
    25% { 
      transform: translateY(-8px) rotate(-2deg);
    }
    50% { 
      transform: translateY(-5px) rotate(0deg);
    }
    75% { 
      transform: translateY(-8px) rotate(2deg);
    }
  }

  /* Particle Background */
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(139, 69, 19, 0.2);
    border-radius: 50%;
    animation: particleFloat 10s infinite linear;
  }

  @keyframes particleFloat {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }

  /* Responsive Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .bottom-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .customers-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
  }

  /* Full width header */
  .full-width-header {
    width: 100%;
    margin-bottom: 1rem;
  }

  /* Interactive badge styles - CREATIVE */
  .growth-badge {
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .growth-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.3s ease;
  }

  .growth-badge:hover {
    transform: scale(1.15) translateY(-2px);
    filter: brightness(1.1);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .growth-badge:hover::before {
    left: 100%;
  }

  /* Period selector button - CREATIVE */
  .period-btn {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .period-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  .period-btn:hover::before {
    width: 100px;
    height: 100px;
  }

  .period-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139,69,19,0.25);
  }

  /* Target card - CREATIVE */
  .target-card {
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .target-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .target-card:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(210,180,140,0.2) !important;
    box-shadow: 0 15px 35px rgba(139,69,19,0.2);
  }

  .target-card:hover::after {
    opacity: 1;
  }

  /* Icon spin animation */
  .spin-on-hover:hover {
    animation: creativeSpin 0.6s ease;
  }

  @keyframes creativeSpin {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg); }
  }

  /* Bounce animation - CREATIVE */
  .bounce {
    animation: creativeBounce 2s infinite;
  }

  @keyframes creativeBounce {
    0%, 100% { 
      transform: translateY(0) scale(1);
    }
    25% { 
      transform: translateY(-6px) scale(1.1);
    }
    50% { 
      transform: translateY(-3px) scale(1.05);
    }
    75% { 
      transform: translateY(-6px) scale(1.1);
    }
  }

  /* Glow effect */
  .glow-effect {
    position: relative;
  }

  .glow-effect::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${colors.primary[500]}, ${colors.gold[500]}, ${colors.purple[500]}, ${colors.primary[500]});
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    filter: blur(8px);
  }

  .glow-effect:hover::before {
    opacity: 0.5;
  }

  @media (max-width: 1400px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .quick-actions-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .main-grid {
      grid-template-columns: 1fr;
    }
    
    .bottom-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .customers-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .quick-actions-grid {
      grid-template-columns: 1fr;
    }
    
    .bottom-grid {
      grid-template-columns: 1fr;
    }
  }

  h1 { font-size: 1.9rem; }
  h2 { font-size: 1.65rem; }
  h3 { font-size: 1.2rem; }
  p { font-size: 0.95rem; }
`;

const SellerDashboard = ({ 
  onNavigate, 
  products = [], 
  customers = [], 
  orders = [], 
  transactions = [],
  addNotification 
}) => {
  const [loading, setLoading] = useState(true);
  const [activeQuickAction, setActiveQuickAction] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({});
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Generate sparkles effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
      };
      setSparkles(prev => [...prev.slice(-20), newSparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 1000);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Animate stats on hover
  const handleStatHover = (statName) => {
    setAnimatedStats(prev => ({ ...prev, [statName]: true }));
    setTimeout(() => {
      setAnimatedStats(prev => ({ ...prev, [statName]: false }));
    }, 300);
  };

  // Generate particles
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${10 + Math.random() * 20}s`,
      width: `${1 + Math.random() * 3}px`,
      height: `${1 + Math.random() * 3}px`,
    }));
  }, []);

  // Calculate real stats from props
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalProducts = products.length;
    const totalCustomers = customers.length;
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    
    const today = new Date().toDateString();
    const todaySales = orders
      .filter(order => new Date(order.date).toDateString() === today)
      .reduce((sum, order) => sum + (order.total || 0), 0);
    
    const lowStock = products.filter(p => p.stock < 10).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    
    const revenueGrowth = 23.5;
    const customerGrowth = 15.2;
    const orderGrowth = 18.7;
    
    return { 
      totalRevenue, 
      totalProducts, 
      totalCustomers, 
      pendingOrders,
      avgOrderValue,
      todaySales,
      lowStock,
      outOfStock,
      revenueGrowth,
      customerGrowth,
      orderGrowth
    };
  }, [products, customers, orders]);

  // Get orders data for chart
  const ordersChartData = useMemo(() => {
    if (!orders || orders.length === 0) {
      return [
        { day: 'Mon', orders: 12, revenue: 1250, profit: 375 },
        { day: 'Tue', orders: 15, revenue: 1680, profit: 504 },
        { day: 'Wed', orders: 18, revenue: 2100, profit: 630 },
        { day: 'Thu', orders: 14, revenue: 1580, profit: 474 },
        { day: 'Fri', orders: 22, revenue: 2850, profit: 855 },
        { day: 'Sat', orders: 25, revenue: 3200, profit: 960 },
        { day: 'Sun', orders: 20, revenue: 2450, profit: 735 },
      ];
    }
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = days.map(day => ({ day, orders: 0, revenue: 0, profit: 0 }));
    
    orders.forEach(order => {
      const dayIndex = new Date(order.date).getDay();
      weeklyData[dayIndex].orders += 1;
      weeklyData[dayIndex].revenue += order.total || 0;
      weeklyData[dayIndex].profit += (order.total || 0) * 0.3;
    });
    
    return weeklyData;
  }, [orders]);

  // Get top selling products
  const topSellingProducts = useMemo(() => {
    const productSales = {};
    orders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          if (!productSales[item.productId]) {
            productSales[item.productId] = {
              name: item.name || 'Unknown Product',
              quantity: 0,
              revenue: 0,
              image: item.image || 'https://via.placeholder.com/40'
            };
          }
          productSales[item.productId].quantity += item.quantity || 0;
          productSales[item.productId].revenue += (item.price || 0) * (item.quantity || 0);
        });
      }
    });
    
    return Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [orders]);

  // Get recent orders
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [orders]);

  // Get low stock products
  const lowStockProducts = useMemo(() => {
    return products
      .filter(p => p.stock < 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5);
  }, [products]);

  // Daily targets
  const dailyTargets = useMemo(() => [
    { label: 'Revenue', current: stats.todaySales, target: 5000, unit: 'EGP', icon: DollarSign, color: colors.primary[500] },
    { label: 'Orders', current: orders.filter(o => new Date(o.date).toDateString() === new Date().toDateString()).length, target: 25, unit: 'orders', icon: ShoppingCart, color: colors.success[500] },
    { label: 'Customers', current: customers.filter(c => new Date(c.joinDate).toDateString() === new Date().toDateString()).length, target: 10, unit: 'customers', icon: Users, color: colors.purple[500] },
  ], [orders, customers, stats.todaySales]);

  const handleQuickAction = (actionId) => {
    setActiveQuickAction(actionId);
    if (onNavigate) {
      switch(actionId) {
        case 'new-order':
          onNavigate('orders');
          break;
        case 'add-product':
          onNavigate('products');
          break;
        case 'customers':
          onNavigate('customers');
          break;
        case 'reports':
          onNavigate('reports');
          break;
        default:
          break;
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <style>{styles}</style>
        
        <div className="content-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div className="glass-card glow-effect" style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="floating">
              <Rocket size={60} color={colors.primary[700]} style={{ marginBottom: '1.5rem' }} />
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: colors.primary[700] }}>Seller Dashboard</h1>
            <div style={{ width: '150px', height: '3px', background: 'rgba(210,180,140,0.2)', borderRadius: '2px', margin: '1.5rem auto', overflow: 'hidden' }}>
              <div className="progress-fill" style={{ width: '70%' }}></div>
            </div>
            <p style={{ color: colors.primary[600] }}>Loading amazing experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <style>{styles}</style>
      
      {/* Sparkles Effect */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          style={{
            position: 'absolute',
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: `radial-gradient(circle, ${colors.gold[400]}, ${colors.primary[400]})`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 100,
            animation: 'fadeOut 1s ease-out forwards',
            boxShadow: `0 0 10px ${colors.gold[400]}`,
          }}
        />
      ))}

      {/* Particles Background */}
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
              width: particle.width,
              height: particle.height,
            }}
          />
        ))}
      </div>

      {/* Floating Shapes - New creative shapes added */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>
      <div className="floating-shape shape-4"></div>
      <div className="floating-shape shape-5"></div>

      <div className="content-wrapper">
        {/* Header with Glassmorphism - ULTRA CREATIVE */}
        <header className="glass-card full-width-header glow-effect" style={{ marginBottom: '1rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                className="stat-icon floating bounce" 
                style={{ background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[700]}, ${colors.gold[500]})`, width: '3rem', height: '3rem', cursor: 'pointer' }}
                onClick={() => setLoading(true)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.25) rotate(12deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                <Rocket size={18} color="white" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.primary[700], marginBottom: '0.1rem' }}>
                  Seller Dashboard <Sparkles size={18} style={{ display: 'inline', marginLeft: '0.25rem', color: colors.gold[500], animation: 'creativeBounce 2s infinite' }} />
                </h1>
                <p style={{ color: colors.primary[600], fontSize: '0.8rem' }}>Welcome back, <strong style={{ color: colors.primary[700], fontWeight: 700 }}>Premium Seller</strong> 👋</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Period Selector - CREATIVE */}
              <div className="glass-card-light" style={{ display: 'flex', padding: '0.25rem', borderRadius: '0.75rem' }}>
                {['day', 'week', 'month'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className="period-btn"
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.6rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: selectedPeriod === period ? `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[700]}, ${colors.gold[500]})` : 'transparent',
                      color: selectedPeriod === period ? 'white' : colors.primary[600],
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: selectedPeriod === period ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
              
              <button 
                className="quick-action-btn glow-effect" 
                style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Bell size={16} color={colors.primary[600]} />
                <span style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '6px', height: '6px', background: colors.danger[500], borderRadius: '50%', animation: 'creativePulse 2s infinite' }}></span>
                </span>
              </button>
              
              <button 
                onClick={() => setLoading(true)}
                className="quick-action-btn spin-on-hover"
                style={{ padding: '0.5rem' }}
              >
                <RefreshCw size={16} color={colors.primary[600]} />
              </button>
            </div>
          </div>

          {/* Quick Stats Row - CREATIVE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              { label: 'REVENUE GROWTH', value: stats.revenueGrowth, icon: TrendUp, color: colors.success[500] },
              { label: 'CUSTOMER GROWTH', value: stats.customerGrowth, icon: Users2, color: colors.success[500] },
              { label: 'ORDER GROWTH', value: stats.orderGrowth, icon: ShoppingBasket, color: colors.success[500] },
            ].map((item, index) => (
              <div 
                key={index}
                className="target-card"
                style={{ 
                  background: 'rgba(210,180,140,0.1)', 
                  borderRadius: '0.75rem', 
                  padding: '1rem', 
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(210,180,140,0.25)';
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(210,180,140,0.1)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <p style={{ color: colors.primary[600], fontSize: '0.65rem', fontWeight: 600, marginBottom: '0.2rem' }}>{item.label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <item.icon size={16} color={item.color} style={{ animation: 'creativeBounce 2s infinite' }} />
                  <span style={{ color: colors.primary[700], fontSize: '1.1rem', fontWeight: 700 }}>+{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Quick Actions with Hover Effects - CREATIVE */}
        <div className="quick-actions-grid">
          {[
            { id: 'new-order', label: 'New Order', icon: ShoppingCart, color: colors.primary[500], bg: colors.primary[100], desc: 'Process new sale' },
            { id: 'add-product', label: 'Add Product', icon: Package, color: colors.success[500], bg: colors.success[100], desc: 'Add to inventory' },
            { id: 'customers', label: 'Customers', icon: Users, color: colors.purple[500], bg: colors.purple[100], desc: 'Manage clients' },
            { id: 'reports', label: 'Reports', icon: BarChart3, color: colors.warning[500], bg: colors.warning[100], desc: 'View analytics' },
          ].map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              onMouseEnter={() => setHoveredCard(action.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="quick-action-btn glow-effect"
              style={{
                transform: hoveredCard === action.id ? 'translateY(-10px) scale(1.04)' : 'translateY(0)',
                padding: '1.25rem',
                boxShadow: hoveredCard === action.id ? `0 25px 40px ${action.color}40` : 'none',
              }}
            >
              <div 
                className="stat-icon" 
                style={{ 
                  background: `linear-gradient(135deg, ${action.color}20, ${action.color}40)`, 
                  width: '2.5rem', 
                  height: '2.5rem',
                  transform: hoveredCard === action.id ? 'scale(1.25) rotate(-8deg)' : 'scale(1)',
                }}
              >
                <action.icon size={20} color={action.color} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.1rem', color: colors.primary[800] }}>{action.label}</h3>
              <p style={{ fontSize: '0.7rem', color: colors.primary[600] }}>{action.desc}</p>
              
              {/* Hover Effect Gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${action.color}10, ${action.color}20)`,
                opacity: hoveredCard === action.id ? 1 : 0,
                transition: 'opacity 0.3s ease',
                borderRadius: 'inherit',
                pointerEvents: 'none',
              }} />
            </button>
          ))}
        </div>

        {/* Stats Grid with 3D Effects - CREATIVE */}
        <div className="stats-grid">
          {/* Total Revenue Card */}
          <div 
            className="stat-card glow-effect"
            onMouseEnter={() => {
              setHoveredCard('revenue');
              handleStatHover('revenue');
            }}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onNavigate && onNavigate('reports')}
            style={{
              transform: hoveredCard === 'revenue' ? 'translateY(-10px) scale(1.03)' : 'translateY(0)',
            }}
          >
            <div 
              className="stat-icon" 
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[700]}, ${colors.gold[500]})`,
                transform: animatedStats.revenue ? 'scale(1.35) rotate(12deg)' : 'scale(1)',
              }}
            >
              <CircleDollarSign size={20} color="white" />
            </div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: colors.primary[600], marginBottom: '0.25rem' }}>TOTAL REVENUE</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.primary[800], marginBottom: '0.25rem' }}>
              EGP {stats.totalRevenue.toLocaleString()}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span 
                className="growth-badge"
                style={{ background: colors.success[100], color: colors.success[700], padding: '0.2rem 0.5rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 600 }}
              >
                <ArrowUpRight size={10} style={{ display: 'inline' }} /> +23.5%
              </span>
              <span style={{ fontSize: '0.7rem', color: colors.primary[600] }}>vs last month</span>
            </div>
            
            {/* Decorative Elements */}
            <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', opacity: 0.1 }}>
              <TrendingUp size={40} color={colors.primary[500]} />
            </div>
          </div>

          {/* Today's Sales Card */}
          <div 
            className="stat-card glow-effect"
            onMouseEnter={() => {
              setHoveredCard('today');
              handleStatHover('today');
            }}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onNavigate && onNavigate('orders')}
            style={{
              transform: hoveredCard === 'today' ? 'translateY(-10px) scale(1.03)' : 'translateY(0)',
            }}
          >
            <div 
              className="stat-icon" 
              style={{ 
                background: `linear-gradient(135deg, ${colors.success[500]}, ${colors.success[700]}, ${colors.gold[500]})`,
                transform: animatedStats.today ? 'scale(1.35) rotate(12deg)' : 'scale(1)',
              }}
            >
              <BadgeDollarSign size={20} color="white" />
            </div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: colors.primary[600], marginBottom: '0.25rem' }}>TODAY'S SALES</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.primary[800], marginBottom: '0.25rem' }}>
              EGP {stats.todaySales.toLocaleString()}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span 
                className="growth-badge"
                style={{ background: colors.warning[100], color: colors.warning[700], padding: '0.2rem 0.5rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 600 }}
              >
                <Clock3 size={10} style={{ display: 'inline' }} /> {stats.pendingOrders} pending
              </span>
            </div>
            
            {/* Animated Pulse */}
            <div className="pulse" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: '8px', height: '8px', background: colors.success[500], borderRadius: '50%' }}></div>
          </div>

          {/* Products Card */}
          <div 
            className="stat-card glow-effect"
            onMouseEnter={() => {
              setHoveredCard('products');
              handleStatHover('products');
            }}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onNavigate && onNavigate('products')}
            style={{
              transform: hoveredCard === 'products' ? 'translateY(-10px) scale(1.03)' : 'translateY(0)',
            }}
          >
            <div 
              className="stat-icon" 
              style={{ 
                background: `linear-gradient(135deg, ${colors.purple[500]}, ${colors.purple[700]}, ${colors.gold[500]})`,
                transform: animatedStats.products ? 'scale(1.35) rotate(12deg)' : 'scale(1)',
              }}
            >
              <Boxes size={20} color="white" />
            </div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: colors.primary[600], marginBottom: '0.25rem' }}>PRODUCTS</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.primary[800], marginBottom: '0.25rem' }}>
              {stats.totalProducts}
            </h2>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <span 
                className="growth-badge"
                style={{ background: colors.warning[100], color: colors.warning[700], padding: '0.2rem 0.5rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 600 }}
              >
                {stats.lowStock} Low Stock
              </span>
              <span 
                className="growth-badge"
                style={{ background: colors.danger[100], color: colors.danger[700], padding: '0.2rem 0.5rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 600 }}
              >
                {stats.outOfStock} Out
              </span>
            </div>
          </div>

          {/* Customers Card */}
          <div 
            className="stat-card glow-effect"
            onMouseEnter={() => {
              setHoveredCard('customers');
              handleStatHover('customers');
            }}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onNavigate && onNavigate('customers')}
            style={{
              transform: hoveredCard === 'customers' ? 'translateY(-10px) scale(1.03)' : 'translateY(0)',
            }}
          >
            <div 
              className="stat-icon" 
              style={{ 
                background: `linear-gradient(135deg, ${colors.warning[500]}, ${colors.warning[700]}, ${colors.gold[500]})`,
                transform: animatedStats.customers ? 'scale(1.35) rotate(12deg)' : 'scale(1)',
              }}
            >
              <Users2 size={20} color="white" />
            </div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: colors.primary[600], marginBottom: '0.25rem' }}>CUSTOMERS</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.primary[800], marginBottom: '0.25rem' }}>
              {stats.totalCustomers}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span 
                className="growth-badge"
                style={{ background: colors.primary[100], color: colors.primary[700], padding: '0.2rem 0.5rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 600 }}
              >
                <User size={10} style={{ display: 'inline' }} /> Active
              </span>
            </div>
          </div>
        </div>

        {/* Daily Targets with Glassmorphism - CREATIVE */}
        <div 
          className="glass-card glow-effect" 
          style={{ marginBottom: '1rem', padding: '1.5rem' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800], marginBottom: '0.1rem' }}>Daily Targets</h3>
              <p style={{ color: colors.primary[600], fontSize: '0.75rem' }}>Track your store goals</p>
            </div>
            <Target size={20} color={colors.gold[500]} style={{ animation: 'creativeBounce 2s infinite' }} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {dailyTargets.map((target, i) => {
              const percentage = Math.min((target.current / target.target) * 100, 100);
              return (
                <div 
                  key={i} 
                  className="target-card"
                  style={{ 
                    background: 'rgba(210,180,140,0.1)', 
                    borderRadius: '0.75rem', 
                    padding: '1rem', 
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <target.icon size={16} color={target.color} style={{ animation: 'creativeBounce 2s infinite' }} />
                    <span style={{ color: colors.primary[700], fontSize: '0.75rem', fontWeight: 600 }}>{target.label}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ color: colors.primary[800], fontSize: '1rem', fontWeight: 700 }}>
                      {target.current} <span style={{ fontSize: '0.7rem', color: colors.primary[500] }}>/ {target.target}</span>
                    </span>
                    <span style={{ color: colors.primary[600], fontSize: '0.65rem' }}>{target.unit}</span>
                  </div>
                  
                  <div className="progress-bar" style={{ marginBottom: '0.25rem' }}>
                    <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                  </div>
                  
                  <span style={{ color: colors.primary[600], fontSize: '0.65rem' }}>{Math.round(percentage)}% completed</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid - باقي الكود كما هو مع إضافة تأثيرات مشابهة */}
        <div className="main-grid">
          {/* Orders Chart */}
          <div className="chart-container glow-effect">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800] }}>Orders Overview</h3>
                <p style={{ fontSize: '0.75rem', color: colors.primary[600] }}>Daily orders & revenue</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', background: colors.primary[500], borderRadius: '2px' }}></span>
                  <span style={{ fontSize: '0.65rem', color: colors.primary[600] }}>Orders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', background: colors.success[500], borderRadius: '2px' }}></span>
                  <span style={{ fontSize: '0.65rem', color: colors.primary[600] }}>Revenue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', background: colors.purple[500], borderRadius: '2px' }}></span>
                  <span style={{ fontSize: '0.65rem', color: colors.primary[600] }}>Profit</span>
                </div>
              </div>
            </div>
            
            <div style={{ height: '250px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={ordersChartData}>
                  <defs>
                    <linearGradient id="chartGradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary[500]} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.primary[500]} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.success[500]} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.success[500]} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="chartGradient3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.purple[500]} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.purple[500]} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.primary[200]} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: colors.primary[600], fontSize: 10 }} dy={5} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: colors.primary[600], fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: colors.primary[600], fontSize: 10 }} tickFormatter={(value) => `EGP ${(value/1000).toFixed(1)}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 5px 15px -5px rgba(0,0,0,0.1)',
                      padding: '8px',
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '11px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar yAxisId="left" dataKey="orders" barSize={20} fill={colors.primary[500]} radius={[2, 2, 0, 0]} name="Orders" />
                  <Area yAxisId="right" type="monotone" dataKey="revenue" stroke={colors.success[500]} strokeWidth={2} fillOpacity={1} fill="url(#chartGradient2)" name="Revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="profit" stroke={colors.purple[500]} strokeWidth={1.5} dot={{ r: 3 }} name="Profit" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Categories & Payment Methods */}
          <div className="chart-container glow-effect">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800], marginBottom: '1rem' }}>Categories</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {productCategories.map((cat, i) => {
                const count = products.filter(p => p.category === cat.id).length;
                return (
                  <div 
                    key={i} 
                    className="quick-action-btn" 
                    style={{ padding: '0.75rem', cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredCard(`cat-${i}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.1rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.primary[700] }}>{cat.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800] }}>{count}</span>
                      <span style={{ fontSize: '0.65rem', color: colors.primary[600] }}>products</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Methods */}
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: colors.primary[700], marginBottom: '0.75rem' }}>Payment Methods</h4>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Cash', value: 45, color: colors.primary[500] },
                      { name: 'Card', value: 35, color: colors.success[500] },
                      { name: 'Wallet', value: 20, color: colors.purple[500] },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {[
                      { name: 'Cash', color: colors.primary[500] },
                      { name: 'Card', color: colors.success[500] },
                      { name: 'Wallet', color: colors.purple[500] },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Grid - مع إضافة تأثيرات مشابهة */}
        <div className="bottom-grid">
          {/* Top Selling Products */}
          <div className="chart-container glow-effect">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800] }}>Top Selling</h3>
              <Crown size={18} color={colors.warning[500]} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {topSellingProducts.length > 0 ? (
                topSellingProducts.map((product, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: colors.primary[50], borderRadius: '0.75rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: `linear-gradient(135deg, ${colors.primary[100]}, ${colors.primary[200]})`,
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: colors.primary[700],
                      fontSize: '0.9rem'
                    }}>
                      #{i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.primary[800] }}>{product.name}</p>
                      <p style={{ fontSize: '0.7rem', color: colors.primary[600] }}>{product.quantity} units sold</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: colors.success[600] }}>EGP {product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: colors.primary[600], padding: '1.5rem', fontSize: '0.8rem' }}>No sales data yet</p>
              )}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="chart-container glow-effect">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800] }}>Low Stock Alert</h3>
              <AlertTriangle size={18} color={colors.warning[500]} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      padding: '0.75rem', 
                      borderRadius: '0.75rem',
                      background: product.stock === 0 ? colors.danger[50] : colors.warning[50],
                      border: `1px solid ${product.stock === 0 ? colors.danger[200] : colors.warning[200]}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Package size={16} color={product.stock === 0 ? colors.danger[500] : colors.warning[500]} />
                      <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.primary[800] }}>{product.name}</p>
                        <p style={{ fontSize: '0.7rem', color: colors.primary[600] }}>{product.stock} units left</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleQuickAction('add-product')}
                      style={{
                        padding: '0.4rem 0.8rem',
                        background: colors.primary[500],
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      Restock
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: colors.primary[600], padding: '1.5rem', fontSize: '0.8rem' }}>All products in stock</p>
              )}
            </div>
          </div>

          {/* Recent Orders with Glass Effect */}
          <div className="glass-card glow-effect" style={{ padding: '1.5rem', background: `linear-gradient(135deg, ${colors.primary[800]}, ${colors.primary[900]})` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>Recent Orders</h3>
              <ShoppingCart size={18} color="rgba(255,255,255,0.7)" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Receipt size={12} color="rgba(255,255,255,0.7)" />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: 500, color: 'white' }}>Order #{order.id}</p>
                        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{order.customerName || 'Guest'}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.success[400] }}>EGP {order.total}</p>
                      <span style={{ 
                        fontSize: '0.6rem', 
                        padding: '0.15rem 0.5rem',
                        borderRadius: '0.75rem',
                        background: order.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' :
                                   order.status === 'pending' ? 'rgba(245, 158, 11, 0.2)' :
                                   'rgba(59, 130, 246, 0.2)',
                        color: order.status === 'completed' ? colors.success[400] :
                               order.status === 'pending' ? colors.warning[400] :
                               colors.primary[400]
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '1.5rem', fontSize: '0.8rem' }}>No recent orders</p>
              )}
            </div>
            
            <button 
              onClick={() => handleQuickAction('new-order')}
              style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.75rem',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              View All Orders
            </button>
          </div>
        </div>

        {/* Customers & Search Grid */}
        <div className="customers-grid">
          {/* Recent Customers */}
          <div className="chart-container glow-effect">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800] }}>Recent Customers</h3>
                <p style={{ fontSize: '0.75rem', color: colors.primary[600] }}>Latest signups & activity</p>
              </div>
              <Users2 size={18} color={colors.primary[500]} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {customers.slice(0, 5).map((customer, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: colors.primary[50], borderRadius: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[700]})`,
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      {customer.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.primary[800] }}>{customer.name || 'Unknown'}</p>
                      <p style={{ fontSize: '0.7rem', color: colors.primary[600] }}>{customer.email || 'No email'}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 600, color: colors.success[600] }}>{customer.orders || 0} orders</p>
                    <p style={{ fontSize: '0.6rem', color: colors.primary[600] }}>
                      {customer.joinDate ? new Date(customer.joinDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Search & Stats */}
          <div className="chart-container glow-effect">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Search size={18} color={colors.primary[500]} />
              <input 
                type="text" 
                placeholder="Quick search products, orders, customers..." 
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  background: colors.primary[50],
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '0.75rem',
                  color: colors.primary[800]
                }}
              />
              <div style={{ display: 'flex', gap: '0.25rem', fontSize: '0.65rem', color: colors.primary[600] }}>
                <kbd style={{ padding: '0.25rem 0.5rem', background: colors.primary[100], borderRadius: '0.25rem' }}>⌘</kbd>
                <span>+</span>
                <kbd style={{ padding: '0.25rem 0.5rem', background: colors.primary[100], borderRadius: '0.25rem' }}>K</kbd>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', background: `linear-gradient(135deg, ${colors.primary[50]}, ${colors.primary[100]})`, borderRadius: '0.75rem' }}>
                <p style={{ fontSize: '0.65rem', color: colors.primary[700], fontWeight: 600, marginBottom: '0.1rem' }}>Avg. Order Value</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.primary[800] }}>EGP {Math.round(stats.avgOrderValue)}</p>
                <p style={{ fontSize: '0.55rem', color: colors.success[600] }}>↑ 12% vs last week</p>
              </div>
              <div style={{ padding: '1rem', background: `linear-gradient(135deg, ${colors.success[50]}, ${colors.success[100]})`, borderRadius: '0.75rem' }}>
                <p style={{ fontSize: '0.65rem', color: colors.success[700], fontWeight: 600, marginBottom: '0.1rem' }}>Conversion Rate</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.success[800] }}>24.5%</p>
                <p style={{ fontSize: '0.55rem', color: colors.success[600] }}>↑ 5.2% vs last week</p>
              </div>
            </div>

            {/* Popular Searches */}
            <div>
              <p style={{ fontSize: '0.65rem', color: colors.primary[600], marginBottom: '0.75rem' }}>Popular Searches</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Smartphones', 'Laptops', 'Shoes', 'Watches', 'Bags', 'Headphones'].map((term, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      padding: '0.4rem 0.8rem', 
                      background: colors.primary[50], 
                      borderRadius: '2rem', 
                      fontSize: '0.65rem', 
                      fontWeight: 500,
                      color: colors.primary[700],
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = colors.primary[200]}
                    onMouseLeave={(e) => e.target.style.background = colors.primary[50]}
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievement Badge - CREATIVE */}
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[700]}, ${colors.gold[500]})`,
              borderRadius: '0.75rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              <GiftIcon size={20} style={{ animation: 'creativeBounce 2s infinite' }} />
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.1rem' }}>You're on a roll! 🎉</p>
                <p style={{ fontSize: '0.65rem', opacity: 0.9 }}>5 more sales to unlock Gold status</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative CSS for fadeOut animation */}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>
    </div>
  );
};

export default SellerDashboard;