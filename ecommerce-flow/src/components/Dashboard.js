import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = ({ user, onLogout, onStartShopping }) => {
  const navigate = useNavigate();

  const stats = [
    { 
      label: 'Total Orders', 
      value: '12', 
      icon: '📦', 
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      path: '/orders',
      delay: 0.1
    },
    { 
      label: 'Total Spent', 
      value: '₹45,230', 
      icon: '💰', 
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      path: '/orders',
      delay: 0.2
    },
    { 
      label: 'Saved Items', 
      value: '8', 
      icon: '❤️', 
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
      path: '/wishlist',
      delay: 0.3
    },
    { 
      label: 'Reward Points', 
      value: '2,450', 
      icon: '⭐', 
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      path: '#', // Placeholder
      delay: 0.4
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', item: 'iPhone 15 Pro', status: 'Delivered', date: '2 days ago', amount: '₹99,900' },
    { id: '#ORD-002', item: 'Nike Air Max', status: 'Shipped', date: '5 days ago', amount: '₹8,995' },
    { id: '#ORD-003', item: 'MacBook Pro', status: 'Processing', date: '1 week ago', amount: '₹1,99,900' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Navbar */}
      <nav style={{
        background: 'white',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', 
            width: '40px', 
            height: '40px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            F
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', background: 'linear-gradient(to right, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FlexyPe
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ textAlign: 'right', display: 'none', sm: 'block' }}>
              <div style={{ fontWeight: '600', color: '#1F2937', fontSize: '0.9rem' }}>{user?.name || 'Alexander'}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Premium Member</div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#E5E7EB',
              backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix")',
              backgroundSize: 'cover',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}></div>
          </div>
          <button 
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#EF4444',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
            Dashboard
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>
            Welcome back! Here's what's happening with your store today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(stat.path)}
              style={{
                background: stat.gradient,
                borderRadius: '16px',
                padding: '1.5rem',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '160px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '-10px', 
                fontSize: '8rem', 
                opacity: 0.1, 
                transform: 'rotate(15deg)' 
              }}>
                {stat.icon}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(4px)', 
                  padding: '10px', 
                  borderRadius: '12px', 
                  fontSize: '1.5rem' 
                }}>
                  {stat.icon}
                </div>
              </div>
              
              <div style={{ zIndex: 1 }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '500', opacity: 0.9 }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats / Recent Orders Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '2rem' }}>
          
          {/* Recent Orders Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              border: '1px solid #E5E7EB'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937' }}>Recent Orders</h2>
              <button onClick={() => navigate('/orders')} style={{ color: '#4F46E5', fontWeight: '600', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                View All →
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentOrders.map((order, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  border: '1px solid #F3F4F6'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: '#EEF2FF', padding: '10px', borderRadius: '10px', fontSize: '1.2rem' }}>🛍️</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1F2937' }}>{order.item}</div>
                      <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{order.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', color: '#1F2937' }}>{order.amount}</div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600',
                      padding: '2px 8px', 
                      borderRadius: '20px',
                      background: order.status === 'Delivered' ? '#DCFCE7' : '#DBEAFE',
                      color: order.status === 'Delivered' ? '#166534' : '#1E40AF'
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
               background: 'white',
               borderRadius: '16px',
               padding: '1.5rem',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
               border: '1px solid #E5E7EB',
               height: 'fit-content'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '1.5rem' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button 
                onClick={onStartShopping}
                style={{ 
                  background: '#EEF2FF', 
                  border: 'none', 
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: '#4F46E5',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛍️</div>
                <div style={{ fontWeight: '600' }}>Browse Shop</div>
              </button>
              
              <button 
                onClick={() => navigate('/support')}
                style={{ 
                  background: '#F0F9FF', 
                  border: 'none', 
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: '#0284C7',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
                <div style={{ fontWeight: '600' }}>Support</div>
              </button>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;