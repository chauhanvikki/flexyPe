import React from 'react';

const SupportInfo = () => {
  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
        Need help? We're here for you
      </h3>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
        Questions about your order? Our support team responds within 2 hours.
      </p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <a href="mailto:support@flexyPe.com" style={{
          color: '#3b82f6',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          📧 Email Support
        </a>
        <a href="tel:+1234567890" style={{
          color: '#3b82f6',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          📞 Call Us
        </a>
        <a href="/help" style={{
          color: '#3b82f6',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          ❓ Help Center
        </a>
      </div>
      
      <div style={{ 
        marginTop: '20px',
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>🔒 Your purchase is protected:</strong>
        </div>
        <div style={{ color: '#64748b' }}>
          • 30-day return policy • Secure payment • Order tracking • Customer support
        </div>
      </div>
    </div>
  );
};

export default SupportInfo;