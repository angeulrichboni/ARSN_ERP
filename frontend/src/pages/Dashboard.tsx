import React from 'react';
import { useDossiers } from '../hooks/useDossiers';
import { BadgeStatut } from '../components/BadgeStatut';
import { HiFolder, HiClock, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

export const Dashboard: React.FC = () => {
  const { dossiers } = useDossiers();

  const stats = {
    total: dossiers.length,
    enCours: dossiers.filter(d => d.statut === 'en_cours').length,
    clotures: dossiers.filter(d => d.statut === 'cloture').length,
    urgent: dossiers.filter(d => d.statut === 'urgent').length
  };

  const dossiersUrgents = dossiers.filter(d => d.statut === 'urgent');
  const dossiersRecents = dossiers
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${color}`}>
          <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
        </div>
        <div className="ml-4 sm:ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg sm:text-2xl font-bold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Vue d'ensemble des dossiers</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total"
          value={stats.total}
          icon={HiFolder}
          color="text-blue-600"
        />
        <StatCard
          title="En cours"
          value={stats.enCours}
          icon={HiClock}
          color="text-yellow-600"
        />
        <StatCard
          title="Clôturés"
          value={stats.clotures}
          icon={HiCheckCircle}
          color="text-green-600"
        />
        <StatCard
          title="Urgent"
          value={stats.urgent}
          icon={HiExclamationCircle}
          color="text-red-600"
        />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Dossiers urgents */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Dossiers urgents
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            {dossiersUrgents.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {dossiersUrgents.map((dossier) => (
                  <div
                    key={dossier.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-red-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {dossier.numero}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {dossier.objet}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                      <BadgeStatut statut={dossier.statut} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-gray-500">
                Aucun dossier urgent
              </p>
            )}
          </div>
        </div>

        {/* Dossiers récents */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Dossiers récents
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            {dossiersRecents.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {dossiersRecents.map((dossier) => (
                  <div
                    key={dossier.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {dossier.numero}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {dossier.objet}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(dossier.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                      <BadgeStatut statut={dossier.statut} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-gray-500">
                Aucun dossier récent
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
