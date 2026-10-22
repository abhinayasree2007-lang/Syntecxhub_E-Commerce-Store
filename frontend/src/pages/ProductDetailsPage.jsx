import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  User,
  MessageSquare,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Rating from '../components/Rating';

export const ProductDetailsPage = ({ productId, onBack, onNavigateLogin }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  // Review Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(null);

  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await api.products.getById(productId);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
      window.scrollTo(0, 0);
    }
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setReviewError('Please write a comment for your review');
      return;
    }

    setSubmittingReview(true);
    setReviewError(null);
    try {
      await api.products.addReview(productId, { rating, comment });
      setReviewSuccess('Thank you! Your review has been submitted.');
      setComment('');
      // Refetch product with new review
      await fetchProduct();
    } catch (err) {
      setReviewError(err.message || 'Could not submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Loading product specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>{error || 'Product not found'}</h2>
        <button type="button" className="btn btn-primary" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Return to Catalog</span>
        </button>
      </div>
    );
  }

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '2rem', gap: '6px' }}
      >
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </button>

      {/* Main Product Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}
      >
        {/* Product Media Column */}
        <div>
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: '#070b13',
              height: '460px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.badge && (
              <span className="badge badge-brand product-badge-float" style={{ top: '20px', left: '20px' }}>
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Product Details & Purchase Column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
              {product.category}
            </span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Brand: <strong style={{ color: '#fff' }}>{product.brand || 'Syntecx'}</strong>
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', lineHeight: 1.25 }}>
            {product.name}
          </h1>

          {/* Rating & Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <Rating value={product.rating} numReviews={product.numReviews} />
            <span style={{ color: 'var(--text-dim)' }}>|</span>
            <span
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: product.countInStock > 0 ? '#34d399' : '#f87171',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <CheckCircle2 size={16} />
              {product.countInStock > 0 ? `In Stock (${product.countInStock} units left)` : 'Currently Out of Stock'}
            </span>
          </div>

          {/* Pricing Box */}
          <div
            className="glass-panel"
            style={{
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
              ${product.price.toFixed(2)}
            </span>

            {product.originalPrice > product.price && (
              <>
                <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'var(--text-dim)' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="badge badge-rose">Save {discountPercent}%</span>
              </>
            )}
          </div>

          {/* Description */}
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {product.description}
          </p>

          {/* Quantity and Add to Cart */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                height: '52px',
              }}
            >
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{ padding: '0 16px', background: 'transparent', color: '#fff', fontSize: '1.2rem' }}
                disabled={qty <= 1}
              >
                -
              </button>
              <span style={{ fontWeight: 700, minWidth: '36px', textAlign: 'center' }}>
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}
                style={{ padding: '0 16px', background: 'transparent', color: '#fff', fontSize: '1.2rem' }}
                disabled={qty >= product.countInStock}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ flex: 1, height: '52px', fontSize: '1.05rem' }}
              onClick={() => addToCart(product, qty)}
              disabled={product.countInStock <= 0}
            >
              <ShoppingBag size={20} />
              <span>{product.countInStock > 0 ? 'Add to Shopping Cart' : 'Out of Stock'}</span>
            </button>
          </div>

          {/* Guarantees Box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div>
              <Truck size={20} color="var(--accent-cyan)" style={{ margin: '0 auto 6px' }} />
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', margin: 0 }}>Free Shipping</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>Over $150</p>
            </div>
            <div>
              <ShieldCheck size={20} color="#34d399" style={{ margin: '0 auto 6px' }} />
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', margin: 0 }}>2-Year Warranty</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>Full replacement</p>
            </div>
            <div>
              <RotateCcw size={20} color="#f59e0b" style={{ margin: '0 auto 6px' }} />
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', margin: 0 }}>30-Day Returns</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>No questions asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>
              Customer Reviews ({product.reviews?.length || 0})
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Average verified rating: {product.rating.toFixed(1)} out of 5
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {/* Reviews List */}
          <div>
            {product.reviews && product.reviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {product.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.25rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'var(--accent-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                          }}
                        >
                          {rev.name ? rev.name[0].toUpperCase() : 'U'}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rev.name}</span>
                      </div>
                      <Rating value={rev.rating} showCount={false} />
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      "{rev.comment}"
                    </p>

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '8px' }}>
                      {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Verified Buyer'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                <MessageSquare size={36} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
                <p>No customer reviews yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>

          {/* Submit Review Box */}
          <div>
            {isAuthenticated ? (
              <form
                onSubmit={handleReviewSubmit}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                }}
              >
                <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>
                  Write a Verified Review
                </h4>

                {reviewError && (
                  <div
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.4)',
                      borderRadius: '8px',
                      color: '#fb7185',
                      fontSize: '0.85rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {reviewError}
                  </div>
                )}

                {reviewSuccess && (
                  <div
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      borderRadius: '8px',
                      color: '#6ee7b7',
                      fontSize: '0.85rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {reviewSuccess}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Your Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="select-field"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3 - Average)</option>
                    <option value={2}>⭐⭐ (2 - Below Expectations)</option>
                    <option value={1}>⭐ (1 - Unsatisfactory)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Feedback / Review</label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe audio clarity, build material, keyboard feel, ergonomics..."
                    className="textarea-field"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submittingReview}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {submittingReview ? 'Submitting...' : 'Post Verified Review'}
                </button>
              </form>
            ) : (
              <div
                style={{
                  background: 'rgba(99, 102, 241, 0.05)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <User size={36} color="var(--accent-primary)" style={{ marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Want to review this product?</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Please sign in or create an account to share your verified review.
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={onNavigateLogin}
                >
                  Sign In to Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
