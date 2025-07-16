import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDossiers } from '../hooks/useDossiers';
import { BadgeStatut } from '../components/BadgeStatut';
import { HiArrowLeft, HiCalendar, HiUser, HiOfficeBuilding, HiDocumentText, HiClock } from 'react-icons/hi';

export const DossierDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDossierById, getServiceById } = useDossiers();

  const dossier = getDossierById(id || '');

  if (!dossier) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Dossier non trouvé</p>
          <button
            onClick={() => navigate('/dossiers')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  const servicesNames = dossier.servicesImputes.map(serviceId => 
    getServiceById(serviceId)?.nom || serviceId
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dossiers')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <HiArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{dossier.numero}</h1>
        </div>
        <BadgeStatut statut={dossier.statut} />
      </div>

      {/* Informations principales */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <HiCalendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(dossier.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <HiUser className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Expéditeur</p>
                  <p className="text-sm font-medium text-gray-900">{dossier.expediteur}</p>
                </div>
              </div>

              <div className="flex items-center">
                <HiOfficeBuilding className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Services imputés</p>
                  <p className="text-sm font-medium text-gray-900">
                    {servicesNames.join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <HiClock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Créé le</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(dossier.createdAt).toLocaleDateString('fr-FR')} à {new Date(dossier.createdAt).toLocaleTimeString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Objet du dossier</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <HiDocumentText className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <p className="text-sm text-gray-700">{dossier.objet}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Observations */}
      {dossier.observations.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Observations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dossier.observations.map((observation, index) => (
              <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-blue-900">{observation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note particulière */}
      {dossier.noteParticuliere && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Note particulière</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-800">{dossier.noteParticuliere}</p>
          </div>
        </div>
      )}

      {/* Historique */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique des modifications</h2>
        <div className="space-y-4">
          {dossier.historique.map((entry) => (
            <div key={entry.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(entry.date).toLocaleDateString('fr-FR')} à {new Date(entry.date).toLocaleTimeString('fr-FR')}
                  </p>
                </div>
                <p className="text-sm text-gray-600">Par {entry.utilisateur}</p>
                {entry.details && (
                  <p className="text-xs text-gray-500 mt-1">{entry.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
