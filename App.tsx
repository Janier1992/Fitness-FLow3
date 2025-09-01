import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { MainApp } from './MainApp';
import { SubscriptionPage } from './pages/SubscriptionPage';

export interface User {
  email: string;
  subscriptionStatus: 'trial' | 'expired' | 'subscribed';
  trialEndDate: Date | null;
  accountType: 'user' | 'gym';
  plan: 'básico' | 'premium';
}

// Mock user data storage
const userDatabase: { [key: string]: User } = {};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'landing' | 'register' | 'login'>('landing');
  const [registrationInfo, setRegistrationInfo] = useState<{ accountType: 'user' | 'gym', plan: 'básico' | 'premium' } | null>(null);


  useEffect(() => {
    // Check trial status on app load or when user changes
    if (currentUser?.subscriptionStatus === 'trial' && currentUser.trialEndDate && new Date() > currentUser.trialEndDate) {
      setCurrentUser(prevUser => prevUser ? { ...prevUser, subscriptionStatus: 'expired' } : null);
    }
  }, [currentUser]);

  const handleLoginSuccess = (email: string) => {
    if (userDatabase[email]) {
      setCurrentUser(userDatabase[email]);
    } else {
      // For testing, create a default user if not found
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);
      const newUser: User = { email, subscriptionStatus: 'trial', trialEndDate, accountType: 'user', plan: 'básico' };
      userDatabase[email] = newUser;
      setCurrentUser(newUser);
    }
  };
  
  const handleRegisterSuccess = (data: { email: string, accountType: 'user' | 'gym', plan: 'básico' | 'premium' }) => {
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);
    const newUser: User = {
        email: data.email,
        subscriptionStatus: 'trial',
        trialEndDate,
        accountType: data.accountType,
        plan: data.plan,
    };
    userDatabase[data.email] = newUser; // Save to our mock DB
    setCurrentUser(newUser);
    setRegistrationInfo(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: 'landing' | 'register' | 'login') => {
    setCurrentPage(page);
    setRegistrationInfo(null);
  };

  const handleStartRegistration = (accountType: 'user' | 'gym', plan: 'básico' | 'premium') => {
    setRegistrationInfo({ accountType, plan });
    setCurrentPage('register');
  };

  const handleSubscriptionSuccess = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, subscriptionStatus: 'subscribed' as const, trialEndDate: null };
      userDatabase[currentUser.email] = updatedUser;
      setCurrentUser(updatedUser);
    }
  };

  if (currentUser) {
    if (currentUser.subscriptionStatus === 'expired') {
      return <SubscriptionPage onSubscriptionSuccess={handleSubscriptionSuccess} />;
    }
    return <MainApp user={currentUser} onLogout={handleLogout} />;
  }

  switch (currentPage) {
    case 'register':
      return <RegisterPage 
                onNavigateToLogin={() => handleNavigate('login')} 
                onRegisterSuccess={handleRegisterSuccess} 
                initialAccountType={registrationInfo?.accountType || 'user'}
                initialPlan={registrationInfo?.plan || 'básico'}
              />;
    case 'login':
      return <LoginPage onNavigateToRegister={() => handleNavigate('register')} onLoginSuccess={handleLoginSuccess} />;
    default:
      return (
        <LandingPage 
          onStartRegistration={handleStartRegistration} 
          onNavigateToLogin={() => handleNavigate('login')} 
        />
      );
  }
};

export default App;