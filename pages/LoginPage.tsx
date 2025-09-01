import React, { useState } from 'react';
import {
    FitnessFlowLogo,
    MailIcon,
    LockIcon,
    EyeOpenIcon,
    EyeClosedIcon
} from '../components/FormIcons';

interface LoginPageProps {
    onNavigateToRegister: () => void;
    onLoginSuccess: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToRegister, onLoginSuccess }) => {
    const [accountType, setAccountType] = useState<'user' | 'gym'>('user');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        console.log(`Simulando inicio de sesión para ${accountType}:`, { email });
        // En una aplicación real, aquí se haría una llamada a la API.
        // Si la autenticación es exitosa:
        onLoginSuccess(email);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-500 flex flex-col items-center justify-center p-4 font-sans">
            <main className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-block bg-white p-4 rounded-full shadow-lg mb-4">
                        <FitnessFlowLogo />
                    </div>
                    <h1 className="text-4xl font-bold text-white drop-shadow-md">FitnessFlow</h1>
                    <p className="text-white/90 text-lg">Tu gimnasio digital en Medellín</p>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
                     <div className="flex bg-slate-100 p-1 rounded-full mb-6">
                        <button
                            onClick={() => setAccountType('user')}
                            className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${accountType === 'user' ? 'bg-white shadow text-brand-primary' : 'text-slate-600'}`}
                        >
                            Usuario
                        </button>
                        <button
                            onClick={() => setAccountType('gym')}
                            className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${accountType === 'gym' ? 'bg-white shadow text-brand-primary' : 'text-slate-600'}`}
                        >
                            Gimnasio
                        </button>
                    </div>

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Iniciar Sesión como {accountType === 'user' ? 'Usuario' : 'Gimnasio'}</h2>
                        <p className="text-slate-500">Ingresa a tu cuenta para continuar</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="correo" className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                    <MailIcon />
                                </span>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="contrasena" className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                    <LockIcon />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="contrasena"
                                    name="contrasena"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Tu contraseña"
                                    required
                                    className="w-full pl-10 pr-10 py-2 bg-slate-100 border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 shadow-lg hover:shadow-green-500/50"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        ¿No tienes cuenta? <button onClick={onNavigateToRegister} className="font-medium text-brand-primary hover:underline">Regístrate aquí</button>
                    </p>
                </div>
            </main>
            <footer className="absolute bottom-4 text-center w-full">
                <p className="text-white/80 text-sm">Plataforma segura para la gestión de tu entrenamiento</p>
            </footer>
        </div>
    );
};