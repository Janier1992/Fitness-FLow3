import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExerciseLibrary } from './pages/ExerciseLibrary';

const App: React.FC = () => {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <ExerciseLibrary />
      </main>
      <Footer />
    </div>
  );
};

export default App;