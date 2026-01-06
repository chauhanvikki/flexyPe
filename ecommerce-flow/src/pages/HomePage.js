import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const brands = [
    { name: 'Apple', logo: '🍎', description: 'Designed by Apple in California', slug: 'apple' },
    { name: 'Samsung', logo: '📱', description: 'Imagine the impossible', slug: 'samsung' },
    { name: 'Sony', logo: '🎧', description: 'Be Moved', slug: 'sony' },
    { name: 'Nike', logo: '👟', description: 'Just Do It', slug: 'nike' },
    { name: 'Canon', logo: '📷', description: 'Delighting You Always', slug: 'canon' },
    { name: 'Dell', logo: '💻', description: 'The power to do more', slug: 'dell' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(180deg, #111827 0%, #1F2937 100%)',
          color: 'white',
          padding: '6rem 1.5rem',
          textAlign: 'center',
          borderRadius: '0 0 40px 40px',
          marginBottom: '4rem'
        }}
      >
        <div className="container">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              display: 'inline-block',
              padding: '0.5rem 1.5rem', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Spring Collection 2026
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: '800', 
              marginBottom: '1.5rem',
              letterSpacing: '-0.025em',
              lineHeight: '1.1'
            }}
          >
            Premium gear for<br />
            <span style={{ color: '#818CF8' }}>serious creators.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ 
              fontSize: '1.25rem', 
              color: '#9CA3AF', 
              marginBottom: '2.5rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Curated electronics and lifestyle essentials from the world's best brands.
          </motion.p>
        </div>
      </motion.section>

      {/* Featured Brands */}
      <div className="container">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
            <motion.h2 variants={itemVariants} style={{ fontSize: '2rem', fontWeight: '700', color: '#111827' }}>
              Shop by Brand
            </motion.h2>
            <motion.a variants={itemVariants} href="#" style={{ color: '#4F46E5', fontWeight: '500', textDecoration: 'none' }}>
              View all →
            </motion.a>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {brands.map((brand) => (
              <Link 
                key={brand.slug} 
                to={`/brand/${brand.slug}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'white',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    border: '1px solid #E5E7EB',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    fontSize: '4rem', 
                    marginBottom: '1.5rem',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {brand.logo}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{brand.name}</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>{brand.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="container" style={{ marginTop: '6rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          padding: '3rem',
          background: '#F9FAFB',
          borderRadius: '24px'
        }}>
          {[
            { icon: '🚀', title: 'Free Express Shipping', desc: 'On all orders over ₹999' },
            { icon: '🛡️', title: 'Secure Payment', desc: '100% secure checkout' },
            { icon: '💬', title: '24/7 Support', desc: 'Expert assistance anytime' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1F2937' }}>{item.title}</h3>
              <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;