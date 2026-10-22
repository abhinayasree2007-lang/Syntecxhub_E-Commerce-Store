import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, PackageSearch } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export const ProductsPage = ({
  products,
  loading,
  categories = [],
  selectedCategory,
  onSelectCategory,
  searchKeyword,
  onSearch,
  onQuickView,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState(searchKeyword || '');
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    if (searchKeyword !== undefined) {
      setSearchTerm(searchKeyword);
    }
  }, [searchKeyword]);

  // Client-side filtering & sorting of current product set
  let filtered = [...products];

  // Search filter
  if (searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (selectedCategory && selectedCategory !== 'All') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Price range filter
  if (priceRange === 'under-50') {
    filtered = filtered.filter((p) => p.price < 50);
  } else if (priceRange === '50-100') {
    filtered = filtered.filter((p) => p.price >= 50 && p.price <= 100);
  } else if (priceRange === '100-200') {
    filtered = filtered.filter((p) => p.price > 100 && p.price <= 200);
  } else if (priceRange === 'over-200') {
    filtered = filtered.filter((p) => p.price > 200);
  }

  // Sorting
  if (sortOption === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === 'reviews') {
    filtered.sort((a, b) => b.numReviews - a.numReviews);
  } else {
    // Newest
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const handleResetFilters = () => {
    setSearchTerm('');
    if (onSearch) onSearch('');
    if (onSelectCategory) onSelectCategory('All');
    setSortOption('newest');
    setPriceRange('all');
  };

  const allCategories = ['All', ...(categories.length ? categories : ['Audio', 'Computing', 'Wearables', 'Electronics', 'Smart Home', 'Accessories'])];

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
          Explore Hardware & Peripherals
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Showing {filtered.length} high-performance tech products
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <div style={{ flex: '1 1 260px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by keywords, model, or specs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            className="input-field"
            style={{ paddingLeft: '38px', height: '42px', fontSize: '0.9rem' }}
          />
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
        </div>

        {/* Price Range Filter */}
        <div style={{ minWidth: '150px' }}>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="select-field"
            style={{ height: '42px', fontSize: '0.88rem' }}
          >
            <option value="all">Any Price</option>
            <option value="under-50">Under $50</option>
            <option value="50-100">$50 to $100</option>
            <option value="100-200">$100 to $200</option>
            <option value="over-200">Over $200</option>
          </select>
        </div>

        {/* Sort Select */}
        <div style={{ minWidth: '170px' }}>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select-field"
            style={{ height: '42px', fontSize: '0.88rem' }}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>

        {/* Reset button */}
        {(searchTerm || (selectedCategory && selectedCategory !== 'All') || priceRange !== 'all') && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleResetFilters}
            style={{ height: '42px', gap: '6px' }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Pills Strip */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none',
        }}
      >
        {allCategories.map((cat) => {
          const isSelected =
            (selectedCategory === cat) ||
            (!selectedCategory && cat === 'All') ||
            (selectedCategory === 'All' && cat === 'All');

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: isSelected ? 700 : 500,
                background: isSelected ? 'var(--gradient-brand)' : 'var(--bg-elevated)',
                color: isSelected ? '#ffffff' : 'var(--text-muted)',
                border: isSelected ? '1px solid transparent' : '1px solid var(--border-subtle)',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product Grid or Empty State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(99, 102, 241, 0.2)',
              borderTopColor: 'var(--accent-primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1rem',
            }}
          />
          <p>Loading catalog items...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            maxWidth: '500px',
            margin: '2rem auto',
          }}
        >
          <PackageSearch size={48} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No products found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            We couldn't find any items matching your active search or filters. Try adjusting your query or resetting filters.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleResetFilters}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
