import React from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import Rating from './Rating';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onQuickView, onSelectProduct }) => {
  const { addToCart, cartItems } = useCart();

  const inCartItem = cartItems.find((item) => item.product === product._id);

  const getBadgeClass = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'bestseller':
        return 'badge-brand';
      case 'hot deal':
      case 'sale':
        return 'badge-rose';
      case 'popular':
      case 'trending':
        return 'badge-cyan';
      case 'staff pick':
      case 'top rated':
        return 'badge-emerald';
      default:
        return 'badge-amber';
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.badge && (
          <span className={`badge ${getBadgeClass(product.badge)} product-badge-float`}>
            {product.badge}
          </span>
        )}

        <div className="product-quick-actions">
          <button
            type="button"
            className="btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Quick Preview"
          >
            <Eye size={16} />
          </button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onClick={() => onSelectProduct(product._id)}
          style={{ cursor: 'pointer' }}
          loading="lazy"
        />
      </div>

      <div className="product-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="product-category">{product.category}</span>
          <span style={{ fontSize: '0.75rem', color: product.countInStock > 0 ? '#10b981' : '#f43f5e' }}>
            {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
          </span>
        </div>

        <h3
          className="product-title"
          onClick={() => onSelectProduct(product._id)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h3>

        <div style={{ marginBottom: '0.75rem' }}>
          <Rating value={product.rating} numReviews={product.numReviews} />
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <div className="product-price-box">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="product-original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            className={`btn ${inCartItem ? 'btn-secondary' : 'btn-primary'} btn-sm`}
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock <= 0}
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            {inCartItem ? (
              <>
                <Check size={14} color="#10b981" />
                <span>Added ({inCartItem.qty})</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
