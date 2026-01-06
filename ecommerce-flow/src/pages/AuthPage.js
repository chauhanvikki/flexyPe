import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup State
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({ email });
    } else {
      onSignup({ email, name });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F8FAFC', // Slate-50
      padding: '20px'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
            {isLogin ? 'Welcome Back' : 'Join FlexyPe'}
          </h2>
          <p style={{ color: '#64748B' }}>
            {isLogin ? 'Enter your details to access your account' : 'Create your account to start shopping'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
             {!isLogin && (
               <motion.div
                 key="name-field"
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 style={{ marginBottom: '1rem', overflow: 'hidden' }}
               >
                 <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Full Name</label>
                 <input 
                   type="text" 
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required={!isLogin}
                   style={{
                     width: '100%',
                     padding: '12px 16px',
                     borderRadius: '12px',
                     border: '1px solid #E2E8F0',
                     fontSize: '1rem',
                     outline: 'none',
                     background: '#F8FAFC'
                   }}
                   placeholder="John Doe"
                 />
               </motion.div>
             )}
          </AnimatePresence>

          <div style={{ marginBottom: '1rem' }}>
             <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Email Address</label>
             <input 
               type="email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               style={{
                 width: '100%',
                 padding: '12px 16px',
                 borderRadius: '12px',
                 border: '1px solid #E2E8F0',
                 fontSize: '1rem',
                 outline: 'none',
                 background: '#F8FAFC'
               }}
               placeholder="hello@example.com"
             />
          </div>

          <div style={{ marginBottom: '2rem' }}>
             <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Password</label>
             <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               style={{
                 width: '100%',
                 padding: '12px 16px',
                 borderRadius: '12px',
                 border: '1px solid #E2E8F0',
                 fontSize: '1rem',
                 outline: 'none',
                 background: '#F8FAFC'
               }}
               placeholder="••••••••"
             />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: '#0F172A',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '1.5rem'
            }}
          >
            {isLogin ? 'Continue to FlexyPe' : 'Create Account'}
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.95rem', color: '#64748B' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#4F46E5', 
              fontWeight: '600', 
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
