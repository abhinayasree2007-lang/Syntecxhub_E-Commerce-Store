import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = ({ onNavigateCheckout, onNavigateProducts }) => {
  const {
    cartItems,
    itemsCount,
    subtotal,
    shippingPrice,
    taxPrice,
    totalPrice,
    updateQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SYNTECX10') {
      setDiscountPercent(10);
      setCouponMsg({ type: 'success', text: 'Coupon applied! 10% discount added.' });
    } else if (couponCode.toUpperCase() === 'PROMO20') {
      setDiscountPercent(20);
      setCouponMsg({ type: 'success', text: 'VIP discount applied! 20% discount added.' });
    } else {
      setCouponMsg({ type: 'error', text: 'Invalid promo code. Try SYNTECX10' });
    }
  };

  const discountAmount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
  const finalTotal = Math.max(0, Math.round((totalPrice - discountAmount) * 100) / 100);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div
          className="glass-panel"
          style={{ maxWidth: '520px', margin: '0 auto', padding: '3.5rem 2rem' }}
        >
          <ShoppingBag size={56} color="var(--accent-cyan)" style={{ marginBottom: '1.25rem' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Explore our curated catalog of monitors, keyboards, wireless audio, and peripherals.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={onNavigateProducts}
          >
            <span>Explore Collection</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', margin: 0 }}>
          Shopping Cart ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
        </h1>

        <button
          type="button"
          onClick={clearCart}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <Trash2 size={15} />
          <span>Clear Cart</span>
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Cart Items Table */}
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '90px',
                  height: '90px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  background: '#070b13',
                }}
              />

              <div style={{ flex: '1 1 200px' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{item.name}</h3>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  ${item.price.toFixed(2)} each
                </span>
              </div>

              {/* Qty Selector */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => updateQty(item.product, item.qty - 1)}
                  style={{ padding: '6px 12px', background: 'none', color: '#fff', fontSize: '1.1rem' }}
                >
                  -
                </button>
                <span style={{ padding: '0 8px', fontWeight: 700, minWidth: '32px', textAlign: 'center' }}>
                  {item.qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQty(item.product, item.qty + 1)}
                  style={{ padding: '6px 12px', background: 'none', color: '#fff', fontSize: '1.1rem' }}
                  disabled={item.qty >= item.countInStock}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div style={{ minWidth: '90px', textAlign: 'right' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeFromCart(item.product)}
                className="btn-icon"
                style={{ width: '38px', height: '38px' }}
                title="Remove Item"
              >
                <Trash2 size={16} color="var(--accent-rose)" />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline btn-sm"
            style={{ alignSelf: 'flex-start', marginTop: '1rem', gap: '6px' }}
            onClick={onNavigateProducts}
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Order Summary Card */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            position: 'sticky',
            top: '100px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}
        >
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Items Subtotal</span>
              <span style={{ color: '#fff' }}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Estimated Shipping</span>
              <span style={{ color: shippingPrice === 0 ? '#34d399' : '#fff' }}>
                {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Estimated Tax (8%)</span>
              <span style={{ color: '#fff' }}>${taxPrice.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                <span>Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '1.35rem',
                fontWeight: 800,
              }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--accent-cyan)' }}>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo code form */}
          <form onSubmit={applyCoupon} style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Promo code (e.g. SYNTECX10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="input-field"
                style={{ height: '40px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-secondary btn-sm" style={{ height: '40px' }}>
                Apply
              </button>
            </div>
            {couponMsg && (
              <span
                style={{
                  fontSize: '0.78rem',
                  display: 'block',
                  marginTop: '6px',
                  color: couponMsg.type === 'success' ? '#34d399' : '#fb7185',
                }}
              >
                {couponMsg.text}
              </span>
            )}
          </form>

          {/* Checkout CTA */}
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}
            onClick={onNavigateCheckout}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <ShieldCheck size={16} color="var(--accent-cyan)" />
            <span>256-Bit SSL Encrypted & Protected Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
