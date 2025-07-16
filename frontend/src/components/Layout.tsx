import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { Topbar } from '../components/Topbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar pour desktop - visible en permanence */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <AppSidebar />
      </div>

      {/* Overlay pour mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar mobile - drawer */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <AppSidebar onClose={toggleSidebar} isMobile={true} />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
