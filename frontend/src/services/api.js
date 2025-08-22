import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Automatically adds the user's login token to every secure request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// --- STORE FUNCTIONS ---
export const getAllStores = (params) => api.get('/stores', { params });
export const createStore = (storeData) => api.post('/stores', storeData);
export const updateStore = (id, storeData) => api.put(`/stores/${id}`, storeData);
export const deleteStore = (id) => api.delete(`/stores/${id}`);

// --- RATING FUNCTIONS ---
export const getMyRatings = () => api.get('/ratings/my-ratings');
export const submitRating = (storeId, ratingData) => api.post(`/stores/${storeId}/ratings`, ratingData);
export const updateRating = (storeId, ratingData) => api.put(`/ratings/${storeId}`, ratingData);

// --- AUTH FUNCTIONS ---
export const loginUser = (userData) => api.post('/auth/login', userData);
export const signupUser = (userData) => api.post('/auth/signup', userData);

// --- USER PROFILE FUNCTIONS ---
export const updatePassword = (passwordData) => api.put('/users/profile/password', passwordData);

// --- ADMIN FUNCTIONS ---
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminUsers = (params) => api.get('/admin/users', { params });

// --- STORE OWNER FUNCTIONS ---
export const getStoreOwnerDashboard = () => api.get('/store-owner/dashboard');

export default api; 