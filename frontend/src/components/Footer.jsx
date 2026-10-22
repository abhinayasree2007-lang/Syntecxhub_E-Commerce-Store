import React from 'react';
import { Sparkles, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export const Footer = ({ onNavigateCategory, onNavigate }) => {
  return (
    <footer
      style={{
        background: '#070b13',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '5rem',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="container">
        {/* Value Propositions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '12px', borderRadius: '12px' }}>
              <Truck size={24} color="var(--accent-primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Free Express Delivery</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>On orders over $150</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '12px', borderRadius: '12px' }}>
              <ShieldCheck size={24} color="var(--accent-cyan)" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>2-Year Comprehensive Warranty</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>100% Genuine guaranteed</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px', borderRadius: '12px' }}>
              <RotateCcw size={24} color="#10b981" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>30-Day Hassle-Free Returns</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Instant full refund or swap</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '12px', borderRadius: '12px' }}>
              <Headphones size={24} color="#f59e0b" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>24/7 Expert Tech Support</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Ready whenever you need</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800 }}>
                SYNTECX<span style={{ color: 'var(--accent-cyan)' }}>HUB</span>
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Architecting the pinnacle of consumer electronics, high-fidelity sound, precision peripherals, and smart living.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: '#fff' }}>
              Categories
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              {['Audio', 'Computing', 'Wearables', 'Electronics', 'Smart Home', 'Accessories'].map((cat) => (
                <span
                  key={cat}
                  onClick={() => onNavigateCategory && onNavigateCategory(cat)}
                  style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: '#fff' }}>
              Explore
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              <span onClick={() => onNavigate('products')} style={{ cursor: 'pointer' }}>All Products</span>
              <span onClick={() => onNavigate('my-orders')} style={{ cursor: 'pointer' }}>Track Orders</span>
              <span onClick={() => onNavigate('cart')} style={{ cursor: 'pointer' }}>Shopping Bag</span>
              <span onClick={() => onNavigate('admin')} style={{ cursor: 'pointer' }}>Admin Portal</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: '#fff' }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
              Subscribe for exclusive early-bird drop notifications and tech discounts.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="your.email@syntecx.com"
                className="input-field"
                style={{ height: '38px', fontSize: '0.84rem' }}
              />
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => alert('Thanks for subscribing to Syntecxhub updates!')}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}
        >
          <p>© {new Date().getFullYear()} Syntecxhub E-Commerce Store. Built with React, Node.js, Express & MongoDB.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
