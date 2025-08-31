import React from 'react';
import { type LibraryExercise, type ExerciseDifficulty } from '../types';

interface ExerciseCardProps {
  exercise: LibraryExercise;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 cursor-pointer ${filled ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`} fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const PremiumIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
)

const difficultyStyles: Record<ExerciseDifficulty, string> = {
    Principiante: 'bg-green-100 text-green-800',
    Intermedio: 'bg-yellow-100 text-yellow-800',
    Avanzado: 'bg-red-100 text-red-800',
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
                <img src={exercise.imageUrl} alt={exercise.name} className="w-full h-48 object-cover" />
                <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${difficultyStyles[exercise.difficulty]}`}>
                    {exercise.difficulty.toUpperCase()}
                </span>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800 pr-2">{exercise.name}</h3>
                    {exercise.isPremium ? <PremiumIcon /> : <HeartIcon filled={exercise.isFavorite} />}
                </div>

                <p className="text-slate-600 text-sm mb-4 flex-grow">{exercise.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {exercise.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium text-brand-primary bg-green-50 rounded-full">
                            {tag.toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>

            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
                <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{exercise.duration}min</span>
                </div>
                <div className="flex items-center gap-1">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <span>~{exercise.caloriesPerMin}/min</span>
                </div>
            </div>
        </div>
    );
};