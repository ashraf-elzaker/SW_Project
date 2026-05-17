import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/+$/, '') + '/';
const ACCESS_KEY = 'wtv_access_token';
const REFRESH_KEY = 'wtv_refresh_token';

function getAccess() {
  return localStorage.getItem(ACCESS_KEY);
}
function getRefresh() {
  return localStorage.getItem(REFRESH_KEY);
}
function setTokens(access, refresh) {
  localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}
function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = getAccess();
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  
  if (!(config.data instanceof FormData)) {
    config.headers = { 'Content-Type': 'application/json', ...config.headers };
  }
  return config;
});

let isRefreshing = false;
let subscribers = [];
function subscribe(cb) { subscribers.push(cb); }
function onRefreshed(token) { subscribers.forEach(cb => cb(token)); subscribers = []; }

api.interceptors.response.use(
  resp => resp,
  async (error) => {
    const original = error.config;
    if (error.response && error.response.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = getRefresh();
      if (!refreshToken) { clearTokens(); return Promise.reject(error); }
      if (isRefreshing) {
        return new Promise((resolve) => subscribe((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        }));
      }
      isRefreshing = true;
      try {
        const resp = await axios.post(`${API_BASE}auth/refresh/`, { refresh: refreshToken });
        const newAccess = resp.data.access;
        setTokens(newAccess, refreshToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        onRefreshed(newAccess);
        isRefreshing = false;
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        clearTokens();
        isRefreshing = false;
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

async function login(emailOrUsername, password) {
  const identity = (emailOrUsername || '').trim();
  const payload = { password };

  // Backend supports either email or username, but not both at once.
  if (identity.includes('@')) payload.email = identity;
  else payload.username = identity;

  const resp = await api.post('auth/login/', payload);
  setTokens(resp.data.access, resp.data.refresh);
  return resp.data;
}

async function register({ username, email, password, user_type }) {
  const resp = await api.post('auth/register/', { username, email, password, user_type });
  return resp.data;
}

function logout() {
  clearTokens();
}

async function getListings() {
  
  
  try {
    const resp = await api.get('products/mine/');
    return resp.data;
  } catch (e) {
    
    return [];
  }
}
async function getListing(id) {
  const resp = await api.get(`products/${id}/`);
  return resp.data;
}
async function getAllProducts() {
  const resp = await api.get('products/');
  return resp.data;
}
async function createListing(data) {
  
  const resp = await api.post('products/', data);
  return resp.data;
}
async function updateListing(id, data) {
  
  const resp = await api.put(`products/${id}/`, data);
  return resp.data;
}
async function deleteListing(id) {
  const resp = await api.delete(`products/${id}/`);
  return resp.data;
}

async function getActivities() {
  try {
    const resp = await api.get('activities/');
    return resp.data;
  } catch {
    
    return [];
  }
}


async function createOrder(data) {
  const resp = await api.post('orders/', data);
  return resp.data;
}
async function getMyOrders() {
  const resp = await api.get('orders/');
  return resp.data;
}
async function getSellerOrders() {
  const resp = await api.get('orders/seller/');
  return resp.data;
}
async function getOrder(id) {
  const resp = await api.get(`orders/${id}/`);
  
  if (Array.isArray(resp.data)) return resp.data[0] || null;
  return resp.data;
}

async function updateOrder(id, data) {
  const resp = await api.put(`orders/${id}/`, data);
  return resp.data;
}

async function getSellerMetrics() {
  
  const resp = await api.get('dashboard/');
  return resp.data;
}

export const apiService = {
  login,
  register,
  logout,
  getListings,
  getAllProducts,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getActivities,
  createOrder,
  getMyOrders,
  getSellerOrders,
  getOrder,
  updateOrder,
  getSellerMetrics,
};
export default apiService;
