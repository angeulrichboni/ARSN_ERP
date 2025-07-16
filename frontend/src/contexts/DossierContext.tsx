import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Dossier, Service } from '../data/mockData';
import { mockDossiers, mockServices } from '../data/mockData';

interface DossierContextType {
  dossiers: Dossier[];
  services: Service[];
  addDossier: (dossier: Omit<Dossier, 'id' | 'createdAt' | 'updatedAt' | 'historique'>) => void;
  updateDossier: (id: string, updates: Partial<Dossier>) => void;
  deleteDossier: (id: string) => void;
  getDossierById: (id: string) => Dossier | undefined;
  getServiceById: (id: string) => Service | undefined;
}

export const DossierContext = createContext<DossierContextType | undefined>(undefined);

interface DossierProviderProps {
  children: ReactNode;
}

export const DossierProvider: React.FC<DossierProviderProps> = ({ children }) => {
  const [dossiers, setDossiers] = useState<Dossier[]>(mockDossiers);
  const [services] = useState<Service[]>(mockServices);

  const addDossier = (dossierData: Omit<Dossier, 'id' | 'createdAt' | 'updatedAt' | 'historique'>) => {
    const newDossier: Dossier = {
      ...dossierData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      historique: [
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          action: 'Création du dossier',
          utilisateur: 'Utilisateur actuel',
          details: 'Dossier créé via l\'interface'
        }
      ]
    };
    setDossiers(prev => [...prev, newDossier]);
  };

  const updateDossier = (id: string, updates: Partial<Dossier>) => {
    setDossiers(prev => prev.map(dossier => {
      if (dossier.id === id) {
        const updatedDossier = { ...dossier, ...updates, updatedAt: new Date().toISOString() };
        
        // Ajouter à l'historique si le statut change
        if (updates.statut && updates.statut !== dossier.statut) {
          updatedDossier.historique = [
            ...dossier.historique,
            {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              action: `Changement de statut vers ${updates.statut}`,
              utilisateur: 'Utilisateur actuel',
              details: `Statut modifié de ${dossier.statut} vers ${updates.statut}`
            }
          ];
        }
        
        return updatedDossier;
      }
      return dossier;
    }));
  };

  const deleteDossier = (id: string) => {
    setDossiers(prev => prev.filter(dossier => dossier.id !== id));
  };

  const getDossierById = (id: string) => {
    return dossiers.find(dossier => dossier.id === id);
  };

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };

  const value: DossierContextType = {
    dossiers,
    services,
    addDossier,
    updateDossier,
    deleteDossier,
    getDossierById,
    getServiceById
  };

  return (
    <DossierContext.Provider value={value}>
      {children}
    </DossierContext.Provider>
  );
};
