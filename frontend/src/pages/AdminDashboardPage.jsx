import React, { useState, useEffect } from 'react';
import {
  Shield,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  X,
  Search,
  Users,
  Eye,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const AdminDashboardPage = ({ onNavigateHome, onSelectProduct }) => {
  const { isAdmin, isAuthenticated } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search filter inside admin tables
  const [adminSearch, setAdminSearch] = useState('');

  // Modal State for Add / Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Audio',
    brand: 'Syntecx',
    countInStock: '15',
    image: '',
    description: '',
    badge: '',
    isFeatured: false,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, productsData, ordersData] = await Promise.all([
        api.orders.getAdminStats(),
        api.products.getAll(),
        api.orders.getAllOrders(),
      ]);
      setStats(statsData);
      setProducts(productsData.products || []);
      setOrders(ordersData || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load administrative data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: 'Audio',
      brand: 'Syntecx',
      countInStock: '15',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      description: '',
      badge: '',
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      brand: product.brand || 'Syntecx',
      countInStock: product.countInStock,
      image: product.image,
      description: product.description,
      badge: product.badge || '',
      isFeatured: !!product.isFeatured,
    });
    setIsModalOpen(true);
  };

  // Save product (Create or Edit)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.products.update(editingProduct._id, formData);
        showToast(`Product "${formData.name}" successfully updated!`);
      } else {
        await api.products.create(formData);
        showToast(`Product "${formData.name}" created successfully!`);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(`Error saving product: ${err.message}`);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      try {
        await api.products.delete(id);
        showToast(`Product "${name}" deleted`);
        fetchData();
      } catch (err) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      showToast(`Order status updated to ${newStatus}`);
      fetchData();
    } catch (err) {
      alert(`Failed to update order status: ${err.message}`);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <Shield size={56} color="var(--accent-rose)" style={{ marginBottom: '1.25rem' }} />
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Restricted Access</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            This portal is restricted to Syntecxhub administrators only. Please sign in with an authorized admin account.
          </p>
          <button type="button" className="btn btn-primary" onClick={onNavigateHome}>
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  // Filter products or orders by search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o._id.toLowerCase().includes(adminSearch.toLowerCase()) ||
      (o.shippingAddress?.fullName &&
        o.shippingAddress.fullName.toLowerCase().includes(adminSearch.toLowerCase())) ||
      (o.user?.email && o.user.email.toLowerCase().includes(adminSearch.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Dashboard Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-brand">Admin Console</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>Real-time Operations</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Syntecxhub Management Portal</h1>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenCreateModal}
          style={{ gap: '8px' }}
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Metrics Row */}
      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Total Revenue */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Revenue</span>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              ${stats.totalRevenue.toFixed(2)}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px', display: 'block' }}>
              From {stats.totalOrders} total orders
            </span>
          </div>

          {/* Total Orders */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Orders</span>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                <Package size={18} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              {stats.totalOrders}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
              {stats.deliveredOrders} delivered
            </span>
          </div>

          {/* Pending Fulfillment */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Orders</span>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                <Clock size={18} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              {stats.pendingOrders}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '4px', display: 'block' }}>
              Requires shipping / dispatch
            </span>
          </div>

          {/* Total Products */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Catalog</span>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                <ShoppingBag size={18} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              {stats.totalProducts}
            </h3>
            <span style={{ fontSize: '0.75rem', color: stats.lowStockProducts > 0 ? '#fb7185' : '#34d399', marginTop: '4px', display: 'block' }}>
              {stats.lowStockProducts} products low in stock
            </span>
          </div>
        </div>
      )}

      {/* Navigation Tabs & Search Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            <ShoppingBag size={16} />
            <span>Products Management ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            <Package size={16} />
            <span>Customer Orders ({orders.length})</span>
          </button>
        </div>

        {/* Admin Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            placeholder={activeTab === 'products' ? 'Filter products...' : 'Search orders / customer...'}
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '34px', height: '38px', fontSize: '0.84rem' }}
          />
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
        </div>
      </div>

      {/* Tab 1: Products Management Table */}
      {activeTab === 'products' && (
        <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 16px' }}>Item</th>
                <th style={{ padding: '14px 16px' }}>Category</th>
                <th style={{ padding: '14px 16px' }}>Price</th>
                <th style={{ padding: '14px 16px' }}>Stock</th>
                <th style={{ padding: '14px 16px' }}>Badge</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p._id}
                  style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', background: '#090d16' }}
                    />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.92rem', margin: 0, color: '#fff' }}>{p.name}</p>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Brand: {p.brand || 'Syntecx'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.88rem' }}>
                    <span className="badge badge-brand">{p.category}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.92rem', color: 'var(--accent-cyan)' }}>
                    ${p.price.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: p.countInStock <= 5 ? '#fb7185' : '#34d399',
                      }}
                    >
                      {p.countInStock} units
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem' }}>
                    {p.badge ? <span className="badge badge-cyan">{p.badge}</span> : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(p)}
                        className="btn-icon"
                        style={{ width: '32px', height: '32px' }}
                        title="Edit Product"
                      >
                        <Edit2 size={15} color="var(--accent-primary)" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p._id, p.name)}
                        className="btn-icon"
                        style={{ width: '32px', height: '32px' }}
                        title="Delete Product"
                      >
                        <Trash2 size={15} color="var(--accent-rose)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Orders Management Table */}
      {activeTab === 'orders' && (
        <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 16px' }}>Order ID</th>
                <th style={{ padding: '14px 16px' }}>Customer</th>
                <th style={{ padding: '14px 16px' }}>Date</th>
                <th style={{ padding: '14px 16px' }}>Items</th>
                <th style={{ padding: '14px 16px' }}>Total</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr
                  key={o._id}
                  style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                    #{o._id.substring(o._id.length - 8)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.88rem', margin: 0, color: '#fff' }}>
                      {o.shippingAddress?.fullName || o.user?.name || 'Customer'}
                    </p>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      {o.user?.email || 'Registered User'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.85rem' }}>
                    {o.orderItems?.length || 0} items
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>
                    ${o.totalPrice?.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      className={`badge ${
                        o.orderStatus === 'Delivered'
                          ? 'badge-emerald'
                          : o.orderStatus === 'Shipped'
                          ? 'badge-brand'
                          : o.orderStatus === 'Processing'
                          ? 'badge-cyan'
                          : o.orderStatus === 'Cancelled'
                          ? 'badge-rose'
                          : 'badge-amber'
                      }`}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                      className="select-field"
                      style={{ height: '34px', padding: '4px 10px', fontSize: '0.82rem', borderRadius: '6px' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '640px', padding: '2rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                {editingProduct ? 'Edit Catalog Product' : 'Add New Hardware Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="btn-icon" style={{ width: '32px', height: '32px' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Syntecx Spatial ANC Headphones"
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="199.99"
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Original Price ($) (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="249.99"
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="select-field"
                  >
                    <option value="Audio">Audio</option>
                    <option value="Computing">Computing</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.countInStock}
                    onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Promo Badge (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Bestseller, New, Sale"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description & Tech Specifications</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed breakdown of audio drivers, switches, refresh rates, battery..."
                  className="textarea-field"
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                />
                <label htmlFor="isFeatured" style={{ fontSize: '0.9rem', color: '#fff', cursor: 'pointer' }}>
                  Highlight as Featured Gear on Homepage
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingProduct ? 'Save Modifications' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
