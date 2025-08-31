import React, { useState } from 'react';
import { type UserProfile } from '../types';

interface OnboardingFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const equipmentOptions = [
  'Peso Corporal',
  'Mancuernas',
  'Barra',
  'Pesas Rusas',
  'Bandas de Resistencia',
  'Barra de Dominadas',
  'Caminadora',
  'Bicicleta Estática',
];

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit }) => {
  const [goal, setGoal] = useState<UserProfile['goal']>('build_muscle');
  const [level, setLevel] = useState<UserProfile['level']>('beginner');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [equipment, setEquipment] = useState<string[]>(['Peso Corporal']);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEquipmentChange = (item: string) => {
    setEquipment((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onSubmit({ goal, level, daysPerWeek, equipment, notes });
  };

  return (
    <div className="bg-gray-800/50 p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-md border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-2 text-brand-secondary">Crea Tu Plan con Inteligencia Artificial</h2>
      <p className="text-center text-gray-300 mb-8">Cuéntanos sobre ti y nuestro Entrenador con IA creará un plan solo para ti.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Goal */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-200">¿Cuál es tu objetivo principal?</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value as UserProfile['goal'])} className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-brand-accent focus:outline-none">
            <option value="build_muscle">Ganar Músculo</option>
            <option value="lose_fat">Perder Grasa</option>
            <option value="improve_endurance">Mejorar Resistencia</option>
            <option value="general_fitness">Fitness General</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-200">¿Cuál es tu nivel de experiencia?</label>
          <select value={level} onChange={(e) => setLevel(e.target.value as UserProfile['level'])} className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-brand-accent focus:outline-none">
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>

        {/* Days Per Week */}
        <div>
          <label htmlFor="days" className="block text-lg font-semibold mb-2 text-gray-200">¿Cuántos días a la semana puedes entrenar?</label>
          <div className="flex items-center gap-4">
            <input type="range" id="days" min="1" max="7" value={daysPerWeek} onChange={(e) => setDaysPerWeek(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-secondary" />
            <span className="bg-brand-secondary text-brand-dark font-bold text-lg rounded-full h-10 w-10 flex items-center justify-center">{daysPerWeek}</span>
          </div>
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-200">¿A qué equipo tienes acceso?</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {equipmentOptions.map((item) => (
              <label key={item} className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${equipment.includes(item) ? 'bg-brand-secondary border-brand-secondary text-brand-dark font-semibold' : 'bg-gray-700 border-gray-600 text-gray-200 hover:border-brand-accent'}`}>
                <input type="checkbox" checked={equipment.includes(item)} onChange={() => handleEquipmentChange(item)} className="hidden" />
                {item}
              </label>
            ))}
          </div>
        </div>
        
        {/* Notes */}
        <div>
           <label htmlFor="notes" className="block text-lg font-semibold mb-2 text-gray-200">¿Alguna nota o limitación específica?</label>
           <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Ej: enfocar en piernas, evitar alto impacto en rodillas..." className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-brand-accent focus:outline-none"></textarea>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-brand-accent text-brand-dark font-bold text-xl py-4 px-6 rounded-lg hover:bg-yellow-400 transition-transform duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100">
          {isLoading ? 'Generando...' : 'Generar Mi Plan'}
        </button>
      </form>
    </div>
  );
};