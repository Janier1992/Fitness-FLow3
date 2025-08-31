import React, { useState } from 'react';
import { type Exercise } from '../types';

interface ExerciseRowProps {
  exercise: Exercise;
}

export const ExerciseRow: React.FC<ExerciseRowProps> = ({ exercise }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Genera una URL de imagen de marcador de posición algo relevante
  const imageUrl = `https://loremflickr.com/320/240/${exercise.imageSearchQuery.replace(/\s/g, ',')},gym,exercise/all?lock=${encodeURIComponent(exercise.name)}`;


  return (
    <div className="border-b border-gray-700/50 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full text-left p-4 hover:bg-gray-700/40 focus:outline-none focus:bg-gray-700/60 transition-colors duration-200"
      >
        <div className="grid grid-cols-4 gap-2 items-center">
          <div className="col-span-4 sm:col-span-2">
            <p className="font-semibold text-gray-100">{exercise.name}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400 sm:hidden">Series</span>
            <p className="text-gray-200">{exercise.sets}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400 sm:hidden">Reps</span>
            <p className="text-gray-200">{exercise.reps}</p>
          </div>
        </div>
      </button>
      {isExpanded && (
        <div className="p-4 bg-gray-900/50 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h5 className="font-semibold text-brand-accent mb-2">Puntos Clave de la Forma</h5>
              <p className="text-gray-300 text-sm whitespace-pre-line">{exercise.description}</p>
              <p className="text-gray-300 text-sm mt-4">
                <strong>Descanso:</strong> {exercise.rest} segundos entre series.
              </p>
            </div>
            <div className="md:col-span-1 flex items-center justify-center">
                <img 
                  src={imageUrl} 
                  alt={`Demostración de ${exercise.name}`} 
                  className="rounded-lg shadow-lg w-full h-auto object-cover max-w-xs mx-auto"
                  loading="lazy"
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
