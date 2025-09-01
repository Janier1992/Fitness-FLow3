import React, { useState } from 'react';
import { LandingHeader } from '../components/LandingHeader';
import { LandingFooter } from '../components/LandingFooter';

// Icons for Feature Cards
const IconRutinas = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const IconClases = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconSeguimiento = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconAICoach = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const IconAgenda = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconBiblioteca = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;


const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const userPlans = [
  {
    name: 'Básico',
    price: '15.000',
    description: 'Perfecto para comenzar tu journey fitness',
    features: ['Acceso al gimnasio', 'Rutinas básicas', 'Seguimiento de progreso', 'Biblioteca de ejercicios'],
    isPopular: false,
  },
  {
    name: 'Premium',
    price: '20.000',
    description: 'La experiencia completa para resultados serios',
    features: ['Todo del plan Básico', 'Rutinas personalizadas', 'Clases grupales ilimitadas', 'AI Coach personalizado', 'Análisis de progreso avanzado'],
    isPopular: true,
  },
];

const gymPlans = [
    {
        name: 'Básico',
        price: '50.000',
        description: 'Ideal para gimnasios pequeños que empiezan a digitalizarse',
        features: ['Gestión de hasta 100 miembros', 'Creación de clases y horarios', 'Panel de administración', 'Soporte por email'],
        isPopular: false,
    },
    {
        name: 'Premium',
        price: '70.000',
        description: 'La solución completa para gestionar y hacer crecer tu gimnasio',
        features: ['Miembros ilimitados', 'Todo del plan Básico', 'Reportes de rendimiento avanzados', 'Portal de marca personalizada', 'Soporte prioritario 24/7'],
        isPopular: true,
    }
];

const PricingCard: React.FC<{ plan: typeof userPlans[0], planType: 'user' | 'gym', onSelect: (plan: 'básico' | 'premium') => void }> = ({ plan, planType, onSelect }) => (
    <div className={`border rounded-xl p-6 flex flex-col ${plan.isPopular ? 'border-brand-primary border-2' : 'border-slate-200'}`}>
        {plan.isPopular && <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Más Popular</span>}
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-4xl font-extrabold my-2">${plan.price}<span className="text-base font-medium text-slate-500">/mes</span></p>
        <p className="text-slate-600 mb-6 h-12">{plan.description}</p>
        <ul className="space-y-3 mb-8 flex-grow">
            {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-slate-700">{feature}</span>
                </li>
            ))}
        </ul>
        <button onClick={() => onSelect(plan.name.toLowerCase() as 'básico' | 'premium')} className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.isPopular ? 'bg-brand-primary text-white hover:bg-brand-secondary' : 'bg-white text-brand-primary border border-brand-primary hover:bg-green-50'}`}>
            Elegir Plan
        </button>
    </div>
);

interface LandingPageProps {
  onStartRegistration: (accountType: 'user' | 'gym', plan: 'básico' | 'premium') => void;
  onNavigateToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartRegistration, onNavigateToLogin }) => {
    const [planType, setPlanType] = useState<'user' | 'gym'>('user');

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePlanSelect = (plan: 'básico' | 'premium') => {
        onStartRegistration(planType, plan);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <LandingHeader onNavigateToRegister={() => onStartRegistration('user', 'básico')} onNavigateToLogin={onNavigateToLogin} />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">Tu <span className="text-brand-primary">transformación</span> comienza aquí</h1>
                            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">Entrena con rutinas personalizadas, únete a clases grupales y alcanza tus objetivos con el apoyo de nuestros entrenadores expertos en el corazón de Medellín.</p>
                            <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                                <button onClick={() => onStartRegistration('user', 'básico')} className="bg-brand-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-secondary transition-transform duration-300 transform hover:scale-105">Comenzar Ahora</button>
                                <button onClick={() => handleScroll('plans')} className="bg-white text-slate-700 font-semibold py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors">Ver Planes</button>
                            </div>
                             <div className="mt-12 flex justify-center lg:justify-start gap-8">
                                <div><p className="text-3xl font-bold">500+</p><p className="text-slate-500">Miembros Activos</p></div>
                                <div><p className="text-3xl font-bold">10+</p><p className="text-slate-500">Entrenadores</p></div>
                                <div><p className="text-3xl font-bold">50+</p><p className="text-slate-500">Clases Semanales</p></div>
                            </div>
                        </div>
                        <div className="relative">
                           <img src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Persona levantando pesas" className="rounded-2xl shadow-2xl w-full" />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-slate-50 py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Todo lo que necesitas para entrenar</h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                            FitnessFlow es tu aliado estratégico. Para nuestros usuarios, ofrecemos planes hiper-personalizados con IA para que alcancen sus metas de cardio y fuerza. Para los gimnasios, somos la herramienta definitiva para optimizar la gestión, aumentar la retención de miembros y potenciar los resultados de sus clientes.
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                           {[
                                { icon: <IconRutinas />, title: 'Rutinas Personalizadas', description: 'Obtén rutinas diseñadas específicamente para tus objetivos, nivel de experiencia y disponibilidad de tiempo.' },
                                { icon: <IconClases />, title: 'Clases Grupales', description: 'Únete a clases de Yoga, Spinning, Zumba, CrossFit y más. Reserva tu lugar fácilmente.' },
                                { icon: <IconSeguimiento />, title: 'Seguimiento de Progreso', description: 'Monitorea tu evolución con gráficos detallados de peso, medidas y rendimiento.' },
                                { icon: <IconAICoach />, title: 'AI Coach', description: 'Recibe recomendaciones inteligentes y motivación personalizada basada en tu progreso.' },
                                { icon: <IconAgenda />, title: 'Agenda Inteligente', description: 'Planifica tus entrenamientos y clases con nuestro sistema de calendario avanzado.' },
                                { icon: <IconBiblioteca />, title: 'Biblioteca de Ejercicios', description: 'Accede a más de 100 ejercicios con instrucciones detalladas y videos explicativos.' },
                            ].map(feature => (
                                <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-slate-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="plans" className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Planes que se adaptan a ti</h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Elige el plan perfecto para tu estilo de vida y objetivos fitness</p>
                        <div className="mt-8 inline-flex bg-slate-100 p-1 rounded-full">
                            <button onClick={() => setPlanType('user')} className={`px-6 py-2 rounded-full font-semibold transition-colors ${planType === 'user' ? 'bg-white shadow' : 'text-slate-600'}`}>Usuario</button>
                            <button onClick={() => setPlanType('gym')} className={`px-6 py-2 rounded-full font-semibold transition-colors ${planType === 'gym' ? 'bg-white shadow' : 'text-slate-600'}`}>Gimnasios</button>
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                           {(planType === 'user' ? userPlans : gymPlans).map(plan => (
                               <PricingCard key={plan.name} plan={plan} planType={planType} onSelect={handlePlanSelect} />
                           ))}
                        </div>
                    </div>
                </section>
                
                {/* Nosotros Section */}
                <section id="nosotros" className="bg-white py-20 px-4">
                    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block bg-green-100 text-brand-primary font-semibold px-3 py-1 rounded-full text-sm mb-4">Nuestra Historia</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Nacidos de la pasión por la tecnología y el fitness</h2>
                            <p className="mt-6 text-lg text-slate-600">
                                Somos una pequeña startup que nace en el corazón de Medellín, fundada por tres socios apasionados por la tecnología y, en especial, por el poder transformador de la Inteligencia Artificial. Vimos una oportunidad de unir nuestras dos pasiones: el desarrollo de software y un estilo de vida saludable.
                            </p>
                            <p className="mt-4 text-lg text-slate-600">
                                Nuestra misión es simple: democratizar el acceso a herramientas de fitness de élite. Creemos que todos, desde el atleta individual hasta el gimnasio de barrio, merecen la mejor tecnología para alcanzar sus metas. FitnessFlow es nuestro primer paso para inspirar confianza, motivar a otros a creer en sus sueños y construir una comunidad más fuerte y saludable, un entrenamiento a la vez.
                            </p>
                        </div>
                        <div>
                            <img src="https://images.pexels.com/photos/3574284/pexels-photo-3574284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Horizonte de Medellín" className="rounded-2xl shadow-xl w-full h-full object-cover" />
                        </div>
                    </div>
                </section>

            </main>
            <LandingFooter />
        </div>
    );
};