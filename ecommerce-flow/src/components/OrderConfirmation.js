import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationCenter from '../components/NotificationCenter';

// Helper function to get related products based on purchased items
const getRelatedProducts = (items) => {
  const firstItem = items[0]?.name?.toLowerCase() || '';
  
  if (firstItem.includes('nike') || firstItem.includes('air max') || firstItem.includes('shoe')) {
    return [
      { name: 'Sports Socks', price: '830', image: '🧦' },
      { name: 'Shoe Cleaner', price: '1,245', image: '🧽' },
      { name: 'Insoles', price: '1,660', image: '👟' }
    ];
  } else if (firstItem.includes('t-shirt') || firstItem.includes('hoodie') || firstItem.includes('shirt')) {
    return [
      { name: 'Sports Cap', price: '2,075', image: '🧢' },
      { name: 'Gym Bag', price: '3,320', image: '🎒' },
      { name: 'Water Bottle', price: '1,245', image: '💧' }
    ];
  } else if (firstItem.includes('iphone') || firstItem.includes('galaxy') || firstItem.includes('phone')) {
    return [
      { name: 'Wireless Charger', price: '2,490', image: '🔌' },
      { name: 'Phone Case', price: '1,245', image: '📱' },
      { name: 'Screen Protector', price: '830', image: '🛡️' }
    ];
  } else if (firstItem.includes('headphones') || firstItem.includes('airpods') || firstItem.includes('buds')) {
    return [
      { name: 'Carrying Case', price: '1,660', image: '🎒' },
      { name: 'Cleaning Kit', price: '415', image: '🧹' },
      { name: 'Cable Organizer', price: '830', image: '🔌' }
    ];
  } else if (firstItem.includes('laptop') || firstItem.includes('macbook') || firstItem.includes('xps')) {
    return [
      { name: 'Laptop Stand', price: '3,320', image: '💻' },
      { name: 'Wireless Mouse', price: '2,075', image: '🖱️' },
      { name: 'USB Hub', price: '2,490', image: '🔌' }
    ];
  } else if (firstItem.includes('camera') || firstItem.includes('eos') || firstItem.includes('lens')) {
    return [
      { name: 'Memory Card', price: '2,490', image: '💾' },
      { name: 'Camera Bag', price: '4,150', image: '📷' },
      { name: 'Tripod', price: '6,225', image: '📹' }
    ];
  } else if (firstItem.includes('watch') || firstItem.includes('smartwatch')) {
    return [
      { name: 'Watch Band', price: '2,075', image: '⏰' },
      { name: 'Screen Guard', price: '830', image: '🛡️' },
      { name: 'Charging Dock', price: '1,660', image: '🔌' }
    ];
  } else {
    return [
      { name: 'Premium Warranty', price: '1,660', image: '🛡️' },
      { name: 'Gift Wrapping', price: '415', image: '🎁' },
      { name: 'Express Delivery', price: '830', image: '⚡' }
    ];
  }
};

// Helper function to get brand name from items
const getBrandName = (items) => {
  const firstItem = items[0]?.name?.toLowerCase() || '';
  
  if (firstItem.includes('iphone') || firstItem.includes('macbook') || firstItem.includes('airpods')) {
    return 'Apple';
  } else if (firstItem.includes('galaxy') || firstItem.includes('samsung')) {
    return 'Samsung';
  } else if (firstItem.includes('sony') || firstItem.includes('playstation')) {
    return 'Sony';
  } else if (firstItem.includes('nike') || firstItem.includes('air max')) {
    return 'Nike';
  } else if (firstItem.includes('canon') || firstItem.includes('eos')) {
    return 'Canon';
  } else if (firstItem.includes('dell') || firstItem.includes('xps')) {
    return 'Dell';
  } else {
    return 'Brand';
  }
};

const OrderConfirmation = ({ orderData }) => {
  const navigate = useNavigate();
  const [vipActivated, setVipActivated] = useState(false);
  
  // State for quick-add items from recommendations
  const [addedItems, setAddedItems] = useState([]);

  // Handler to add recommended items
  const handleQuickAdd = (product) => {
    // Check if duplicate
    if (addedItems.find(item => item.name === product.name)) return;
    
    // Parse price
    let priceValue = 0;
    if (product.price !== 'Free') {
      priceValue = parseInt(product.price.replace(/,/g, ''), 10);
    }
    
    setAddedItems(prev => [...prev, { ...product, numericPrice: priceValue }]);
  };

  // Calculate base total in INR (assuming orderData.total is USD based on existing code * 83)
  const baseTotalINR = orderData.total * 83;
  // Calculate total of added items
  const addedTotalINR = addedItems.reduce((acc, item) => acc + item.numericPrice, 0);
  // Final Grand Total
  const finalTotal = baseTotalINR + addedTotalINR;

  // State for VIP rewards claiming
  const [claimedRewards, setClaimedRewards] = useState({});
  const [walletBalance, setWalletBalance] = useState(1200);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleClaimReward = (id) => {
    // Prevent duplicates
    if (claimedRewards[id]) return;

    setClaimedRewards(prev => ({
      ...prev,
      [id]: true
    }));

    // Logic for specific rewards
    let message = '';
    if (id === 'coins') {
      setWalletBalance(prev => prev + 300);
      message = '🎁 300 SuperCoins added to your wallet';
    } else if (id === 'protection') {
      message = '🛡️ Device protection activated';
    } else if (id === 'support') {
      message = '⚡ Priority support enabled for 30 days';
    } else if (id === 'access') {
      message = '🔔 Early access enabled';
    }

    // Show notification
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const vipOffers = [
    { id: 'coins', icon: '🎁', text: 'Earn 300 bonus SuperCoins', sub: 'Added to your wallet', claimedSub: '✓ 300 Coins added to wallet' },
    { id: 'protection', icon: '🛡️', text: 'Get Device Protection at 50% Off', sub: 'VIP exclusive price', claimedSub: '✓ Discount applied to account' },
    { id: 'support', icon: '⚡', text: 'Priority Customer Support', sub: 'Skip the queue for 30 days', claimedSub: '✓ Priority status active' },
    { id: 'access', icon: '🔔', text: 'Early Access to New Launches', sub: 'Get notified before others', claimedSub: '✓ You are on the list' }
  ];

  const enhancements = [
    { name: 'Protect Your Investment', price: '1,659', sub: 'Extended warranty + damage coverage', icon: '🛡️' },
    { name: 'Complete Your Setup', price: '2,489', sub: 'Premium accessories bundle', icon: '🎒' },
    { name: 'Stay Updated', price: 'Free', sub: 'Exclusive deals & early access', icon: '📱' }
  ];

  return (
    <div className="order-confirmation" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      
      {/* Notification Center Integration */}
      <div style={{ position: 'absolute', top: '0', right: '-60px' }}>
        <NotificationCenter />
      </div>

      <div className="success-icon" style={{ fontSize: '4rem', marginBottom: '1.5rem', color: '#10B981', background: '#D1FAE5', width: '96px', height: '96px', lineHeight: '96px', borderRadius: '50%', margin: '0 auto 1.5rem auto' }}>✓</div>
      <h1 className="order-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Order Confirmed!</h1>
      <p className="order-number" style={{ fontSize: '1.125rem', color: '#6B7280', marginBottom: '3rem' }}>Order #{orderData.orderNumber}</p>
      
      <div className="order-details" style={{ textAlign: 'left', background: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700', color: '#1F2937' }}>Order Summary</h3>
        
        {/* Original Order Items */}
        {orderData.items.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '1.25rem',
            fontSize: '1.125rem',
            color: '#374151'
          }}>
            <span>{item.name} × {item.quantity}</span>
            <span style={{ fontWeight: '500' }}>₹{(item.price * item.quantity * 83).toLocaleString()}</span>
          </div>
        ))}

        {/* Added Quick-Add Items */}
        {addedItems.map((item, index) => (
          <div key={`added-${index}`} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '1.25rem',
            fontSize: '1.125rem',
            color: '#374151',
            animation: 'fadeIn 0.3s ease-in'
          }}>
            <span>
              {item.name} <span style={{ fontSize: '0.85rem', color: '#059669', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>Add-on</span>
            </span>
            <span style={{ fontWeight: '500' }}>{item.price === 'Free' ? 'Free' : `₹${item.price}`}</span>
          </div>
        ))}

        <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontWeight: '700',
          fontSize: '1.5rem',
          color: '#111827'
        }}>
          <span>Total</span>
          {/* Display Dynamic Total */}
          <span>₹{finalTotal.toLocaleString()}</span>
        </div>
        
        {/* Related Products in Order Summary */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #E5E7EB' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#374151' }}>
            🛍️ Customers also bought
          </h4>
          <p style={{ fontSize: '1rem', color: '#6B7280', marginBottom: '1.5rem' }}>Perfect additions to your {orderData.items[0]?.name || 'purchase'}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {getRelatedProducts(orderData.items).map((product, index) => {
              const isAdded = addedItems.some(item => item.name === product.name);
              return (
                <div key={index} style={{
                  border: isAdded ? '1px solid #10B981' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  background: isAdded ? '#ECFDF5' : '#F9FAFB'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{product.image}</div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '1rem', color: '#374151' }}>{product.name}</div>
                  <div style={{ color: '#059669', fontWeight: '700', marginBottom: '0.75rem', fontSize: '0.95rem' }}>₹{product.price}</div>
                  <button 
                    onClick={() => handleQuickAdd(product)}
                    disabled={isAdded}
                    style={{
                      background: isAdded ? '#10B981' : 'white',
                      color: isAdded ? 'white' : '#4B5563',
                      border: isAdded ? 'none' : '1px solid #D1D5DB',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: isAdded ? 'default' : 'pointer',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isAdded ? 'Added ✓' : 'Quick Add'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* VIP Club in Order Summary */}
        <div style={{
          marginTop: '3rem',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <AnimatePresence>
            {notification.show && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#1F2937',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  minWidth: 'max-content'
                }}
              >
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem',
            background: 'rgba(255,255,255,0.2)',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            color: 'white',
            fontWeight: '600'
           }}>
             Coins: {walletBalance}
          </div>

          <h4 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
            🎉 Welcome to {getBrandName(orderData.items)} VIP Club!
          </h4>
          <p style={{ fontSize: '1.25rem', opacity: 0.95, marginBottom: '2rem', fontWeight: '400' }}>Unlock exclusive benefits with your purchase</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem', gap: '1rem' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚚</div>
              <div style={{ fontSize: '1rem', fontWeight: '600' }}>Free Shipping</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <div style={{ fontSize: '1rem', fontWeight: '600' }}>Priority Support</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎁</div>
              <div style={{ fontSize: '1rem', fontWeight: '600' }}>Early Access</div>
            </div>
          </div>
          
          <motion.button 
            whileHover={!vipActivated ? { scale: 1.05 } : {}}
            whileTap={!vipActivated ? { scale: 0.95 } : {}}
            onClick={() => setVipActivated(true)}
            disabled={vipActivated}
            style={{
              background: vipActivated ? 'rgba(255, 255, 255, 0.2)' : 'white',
              color: vipActivated ? 'white' : '#4F46E5',
              border: vipActivated ? '1px solid rgba(255,255,255,0.3)' : 'none',
              padding: '1rem 2rem',
              borderRadius: '10px',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: vipActivated ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: vipActivated ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              minWidth: '200px',
              marginBottom: vipActivated ? '2rem' : '0'
            }}
          >
            {vipActivated ? '✓ VIP Benefits Activated' : 'Activate VIP Benefits'}
          </motion.button>

          <AnimatePresence>
            {vipActivated && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ textAlign: 'left' }}
              >
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginTop: '1rem'
                }}>
                  <h5 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                    Your Exclusive Rewards
                  </h5>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {vipOffers.map((offer, i) => {
                      const isClaimed = claimedRewards[offer.id];
                      return (
                        <motion.div 
                          key={offer.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          style={{ 
                            background: isClaimed ? '#F0FDF4' : 'white', 
                            padding: '1rem', 
                            borderRadius: '8px',
                            display: 'flex', 
                            alignItems: 'center',
                            gap: '1rem',
                            color: '#1F2937',
                            transition: 'background-color 0.3s ease',
                            border: isClaimed ? '1px solid #86EFAC' : 'none'
                          }}
                        >
                          <span style={{ fontSize: '1.5rem' }}>{offer.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '1rem', color: isClaimed ? '#15803D' : '#1F2937' }}>
                              {offer.text}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: isClaimed ? '#166534' : '#6B7280' }}>
                              {isClaimed ? offer.claimedSub : offer.sub}
                            </div>
                          </div>
                          <button 
                            onClick={() => handleClaimReward(offer.id)}
                            disabled={isClaimed}
                            style={{ 
                              fontSize: '0.875rem', 
                              color: isClaimed ? '#15803D' : '#4F46E5', 
                              fontWeight: '600',
                              background: isClaimed ? '#DCFCE7' : 'transparent',
                              border: isClaimed ? 'none' : '1px solid #E0E7FF',
                              padding: isClaimed ? '0.5rem 1rem' : '0.25rem 0.75rem',
                              borderRadius: '6px',
                              cursor: isClaimed ? 'default' : 'pointer',
                              transition: 'all 0.2s',
                            }}>
                              {isClaimed ? 'Claimed ✓' : 'Claim'}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button style={{ 
                      background: 'transparent', 
                      border: '1px solid rgba(255,255,255,0.5)', 
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }} onClick={() => setVipActivated(false)}>
                      Close Rewards
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Order Tracking Section */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #E5E7EB' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
            🚚 What happens next?
          </h4>
          <p style={{ fontSize: '1.125rem', color: '#059669', marginBottom: '2rem', fontWeight: '600' }}>Estimated delivery: {orderData.estimatedDelivery}</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#059669' }}>✓</div>
              <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1F2937' }}>Order Placed</div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Just now</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#6B7280' }}>📦</div>
              <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#4B5563' }}>Processing</div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>1-2 days</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#6B7280' }}>🚛</div>
              <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#4B5563' }}>Shipped</div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>2-3 days</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#6B7280' }}>🏠</div>
              <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#4B5563' }}>Delivered</div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>{orderData.estimatedDelivery}</div>
            </div>
          </div>
          
          <div style={{ 
            background: '#F0F9FF', 
            border: '1px solid #BAE6FD',
            borderRadius: '8px', 
            padding: '1rem',
            textAlign: 'center'
          }}>
             <span style={{ fontSize: '1rem', color: '#0369A1' }}>
              💡 <strong>Track your order:</strong> We'll send you tracking details once your order ships
             </span>
          </div>

          <button 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#1F2937', 
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#111827'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1F2937'}
          >
            Continue Shopping
          </button>
        </div>
        
        {/* Quick Enhancements in Order Summary */}
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1F2937' }}>
            ✨ Complete your experience
          </h4>
          <p style={{ fontSize: '1rem', color: '#4B5563', marginBottom: '1.5rem', lineHeight: '1.6' }}>Optional enhancements that other customers found helpful</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {enhancements.map((enhancement, index) => {
              const isAdded = addedItems.some(item => item.name === enhancement.name);
              return (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem',
                  background: isAdded ? '#ECFDF5' : '#f8fafc',
                  borderRadius: '12px',
                  border: isAdded ? '1px solid #10B981' : '1px solid #e2e8f0',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{enhancement.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937' }}>{enhancement.name}</div>
                      <div style={{ fontSize: '1rem', color: '#4B5563', marginTop: '4px', lineHeight: '1.5' }}>{enhancement.sub}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#059669' }}>
                      {enhancement.price === 'Free' ? 'Free' : `₹${enhancement.price}`}
                    </div>
                    <button 
                      onClick={() => handleQuickAdd(enhancement)}
                      disabled={isAdded}
                      style={{
                        background: isAdded ? '#059669' : '#059669',
                        opacity: isAdded ? 0.9 : 1,
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: isAdded ? 'default' : 'pointer',
                        marginTop: '6px'
                      }}>
                      {isAdded ? 'Added ✓' : 'Add'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <p style={{ fontSize: '0.875rem', color: '#6B7280', textAlign: 'center', marginTop: '1.5rem', fontStyle: 'italic' }}>
            All enhancements are optional. Your order is complete without them.
          </p>
        </div>
        
        {/* Support Info in Order Summary */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f8fafc',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1F2937' }}>Need help? We're here for you</h4>
          <p style={{ fontSize: '1rem', color: '#4B5563', marginBottom: '1.25rem' }}>Questions? Our support team responds within 2 hours.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
            <a href="mailto:support@flexyPe.com" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>📧 Email Support</a>
            <a href="tel:+1234567890" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>📞 Call Us</a>
            <a href="/help" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>❓ Help Center</a>
          </div>
          
          <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            🔒 <strong>Protected:</strong> 30-day returns • Secure payment • Order tracking
          </div>
        </div>
      </div>
      
      <p style={{ 
        marginTop: '2rem', 
        fontSize: '1.125rem', 
        color: '#059669',
        fontWeight: '500' 
      }}>
        📧 Confirmation email sent to your inbox
      </p>
    </div>
  );
};

export default OrderConfirmation;