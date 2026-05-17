import React, { useState } from 'react';
import { apiService } from '../seller/src/Services/api';

import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch {
      return null;
    }
  });

  async function login(emailOrUsername, password) {
    try {
      const data = await apiService.login(emailOrUsername, password);
      const u = data.user || null;
      
      if (u && u.id) {
        console.log('Login successful for user:', u);
        localStorage.setItem('currentUser', JSON.stringify(u));
        
        if (data.access) {
          localStorage.setItem('wtv_access_token', data.access);
        }
        if (data.refresh) {
          localStorage.setItem('wtv_refresh_token', data.refresh);
        }
        setUser(u);
        return data;
      } else {
        throw new Error('No user data returned from login');
      }
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  }

  async function register(payload) {
    const resp = await apiService.register(payload);
    try {
      
      if (resp && resp.access && resp.refresh) {
        console.log('Registration successful, tokens received');
        localStorage.setItem('wtv_access_token', resp.access);
        localStorage.setItem('wtv_refresh_token', resp.refresh);
        
        if (resp.user && resp.user.id) {
          console.log('Setting user:', resp.user);
          localStorage.setItem('currentUser', JSON.stringify(resp.user));
          setUser(resp.user);
          return resp;
        }
      }
      
      
      console.log('No tokens returned, attempting login');
      const loginResp = await login(payload.username || payload.email, payload.password);
      return loginResp;
    } catch (err) {
      console.error('Register error:', err);
      throw err;
    }
  }

  function logout() {
    apiService.logout();
    localStorage.removeItem('currentUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

