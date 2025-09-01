import React from 'react';

const StatCard: React.FC<{ icon: React.ReactNode; value: string | number; label: string; sublabel: string }> = ({ icon, value, label, sublabel }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
        {icon}
        <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-slate-500 text-sm">{label}</p>
            <p className="text-slate-400 text-xs">{sublabel}</p>
        </div>
    </div>
);

export const Dashboard: React.FC = () => {
    const weeklyProgress = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const completedDays = [true, true, false, true, false, false, false];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
            {/* Welcome Banner */}
            <div className="bg-brand-primary text-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">¡Hola, Janier! 👋</h1>
                        <p className="text-green-100">Listo para conquistar tu entrenamiento de hoy</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold">0 <span className="text-lg font-normal">Días de racha</span></p>
                        <p className="text-3xl font-bold">0 <span className="text-lg font-normal">Esta semana</span></p>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard icon={<div className="text-green-500">🏋️</div>} value={0} label="Entrenamientos" sublabel="Este mes" />
                 <StatCard icon={<div className="text-blue-500">👥</div>} value={0} label="Clases Asistidas" sublabel="Este mes" />
                 <StatCard icon={<div className="text-orange-500">⚡️</div>} value={0} label="Racha Actual" sublabel="Días consecutivos" />
                 <StatCard icon={<div className="text-purple-500">🎯</div>} value={0} label="Rutinas Activas" sublabel="Asignadas" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Mis Rutinas Activas */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-800">Mis Rutinas Activas</h2>
                            <button className="text-sm font-semibold text-brand-primary hover:underline">Ver Todas &gt;</button>
                        </div>
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-3xl">🗂️</span>
                            </div>
                            <p className="font-semibold text-slate-700">No tienes rutinas asignadas aún</p>
                            <p className="text-slate-500 text-sm">Habla con tu entrenador para comenzar</p>
                        </div>
                    </div>

                    {/* Progreso Esta Semana */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-1">Progreso Esta Semana</h2>
                        <p className="text-sm text-slate-500 mb-4">Tu actividad y rendimiento semanal</p>
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-semibold">Entrenamientos</p>
                            <p className="font-bold">3/4</p>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                            <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="flex justify-between">
                            {weeklyProgress.map((day, index) => (
                                <div key={day} className="flex flex-col items-center gap-2">
                                    <p className="text-sm text-slate-500">{day}</p>
                                    <div className={`w-8 h-8 rounded-full ${completedDays[index] ? 'bg-brand-secondary' : 'bg-slate-200'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Próxima Clase */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                         <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Próxima Clase
                        </h2>
                        <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Yoga class" className="rounded-lg mb-4 w-full h-40 object-cover" />
                        <h3 className="font-bold">Hatha Yoga Flow</h3>
                        <p className="text-sm text-slate-500">Instructor: Laura Morales</p>
                        <p className="text-sm font-semibold text-green-600 my-2">Martes, 07:00 a. m.</p>
                        <button className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors">Ver Mi Horario</button>
                    </div>

                    {/* AI Coach */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">AI Coach</h2>
                        <p className="text-sm text-slate-500 mb-4">Recomendaciones personalizadas para ti</p>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="text-yellow-500 pt-1">💡</div>
                                <div>
                                    <h4 className="font-semibold">Mejora tu técnica</h4>
                                    <p className="text-sm text-slate-600">He notado que podrías beneficiarte de trabajar en tu postura durante las sentadillas.</p>
                                </div>
                            </li>
                             <li className="flex gap-3">
                                <div className="text-green-500 pt-1">🎉</div>
                                <div>
                                    <h4 className="font-semibold">¡Vas genial!</h4>
                                    <p className="text-sm text-slate-600">Has completado todas tus rutinas esta semana. ¡Sigue así!</p>
                                </div>
                            </li>
                             <li className="flex gap-3">
                                <div className="text-blue-500 pt-1">💧</div>
                                <div>
                                    <h4 className="font-semibold">Hidratación</h4>
                                    <p className="text-sm text-slate-600">Recuerda beber agua cada 15-20 minutos durante tu entrenamiento de cardio.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};