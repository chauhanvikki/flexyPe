import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  // Auto-redirect after a few seconds (optional, as per request "After 2-3 seconds OR on click")
  // We'll leave it as manual click or timeout. Let's do timeout for smooth auto-flow if user doesn't interact.
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3500); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="landing-container"
      onClick={() => navigate('/auth')}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        zIndex: 50
      }}
    >
      {/* Animated Background Particles/Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(0,0,0,0) 70%)',
          top: '20%',
          left: '20%',
          zIndex: 1
        }}
      />
      <motion.div 
         animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [-50, 50, -50]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(0,0,0,0) 70%)',
          bottom: '10%',
          right: '10%',
          zIndex: 1
        }}
      />

      {/* Brand Text */}
      <div style={{ zIndex: 10, textAlign: 'center' }}>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            fontSize: '5rem', 
            fontWeight: '900', 
            color: 'white',
            marginBottom: '1rem',
            letterSpacing: '-2px',
            textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
          }}
        >
          <motion.span 
            animate={{ 
              textShadow: [
                "0 0 20px rgba(139,92,246,0.3)",
                "0 0 40px rgba(139,92,246,0.6)",
                "0 0 20px rgba(139,92,246,0.3)"
              ] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FlexyPe
          </motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ 
            fontSize: '1.25rem', 
            color: '#94A3B8', 
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}
        >
          Flex your shopping experience
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '50px',
          color: '#64748B',
          fontSize: '0.875rem'
        }}
      >
        Tap anywhere to start
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
