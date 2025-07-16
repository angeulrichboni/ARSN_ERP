import React from 'react';

interface BadgeStatutProps {
  statut: 'en_cours' | 'cloture' | 'urgent';
  className?: string;
}

export const BadgeStatut: React.FC<BadgeStatutProps> = ({ statut, className = '' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'en_cours':
        return {
          label: 'En cours',
          className: 'bg-blue-100 text-blue-800'
        };
      case 'cloture':
        return {
          label: 'Clôturé',
          className: 'bg-green-100 text-green-800'
        };
      case 'urgent':
        return {
          label: 'Urgent',
          className: 'bg-red-100 text-red-800'
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const config = getStatusConfig(statut);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}>
      {config.label}
    </span>
  );
};
