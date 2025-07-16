import React, { useState, useEffect } from 'react';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { ToastNotification } from './ToastNotification';
import { mockServices } from '../data/mockData';
import { HiX } from 'react-icons/hi';
import type { User } from '../data/mockData';

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
  onSave: (userData: Omit<User, 'id'>) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSave }) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    role: 'agent' as 'agent' | 'chef' | 'responsable' | 'admin',
    services: [] as string[]
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        password: user.password,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        services: user.services
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.nom || !formData.prenom) {
      setToast({ message: 'Veuillez remplir tous les champs obligatoires', type: 'error' });
      return;
    }

    if (formData.services.length === 0) {
      setToast({ message: 'Veuillez sélectionner au moins un service', type: 'error' });
      return;
    }

    if (!user && !formData.password) {
      setToast({ message: 'Le mot de passe est requis pour un nouvel utilisateur', type: 'error' });
      return;
    }

    try {
      onSave(formData);
      setToast({ message: user ? 'Utilisateur modifié avec succès' : 'Utilisateur créé avec succès', type: 'success' });
      
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch {
      setToast({ message: 'Erreur lors de la sauvegarde', type: 'error' });
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <HiX className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Prénom"
              value={formData.prenom}
              onChange={(value) => setFormData(prev => ({ ...prev, prenom: value }))}
              placeholder="Prénom"
              required
            />
            
            <FormInput
              label="Nom"
              value={formData.nom}
              onChange={(value) => setFormData(prev => ({ ...prev, nom: value }))}
              placeholder="Nom de famille"
              required
            />
          </div>

          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
            placeholder="utilisateur@arsn.gov"
            required
          />

          <FormInput
            label={user ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}
            type="password"
            value={formData.password}
            onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
            placeholder="••••••••"
            required={!user}
          />

          <FormSelect
            label="Rôle"
            value={formData.role}
            onChange={(value) => setFormData(prev => ({ ...prev, role: value as 'agent' | 'chef' | 'responsable' | 'admin' }))}
            options={[
              { value: 'agent', label: 'Agent' },
              { value: 'chef', label: 'Chef de service' },
              { value: 'responsable', label: 'Responsable' },
              { value: 'admin', label: 'Administrateur' }
            ]}
            required
          />

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Services assignés <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockServices.map((service) => (
                <div key={service.id} className="flex items-center bg-white p-3 rounded-md border">
                  <input
                    type="checkbox"
                    id={`service-${service.id}`}
                    checked={formData.services.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`service-${service.id}`}
                    className="ml-3 block text-sm text-gray-900 font-medium"
                  >
                    {service.nom}
                  </label>
                </div>
              ))}
            </div>
          </div>

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
              {user ? 'Modifier' : 'Créer'}
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
