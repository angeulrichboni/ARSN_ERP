import React from 'react';
import { observationOptions } from '../data/mockData';

interface ObservationChecklistProps {
  selectedObservations: string[];
  onChange: (observations: string[]) => void;
  className?: string;
}

export const ObservationChecklist: React.FC<ObservationChecklistProps> = ({
  selectedObservations,
  onChange,
  className = ''
}) => {
  const handleToggle = (observation: string) => {
    const newObservations = selectedObservations.includes(observation)
      ? selectedObservations.filter(obs => obs !== observation)
      : [...selectedObservations, observation];
    
    onChange(newObservations);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Observations
      </label>
      <div className="space-y-2">
        {observationOptions.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={`obs-${option}`}
              checked={selectedObservations.includes(option)}
              onChange={() => handleToggle(option)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor={`obs-${option}`}
              className="ml-2 block text-sm text-gray-900"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
