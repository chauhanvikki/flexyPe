import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SupportPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [sentMessages, setSentMessages] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  const helpCategories = [
    { 
      title: 'Order Issues', 
      icon: '📦', 
      items: ['Track my order', 'Missing items from package', 'Received wrong product', 'Report damaged item']
    },
    { 
      title: 'Payment & Refunds', 
      icon: '💳', 
      items: ['Transaction failed but amount deducted', 'Request a refund', 'Where is my refund?', 'Payment methods accepted']
    },
    { 
      title: 'Product Support', 
      icon: '🔧', 
      items: ['Claim Warranty', 'Product troubleshooting guide', 'Installation services', 'Size guide']
    },
    { 
      title: 'Delivery Help', 
      icon: '🚚', 
      items: ['Change delivery address', 'Cancel my order', 'Schedule delivery time', 'Courier contact info']
    }
  ];

  const contactMethods = [
    { type: 'Email Support', info: 'help@flexype.com', icon: '📧', color: '#3b82f6' },
    { type: 'Call Support', info: '+91 1800-123-4567', icon: '📞', color: '#10b981' },
    { type: 'Live Chat', info: 'Available 24/7', icon: '💬', color: '#8b5cf6' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) return;

    const newMessage = {
      id: Date.now(),
      subject: formData.subject,
      message: formData.message,
      date: new Date().toLocaleDateString(),
      status: 'Sent'
    };

    setSentMessages(prev => [newMessage, ...prev]);
    setFormData({ subject: '', message: '' });
    
    setToast({ show: true, message: '✅ Your message has been sent to admin' });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      
      {/* Toast Notification */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: 1000,
        transform: toast.show ? 'translateX(0)' : 'translateX(120%)',
        opacity: toast.show ? 1 : 0,
        transition: 'all 0.3s ease',
        borderLeft: '4px solid #10B981',
        display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <span style={{ fontWeight: '600', color: '#064E3B' }}>{toast.message}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '16px' }}>←</button>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>Help & Support</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* Left Column: FAQs */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#374151' }}>Common Topics</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={false}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: activeCategory === index ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <div 
                  onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                  style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <span style={{ fontSize: '24px' }}>{category.icon}</span>
                  <span style={{ fontWeight: '600', color: '#1f2937', flex: 1 }}>{category.title}</span>
                  <span style={{ color: '#9ca3af', transform: activeCategory === index ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
                </div>
                
                <AnimatePresence>
                  {activeCategory === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden', background: '#f9fafb' }}
                    >
                      <div style={{ padding: '16px 20px 20px 60px', borderTop: '1px solid #e5e7eb' }}>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                          {category.items.map((item, i) => (
                            <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '0.95rem' }}>
                              <span style={{ color: '#3b82f6', fontSize: '12px' }}>●</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
             <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#374151' }}>Other Ways to Connect</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {contactMethods.map((method, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', 
                      background: `${method.color}20`, color: method.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
                    }}>
                      {method.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>{method.type}</div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{method.info}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Message Admin */}
        <div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', position: 'sticky', top: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px', color: '#1f2937' }}>Send a Message</h2>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '24px' }}>Our admin team will reach out to you within 24 hours.</p>
            
            <form onSubmit={handleSendMessage}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', marginBottom: '6px' }}>Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  placeholder="e.g. Order #1234 Issue"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem', outline: 'none' }} 
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', marginBottom: '6px' }}>Message</label>
                <textarea 
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  placeholder="Describe your issue detailedly..."
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }} 
                />
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#1f2937',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Sent Messages List */}
          {sentMessages.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>History</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sentMessages.map(msg => (
                  <div key={msg.id} style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{msg.subject}</span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{msg.date}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.message}</p>
                    <div style={{ marginTop: '8px', display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#f3f4f6', color: '#4b5563', fontSize: '0.75rem', fontWeight: '600' }}>
                      {msg.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
