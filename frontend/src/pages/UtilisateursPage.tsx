import React, { useState } from 'react';
import { mockUsers } from '../data/mockData';
import { UserForm } from '../components/UserForm';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { ModalConfirmation } from '../components/ModalConfirmation';
import { ToastNotification } from '../components/ToastNotification';
import type { User } from '../data/mockData';

export const UtilisateursPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleSaveUser = (userData: Omit<User, 'id'>) => {
    if (selectedUser) {
      // Modifier utilisateur existant
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...userData, id: selectedUser.id }
          : user
      ));
      setToast({ message: 'Utilisateur modifié avec succès', type: 'success' });
    } else {
      // Créer nouvel utilisateur
      const newUser: User = {
        ...userData,
        id: Date.now().toString()
      };
      setUsers(prev => [...prev, newUser]);
      setToast({ message: 'Utilisateur créé avec succès', type: 'success' });
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (user: User) => {
    setDeleteModal({ isOpen: true, user });
  };

  const confirmDelete = () => {
    if (deleteModal.user) {
      setUsers(prev => prev.filter(u => u.id !== deleteModal.user?.id));
      setDeleteModal({ isOpen: false, user: null });
      setToast({ message: 'Utilisateur supprimé avec succès', type: 'success' });
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'agent':
        return 'Agent CT';
      case 'chef':
        return 'Chef de service';
      case 'responsable':
        return 'Responsable';
      case 'admin':
        return 'Administrateur';
      default:
        return role;
    }
  };

  const getRoleBadge = (role: string) => {
    const baseClass = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (role) {
      case 'agent':
        return `${baseClass} bg-blue-100 text-blue-800`;
      case 'chef':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'responsable':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'admin':
        return `${baseClass} bg-purple-100 text-purple-800`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-sm sm:text-base text-gray-600">Administration des comptes utilisateurs</p>
        </div>
        <button 
          onClick={handleCreateUser}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
        >
          <HiPlus className="h-4 w-4 mr-2" />
          Nouvel utilisateur
        </button>
      </div>

      {/* Version desktop - Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.prenom} {user.nom}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getRoleBadge(user.role)}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.services.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Modifier"
                      >
                        <HiPencil className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <HiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Version mobile - Cartes */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {user.prenom} {user.nom}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEditUser(user)}
                  className="text-yellow-600 hover:text-yellow-900 p-2 rounded-full hover:bg-yellow-50"
                  title="Modifier"
                >
                  <HiPencil className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDelete(user)}
                  className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                  title="Supprimer"
                >
                  <HiTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Rôle:</span>
                <span className={getRoleBadge(user.role)}>
                  {getRoleLabel(user.role)}
                </span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Services:</span>
                <div className="flex flex-wrap gap-1">
                  {user.services.map((service, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-800">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg">Aucun utilisateur disponible</p>
            <p className="text-sm mt-2">Créez votre premier utilisateur pour commencer</p>
          </div>
        </div>
      )}

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onClose={handleCloseForm}
          onSave={handleSaveUser}
        />
      )}

      <ModalConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={confirmDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer l'utilisateur ${deleteModal.user?.prenom} ${deleteModal.user?.nom} ?`}
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
