import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDossiers } from '../hooks/useDossiers';
import { BadgeStatut } from './BadgeStatut';
import { HiEye, HiPencil, HiTrash, HiSearch } from 'react-icons/hi';
import type { Dossier } from '../data/mockData';

interface DossierTableProps {
  dossiers: Dossier[];
  onEdit: (dossier: Dossier) => void;
  onDelete?: (dossier: Dossier) => void;
  onViewDetail?: (dossier: Dossier) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export const DossierTable: React.FC<DossierTableProps> = ({ 
  dossiers, 
  onEdit, 
  onDelete, 
  onViewDetail, 
  canEdit: canEditProp, 
  canDelete: canDeleteProp 
}) => {
  const { user } = useAuth();
  const { getServiceById } = useDossiers();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'numero' | 'statut'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const canEdit = canEditProp ?? (user?.role === 'chef' || user?.role === 'admin');
  const canDelete = canDeleteProp ?? (user?.role === 'admin');

  // Filtrage et tri
  const filteredDossiers = dossiers
    .filter(dossier => {
      const matchesSearch = dossier.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dossier.objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dossier.expediteur.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || dossier.statut === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      switch (sortBy) {
        case 'numero':
          aValue = a.numero;
          bValue = b.numero;
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'statut':
          aValue = a.statut;
          bValue = b.statut;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (column: 'date' | 'numero' | 'statut') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleDelete = (dossier: Dossier) => {
    if (onDelete) {
      onDelete(dossier);
    }
  };

  const handleViewDetail = (dossier: Dossier) => {
    if (onViewDetail) {
      onViewDetail(dossier);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="en_cours">En cours</option>
            <option value="cloture">Clôturé</option>
            <option value="urgent">Urgent</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'numero' | 'statut')}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date">Trier par date</option>
            <option value="numero">Trier par numéro</option>
            <option value="statut">Trier par statut</option>
          </select>
        </div>
      </div>

      {/* Version mobile (cards) */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {filteredDossiers.map((dossier) => (
            <div key={dossier.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {dossier.numero}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(dossier.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <BadgeStatut statut={dossier.statut} />
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-600 truncate">
                  <span className="font-medium">Expéditeur:</span> {dossier.expediteur}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  <span className="font-medium">Objet:</span> {dossier.objet}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {dossier.servicesImputes.map((serviceId) => (
                    <span
                      key={serviceId}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {getServiceById(serviceId)?.nom || serviceId}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleViewDetail(dossier)}
                  className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                  title="Voir le détail"
                >
                  <HiEye className="h-4 w-4" />
                </button>
                {canEdit && (
                  <button
                    onClick={() => onEdit(dossier)}
                    className="p-2 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded-md transition-colors"
                    title="Modifier"
                  >
                    <HiPencil className="h-4 w-4" />
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => handleDelete(dossier)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                    title="Supprimer"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Version desktop (tableau) */}
      <div className="hidden sm:block">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('numero')}
                  >
                    Numéro
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('date')}
                  >
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expéditeur
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Objet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('statut')}
                  >
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDossiers.map((dossier) => (
                  <tr key={dossier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dossier.numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(dossier.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dossier.expediteur}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-500">
                      {dossier.objet}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {dossier.servicesImputes.slice(0, 2).map((serviceId) => (
                          <span
                            key={serviceId}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {getServiceById(serviceId)?.nom || serviceId}
                          </span>
                        ))}
                        {dossier.servicesImputes.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{dossier.servicesImputes.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <BadgeStatut statut={dossier.statut} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetail(dossier)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir le détail"
                        >
                          <HiEye className="h-5 w-5" />
                        </button>
                        {canEdit && (
                          <button
                            onClick={() => onEdit(dossier)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Modifier"
                          >
                            <HiPencil className="h-5 w-5" />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(dossier)}
                            className="text-red-600 hover:text-red-900"
                            title="Supprimer"
                          >
                            <HiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredDossiers.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500">Aucun dossier trouvé</p>
        </div>
      )}
    </div>
  );
};
