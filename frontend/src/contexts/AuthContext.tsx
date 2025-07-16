import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../data/mockData';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au démarrage
    const storedUser = localStorage.getItem('arsn-user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler une authentification avec les données mockées
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      localStorage.setItem('arsn-user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('arsn-user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
