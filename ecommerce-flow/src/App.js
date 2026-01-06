import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = (credentials) => {
    setUser({ name: credentials.email.split('@')[0], email: credentials.email });
    setCurrentView('dashboard');
  };

  const handleSignup = (userData) => {
    setUser({ name: userData.name, email: userData.email });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
  }

  if (currentView === 'signup') {
    return <Signup onSignup={handleSignup} onSwitchToLogin={() => setCurrentView('login')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard user={user} onLogout={handleLogout} onStartShopping={() => {}} />;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>FlexyPe App is Working!</h1>
      <p>If you can see this, the deployment is successful.</p>
    </div>
  );
}

export default App;