import React from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'agent' | 'chef' | 'responsable' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Pour l'admin, on autorise l'accès à tout
    if (user?.role === 'admin') {
      return <>{children}</>;
    }
    
    // Vérifier les permissions selon le rôle
    const hasPermission = checkPermission(user?.role, requiredRole);
    
    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const checkPermission = (userRole: string | undefined, requiredRole: string): boolean => {
  if (!userRole) return false;

  const roleHierarchy = {
    agent: 1,
    chef: 2,
    responsable: 3,
    admin: 4
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
};
