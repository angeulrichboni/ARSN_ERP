import React, { useState } from 'react';
import { mockServices } from '../data/mockData';
import { ServiceForm } from '../components/ServiceForm';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { ModalConfirmation } from '../components/ModalConfirmation';
import { ToastNotification } from '../components/ToastNotification';
import type { Service } from '../data/mockData';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  const handleCreateService = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleSaveService = (serviceData: Omit<Service, 'id'> & { responsable?: string }) => {
    if (selectedService) {
      // Modifier service existant
      setServices(prev => prev.map(service => 
        service.id === selectedService.id 
          ? { 
              id: selectedService.id, 
              nom: serviceData.nom, 
              description: serviceData.description 
            }
          : service
      ));
      setToast({ message: 'Service modifié avec succès', type: 'success' });
    } else {
      // Créer nouveau service
      const words = serviceData.nom.split(' ');
      const code = words.map(word => word.substring(0, 2).toUpperCase()).join('');
      const timestamp = Date.now().toString().slice(-2);
      const newServiceId = `${code}-${timestamp}`;
      
      const newService: Service = {
        id: newServiceId,
        nom: serviceData.nom,
        description: serviceData.description
      };
      setServices(prev => [...prev, newService]);
      setToast({ message: 'Service créé avec succès', type: 'success' });
    }
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const handleDelete = (service: Service) => {
    setDeleteModal({ isOpen: true, service });
  };

  const confirmDelete = () => {
    if (deleteModal.service) {
      setServices(prev => prev.filter(s => s.id !== deleteModal.service?.id));
      setDeleteModal({ isOpen: false, service: null });
      setToast({ message: 'Service supprimé avec succès', type: 'success' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des services</h1>
          <p className="text-gray-600">Administration des services ARSN</p>
        </div>
        <button 
          onClick={handleCreateService}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <HiPlus className="h-4 w-4 mr-2" />
          Nouveau service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{service.nom}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button 
                  onClick={() => handleEditService(service)}
                  className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
                  title="Modifier"
                >
                  <HiPencil className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(service)}
                  className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                  title="Supprimer"
                >
                  <HiTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Code:</span>
                <span className="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {service.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg">Aucun service disponible</p>
            <p className="text-sm mt-2">Créez votre premier service pour commencer</p>
          </div>
        </div>
      )}

      {isFormOpen && (
        <ServiceForm
          service={selectedService}
          onClose={handleCloseForm}
          onSave={handleSaveService}
        />
      )}

      <ModalConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, service: null })}
        onConfirm={confirmDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le service "${deleteModal.service?.nom}" ?`}
        confirmText="Supprimer"
        type="danger"
      />

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
