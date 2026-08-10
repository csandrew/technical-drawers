import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cart, total, totalItems, removeFromCart, updateQuantity, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <section className="py-20 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
                    <h2 className="text-2xl font-semibold mt-4">Your cart is empty</h2>
                    <p className="mt-2 text-gray-600">Looks like you haven't added any items yet.</p>
                    <Link to="/products" className="inline-flex mt-4 bg-primary text-white px-4 py-2 rounded">Start Shopping</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(item => (
                            <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
                                <img src={item.images?.[0] || '/placeholder.jpg'} alt={item.name} className="h-20 w-20 object-contain" />
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-600">KES {item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center border rounded">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100"
                                            aria-label={`Decrease quantity of ${item.name}`}
                                        >
                                            -
                                        </button>
                                        <span className="px-3" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100"
                                            aria-label={`Increase quantity of ${item.name}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-600"
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={clearCart}
                                className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                                aria-label="Clear all items from cart"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold mb-4">Order Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Items ({totalItems})</span>
                            <span>KES {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Delivery</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="border-t my-3"></div>
                        <div className="flex justify-between font-semibold text-lg mb-4">
                            <span>Total</span>
                            <span>KES {total.toLocaleString()}</span>
                        </div>
                        <Link to="/checkout" className="block text-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;