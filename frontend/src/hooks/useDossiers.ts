import { useContext } from 'react';
import { DossierContext } from '../contexts/DossierContext';

export const useDossiers = () => {
  const context = useContext(DossierContext);
  if (context === undefined) {
    throw new Error('useDossiers must be used within a DossierProvider');
  }
  return context;
};
