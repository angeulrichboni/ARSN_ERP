import React from 'react';
import { HiX } from 'react-icons/hi';

interface ModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'info'
}) => {
  if (!isOpen) return null;

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 bg-white">
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
