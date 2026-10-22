import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  User,
  Shield,
  Package,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = ({ currentRoute, onNavigate, onSearch }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemsCount, openCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    onNavigate('products');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ padding: '0.85rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
              }}
            >
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(90deg, #ffffff 0%, #a5b4fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SYNTECX<span style={{ color: 'var(--accent-cyan)' }}>HUB</span>
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              flex: '1 1 340px',
              maxWidth: '460px',
              position: 'relative',
              display: 'none',
            }}
            className="search-form-desktop"
          >
            <input
              type="text"
              placeholder="Search gear, monitors, audio, gadgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{
                paddingLeft: '40px',
                paddingRight: '16px',
                height: '42px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem',
              }}
            />
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
              }}
            />
          </form>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
            className="nav-links-desktop"
          >
            <button
              onClick={() => onNavigate('home')}
              style={{
                background: 'none',
                color: currentRoute === 'home' ? 'var(--accent-primary)' : 'var(--text-main)',
                fontWeight: currentRoute === 'home' ? 700 : 500,
                fontSize: '0.92rem',
              }}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('products')}
              style={{
                background: 'none',
                color: currentRoute === 'products' ? 'var(--accent-primary)' : 'var(--text-main)',
                fontWeight: currentRoute === 'products' ? 700 : 500,
                fontSize: '0.92rem',
              }}
            >
              Products
            </button>

            {isAuthenticated && (
              <button
                onClick={() => onNavigate('my-orders')}
                style={{
                  background: 'none',
                  color: currentRoute === 'my-orders' ? 'var(--accent-primary)' : 'var(--text-main)',
                  fontWeight: currentRoute === 'my-orders' ? 700 : 500,
                  fontSize: '0.92rem',
                }}
              >
                My Orders
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: '#a5b4fc',
                  border: '1px solid rgba(99, 102, 241, 0.35)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                <Shield size={14} />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* User & Cart Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className="btn-icon"
              style={{ position: 'relative' }}
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {itemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: 'var(--accent-rose)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)',
                  }}
                >
                  {itemsCount}
                </span>
              )}
            </button>

            {/* User Dropdown / Login */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 12px 4px 4px',
                    color: 'var(--text-main)',
                  }}
                >
                  <img
                    src={
                      user.avatar ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                    }
                    alt={user.name}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '220px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: '8px',
                      zIndex: 100,
                      animation: 'fadeIn 0.15s ease-out',
                    }}
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
                      <p style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>{user.name}</p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                      <span className={`badge ${isAdmin ? 'badge-brand' : 'badge-emerald'}`} style={{ marginTop: '6px', fontSize: '0.68rem' }}>
                        {user.role}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate('my-orders')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 10px',
                        background: 'none',
                        color: 'var(--text-main)',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                      <Package size={15} />
                      <span>My Orders</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => onNavigate('admin')}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 10px',
                          background: 'none',
                          color: '#a5b4fc',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          textAlign: 'left',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                      >
                        <Shield size={15} />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      onClick={logout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 10px',
                        background: 'none',
                        color: '#fb7185',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        textAlign: 'left',
                        borderTop: '1px solid var(--border-subtle)',
                        marginTop: '6px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => onNavigate('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate('register')}
                >
                  Join
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="btn-icon mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              paddingTop: '1rem',
              marginTop: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
                style={{
                  paddingLeft: '38px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-dim)',
                }}
              />
            </form>

            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '8px',
                textAlign: 'left',
                background: 'none',
                color: '#fff',
                fontSize: '0.95rem',
              }}
            >
              Home
            </button>

            <button
              onClick={() => {
                onNavigate('products');
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '8px',
                textAlign: 'left',
                background: 'none',
                color: '#fff',
                fontSize: '0.95rem',
              }}
            >
              Products Catalog
            </button>

            {isAuthenticated && (
              <button
                onClick={() => {
                  onNavigate('my-orders');
                  setMobileMenuOpen(false);
                }}
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  background: 'none',
                  color: '#fff',
                  fontSize: '0.95rem',
                }}
              >
                My Orders
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: '#a5b4fc',
                  fontSize: '0.95rem',
                  borderRadius: '6px',
                }}
              >
                Admin Dashboard
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 860px) {
          .search-form-desktop { display: block !important; }
          .nav-links-desktop { display: flex !important; }
          .mobile-menu-toggle { display: none !important; }
        }
        @media (max-width: 859px) {
          .search-form-desktop { display: none !important; }
          .nav-links-desktop { display: none !important; }
          .mobile-menu-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
