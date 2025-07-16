import React from 'react';
import { useDossiers } from '../hooks/useDossiers';
import { BadgeStatut } from '../components/BadgeStatut';
import { HiX, HiCalendar, HiUser, HiOfficeBuilding, HiDocumentText, HiClock } from 'react-icons/hi';
import type { Dossier } from '../data/mockData';

interface DossierDetailModalProps {
  dossier: Dossier;
  onClose: () => void;
}

export const DossierDetailModal: React.FC<DossierDetailModalProps> = ({ dossier, onClose }) => {
  const { getServiceById } = useDossiers();

  const servicesNames = dossier.servicesImputes.map(serviceId => 
    getServiceById(serviceId)?.nom || serviceId
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{dossier.numero}</h2>
            <BadgeStatut statut={dossier.statut} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <HiX className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white">
          {/* Informations générales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <HiCalendar className="h-4 w-4 mr-2" />
                Date de création
              </div>
              <p className="text-gray-900 font-medium text-sm sm:text-base">
                {new Date(dossier.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <HiUser className="h-4 w-4 mr-2" />
                Expéditeur
              </div>
              <p className="text-gray-900 font-medium text-sm sm:text-base">{dossier.expediteur}</p>
            </div>
          </div>

          {/* Objet du dossier */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <HiDocumentText className="h-4 w-4 mr-2" />
              Objet
            </div>
            <p className="text-gray-900 text-sm sm:text-base">{dossier.objet}</p>
          </div>

          {/* Services imputés */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <HiOfficeBuilding className="h-4 w-4 mr-2" />
              Services imputés
            </div>
            <div className="flex flex-wrap gap-2">
              {servicesNames.map((serviceName, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {serviceName}
                </span>
              ))}
            </div>
          </div>

          {/* Observations */}
          {dossier.observations && dossier.observations.length > 0 && (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <HiClock className="h-4 w-4 mr-2" />
                Observations
              </div>
              <div className="space-y-2">
                {dossier.observations.map((observation, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="flex-shrink-0 h-2 w-2 bg-blue-500 rounded-full mt-2"></span>
                    <span className="text-gray-700 text-sm sm:text-base">{observation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Note particulière */}
          {dossier.noteParticuliere && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center text-sm text-yellow-800 mb-2">
                <HiDocumentText className="h-4 w-4 mr-2" />
                Note particulière
              </div>
              <p className="text-yellow-900 text-sm sm:text-base">{dossier.noteParticuliere}</p>
            </div>
          )}

          {/* Informations système */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <div>
                <span className="font-medium">ID:</span> {dossier.id}
              </div>
              <div>
                <span className="font-medium">Créé le:</span> {new Date(dossier.date).toLocaleDateString('fr-FR')}
              </div>
              <div>
                <span className="font-medium">Statut:</span> {dossier.statut}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 sm:p-6 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
