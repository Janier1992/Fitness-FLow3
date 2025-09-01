import React, { useState, useRef, useEffect } from 'react';
import { TrialBanner } from './TrialBanner';
import { User } from '../App'; // Import full user type

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);
const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const PremiumBadge = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
)

export interface NavItem {
    name: string;
    icon: React.ReactNode;
}

interface HeaderProps {
  user: User;
  activeItem: string;
  navItems: NavItem[];
  onNavigate: (itemName: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, activeItem, navItems, onNavigate, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const userInitials = user.email.substring(0, 2).toUpperCase();

    const handleMobileNavClick = (itemName: string) => {
        onNavigate(itemName);
        setIsMobileMenuOpen(false);
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {user.subscriptionStatus === 'trial' && user.trialEndDate && (
                <TrialBanner trialEndDate={user.trialEndDate} onSubscribeClick={() => { /* In a real app, this would navigate to the subscription page */ }} />
            )}
            <header className="bg-white/80 backdrop-blur-lg shadow-sm w-full sticky top-0 z-50 border-b border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        <div className="flex-shrink-0">
                             <h1 className="text-xl font-bold text-slate-800">
                                FitnessFlow <span className="text-brand-primary">Pro</span>
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => onNavigate(item.name)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                                            activeItem === item.name
                                                ? 'bg-green-100 text-green-800 shadow-sm'
                                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                        }`}
                                        aria-current={activeItem === item.name ? 'page' : undefined}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right side icons & Mobile Menu Trigger */}
                        <div className="flex items-center gap-2">
                            <button className="relative text-slate-500 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-brand-primary rounded-full p-1">
                                <span className="sr-only">Ver notificaciones</span>
                                <BellIcon />
                                {user.plan === 'premium' && (
                                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full flex items-center justify-center -mr-1 -mt-1">
                                        <PremiumBadge />
                                    </span>
                                )}
                            </button>

                            <div className="ml-2 relative" ref={profileMenuRef}>
                               <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
                                    <span className="font-bold text-sm text-green-800">{userInitials}</span>
                               </button>
                               {isProfileMenuOpen && (
                                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                       <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">
                                           Cerrar Sesión
                                       </button>
                                   </div>
                               )}
                            </div>

                             {/* Mobile menu button */}
                            <div className="md:hidden ml-2">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
                                    aria-controls="mobile-menu"
                                    aria-expanded={isMobileMenuOpen}
                                >
                                    <span className="sr-only">Abrir menú principal</span>
                                    {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu, show/hide based on menu state. */}
                {isMobileMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        {/* Overlay */}
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true"></div>
                        
                        {/* Menu Panel */}
                        <div className="fixed top-20 right-4 w-64 bg-white rounded-lg shadow-xl p-4 z-50 animate-fade-in">
                             <nav className="flex flex-col space-y-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleMobileNavClick(item.name)}
                                        className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out ${
                                            activeItem === item.name
                                                ? 'bg-green-100 text-green-800'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                                        }`}
                                        aria-current={activeItem === item.name ? 'page' : undefined}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};