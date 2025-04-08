import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  sub: string;
  name: string;
  email: string;
  preferred_username: string;
  [key: string]: any;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<{ success: boolean }>;
  logout: () => void;
  checkAuth: () => boolean;
}

// Mock API call to get token
const fetchToken = async (): Promise<{ access_token: string }> => {
  // In a real app, this would be a fetch to your auth endpoint
  // For static export, we're just returning a mock token
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        access_token: 'mock-token-12345',
      });
    }, 800); // Simulate network delay
  });
};

// Mock API call to get user info
const fetchUserInfo = async (): Promise<User> => {
  // In a real app, this would be a fetch to your userinfo endpoint
  // For static export, we're just returning mock user data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sub: '1234567890',
        name: 'Test User',
        email: 'test@example.com',
        preferred_username: 'testuser',
      });
    }, 300); // Simulate network delay
  });
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
      error: null,
      
      login: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Get token
          const tokenResponse = await fetchToken();
          
          // Get user info
          const userInfo = await fetchUserInfo();
          
          set({
            isAuthenticated: true,
            token: tokenResponse.access_token,
            user: userInfo,
            isLoading: false,
          });
          
          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: 'Authentication failed. Please try again.',
          });
          return { success: false };
        }
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },
      
      checkAuth: () => {
        // In a real app, you might want to validate the token here
        // For our static export, we'll just check if the token exists
        return !!get().token;
      },
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      }),
    }
  )
); 