import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    header: {
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '0.5rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.25rem',
    },
    input: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      marginBottom: '1rem',
      outline: 'none',
      transition: 'border-color 0.15s',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#2563eb', // Neutral blue
      color: '#ffffff',
      fontSize: '0.875rem',
      fontWeight: '600',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '0.5rem',
    },
    linkContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
      fontSize: '0.875rem',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <div style={styles.linkContainer}>
          <button style={{...styles.link, color: '#6b7280'}} onClick={() => alert('Forgot Password flow')}>
            Forgot password?
          </button>
          <button style={styles.link} onClick={onSwitchToSignup}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;