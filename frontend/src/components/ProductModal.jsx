import React, { useState } from 'react';
import { X, ShoppingBag, Eye, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import Rating from './Rating';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ product, onClose, onNavigateDetails }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '850px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="btn-icon"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              background: 'rgba(15, 23, 42, 0.8)',
            }}
          >
            <X size={18} />
          </button>

          {/* Product Image Column */}
          <div
            style={{
              flex: '1 1 360px',
              minHeight: '350px',
              background: '#070b13',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                maxHeight: '450px',
              }}
            />
            {product.badge && (
              <span
                className="badge badge-brand product-badge-float"
                style={{ top: '16px', left: '16px' }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Info Column */}
          <div
            style={{
              flex: '1 1 380px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.4rem',
              }}
            >
              {product.category} • {product.brand || 'Syntecx'}
            </span>

            <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <Rating value={product.rating} numReviews={product.numReviews} />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>|</span>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: product.countInStock > 0 ? '#34d399' : '#f87171',
                }}
              >
                {product.countInStock > 0
                  ? `In Stock (${product.countInStock} available)`
                  : 'Out of Stock'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span style={{ fontSize: '1.05rem', textDecoration: 'line-through', color: 'var(--text-dim)' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Guarantees */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={16} color="var(--accent-cyan)" />
                <span>Express Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>2-Year Warranty</span>
              </div>
            </div>

            {/* Qty & Add to Cart */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    padding: '8px 14px',
                    background: 'transparent',
                    color: '#fff',
                    fontSize: '1.1rem',
                  }}
                  disabled={qty <= 1}
                >
                  -
                </button>
                <span style={{ padding: '0 8px', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}
                  style={{
                    padding: '8px 14px',
                    background: 'transparent',
                    color: '#fff',
                    fontSize: '1.1rem',
                  }}
                  disabled={qty >= product.countInStock}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
                disabled={product.countInStock <= 0}
              >
                <ShoppingBag size={18} />
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                onClose();
                if (onNavigateDetails) onNavigateDetails(product._id);
              }}
            >
              <span>View Full Details & Customer Reviews</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
