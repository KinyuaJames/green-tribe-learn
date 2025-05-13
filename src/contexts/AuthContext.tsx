
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  authenticateUser, 
  createUser, 
  getUserById, 
  initializeDatabase 
} from '@/utils/database';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: Omit<User, 'password'> | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the database
    initializeDatabase();
    
    
    // Check if user is logged in
    const userId = localStorage.getItem('currentUserId');
    if (userId) {
      const user = getUserById(userId);
      if (user) {
        // The getUserById function already returns user without password
        setCurrentUser(user);
      } else {
        // Clear invalid user ID
        localStorage.removeItem('currentUserId');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = authenticateUser(email, password);
      if (user) {
        // The authenticateUser function already returns user without password
        setCurrentUser(user);
        localStorage.setItem('currentUserId', user.id);
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      return false;
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const result = createUser({
        fullName,
        email,
        password
      });
      
      if (result.success && result.user) {
        setCurrentUser(result.user);
        localStorage.setItem('currentUserId', result.user.id);
        toast.success('Account created successfully!');
        return true;
      } else {
        toast.error(result.message || 'Signup failed');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId');
    toast.success('Logged out successfully');
  };

  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
