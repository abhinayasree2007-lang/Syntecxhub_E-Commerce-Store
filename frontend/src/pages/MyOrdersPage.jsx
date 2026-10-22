import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const MyOrdersPage = ({ onNavigateProducts, onSelectProduct }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        const data = await api.orders.getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Could not load your orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge badge-emerald">Delivered</span>;
      case 'Shipped':
        return <span className="badge badge-brand">Shipped</span>;
      case 'Processing':
        return <span className="badge badge-cyan">Processing</span>;
      case 'Cancelled':
        return <span className="badge badge-rose">Cancelled</span>;
      default:
        return <span className="badge badge-amber">Pending</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Please Sign In</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>
          You must be logged in to view your past orders and shipments.
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>My Orders & Shipments</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Track real-time status and view receipt records for all your orders
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p>Retrieving your order records...</p>
        </div>
      ) : error ? (
        <div
          style={{
            padding: '1.5rem',
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '12px',
            color: '#fb7185',
          }}
        >
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Package size={56} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No orders placed yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
            Ready to upgrade your gear? Check out our newly stocked peripherals and audio equipment.
          </p>
          <button type="button" className="btn btn-primary" onClick={onNavigateProducts}>
            <span>Start Shopping</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map((order) => (
            <div
              key={order._id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  background: 'var(--bg-elevated)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.86rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block' }}>Order Placed</span>
                    <strong style={{ color: '#fff' }}>
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block' }}>Total Amount</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>${order.totalPrice?.toFixed(2)}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block' }}>Ship To</span>
                    <strong style={{ color: '#fff' }}>{order.shippingAddress?.fullName}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    ID: #{order._id.substring(order._id.length - 8)}
                  </span>
                  {getStatusBadge(order.orderStatus)}
                </div>
              </div>

              {/* Card Body - Products List */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {order.orderItems?.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap',
                      paddingBottom: idx !== order.orderItems.length - 1 ? '1.25rem' : 0,
                      borderBottom:
                        idx !== order.orderItems.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        background: '#090d16',
                        cursor: 'pointer',
                      }}
                      onClick={() => onSelectProduct && onSelectProduct(item.product)}
                    />

                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <h4
                        style={{
                          fontSize: '0.98rem',
                          marginBottom: '4px',
                          cursor: 'pointer',
                        }}
                        onClick={() => onSelectProduct && onSelectProduct(item.product)}
                      >
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                        Quantity: <strong>{item.qty}</strong> • Price: ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery / Tracking Status Bar */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <Truck size={16} color="var(--accent-cyan)" />
                  <span>
                    Destination: {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </span>
                </div>

                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                  Payment: {order.paymentMethod} • {order.isPaid ? 'Paid' : 'Unpaid'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
