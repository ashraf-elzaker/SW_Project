import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './SignUp.jsx';
import Login from './login.jsx';
import BuyerDashboard from './Buyer_dashboard.jsx';
import BuyerPurchases from './BuyerPurchases.jsx';
import Cart from './Cart.jsx';
import PurchaseNotifications from './PurchaseNotifications.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/purchases" element={<BuyerPurchases />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<PurchaseNotifications />} />
      </Routes>
    </Router>
  );
}
