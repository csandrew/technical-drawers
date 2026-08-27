// src/data/products.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://technical-drawers-backend.onrender.com';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products`);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Add this - it's the same as fetchProducts but with a clearer name for the Home page
export const fetchAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products`);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
};

export const fetchFeaturedProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products/featured`);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export const getProductsByCategory = async (category) => {
    try {
        const url = category ? `${API_URL}/api/products?category=${encodeURIComponent(category)}` : `${API_URL}/api/products`;
        const response = await axios.get(url);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
};