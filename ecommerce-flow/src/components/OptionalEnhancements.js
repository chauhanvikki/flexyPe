import React, { useState } from 'react';

const OptionalEnhancements = ({ orderData }) => {
  const [dismissed, setDismissed] = useState({});

  const handleDismiss = (enhancementId) => {
    setDismissed(prev => ({ ...prev, [enhancementId]: true }));
  };

  const enhancements = [
    {
      id: 'protection',
      title: 'Protect Your Investment',
      badge: '90% choose this',
      description: 'Extended warranty + accidental damage coverage for your purchase. Peace of mind for just ₹1,659.',
      price: 1659,
      icon: '🛡️'
    },
    {
      id: 'setup',
      title: 'Complete Your Setup',
      badge: 'Popular combo',
      description: 'Customers also added premium accessories. Perfect complement to your purchase.',
      price: 2489,
      icon: '🎒'
    },
    {
      id: 'notifications',
      title: 'Stay Updated',
      badge: 'Recommended',
      description: 'Get notified about new products, exclusive deals, and tech tips. Unsubscribe anytime.',
      price: 0,
      icon: '📱'
    }
  ];

  const visibleEnhancements = enhancements.filter(e => !dismissed[e.id]);

  if (visibleEnhancements.length === 0) return null;

  return (
    <div className="checkout-section" style={{ 
      opacity: 0,
      animation: 'fadeInDelayed 0.5s ease forwards',
      animationDelay: '1s',
      marginTop: '2rem'
    }}>
      <h2 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1F2937' }}>
        ✨ Complete your experience
      </h2>
      <p style={{ 
        color: '#4B5563', 
        marginBottom: '2rem', 
        fontSize: '1rem' 
      }}>
        Optional enhancements that other customers found helpful
      </p>

      {visibleEnhancements.map((enhancement) => (
        <div key={enhancement.id} style={{
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          transition: 'border-color 0.2s ease',
          background: '#FFF'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{enhancement.icon}</span>
              <h3 style={{ fontWeight: '600', color: '#1F2937', fontSize: '1.125rem' }}>{enhancement.title}</h3>
            </div>
            <span style={{
              background: '#FEF3C7',
              color: '#92400E',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>{enhancement.badge}</span>
          </div>
          
          <p style={{
            fontSize: '1rem',
            color: '#4B5563',
            marginBottom: '1.5rem',
            lineHeight: '1.5'
          }}>
            {enhancement.description}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {enhancement.price > 0 ? (
              <>
                <button className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '8px' }}>
                  Add for ₹{enhancement.price.toLocaleString()}
                </button>
                <button 
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '8px', background: '#F3F4F6' }}
                  onClick={() => handleDismiss(enhancement.id)}
                >
                  Maybe later
                </button>
              </>
            ) : (
              <>
                <button className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '8px' }}>
                  Yes, keep me updated
                </button>
                <button 
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '8px', background: '#F3F4F6' }}
                  onClick={() => handleDismiss(enhancement.id)}
                >
                  No thanks
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem',
        fontSize: '0.875rem',
        color: '#9CA3AF'
      }}>
        All enhancements are optional. Your order is complete without them.
      </div>
    </div>
  );
};

export default OptionalEnhancements;