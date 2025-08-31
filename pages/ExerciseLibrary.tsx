import React, { useState, useMemo } from 'react';
import { EXERCISE_DATA, CATEGORIES, DIFFICULTIES } from '../data/exercises';
import { ExerciseCard } from '../components/ExerciseCard';
import { type LibraryExercise, type ExerciseDifficulty } from '../types';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const ExerciseLibrary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');

    const filteredExercises = useMemo(() => {
        return EXERCISE_DATA.filter(exercise => {
            const nameMatch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategory === 'Todas' || exercise.tags.map(t => t.toLowerCase()).includes(selectedCategory.toLowerCase());
            const difficultyMatch = selectedDifficulty === 'Todas' || exercise.difficulty === selectedDifficulty;
            return nameMatch && categoryMatch && difficultyMatch;
        });
    }, [searchTerm, selectedCategory, selectedDifficulty]);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Biblioteca de Ejercicios</h1>
                <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">Explora nuestra amplia colección de ejercicios con instrucciones detalladas</p>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 mb-8 sticky top-[65px] z-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar ejercicios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <SearchIcon />
                        </div>
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                         className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none bg-white"
                    >
                        <option value="Todas">Todas las categorías</option>
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none bg-white"
                    >
                        <option value="Todas">Todas las dificultades</option>
                         {DIFFICULTIES.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-slate-600 font-semibold">{filteredExercises.length} ejercicios encontrados</p>
            </div>


            {/* Exercise Grid */}
            {filteredExercises.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredExercises.map(exercise => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-slate-500 text-lg">No se encontraron ejercicios que coincidan con tu búsqueda.</p>
                </div>
            )}
        </div>
    );
};