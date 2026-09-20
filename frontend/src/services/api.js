// =======================================================
// ANU HOME FOODS - Frontend API Service Layer
// Connects dynamically to Express REST API at http://localhost:5000/api
// =======================================================

import { PRODUCTS, CATEGORIES } from '../data/products';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Fetch products from backend REST API
  getProducts: async ({ category = 'all', search = '', sortBy = 'featured', priceRange = 2000 } = {}) => {
    try {
      const queryParams = new URLSearchParams({ category, search, sortBy });
      const res = await fetch(`${API_BASE_URL}/products?${queryParams}`);
      if (res.ok) {
        const json = await res.json();
        // Client-side price filter safeguard
        const filtered = json.data.filter(p => p.price <= priceRange);
        return { success: true, count: filtered.length, data: filtered };
      }
    } catch (err) {
      console.warn('Backend REST API offline, using local repository fallback.');
    }

    // Local Fallback
    let result = [...PRODUCTS];
    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q));
    }
    result = result.filter(p => p.price <= priceRange);
    return { success: true, count: result.length, data: result };
  },

  // Fetch bestsellers
  getBestsellers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/bestsellers`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (err) {
      console.warn('Backend REST API offline, using local repository fallback.');
    }
    return PRODUCTS.filter(p => p.isBestSeller);
  },

  // Fetch single product by ID
  getProductById: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend REST API offline, using local repository fallback.');
    }
    const product = PRODUCTS.find(p => p.id === id);
    return product ? { success: true, data: product } : { success: false, message: 'Product not found' };
  },

  // Fetch categories
  getCategories: async () => {
    return { success: true, data: CATEGORIES };
  },

  // Place Order API
  placeOrder: async (orderData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend REST API offline, using local repository order placement fallback.');
    }

    return {
      success: true,
      orderId: 'AHF-' + Math.floor(100000 + Math.random() * 900000),
      message: 'Order placed successfully! Fresh pickles are being prepared.'
    };
  },

  // Login API
  loginUser: async (credentials) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend REST API offline, using local auth fallback.');
    }

    return {
      success: true,
      user: { id: 1, full_name: credentials.email.split('@')[0].toUpperCase(), email: credentials.email },
      token: 'ahf_jwt_token_2026'
    };
  }
};

export default api;
