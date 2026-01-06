import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BrandPage = ({ addToCart }) => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '', subtext: '' });
  // State to track quantities: { [productId]: quantity }
  const [quantities, setQuantities] = useState({});

  const brandProducts = {
    apple: [
      { id: 1, name: 'iPhone 15 Pro', price: 999, image: '📱', tag: 'Best Seller' },
      { id: 2, name: 'MacBook Air M2', price: 1199, image: '💻', tag: 'New' },
      { id: 3, name: 'AirPods Pro', price: 249, image: '🎧', tag: 'Audio' }
    ],
    samsung: [
      { id: 4, name: 'Galaxy S24 Ultra', price: 899, image: '📱', tag: 'Flagship' },
      { id: 5, name: 'Galaxy Watch 6', price: 329, image: '⌚', tag: 'Wearable' },
      { id: 6, name: 'Galaxy Buds Pro', price: 199, image: '🎧', tag: 'Wireless' }
    ],
    sony: [
      { id: 7, name: 'WH-1000XM5', price: 399, image: '🎧', tag: 'Noise Cancelling' },
      { id: 8, name: 'PlayStation 5', price: 499, image: '🎮', tag: 'Gaming' },
      { id: 9, name: 'Sony A7 IV', price: 2499, image: '📷', tag: 'Pro Camera' }
    ],
    nike: [
      { id: 10, name: 'Air Max 270', price: 150, image: '👟', tag: 'Lifestyle' },
      { id: 11, name: 'Dri-FIT T-Shirt', price: 35, image: '👕', tag: 'Training' },
      { id: 12, name: 'Tech Fleece', price: 90, image: '🧥', tag: 'Comfort' }
    ],
    canon: [
      { id: 13, name: 'EOS R6 Mark II', price: 2499, image: '📷', tag: 'Mirrorless' },
      { id: 14, name: 'RF 24-70mm', price: 899, image: '🔍', tag: 'L-Series' },
      { id: 15, name: 'Speedlite', price: 199, image: '💡', tag: 'Accessory' }
    ],
    dell: [
      { id: 16, name: 'XPS 13', price: 999, image: '💻', tag: 'Ultrabook' },
      { id: 17, name: 'UltraSharp 4K', price: 399, image: '🖥️', tag: 'Display' },
      { id: 18, name: 'MX Master', price: 79, image: '🖱️', tag: 'Peripherals' }
    ]
  };

  const products = brandProducts[brandName] || [];
  const brandDisplayName = brandName.charAt(0).toUpperCase() + brandName.slice(1);

  // Calculate total items for badge
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleUpdateQuantity = (product, delta) => {
    setQuantities(prev => {
      const currentQty = prev[product.id] || 0;
      const newQty = currentQty + delta;

      // Interaction Logic
      if (newQty > currentQty) {
        // Increment
        if (currentQty === 0) {
          // First Add
          addToCart({ ...product, quantity: 1 });
          setToast({ 
            show: true, 
            type: 'success',
            message: '✅ You added this item',
            subtext: 'Great choice!'
          });
        } else {
          // Update
          setToast({
            show: true,
            type: 'success',
            message: '✅ You added this item',
            subtext: `${product.name} quantity: ${newQty}`
          });
        }
      } else {
        // Decrement
        if (newQty === 0) {
          setToast({ 
            show: true, 
            type: 'error',
            message: '❌ You removed this item',
            subtext: 'Item removed from bag'
          });
        }
      }

      // Cleanup toast
      setTimeout(() => setToast({ show: false, message: '', subtext: '' }), 2000);

      // State update
      if (newQty <= 0) {
        const { [product.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [product.id]: newQty };
    });
  };

  return (
    <div className="fade-in" style={{ paddingBottom: '80px', position: 'relative' }}>
      
      {/* Floating Navbar Cart Icon */}
      <button 
        onClick={() => navigate('/checkout')}
        style={{ 
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '50px',
          padding: '8px 16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          color: '#1f2937',
          transition: 'transform 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '20px' }}>🛍️</span>
        {totalItems > 0 && (
           <span style={{
             background: '#ef4444',
             color: 'white',
             fontSize: '12px',
             fontWeight: 'bold',
             minWidth: '20px',
             height: '20px',
             borderRadius: '50%',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             marginLeft: '4px',
             animation: 'bounce 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
           }}>
             {totalItems}
           </span>
        )}
      </button>

      {/* Toast Notification */}
      <div style={{
        position: 'fixed',
        top: '90px', // Below the cart icon
        right: '24px',
        background: 'white',
        padding: '12px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 999,
        transform: toast.show ? 'translateX(0)' : 'translateX(120%)',
        opacity: toast.show ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: toast.type === 'error' ? '4px solid #EF4444' : '4px solid #10B981',
        maxWidth: '300px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: '600', color: toast.type === 'error' ? '#7F1D1D' : '#064E3B', fontSize: '14px' }}>
            {toast.message}
          </span>
          {toast.subtext && <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{toast.subtext}</span>}
        </div>
      </div>

      <div className="brand-hero">
        <div className="container brand-hero-content">
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>
              {brandDisplayName}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Official Store</p>
          </div>
          
          {/* Styled Back Button */}
          <button 
            onClick={() => navigate('/shop')} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 8px -1px rgba(99, 102, 241, 0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3)';
            }}
          >
            <span>←</span> Back to Brands
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '20px' }}>
        <div className="products-grid">
          {products.map((product) => {
            const qty = quantities[product.id] || 0;
            return (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <div style={{ fontSize: '80px' }}>{product.image}</div>
                </div>
                <div className="product-info">
                  {product.tag && <span className="product-badge">{product.tag}</span>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 className="product-title" style={{ margin: 0 }}>{product.name}</h3>
                    <span className="product-price">₹{(product.price * 83).toLocaleString()}</span>
                  </div>
                  
                  {qty > 0 ? (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      background: '#F9FAFB',
                      borderRadius: '8px',
                      padding: '4px',
                      border: '1px solid #E5E7EB'
                    }}>
                      <button 
                        onClick={() => handleUpdateQuantity(product, -1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'white',
                          border: '1px solid #D1D5DB',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#374151',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#F3F4F6'}
                        onMouseOut={(e) => e.target.style.background = 'white'}
                      >−</button>
                      <span style={{ fontWeight: '600', color: '#111827', fontSize: '1rem' }}>{qty}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(product, 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#10B981',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#059669'}
                        onMouseOut={(e) => e.target.style.background = '#10B981'}
                      >+</button>
                    </div>
                  ) : (
                    <button 
                      className="btn-add-cart"
                      onClick={() => handleUpdateQuantity(product, 1)}
                    >
                      Add to Bag
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes bounce {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default BrandPage;