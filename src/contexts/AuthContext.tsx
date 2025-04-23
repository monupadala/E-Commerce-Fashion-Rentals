
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This would normally connect to Supabase
  // For now we'll use dummy implementations
  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // In a real implementation, this would check Supabase session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would use Supabase auth
      // For demonstration, we'll create a dummy user
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Demo',
        lastName: 'User',
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would use Supabase auth
      const mockUser: User = {
        id: '1',
        email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // In a real implementation, this would sign out of Supabase
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const sendOTP = async (email: string) => {
    // In a real implementation, this would send OTP via Supabase Edge Functions
    console.log(`OTP sent to ${email}`);
    return Promise.resolve();
  };

  const verifyOTP = async (email: string, otp: string) => {
    // In a real implementation, this would verify OTP via Supabase
    if (otp === '123456') { // Dummy verification
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'OTP',
        lastName: 'User',
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return Promise.resolve();
    }
    return Promise.reject('Invalid OTP');
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return Promise.reject('User not authenticated');
    
    try {
      // In a real implementation, this would update user profile in Supabase
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    sendOTP,
    verifyOTP,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
