import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onNavigateCheckout, onNavigateCart }) => {
  const {
    isCartOpen,
    closeCart,
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

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const freeShippingDiff = freeShippingThreshold - subtotal;
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>
              Your Cart ({itemsCount})
            </h3>
          </div>
          <button onClick={closeCart} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            background: 'rgba(99, 102, 241, 0.08)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', marginBottom: '6px' }}>
            <Truck size={15} color="var(--accent-cyan)" />
            {freeShippingDiff > 0 ? (
              <span>
                Add <strong style={{ color: '#fff' }}>${freeShippingDiff.toFixed(2)}</strong> more for <strong>Free Shipping</strong>!
              </span>
            ) : (
              <span style={{ color: '#34d399', fontWeight: 600 }}>
                🎉 You've unlocked FREE Express Shipping!
              </span>
            )}
          </div>
          <div
            style={{
              height: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${shippingProgress}%`,
                height: '100%',
                background: 'var(--gradient-brand)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Drawer Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {cartItems.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--text-muted)',
              }}
            >
              <ShoppingBag size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
              <h4>Your cart is empty</h4>
              <p style={{ fontSize: '0.88rem', margin: '0.5rem 0 1.5rem' }}>
                Looks like you haven't added any gear yet.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={closeCart}
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '72px',
                    height: '72px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    background: '#090d16',
                  }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    <h4
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      {item.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product)}
                      style={{
                        background: 'none',
                        color: 'var(--text-dim)',
                        padding: '2px',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                      }}
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <span
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)',
                      margin: '4px 0 8px',
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQty(item.product, item.qty - 1)}
                        style={{ padding: '2px 8px', color: '#fff', background: 'none' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0 6px' }}>
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.product, item.qty + 1)}
                        style={{ padding: '2px 8px', color: '#fff', background: 'none' }}
                        disabled={item.qty >= item.countInStock}
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>
                      Sub: ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-elevated)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span style={{ color: '#fff' }}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span>Shipping</span>
              <span style={{ color: shippingPrice === 0 ? '#34d399' : '#fff' }}>
                {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '1.1rem', fontWeight: 700 }}>
              <span>Estimated Total</span>
              <span style={{ color: 'var(--accent-cyan)' }}>${totalPrice.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  closeCart();
                  onNavigateCheckout();
                }}
              >
                <span>Checkout Now</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn btn-outline btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  closeCart();
                  onNavigateCart();
                }}
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
