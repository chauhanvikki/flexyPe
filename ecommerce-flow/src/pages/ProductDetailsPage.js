import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductDetailsPage = ({ addToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  // Mock product database (simulated)
  // In a real app, this would fetch from an API based on productId
  const productData = {
    id: productId,
    name: 'Premium Wireless Headphones',
    price: 24999,
    rating: 4.8,
    reviews: 1240,
    description: 'Experience pure sound with industry-leading noise cancellation. Designed for audiofiles who demand the best in clarity and comfort.',
    features: [
      'Active Noise Cancellation',
      '30-hour Battery Life',
      'Spatial Audio Support',
      'Multipoint Connection'
    ],
    images: ['🎧', '🎵', '🔋', '📱'],
    colors: ['#000000', '#F5F5F7', '#1D4E89']
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      exit={{ opacity: 0 }}
      className="container"
      style={{ padding: '4rem 1.5rem', minHeight: '100vh', background: '#FAFAFA' }}
    >
      {/* Breadcrumb / Back Navigation */}
      <motion.button 
        variants={fadeInUp}
        onClick={() => navigate(-1)} 
        style={{ 
          background: 'none', border: 'none', cursor: 'pointer', 
          color: '#64748b', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}
      >
        ← Back to Browse
      </motion.button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Left: Images */}
        <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ 
            background: '#F1F5F9', borderRadius: '16px', height: '400px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem' 
          }}>
            {productData.images[activeImage]}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {productData.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(idx)}
                style={{ 
                  width: '80px', height: '80px', background: '#F1F5F9', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                  cursor: 'pointer', border: activeImage === idx ? '2px solid #4f46e5' : '2px solid transparent'
                }}
              >
                {img}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              background: '#EEF2FF', color: '#4F46E5', padding: '0.5rem 1rem', 
              borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.05em' 
            }}>
              BEST SELLER
            </span>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1E293B', marginBottom: '0.5rem' }}>
            {productData.name}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: '#1E293B' }}>
              ₹{productData.price.toLocaleString()}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B' }}>
              {'★'.repeat(Math.floor(productData.rating))}
              <span style={{ color: '#64748b', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
                ({productData.reviews} reviews)
              </span>
            </div>
          </div>

          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.125rem', marginBottom: '2rem' }}>
            {productData.description}
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Select Color
            </h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {productData.colors.map((color, idx) => (
                <div key={idx} style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', background: color,
                  cursor: 'pointer', border: '2px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Key Features
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {productData.features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}>
                  <span style={{ color: '#4F46E5' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart({ ...productData, quantity: 1 })}
              style={{
                flex: 1, background: '#111827', color: 'white', padding: '1rem', borderRadius: '8px',
                fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: 'pointer'
              }}
            >
              Add to Bag
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'white', color: '#1E293B', padding: '1rem', borderRadius: '8px',
                fontSize: '1.125rem', fontWeight: '600', border: '2px solid #E2E8F0', cursor: 'pointer'
              }}
            >
              ❤️
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', color: '#64748B', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🚚 Free Delivery
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🛡️ 2 Year Warranty
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ↩️ 30 Day Returns
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsPage;
