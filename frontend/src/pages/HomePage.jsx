import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Headphones,
  Laptop,
  Watch,
  Tv,
  Home,
  ShieldCheck,
  Zap,
  TrendingUp,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

export const HomePage = ({
  products,
  loading,
  onNavigate,
  onSelectCategory,
  onQuickView,
  onSelectProduct,
}) => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const latestProducts = products.slice(0, 8);

  const categories = [
    { name: 'Audio', icon: Headphones, count: 'Over 15 items', color: '#6366f1' },
    { name: 'Computing', icon: Laptop, count: 'Keyboards & Mice', color: '#06b6d4' },
    { name: 'Wearables', icon: Watch, count: 'Smartwatches', color: '#8b5cf6' },
    { name: 'Electronics', icon: Tv, count: '4K Studio Displays', color: '#10b981' },
    { name: 'Smart Home', icon: Home, count: 'Ambient & Purifiers', color: '#f59e0b' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '4.5rem 0 3.5rem',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            {/* Left Hero Content */}
            <div style={{ flex: '1 1 500px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.04em' }}>
                  NEXT-GEN ELECTRONICS & TECH GEAR 2026
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                }}
              >
                Engineered for <br />
                <span className="text-gradient">Performance & Elegance.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '540px',
                  marginBottom: '2rem',
                }}
              >
                Discover precision mechanical peripherals, studio-grade spatial audio, high refresh OLED screens, and smart ambient ecosystems built for professionals and creators.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => onNavigate('products')}
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => onSelectCategory('Audio')}
                >
                  <span>Hi-Fi Audio Gear</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  marginTop: '2.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>2-Year Official Warranty</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="#34d399" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Same-Day Dispatch</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} color="#fbbf24" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>4.9/5 Rating (5,000+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div
              style={{
                flex: '1 1 450px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                className="glass-panel"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.25)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', height: '360px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Pro Headphones"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(9, 13, 22, 0.9) 100%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                    <span className="badge badge-brand" style={{ marginBottom: '6px' }}>
                      Flagship Audio
                    </span>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
                      Syntecx Pro ANC Headphones
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                        $249.99
                      </span>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          const item = products.find((p) => p.name.includes('Syntecx Pro'));
                          if (item) onSelectProduct(item._id);
                          else onNavigate('products');
                        }}
                      >
                        Discover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Browse by Category
              </span>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
                Engineered for Every Lifestyle
              </h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              style={{
                background: 'none',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>View All</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="glass-panel"
                  onClick={() => onSelectCategory(cat.name)}
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = cat.color;
                    e.currentTarget.style.boxShadow = `0 10px 25px rgba(0,0,0,0.5), 0 0 15px ${cat.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: `${cat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      color: cat.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{cat.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{cat.count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section style={{ padding: '3.5rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              <span className="badge badge-brand" style={{ marginBottom: '0.75rem' }}>
                Handpicked Innovations
              </span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Featured Gear of the Month
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Top-rated hardware chosen for superior craftsmanship and performance metrics.
              </p>
            </div>

            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={onQuickView}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spotlight Promo Banner */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '3rem 2.5rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '1rem' }}>
                LIMITED PROMOTION
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                Upgrade Your Creator Workspace with 4K HDR Brilliance
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                Order any monitor or desk peripheral today and receive instant expedited shipping, 2-year damage protection, and 10% cash back in loyalty tokens.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSelectCategory('Electronics')}
              >
                <span>Shop Creator Displays</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ width: '320px', height: '220px', borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
                alt="4K Display"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Fresh In Inventory
              </span>
              <h2 style={{ fontSize: '1.85rem', marginTop: '0.25rem' }}>
                Latest Arrivals
              </h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="btn btn-outline btn-sm"
            >
              Explore Full Collection ({products.length})
            </button>
          </div>

          <div className="product-grid">
            {latestProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
