import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GroupClasses } from './pages/GroupClasses';
import { ExerciseLibrary } from './pages/ExerciseLibrary';
import { Dashboard } from './pages/Dashboard';
import { MyProgress } from './pages/MyProgress';
import { AICoach } from './pages/AICoach';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'Inicio':
        return <Dashboard />;
      case 'Ejercicios':
        return <ExerciseLibrary />;
      case 'Clases':
        return <GroupClasses />;
      case 'Mi Progreso':
        return <MyProgress />;
      case 'AI Coach':
        return <AICoach />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header activeItem={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;