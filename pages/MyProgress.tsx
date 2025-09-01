import React from 'react';
import { PROGRESS_DATA } from '../data/progress';
import { WeeklyVolumeChart } from '../components/charts/WeeklyVolumeChart';

const KpiCard: React.FC<{ icon: string; value: string; label: string; }> = ({ icon, value, label }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-slate-500 text-sm">{label}</p>
            </div>
        </div>
    </div>
);

export const MyProgress: React.FC = () => {
    const { kpis, weeklyVolume, personalRecords, achievements } = PROGRESS_DATA;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Mi Progreso</h1>
                <p className="mt-2 text-lg text-slate-600 max-w-2xl">Tu panel de control personal de rendimiento y logros.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard icon="🏋️" value={kpis.totalWorkouts.toString()} label="Entrenamientos Totales" />
                <KpiCard icon="⚖️" value={`${kpis.totalVolumeKg} kg`} label="Volumen Total Levantado" />
                <KpiCard icon="⏱️" value={`${kpis.timeInvestedHours}h`} label="Tiempo Entrenado" />
                <KpiCard icon="🏆" value={kpis.prsBeaten.toString()} label="Récords Personales Batidos" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Main Charts) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Weekly Volume */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Volumen de Entrenamiento Semanal (kg)</h2>
                        <div className="h-64">
                            <WeeklyVolumeChart data={weeklyVolume} />
                        </div>
                    </div>

                    {/* Personal Records */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Récords Personales (PRs)</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-sm text-slate-500">
                                    <tr>
                                        <th className="p-2 font-semibold">Ejercicio</th>
                                        <th className="p-2 font-semibold">Peso</th>
                                        <th className="p-2 font-semibold">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personalRecords.map(pr => (
                                        <tr key={pr.exercise} className="border-t border-slate-200">
                                            <td className="p-2 font-medium text-slate-700">{pr.exercise}</td>
                                            <td className="p-2 font-bold text-brand-primary">{pr.weight} kg</td>
                                            <td className="p-2 text-slate-500">{pr.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column (Achievements) */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Logros Desbloqueados</h2>
                        <ul className="space-y-4">
                            {achievements.map(ach => (
                                <li key={ach.id} className={`flex items-center gap-4 p-3 rounded-lg ${ach.unlocked ? 'bg-green-50' : 'bg-slate-100'}`}>
                                    <div className={`text-3xl ${ach.unlocked ? '' : 'opacity-40'}`}>{ach.icon}</div>
                                    <div>
                                        <h4 className={`font-semibold ${ach.unlocked ? 'text-slate-800' : 'text-slate-500'}`}>{ach.name}</h4>
                                        <p className="text-sm text-slate-500">{ach.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};