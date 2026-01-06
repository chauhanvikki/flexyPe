import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const orders = [
    { 
      id: 'ORD-2024-001', 
      product: 'iPhone 16 Pro', 
      image: '📱', 
      date: 'Oct 24, 2024',
      status: 'Delivered',
      currentStep: 4,
      total: '₹99,900',
      timeline: [
        { status: 'Order Placed', date: 'Oct 20, 10:00 AM' },
        { status: 'Processing', date: 'Oct 21, 2:30 PM' },
        { status: 'Shipped', date: 'Oct 22, 9:00 AM' },
        { status: 'Delivered', date: 'Oct 24, 11:15 AM' }
      ]
    },
    { 
      id: 'ORD-2024-002', 
      product: 'Nike Air Max', 
      image: '👟', 
      date: 'Oct 26, 2024',
      status: 'Shipped',
      currentStep: 2,
      total: '₹8,995',
      timeline: [
        { status: 'Order Placed', date: 'Oct 25, 4:00 PM' },
        { status: 'Processing', date: 'Oct 26, 10:00 AM' },
        { status: 'Shipped', date: 'Oct 26, 5:00 PM' },
        { status: 'Delivered', date: 'Expected Oct 29' }
      ]
    }
  ];

  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '16px' }}>←</button>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>Your Orders</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <h3>No orders yet. Start shopping to see your orders here.</h3>
          </div>
        ) : (
          orders.map((order) => (
            <motion.div 
              key={order.id}
              layout
              style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div 
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                style={{
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: expandedOrder === order.id ? '#f9fafb' : 'white'
                }}
              >
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '64px', height: '64px', 
                    background: '#f3f4f6', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px'
                  }}>
                    {order.image}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '600' }}>{order.product}</h3>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{order.id} • {order.total}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: order.status === 'Delivered' ? '#dcfce7' : '#dbeafe',
                    color: order.status === 'Delivered' ? '#166534' : '#1e40af',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    marginBottom: '4px'
                  }}>
                    {order.status}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>{order.date}</div>
                </div>
              </div>

              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderTop: '1px solid #e5e7eb', padding: '24px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                      {/* Progress Bar Background */}
                      <div style={{ 
                        position: 'absolute', top: '14px', left: '0', right: '0', 
                        height: '4px', background: '#e5e7eb', zIndex: 0 
                      }} />
                       {/* Active Progress Bar */}
                       <div style={{ 
                        position: 'absolute', top: '14px', left: '0', 
                        width: `${(order.currentStep / 4) * 100 - 12}%`, // Approximate width calculation
                        height: '4px', background: '#3b82f6', zIndex: 0, transition: 'width 0.5s'
                      }} />

                      {order.timeline.map((step, index) => (
                        <div key={index} style={{ zIndex: 1, textAlign: 'center', width: '25%' }}>
                            <div style={{ 
                              width: '32px', height: '32px', margin: '0 auto 8px auto',
                              borderRadius: '50%', 
                              background: index < order.currentStep ? '#3b82f6' : '#e5e7eb',
                              color: 'white',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              border: '4px solid white'
                            }}>
                              {index < order.currentStep ? '✓' : index + 1}
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: index < order.currentStep ? '#1f2937' : '#9ca3af' }}>{step.status}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{step.date}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
