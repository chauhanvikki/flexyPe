import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  // Initial mockup data as requested
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reward',
      title: '300 SuperCoins Added',
      message: 'Your wallet has been credited with 300 SuperCoins. Use them on accessories, protection plans, or future purchases.',
      timestamp: 'Just now',
      read: false,
      icon: '🎁',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 2,
      type: 'protection',
      title: 'Device Protection Activated',
      message: 'Your device is now protected under the VIP plan. Coverage starts today.',
      timestamp: 'Today',
      read: false,
      icon: '🛡️',
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      type: 'support',
      title: 'Priority Support Enabled',
      message: 'You now have priority access to customer support for the next 30 days.',
      timestamp: 'Today',
      read: true,
      icon: '⚡',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 4,
      type: 'access',
      title: 'Early Access Activated',
      message: 'You’ll now be notified before new product launches and exclusive deals.',
      timestamp: 'Today',
      read: true,
      icon: '🔔',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Processing',
      message: 'Your order has been processed and will be shipped soon.',
      timestamp: '2 hours ago',
      read: true,
      icon: '📦',
      color: 'text-blue-600 bg-blue-50'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close panel on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div ref={panelRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Bell Trigger */}
      <button 
        onClick={handleToggle}
        style={{
          background: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          fontSize: '1.25rem'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            background: '#EF4444',
            color: 'white',
            fontSize: '11px',
            fontWeight: 'bold',
            minWidth: '20px',
            height: '20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '60px',
              right: '0',
              width: '360px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E7EB',
              zIndex: 50,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem',
              borderBottom: '1px solid #F3F4F6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#F9FAFB'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                  style={{ fontSize: '0.875rem', color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                 <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
                   <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
                   <p style={{ fontWeight: '500' }}>You're all caught up</p>
                   <p style={{ fontSize: '0.875rem' }}>No new notifications right now.</p>
                 </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid #F3F4F6',
                      display: 'flex',
                      gap: '1rem',
                      cursor: 'pointer',
                      background: notification.read ? 'white' : '#F0F9FF',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <div style={{ 
                      flexShrink: 0,
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '10px',
                      background: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem'
                    }}>
                      {notification.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                         <span style={{ fontSize: '0.95rem', fontWeight: notification.read ? '600' : '700', color: '#1F2937' }}>
                           {notification.title}
                         </span>
                         <span style={{ fontSize: '0.75rem', color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                           {notification.timestamp}
                         </span>
                       </div>
                       <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: '1.4' }}>
                         {notification.message}
                       </p>
                    </div>
                    {!notification.read && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', marginTop: '0.5rem', flexShrink: 0 }} />
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
