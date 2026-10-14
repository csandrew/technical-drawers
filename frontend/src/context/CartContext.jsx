import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (!savedCart) return;

            const parsedCart = JSON.parse(savedCart);
            if (!Array.isArray(parsedCart)) {
                throw new TypeError('Saved cart is not an array');
            }

            const validCart = parsedCart.filter(item =>
                item &&
                typeof item._id === 'string' &&
                Number.isFinite(item.price) &&
                item.price >= 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
            );
            if (validCart.length !== parsedCart.length) {
                console.error('Some invalid cart entries were discarded.');
            }
            setCart(validCart);
        } catch (error) {
            console.error('Unable to restore saved cart:', error);
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Unable to save cart to local storage:', error);
        }
        calculateTotal();
    }, [cart]);

    const calculateTotal = () => {
        const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(sum);
    };

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                toast.success(`Added another ${product.name} to cart`);
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            toast.success(`${product.name} added to cart`);
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const item = prev.find(i => i._id === productId);
            if (item) toast.error(`${item.name} removed from cart`);
            return prev.filter(item => item._id !== productId);
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prev =>
            prev.map(item =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        toast('Cart cleared');
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            total,
            totalItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};