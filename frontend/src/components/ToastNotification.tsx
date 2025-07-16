import React, { useEffect } from 'react';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXCircle, HiX } from 'react-icons/hi';

interface ToastNotificationProps {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  isVisible,
  message,
  type,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <HiXCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <HiExclamationCircle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <HiInformationCircle className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${getBackgroundColor()}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${getTextColor()}`}>
              {message}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${getTextColor()}`}
            >
              <HiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
