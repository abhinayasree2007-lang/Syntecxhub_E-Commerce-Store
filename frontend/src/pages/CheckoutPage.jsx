import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Smartphone,
  Banknote,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const CheckoutPage = ({ onOrderSuccess, onNavigateLogin }) => {
  const { cartItems, subtotal, shippingPrice, taxPrice, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    address: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States',
    phone: '+1 (555) 345-6789',
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Simulated)');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: user?.name || 'ALEX JOHNSON',
    expiry: '12/28',
    cvv: '888',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError('Please sign in or create an account to complete checkout');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your shopping cart is empty');
      return;
    }

    const { fullName, address, city, state, postalCode, country, phone } = formData;
    if (!fullName || !address || !city || !state || !postalCode || !country || !phone) {
      setError('Please fill in all shipping address fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty,
        })),
        shippingAddress: formData,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const createdOrder = await api.orders.create(orderData);
      clearCart();
      if (onOrderSuccess) {
        onOrderSuccess(createdOrder);
      }
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 2rem' }}>
          <Lock size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Authentication Required</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            Please sign in to your Syntecxhub account to securely complete checkout and track order status.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNavigateLogin}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Secure Checkout</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Finalize your shipping destination and simulated payment method
        </p>
      </div>

      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '10px',
            color: '#fb7185',
            marginBottom: '2rem',
            fontSize: '0.9rem',
          }}
        >
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Shipping & Payment Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Step 1: Shipping Address */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  1
                </div>
                <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Shipping Address</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Johnson"
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Seattle"
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State / Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="WA"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Postal / ZIP Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="98101"
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  2
                </div>
                <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Payment Method</h3>
              </div>

              {/* Sandbox notice */}
              <div
                style={{
                  padding: '10px 14px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: '#67e8f9',
                  fontSize: '0.82rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <ShieldCheck size={18} />
                <span>Sandbox / Test Environment: Real payment gateway is not charged.</span>
              </div>

              {/* Payment selector radios */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
                {[
                  { id: 'Credit Card (Simulated)', title: 'Credit / Debit Card (Simulated)', icon: CreditCard },
                  { id: 'UPI / NetBanking (Simulated)', title: 'UPI / Instant Bank Transfer (Simulated)', icon: Smartphone },
                  { id: 'Cash On Delivery', title: 'Cash on Delivery (Pay upon arrival)', icon: Banknote },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <label
                      key={m.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px',
                        borderRadius: '10px',
                        background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-elevated)',
                        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={isSelected}
                        onChange={() => setPaymentMethod(m.id)}
                        style={{ accentColor: 'var(--accent-primary)' }}
                      />
                      <Icon size={20} color={isSelected ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                      <span style={{ fontSize: '0.92rem', fontWeight: isSelected ? 600 : 500 }}>{m.title}</span>
                    </label>
                  );
                })}
              </div>

              {/* Card Inputs if card is selected */}
              {paymentMethod === 'Credit Card (Simulated)' && (
                <div
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                  }}
                >
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Name on Card</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={cardInfo.cardHolder}
                      onChange={handleCardChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={handleCardChange}
                        className="input-field"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">CVV / CVC</label>
                      <input
                        type="password"
                        name="cvv"
                        maxLength={4}
                        value={cardInfo.cvv}
                        onChange={handleCardChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary Preview */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              position: 'sticky',
              top: '100px',
              border: '1px solid rgba(99, 102, 241, 0.3)',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              Items in Order ({cartItems.length})
            </h3>

            {/* List preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '260px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '4px' }}>
              {cartItems.map((item) => (
                <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <h5 style={{ fontSize: '0.85rem', margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                      {item.name}
                    </h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Qty: {item.qty} × ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span style={{ color: '#fff' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: shippingPrice === 0 ? '#34d399' : '#fff' }}>
                  {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Estimated Tax (8%)</span>
                <span style={{ color: '#fff' }}>${taxPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.35rem', fontWeight: 800, paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--accent-cyan)' }}>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading || cartItems.length === 0}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading ? 'Processing Order...' : `Pay $${totalPrice.toFixed(2)} (Place Order)`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
