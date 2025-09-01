import React from 'react';
import { type GroupClass, type ExerciseDifficulty } from '../types';

const difficultyStyles: Record<ExerciseDifficulty, string> = {
    Principiante: 'bg-green-100 text-green-800',
    Intermedio: 'bg-yellow-100 text-yellow-800',
    Avanzado: 'bg-red-100 text-red-800',
};

const categoryIcons: Record<string, React.ReactNode> = {
    CrossFit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    Yoga: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-8-6l4-4 4 4" /></svg>,
    Pilates: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M12 6v.01M12 12v.01M12 18v.01" /></svg>,
}

export const ClassCard: React.FC<{ classData: GroupClass }> = ({ classData }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
                <img src={classData.imageUrl} alt={classData.name} className="w-full h-48 object-cover" />
                {classData.price && (
                     <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-slate-900">
                        ${classData.price.toLocaleString('es-CO')}
                    </span>
                )}
                <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${difficultyStyles[classData.difficulty]}`}>
                    {classData.difficulty.toUpperCase()}
                </span>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800 pr-2">{classData.name}</h3>
                    {categoryIcons[classData.category] || null}
                </div>

                <p className="text-slate-600 text-sm mb-4 flex-grow">{classData.description}</p>
                
                <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span>{classData.instructor}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span>Capacidad: {classData.capacity} personas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{classData.duration} minutos</span>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Próximas clases:</h4>
                <div className="space-y-1 text-sm text-slate-500">
                    {classData.schedule.map((s, index) => (
                        <div key={index} className="flex justify-between">
                            <span>{s.day}</span>
                            <span className="font-medium">{s.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
