import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function ProtectedRoute({ allowedRole, children }) {
  const { user } = useAuth();

  
  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  
  if (allowedRole && user.user_type !== allowedRole) {
    console.log(`User type ${user.user_type} does not match required role ${allowedRole}`);
    if (user.user_type === 'buyer') {
      return <Navigate to="/buyer" replace />;
    } else if (user.user_type === 'seller') {
      return <Navigate to="/seller" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
