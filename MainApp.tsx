import React, { useState } from 'react';
import { Header, NavItem } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';
import { ExerciseLibrary } from './pages/ExerciseLibrary';
import { GroupClasses } from './pages/GroupClasses';
import { MyRoutines } from './pages/MyRoutines';
import { MyProgress } from './pages/MyProgress';
import { AICoach } from './pages/AICoach';
import { User } from './App';
import { InventoryManagement } from './pages/InventoryManagement';

// --- Icon Imports for Nav ---
const HomeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> </svg> );
const ExercisesIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /> </svg> );
const ClassesIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> </svg> );
const RoutinesIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /> </svg> );
const ProgressIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> </svg> );
const AiCoachIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> </svg> );
const InventoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>);

// --- Nav Item Definitions ---
const userNavItems = [
    { name: 'Inicio', icon: <HomeIcon />, premium: false },
    { name: 'Ejercicios', icon: <ExercisesIcon />, premium: false },
    { name: 'Clases', icon: <ClassesIcon />, premium: true },
    { name: 'Mis Rutinas', icon: <RoutinesIcon />, premium: true },
    { name: 'Mi Progreso', icon: <ProgressIcon />, premium: false },
    { name: 'AI Coach', icon: <AiCoachIcon />, premium: true },
];

const gymNavItems = [
    { name: 'Inicio', icon: <HomeIcon />, premium: false },
    { name: 'Inventario', icon: <InventoryIcon />, premium: true },
];

const UpgradePrompt: React.FC<{ featureName: string }> = ({ featureName }) => (
    <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-slate-800">Función Premium 🌟</h2>
            <p className="mt-4 text-slate-600">
                La sección <span className="font-semibold">{featureName}</span> es exclusiva para nuestros miembros Premium.
                ¡Actualiza tu plan para desbloquear esta y muchas otras funcionalidades avanzadas!
            </p>
            <button className="mt-6 bg-brand-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-secondary transition-colors">
                Ver Planes Premium
            </button>
        </div>
    </div>
);


interface MainAppProps {
    user: User;
    onLogout: () => void;
}

type PageName = 'Inicio' | 'Ejercicios' | 'Clases' | 'Mis Rutinas' | 'Mi Progreso' | 'AI Coach' | 'Inventario';

export const MainApp: React.FC<MainAppProps> = ({ user, onLogout }) => {
    
    const isUser = user.accountType === 'user';
    const baseNavItems = isUser ? userNavItems : gymNavItems;
    const visibleNavItems = baseNavItems.filter(item => !item.premium || user.plan === 'premium');
    
    const [activePage, setActivePage] = useState<PageName>('Inicio');

    const renderPage = () => {
        const pageConfig = baseNavItems.find(p => p.name === activePage);
        if (pageConfig?.premium && user.plan === 'básico') {
            return <UpgradePrompt featureName={activePage} />;
        }

        switch(activePage) {
            // User Pages
            case 'Inicio': return isUser ? <Dashboard /> : <Dashboard />; // Could be a GymDashboard later
            case 'Ejercicios': return <ExerciseLibrary />;
            case 'Clases': return <GroupClasses />;
            case 'Mis Rutinas': return <MyRoutines />;
            case 'Mi Progreso': return <MyProgress user={user}/>;
            case 'AI Coach': return <AICoach />;
            // Gym Pages
            case 'Inventario': return <InventoryManagement />;
            default:
                return isUser ? <Dashboard /> : <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header user={user} activeItem={activePage} navItems={visibleNavItems} onNavigate={(page) => setActivePage(page as PageName)} onLogout={onLogout} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};