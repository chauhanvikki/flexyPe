import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderConfirmation from '../components/OrderConfirmation';
import DeliveryTimeline from '../components/DeliveryTimeline';
import OptionalEnhancements from '../components/OptionalEnhancements';
import SupportInfo from '../components/SupportInfo';

const OrderConfirmationPage = ({ orderData }) => {
  const navigate = useNavigate();

  if (!orderData) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2>No order found</h2>
        <p style={{ marginBottom: '20px', color: '#64748b' }}>Please place an order first</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <OrderConfirmation orderData={orderData} />
    </div>
  );
};

export default OrderConfirmationPage;