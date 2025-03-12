import { create } from 'zustand';
import apiManifest from '@/app/api-manifest';

// Simple localStorage helper functions
const saveToStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }
};

const getFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting from localStorage: ${error}`);
      return null;
    }
  }
  return null;
};

const removeFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  }
};

// Initialize state from localStorage if available
const storedToken = getFromStorage('auth-token');
const storedUser = getFromStorage('auth-user');
const initialIsAuthenticated = !!storedToken;

export const useAuthStore = create((set, get) => ({
  token: storedToken,
  user: storedUser,
  isAuthenticated: initialIsAuthenticated,
  isLoading: false,
  error: null,
  
  // Login action
  login: async () => {
    // In a static export, we're using mock data so we don't need credentials
    set({ isLoading: true, error: null });
    try {
      // In a static export, we're calling our pre-rendered API endpoint with POST method
      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('client_id', 'nightcrawler-app');
      formData.append('username', 'testuser'); // Mock username
      formData.append('password', 'testpassword'); // Mock password
      
      const response = await fetch(apiManifest.auth.token, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      
      const tokenData = await response.json();
      
      // Fetch user info
      const userResponse = await fetch(apiManifest.auth.userinfo);
      const userData = await userResponse.json();
      
      // Save to localStorage
      saveToStorage('auth-token', tokenData);
      saveToStorage('auth-user', userData);
      
      set({ 
        token: tokenData, 
        user: userData, 
        isAuthenticated: true, 
        isLoading: false,
        error: null
      });
      
      return { success: true };
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.message || 'An error occurred during login' 
      });
      return { success: false, error: error.message };
    }
  },
  
  // Logout action
  logout: () => {
    // Clear localStorage
    removeFromStorage('auth-token');
    removeFromStorage('auth-user');
    
    set({ 
      token: null, 
      user: null, 
      isAuthenticated: false,
      error: null
    });
  },
  
  // Check if token is valid (for static export, we just check if it exists)
  checkAuth: () => {
    // Check localStorage first
    const storedToken = getFromStorage('auth-token');
    
    // If token exists in localStorage but not in state, update state
    if (storedToken && !get().isAuthenticated) {
      const storedUser = getFromStorage('auth-user');
      set({
        token: storedToken,
        user: storedUser,
        isAuthenticated: true
      });
      return true;
    }
    
    // Return current authentication state
    return get().isAuthenticated;
  }
}));

