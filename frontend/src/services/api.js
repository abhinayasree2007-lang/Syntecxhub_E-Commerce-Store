const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('syntecx_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = data.message || `Request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

export const api = {
  // Auth API
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(res);
    },
    register: async (name, email, password) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      return handleResponse(res);
    },
    getProfile: async () => {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
    updateProfile: async (userData) => {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      return handleResponse(res);
    },
  },

  // Products API
  products: {
    getAll: async ({ keyword = '', category = '', sort = '', minPrice = '', maxPrice = '', featured = '' } = {}) => {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (category && category !== 'All') params.append('category', category);
      if (sort) params.append('sort', sort);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (featured) params.append('featured', featured);

      const res = await fetch(`${API_BASE}/products?${params.toString()}`);
      return handleResponse(res);
    },
    getById: async (id) => {
      const res = await fetch(`${API_BASE}/products/${id}`);
      return handleResponse(res);
    },
    create: async (productData) => {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      return handleResponse(res);
    },
    update: async (id, productData) => {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      return handleResponse(res);
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
    addReview: async (id, reviewData) => {
      const res = await fetch(`${API_BASE}/products/${id}/reviews`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });
      return handleResponse(res);
    },
  },

  // Orders API
  orders: {
    create: async (orderData) => {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData),
      });
      return handleResponse(res);
    },
    getById: async (id) => {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
    getMyOrders: async () => {
      const res = await fetch(`${API_BASE}/orders/myorders`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
    getAllOrders: async () => {
      const res = await fetch(`${API_BASE}/orders`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
    updateStatus: async (id, orderStatus) => {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderStatus }),
      });
      return handleResponse(res);
    },
    getAdminStats: async () => {
      const res = await fetch(`${API_BASE}/orders/admin/stats`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
  },
};
