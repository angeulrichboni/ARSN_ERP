import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { HiUser, HiMenu } from 'react-icons/hi';

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Bouton hamburger pour mobile */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
          >
            <HiMenu className="h-6 w-6" />
          </button>
          
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              <span className="hidden sm:inline">Système de Gestion ARSN</span>
              <span className="sm:hidden">ARSN</span>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <HiUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            <div className="text-xs sm:text-sm">
              <div className="font-medium text-gray-900">
                <span className="hidden sm:inline">{user?.prenom} {user?.nom}</span>
                <span className="sm:hidden">{user?.prenom}</span>
              </div>
              <div className="text-gray-500 capitalize">
                {user?.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
