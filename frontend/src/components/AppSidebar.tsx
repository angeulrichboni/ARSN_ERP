import React from 'react';
import { 
  HiChartPie, 
  HiFolder, 
  HiUsers, 
  HiOfficeBuilding,
  HiLogout,
  HiX
} from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

interface AppSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onClose, isMobile = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    if (onClose) onClose();
  };

  const menuItems = [
    {
      href: '/dashboard',
      icon: HiChartPie,
      label: 'Dashboard',
      roles: ['agent', 'chef', 'responsable', 'admin']
    },
    {
      href: '/dossiers',
      icon: HiFolder,
      label: 'Dossiers',
      roles: ['agent', 'chef', 'responsable', 'admin']
    },
    {
      href: '/utilisateurs',
      icon: HiUsers,
      label: 'Utilisateurs',
      roles: ['admin']
    },
    {
      href: '/services',
      icon: HiOfficeBuilding,
      label: 'Services',
      roles: ['admin']
    }
  ];

  const visibleItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="h-full w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header avec bouton de fermeture pour mobile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">ARSN</h2>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <HiX className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      {/* Logout button */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <HiLogout className="mr-3 h-5 w-5 flex-shrink-0" />
          <span className="truncate">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};
