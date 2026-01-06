import React, { useState, useEffect } from 'react';

const DeliveryTimeline = ({ estimatedDelivery }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Order Placed', time: 'Just now', icon: '📝' },
    { label: 'Processing', time: '1-2 days', icon: '📦' },
    { label: 'Shipped', time: '2-3 days', icon: '🚛' },
    { label: 'Delivered', time: estimatedDelivery, icon: '🏠' }
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 2000), // Processing
      setTimeout(() => setCurrentStep(2), 4000), // Shipped
      setTimeout(() => setCurrentStep(3), 6000)  // Delivered
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="checkout-section">
      <h2 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1F2937' }}>
        🚚 Real-time Status
      </h2>
      
      <p style={{ color: '#4B5563', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
        Estimated delivery: <strong style={{ color: '#111827' }}>{estimatedDelivery}</strong>
      </p>
      
      {/* Progress Bar Container */}
      <div style={{ 
        background: '#E2E8F0', 
        height: '8px', 
        borderRadius: '4px', 
        margin: '2rem 0',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Animated Fill */}
        <div style={{
          background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
          height: '100%',
          width: `${progress}%`,
          borderRadius: '4px',
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
        }}></div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginTop: '2.5rem'
      }}>
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={index} style={{ 
              textAlign: 'center', 
              opacity: isCompleted ? 1 : 0.5,
              transition: 'opacity 0.5s ease',
              transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.5s'
            }}>
              <div style={{ 
                marginBottom: '0.75rem', 
                fontSize: '1.5rem',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ 
                  display: 'inline-block',
                  transition: 'transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                  transform: isCompleted ? 'scale(1.2)' : 'scale(1)'
                }}>
                  {index < currentStep ? '✅' : step.icon}
                </span>
              </div>
              
              <div style={{ 
                fontWeight: isCompleted ? '700' : '500', 
                fontSize: '0.95rem', 
                color: '#1F2937', 
                marginBottom: '0.25rem' 
              }}>
                {step.label}
              </div>
              
              <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                {step.time}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Dynamic Status Message */}
      <div style={{ 
        marginTop: '2.5rem', 
        padding: '1rem', 
        background: currentStep === 3 ? '#ECFDF5' : '#F0F9FF', 
        borderRadius: '12px',
        fontSize: '0.95rem',
        color: currentStep === 3 ? '#065F46' : '#075985',
        border: currentStep === 3 ? '1px solid #A7F3D0' : '1px solid #BAE6FD',
        textAlign: 'center',
        transition: 'all 0.5s ease'
      }}>
        {currentStep === 0 && '⚡ We have received your order.'}
        {currentStep === 1 && '📦 We are packing your items now!'}
        {currentStep === 2 && '🚚 Your order is on the way!'}
        {currentStep === 3 && '🎉 Order Delivered! Enjoy your purchase.'}
      </div>
    </div>
  );
};

export default DeliveryTimeline;