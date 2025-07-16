import React, { useState, useEffect } from 'react';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { ToastNotification } from './ToastNotification';
import { HiX } from 'react-icons/hi';
import type { Service } from '../data/mockData';

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
  onSave: (serviceData: Omit<Service, 'id'>) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ service, onClose, onSave }) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  
  const [formData, setFormData] = useState({
    nom: '',
    description: ''
  });

  useEffect(() => {
    if (service) {
      setFormData({
        nom: service.nom,
        description: service.description
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom) {
      setToast({ message: 'Veuillez remplir tous les champs obligatoires', type: 'error' });
      return;
    }

    try {
      onSave({
        nom: formData.nom,
        description: formData.description
      });
      setToast({ message: service ? 'Service modifié avec succès' : 'Service créé avec succès', type: 'success' });
      
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch {
      setToast({ message: 'Erreur lors de la sauvegarde', type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {service ? 'Modifier le service' : 'Nouveau service'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <HiX className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white">
          <FormInput
            label="Nom du service"
            value={formData.nom}
            onChange={(value) => setFormData(prev => ({ ...prev, nom: value }))}
            placeholder="Ex: Contrôle Technique"
            required
          />

          <FormTextarea
            label="Description"
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            placeholder="Description du service..."
            rows={3}
          />

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {service ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <ToastNotification
          isVisible={true}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
