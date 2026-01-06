import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WishlistPage = ({ addToCart }) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([
    { id: 101, name: 'Sony WH-1000XM5', price: 29900, image: '🎧', tag: 'Best Seller' },
    { id: 102, name: 'Apple Watch Series 9', price: 41900, image: '⌚', tag: 'New' },
    { id: 103, name: 'Nike Dri-FIT Hoodie', price: 4500, image: '🧥', tag: 'Trending' }
  ]);

  const handleRemove = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    if (addToCart) addToCart(item); // Assume addToCart handles formatting
    // Optional: show toast here if we had access to the toast function
  };

  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
         <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '16px' }}>←</button>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>Your Wishlist</h1>
        <span style={{ marginLeft: '12px', background: '#ffe4e6', color: '#e11d48', padding: '4px 12px', borderRadius: '20px', fontWeight: '600', fontSize: '0.9rem' }}>
          {wishlistItems.length} items
        </span>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px' 
      }}>
        <AnimatePresence>
          {wishlistItems.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#6b7280' }}
             >
               <div style={{ fontSize: '48px', marginBottom: '16px' }}>💔</div>
               <h3>Your wishlist is empty. Save items you love to buy later.</h3>
             </motion.div>
          ) : (
            wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ 
                  height: '200px', background: '#f9fafb', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '80px', position: 'relative'
                }}>
                  {item.image}
                  <button 
                    onClick={() => handleRemove(item.id)}
                    style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: 'white', border: 'none', borderRadius: '50%',
                      width: '32px', height: '32px', cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#ef4444',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    title="Remove from Wishlist"
                  >
                    ✕
                  </button>
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 'auto' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '600', color: '#1f2937' }}>{item.name}</h3>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827' }}>₹{item.price.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    style={{
                      marginTop: '16px',
                      width: '100%',
                      padding: '12px',
                      background: '#1f2937',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    className="hover:bg-black"
                  >
                    Add to Bag
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;
