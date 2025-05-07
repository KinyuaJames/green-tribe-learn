
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    // You can create a loading component or show a spinner here
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!currentUser) {
    // Redirect to login and remember where the user was trying to go
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
