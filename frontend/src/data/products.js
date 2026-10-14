// src/data/products.js

import { api } from '../utils/api';

export const fetchProducts = async () => {
    try {
        const response = await api.get('/api/products');
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
        const response = await api.get('/api/products');
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
        const response = await api.get('/api/products/featured');
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
        const response = await api.get(`/api/products/${id}`);
        return response.data.data ?? response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export const getProductsByCategory = async (category) => {
    try {
        const response = await api.get('/api/products', {
            params: category ? { category } : undefined,
        });
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
};