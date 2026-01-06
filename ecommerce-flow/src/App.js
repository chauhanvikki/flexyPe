import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import SupportPage from './pages/SupportPage';

import './App.css';

const AppContent = () => {
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const placeOrder = (order) => {
    setOrderData(order);
  };

  const handleLogin = (credentials) => {
    setUser({ name: credentials.email.split('@')[0], email: credentials.email });
    navigate('/dashboard');
  };

  const handleSignup = (userData) => {
    setUser({ name: userData.name, email: userData.email });
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/auth');
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/auth" element={
            !user ? <AuthPage onLogin={handleLogin} onSignup={handleSignup} /> : <Navigate to="/dashboard" />
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard 
                user={user} 
                onLogout={handleLogout} 
                onStartShopping={() => navigate('/shop')} 
                navigate={navigate}
              />
            </ProtectedRoute>
          } />
          
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } />
          
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <WishlistPage addToCart={addToCart} />
            </ProtectedRoute>
          } />
          
          <Route path="/support" element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          } />

          <Route path="/shop" element={
             <ProtectedRoute>
               <HomePage />
             </ProtectedRoute>
          } />
          
          <Route path="/brand/:brandName" element={
             <ProtectedRoute>
               <BrandPage addToCart={addToCart} />
             </ProtectedRoute>
          } />

          <Route path="/product/:productId" element={
             <ProtectedRoute>
               <ProductDetailsPage addToCart={addToCart} />
             </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
             <ProtectedRoute>
               <CheckoutPage cart={cart} placeOrder={placeOrder} removeFromCart={removeFromCart} />
             </ProtectedRoute>
          } />
          
          <Route path="/order-confirmation" element={
             <ProtectedRoute>
               <OrderConfirmationPage orderData={orderData} />
             </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;