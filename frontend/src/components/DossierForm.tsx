import React, { useState, useEffect } from 'react';
import { useDossiers } from '../hooks/useDossiers';
import { useAuth } from '../hooks/useAuth';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormTextarea } from './FormTextarea';
import { ObservationChecklist } from './ObservationChecklist';
import { ToastNotification } from './ToastNotification';
import { HiX } from 'react-icons/hi';
import type { Dossier } from '../data/mockData';

interface DossierFormProps {
  dossier?: Dossier | null;
  onClose: () => void;
  onSave: () => void;
}

export const DossierForm: React.FC<DossierFormProps> = ({ dossier, onClose, onSave }) => {
  const { services, addDossier, updateDossier } = useDossiers();
  const { user } = useAuth();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  
  const [formData, setFormData] = useState({
    numero: '',
    date: new Date().toISOString().split('T')[0],
    expediteur: '',
    objet: '',
    servicesImputes: [] as string[],
    statut: 'en_cours' as 'en_cours' | 'cloture' | 'urgent',
    observations: [] as string[],
    noteParticuliere: ''
  });

  useEffect(() => {
    if (dossier) {
      setFormData({
        numero: dossier.numero,
        date: dossier.date,
        expediteur: dossier.expediteur,
        objet: dossier.objet,
        servicesImputes: dossier.servicesImputes,
        statut: dossier.statut,
        observations: dossier.observations,
        noteParticuliere: dossier.noteParticuliere
      });
    }
  }, [dossier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.numero || !formData.expediteur || !formData.objet) {
      setToast({ message: 'Veuillez remplir tous les champs obligatoires', type: 'error' });
      return;
    }

    if (formData.servicesImputes.length === 0) {
      setToast({ message: 'Veuillez sélectionner au moins un service', type: 'error' });
      return;
    }

    try {
      if (dossier) {
        updateDossier(dossier.id, formData);
        setToast({ message: 'Dossier modifié avec succès', type: 'success' });
      } else {
        addDossier({
          ...formData,
          createdBy: user?.id || '1'
        });
        setToast({ message: 'Dossier créé avec succès', type: 'success' });
      }
      
      setTimeout(() => {
        onSave();
      }, 1000);
    } catch {
      setToast({ message: 'Erreur lors de la sauvegarde', type: 'error' });
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      servicesImputes: prev.servicesImputes.includes(serviceId)
        ? prev.servicesImputes.filter(id => id !== serviceId)
        : [...prev.servicesImputes, serviceId]
    }));
  };

  const generateNumero = () => {
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    const newNumero = `ARSN-${year}-${timestamp}`;
    setFormData(prev => ({ ...prev, numero: newNumero }));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {dossier ? 'Modifier le dossier' : 'Nouveau dossier'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1">
              <FormInput
                label="Numéro du dossier"
                value={formData.numero}
                onChange={(value) => setFormData(prev => ({ ...prev, numero: value }))}
                required
              />
              {!dossier && (
                <button
                  type="button"
                  onClick={generateNumero}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Générer automatiquement
                </button>
              )}
            </div>
            
            <FormInput
              label="Date"
              type="date"
              value={formData.date}
              onChange={(value) => setFormData(prev => ({ ...prev, date: value }))}
              required
            />
          </div>

          <FormInput
            label="Expéditeur"
            value={formData.expediteur}
            onChange={(value) => setFormData(prev => ({ ...prev, expediteur: value }))}
            placeholder="Nom de l'expéditeur"
            required
          />

          <FormTextarea
            label="Objet"
            value={formData.objet}
            onChange={(value) => setFormData(prev => ({ ...prev, objet: value }))}
            placeholder="Objet du dossier"
            required
            rows={2}
          />

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Services imputés <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <div key={service.id} className="flex items-center bg-white p-2 sm:p-3 rounded-md border">
                  <input
                    type="checkbox"
                    id={`service-${service.id}`}
                    checked={formData.servicesImputes.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`service-${service.id}`}
                    className="ml-2 sm:ml-3 block text-sm text-gray-900 font-medium"
                  >
                    {service.nom}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <FormSelect
            label="Statut"
            value={formData.statut}
            onChange={(value) => setFormData(prev => ({ ...prev, statut: value as 'en_cours' | 'cloture' | 'urgent' }))}
            options={[
              { value: 'en_cours', label: 'En cours' },
              { value: 'cloture', label: 'Clôturé' },
              { value: 'urgent', label: 'Urgent' }
            ]}
            required
          />

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <ObservationChecklist
              selectedObservations={formData.observations}
              onChange={(observations) => setFormData(prev => ({ ...prev, observations }))}
            />
          </div>

          <FormTextarea
            label="Note particulière"
            value={formData.noteParticuliere}
            onChange={(value) => setFormData(prev => ({ ...prev, noteParticuliere: value }))}
            placeholder="Informations complémentaires..."
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
              {dossier ? 'Modifier' : 'Créer'}
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
