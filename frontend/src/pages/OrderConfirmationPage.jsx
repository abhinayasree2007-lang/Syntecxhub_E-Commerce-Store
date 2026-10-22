import React from 'react';
import { CheckCircle, Package, ArrowRight, Truck, Calendar, MapPin, CreditCard } from 'lucide-react';

export const OrderConfirmationPage = ({ order, onNavigateOrders, onNavigateHome }) => {
  if (!order) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>No recent order found</h2>
        <button className="btn btn-primary" onClick={onNavigateHome} style={{ marginTop: '1rem' }}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '860px' }}>
      {/* Success Hero Header */}
      <div
        className="glass-panel"
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.2)',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <CheckCircle size={40} color="#10b981" />
        </div>

        <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
          Payment Confirmed (Simulated)
        </span>

        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
          Thank You For Your Order!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
          We've received your order and our logistics team is preparing your package for priority dispatch.
        </p>

        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            background: 'var(--bg-elevated)',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.88rem',
          }}
        >
          <span>Order ID: <strong style={{ color: 'var(--accent-cyan)' }}>#{order._id}</strong></span>
          <span style={{ color: 'var(--text-dim)' }}>•</span>
          <span>Status: <strong style={{ color: '#34d399' }}>{order.orderStatus}</strong></span>
        </div>
      </div>

      {/* Order Info Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Shipping address */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>
            <MapPin size={18} />
            <h4 style={{ fontSize: '1rem', margin: 0, color: '#fff' }}>Shipping Destination</h4>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600, margin: '0 0 4px' }}>
            {order.shippingAddress?.fullName}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            {order.shippingAddress?.address}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            {order.shippingAddress?.country}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Phone: {order.shippingAddress?.phone}
          </p>
        </div>

        {/* Payment info */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: 'var(--accent-primary)' }}>
            <CreditCard size={18} />
            <h4 style={{ fontSize: '1rem', margin: 0, color: '#fff' }}>Payment Simulation</h4>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600, margin: '0 0 4px' }}>
            {order.paymentMethod}
          </p>
          <p style={{ fontSize: '0.82rem', color: '#34d399', margin: '0 0 4px' }}>
            Status: Paid & Verified
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Transaction Ref: {order.paymentResult?.id || 'SIM_APPROVED'}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Timestamp: {new Date(order.paidAt || Date.now()).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Ordered Items Table */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          Purchased Hardware
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {order.orderItems?.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', background: '#090d16' }}
              />
              <div style={{ flex: 1, minWidth: '180px' }}>
                <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px' }}>{item.name}</h4>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Qty: {item.qty} × ${item.price.toFixed(2)}
                </span>
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span>Items Subtotal</span>
            <span>${order.itemsPrice?.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span>Shipping</span>
            <span>{order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice?.toFixed(2)}`}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span>Tax</span>
            <span>${order.taxPrice?.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-cyan)', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
            <span>Total Paid</span>
            <span>${order.totalPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onNavigateOrders}
        >
          <Package size={18} />
          <span>View In My Orders</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={onNavigateHome}
        >
          <span>Continue Shopping</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
