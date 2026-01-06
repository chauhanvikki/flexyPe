import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart, placeOrder, removeFromCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 0; // Free delivery logic
  const grandTotal = total;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Number only logic for Phone
    if (name === 'phone' && !/^\d*$/.test(value)) return;
    
    // Card grouping logic (simple formatting)
    if (name === 'cardNumber') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const parts = [];
      for (let i = 0; i < v.length; i += 4) {
        parts.push(v.substr(i, 4));
      }
      if (parts.length) {
        setFormData({ ...formData, [name]: parts.join(' ').substr(0, 19) });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      orderNumber: `FP-${Date.now()}`,
      customerName: formData.fullName,
      items: cart,
      total: grandTotal,
      totalINR: (grandTotal * 83).toLocaleString(),
      date: new Date().toLocaleDateString()
    };
    placeOrder(orderData);
    navigate('/order-confirmation');
  };

  const styles = {
    page: {
      backgroundColor: '#f9fafb', // gray-50
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, system-ui, sans-serif'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    layout: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
    },
    colLeft: {
      flex: '1 1 600px', // Grow, shrink, base of 600px
    },
    colRight: {
      flex: '1 1 350px',
      height: 'fit-content',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb', // gray-200
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '1.25rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid #f3f4f6'
    },
    grid2: {
      display: 'flex',
      gap: '1rem',
    },
    fieldGroup: {
      marginBottom: '1rem',
      flex: 1,
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151', // gray-700
      marginBottom: '0.375rem',
    },
    input: {
      width: '100%',
      padding: '0.625rem 0.75rem',
      border: '1px solid #d1d5db', // gray-300
      borderRadius: '6px',
      fontSize: '0.95rem',
      color: '#1f2937',
      outline: 'none',
      backgroundColor: '#fff',
    },
    summaryItem: {
      display: 'flex',
      gap: '1rem',
      padding: '1rem 0',
      borderBottom: '1px solid #f3f4f6',
    },
    imgPlaceholder: {
      width: '60px',
      height: '60px',
      backgroundColor: '#f3f4f6',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.5rem 0',
      color: '#4b5563',
      fontSize: '0.95rem',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #e5e7eb',
      fontWeight: '700',
      fontSize: '1.125rem',
      color: '#111827',
    },
    button: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#111827', // Gray-900 (often used as black in modern commerce)
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1.5rem',
      transition: 'background-color 0.2s',
    },
    secureBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#059669', // emerald-600
      marginBottom: '1rem',
      fontWeight: '500',
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Your cart is empty. <span style={{color: 'blue', cursor:'pointer'}} onClick={() => navigate('/')}>Go Shopping</span></p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.layout}>
          
          {/* LEFT COLUMN */}
          <div style={styles.colLeft}>
            {/* Shipping Info */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Shipping Information</h2>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" name="email" 
                  value={formData.email} onChange={handleInputChange} 
                  style={styles.input} placeholder="you@example.com" required 
                />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" name="fullName" 
                  value={formData.fullName} onChange={handleInputChange} 
                  style={styles.input} placeholder="John Doe" required 
                />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Address</label>
                <input 
                  type="text" name="address" 
                  value={formData.address} onChange={handleInputChange} 
                  style={styles.input} placeholder="Street, Apt, Suite" required 
                />
              </div>
              <div style={styles.grid2}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>City</label>
                  <input 
                    type="text" name="city" 
                    value={formData.city} onChange={handleInputChange} 
                    style={styles.input} required 
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Pincode</label>
                  <input 
                    type="text" name="pincode" 
                    value={formData.pincode} onChange={handleInputChange} 
                    style={styles.input} required 
                  />
                </div>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Phone Number</label>
                <input 
                  type="tel" name="phone" 
                  value={formData.phone} onChange={handleInputChange} 
                  style={styles.input} placeholder="9999999999" required 
                />
              </div>
            </div>

            {/* Payment Info */}
            <div style={styles.section}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', marginBottom: '1.25rem', paddingBottom: '0.75rem'}}>
                <h2 style={{...styles.sectionTitle, borderBottom: 'none', paddingBottom: 0, marginBottom: 0}}>Payment Details</h2>
                <div style={styles.secureBadge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Secure Payment
                </div>
              </div>
              
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Card Number</label>
                <input 
                  type="text" name="cardNumber" 
                  value={formData.cardNumber} onChange={handleInputChange} 
                  style={styles.input} placeholder="0000 0000 0000 0000" maxLength="19" required 
                />
              </div>
              <div style={styles.grid2}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Expiry (MM/YY)</label>
                  <input 
                    type="text" name="expiryDate" 
                    value={formData.expiryDate} onChange={handleInputChange} 
                    style={styles.input} placeholder="MM/YY" required 
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>CVV</label>
                  <input 
                    type="text" name="cvv" 
                    value={formData.cvv} onChange={handleInputChange} 
                    style={styles.input} placeholder="123" maxLength="4" required 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={styles.colRight}>
            <div style={{...styles.section, position: 'sticky', top: '2rem'}}>
              <h2 style={styles.sectionTitle}>Order Summary</h2>
              
              <div>
                {cart.map((item, i) => (
                  <div key={i} style={styles.summaryItem}>
                    <div style={styles.imgPlaceholder}>{item.image}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight: '500', color: '#111827'}}>{item.name}</div>
                      <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Qty: {item.quantity}</div>
                      <button 
                        onClick={() => removeFromCart(i)}
                        style={{
                          background: 'none', 
                          border: 'none', 
                          color: '#ef4444', 
                          fontSize: '0.75rem', 
                          fontWeight: '600', 
                          padding: '0', 
                          cursor: 'pointer', 
                          marginTop: '4px',
                          textDecoration: 'underline'
                        }}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                    <div style={{fontWeight: '600', fontSize:'0.95rem'}}>₹{(item.price * item.quantity * 83).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div style={{marginTop: '1.5rem'}}>
                <div style={styles.row}>
                  <span>Subtotal</span>
                  <span>₹{(total * 83).toLocaleString()}</span>
                </div>
                <div style={styles.row}>
                  <span>Delivery</span>
                  <span style={{color: '#059669'}}>Free</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Total Amount</span>
                  <span>₹{(grandTotal * 83).toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" style={styles.button}>
                Place Order
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;