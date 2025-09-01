import React, { useState, useEffect } from 'react';
import { 
    FitnessFlowLogo, 
    UserIcon, 
    MailIcon, 
    LockIcon,
    GymIcon,
    NitIcon
} from '../components/FormIcons';

interface RegisterPageProps {
    onNavigateToLogin: () => void;
    onRegisterSuccess: (data: { email: string, accountType: 'user' | 'gym', plan: 'básico' | 'premium' }) => void;
    initialAccountType: 'user' | 'gym';
    initialPlan: 'básico' | 'premium';
}

const InputField: React.FC<{ id: string; name: string; label: string; type?: string; placeholder: string; icon: React.ReactNode; required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; }> = ({ id, name, label, type = 'text', placeholder, icon, required = true, value, onChange, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}{required && ' *'}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                {icon}
            </span>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full pl-10 pr-3 py-2 bg-slate-100 border rounded-md text-slate-800 focus:ring-2 outline-none ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-primary'}`}
                placeholder={placeholder}
                required={required}
            />
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

type UserErrorData = {
    nombre?: string;
    apellido?: string;
    correo?: string;
    contrasena?: string;
    confirmarContrasena?: string;
    terminos?: string;
};

type GymErrorData = {
    nombreGimnasio?: string;
    nit?: string;
    correo?: string;
    contrasena?: string;
    confirmarContrasena?: string;
    terminos?: string;
};

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigateToLogin, onRegisterSuccess, initialAccountType, initialPlan }) => {
    const [accountType, setAccountType] = useState<'user' | 'gym'>(initialAccountType);
    
    // User Form State
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        terminos: false
    });
    const [userErrors, setUserErrors] = useState<UserErrorData>({});

    // Gym Form State
    const [gymData, setGymData] = useState({
        nombreGimnasio: '',
        nit: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        terminos: false
    });
    const [gymErrors, setGymErrors] = useState<GymErrorData>({});

    useEffect(() => {
        setAccountType(initialAccountType);
    }, [initialAccountType]);

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleGymChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setGymData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateUserForm = (): boolean => {
        const errors: UserErrorData = {};
        if (!userData.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
        if (!userData.apellido.trim()) errors.apellido = 'El apellido es obligatorio.';
        if (!/^\S+@\S+\.\S+$/.test(userData.correo)) errors.correo = 'El correo electrónico no es válido.';
        if (userData.contrasena.length < 6) errors.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
        if (userData.contrasena !== userData.confirmarContrasena) errors.confirmarContrasena = 'Las contraseñas no coinciden.';
        if (!userData.terminos) errors.terminos = 'Debes aceptar los términos y condiciones.';
        
        setUserErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateGymForm = (): boolean => {
        const errors: GymErrorData = {};
        if (!gymData.nombreGimnasio.trim()) errors.nombreGimnasio = 'El nombre del gimnasio es obligatorio.';
        if (!/^\d{3}\.\d{3}\.\d{3}-\d$/.test(gymData.nit)) errors.nit = 'Formato de NIT inválido. Ej: 900.123.456-7';
        if (!/^\S+@\S+\.\S+$/.test(gymData.correo)) errors.correo = 'El correo electrónico no es válido.';
        if (gymData.contrasena.length < 6) errors.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
        if (gymData.contrasena !== gymData.confirmarContrasena) errors.confirmarContrasena = 'Las contraseñas no coinciden.';
        if (!gymData.terminos) errors.terminos = 'Debes aceptar los términos y condiciones.';

        setGymErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (accountType === 'user') {
            if (validateUserForm()) {
                onRegisterSuccess({ email: userData.correo, accountType: 'user', plan: initialPlan });
            }
        } else {
            if (validateGymForm()) {
                onRegisterSuccess({ email: gymData.correo, accountType: 'gym', plan: initialPlan });
            }
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-500 flex items-center justify-center p-4 font-sans">
            <main className="w-full max-w-4xl mx-auto">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-block bg-white p-3 rounded-full shadow-md mb-3"><FitnessFlowLogo /></div>
                        <h1 className="text-3xl font-bold text-slate-800">FitnessFlow</h1>
                        <p className="text-slate-600">Únete a la comunidad fitness de Medellín</p>
                    </div>

                    <div className="flex bg-slate-100 p-1 rounded-full mb-6">
                        <button onClick={() => setAccountType('user')} className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${accountType === 'user' ? 'bg-white shadow text-brand-primary' : 'text-slate-600'}`}>Soy un Usuario</button>
                        <button onClick={() => setAccountType('gym')} className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${accountType === 'gym' ? 'bg-white shadow text-brand-primary' : 'text-slate-600'}`}>Soy un Gimnasio</button>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Crear Cuenta de {accountType === 'user' ? 'Usuario' : 'Gimnasio'} - Plan <span className="capitalize text-brand-primary">{initialPlan}</span></h2>
                        <p className="text-slate-500">Completa tu información para comenzar tu journey fitness</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        {accountType === 'user' ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField id="nombre" name="nombre" label="Nombre" placeholder="Tu nombre" icon={<UserIcon />} value={userData.nombre} onChange={handleUserChange} error={userErrors.nombre} />
                                    <InputField id="apellido" name="apellido" label="Apellido" placeholder="Tu apellido" icon={<UserIcon />} value={userData.apellido} onChange={handleUserChange} error={userErrors.apellido} />
                                </div>
                                <InputField id="correo" name="correo" label="Correo Electrónico" type="email" placeholder="tu@email.com" icon={<MailIcon />} value={userData.correo} onChange={handleUserChange} error={userErrors.correo} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField id="contrasena" name="contrasena" label="Contraseña" type={'password'} placeholder="Mínimo 6 caracteres" icon={<LockIcon />} value={userData.contrasena} onChange={handleUserChange} error={userErrors.contrasena} />
                                    <InputField id="confirmarContrasena" name="confirmarContrasena" label="Confirmar Contraseña" type={'password'} placeholder="Repetir contraseña" icon={<LockIcon />} value={userData.confirmarContrasena} onChange={handleUserChange} error={userErrors.confirmarContrasena} />
                                </div>
                                <div className="flex items-center">
                                    <input id="terminos" name="terminos" type="checkbox" required checked={userData.terminos} onChange={handleUserChange} className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-slate-300 rounded" />
                                    <label htmlFor="terminos" className="ml-2 block text-sm text-slate-700">Acepto los <a href="#" className="font-medium text-brand-primary hover:underline">términos y condiciones</a> de FitnessFlow *</label>
                                </div>
                                {userErrors.terminos && <p className="text-xs text-red-600 -mt-4">{userErrors.terminos}</p>}
                            </>
                        ) : (
                            <>
                                <InputField id="nombreGimnasio" name="nombreGimnasio" label="Nombre del Gimnasio" placeholder="Mi Gimnasio Fitness" icon={<GymIcon />} value={gymData.nombreGimnasio} onChange={handleGymChange} error={gymErrors.nombreGimnasio} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField id="nit" name="nit" label="NIT" placeholder="900.123.456-7" icon={<NitIcon />} value={gymData.nit} onChange={handleGymChange} error={gymErrors.nit} />
                                    <InputField id="correo" name="correo" label="Correo Electrónico" type="email" placeholder="contacto@gimnasio.com" icon={<MailIcon />} value={gymData.correo} onChange={handleGymChange} error={gymErrors.correo} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField id="contrasena" name="contrasena" label="Contraseña" type={'password'} placeholder="Mínimo 6 caracteres" icon={<LockIcon />} value={gymData.contrasena} onChange={handleGymChange} error={gymErrors.contrasena} />
                                    <InputField id="confirmarContrasena" name="confirmarContrasena" label="Confirmar Contraseña" type={'password'} placeholder="Repetir contraseña" icon={<LockIcon />} value={gymData.confirmarContrasena} onChange={handleGymChange} error={gymErrors.confirmarContrasena} />
                                </div>
                                <div className="flex items-center">
                                    <input id="terminosGym" name="terminos" type="checkbox" required checked={gymData.terminos} onChange={handleGymChange} className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-slate-300 rounded" />
                                    <label htmlFor="terminosGym" className="ml-2 block text-sm text-slate-700">Acepto los <a href="#" className="font-medium text-brand-primary hover:underline">términos y condiciones</a> de FitnessFlow *</label>
                                </div>
                                {gymErrors.terminos && <p className="text-xs text-red-600 -mt-4">{gymErrors.terminos}</p>}
                            </>
                        )}
                        <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 shadow-lg hover:shadow-green-500/50">Crear Cuenta</button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">¿Ya tienes cuenta? <button onClick={onNavigateToLogin} className="font-medium text-brand-primary hover:underline">Inicia sesión aquí</button></p>
                </div>
            </main>
        </div>
    );
};