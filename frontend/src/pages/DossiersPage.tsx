import React, { useState } from 'react';
import { useDossiers } from '../hooks/useDossiers';
import { useAuth } from '../hooks/useAuth';
import { DossierTable } from '../components/DossierTable';
import { DossierForm } from '../components/DossierForm';
import { DossierDetailModal } from '../components/DossierDetailModal';
import { ToastNotification } from '../components/ToastNotification';
import { HiPlus } from 'react-icons/hi';
import type { Dossier } from '../data/mockData';

export const DossiersPage: React.FC = () => {
  const { dossiers, deleteDossier } = useDossiers();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  const canCreateDossier = user?.role === 'agent' || user?.role === 'admin';
  const canEditDossier = user?.role === 'admin' || user?.role === 'responsable';
  const canDeleteDossier = user?.role === 'admin' || user?.role === 'responsable';

  const handleCreateDossier = () => {
    setSelectedDossier(null);
    setIsFormOpen(true);
  };

  const handleEditDossier = (dossier: Dossier) => {
    setSelectedDossier(dossier);
    setIsFormOpen(true);
  };

  const handleDeleteDossier = (dossier: Dossier) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce dossier ?')) {
      deleteDossier(dossier.id);
      setToast({ message: 'Dossier supprimé avec succès', type: 'success' });
    }
  };

  const handleViewDetail = (dossier: Dossier) => {
    setSelectedDossier(dossier);
    setShowDetail(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedDossier(null);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedDossier(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des dossiers</h1>
          <p className="text-gray-600">Suivi et gestion des dossiers administratifs</p>
        </div>
        {canCreateDossier && (
          <button
            onClick={handleCreateDossier}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HiPlus className="h-4 w-4 mr-2" />
            Nouveau dossier
          </button>
        )}
      </div>

      <DossierTable 
        dossiers={dossiers} 
        onEdit={handleEditDossier}
        onDelete={handleDeleteDossier}
        onViewDetail={handleViewDetail}
        canEdit={canEditDossier}
        canDelete={canDeleteDossier}
      />

      {isFormOpen && (
        <DossierForm
          dossier={selectedDossier}
          onClose={handleCloseForm}
          onSave={handleCloseForm}
        />
      )}

      {showDetail && selectedDossier && (
        <DossierDetailModal
          dossier={selectedDossier}
          onClose={handleCloseDetail}
        />
      )}

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
