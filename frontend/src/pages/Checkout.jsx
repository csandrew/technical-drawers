import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, total, totalItems, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        county: '',
        paymentMethod: 'mpesa'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const orderData = {
                items: cart.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.images[0]
                })),
                totalAmount: total,
                shippingAddress: {
                    street: formData.address,
                    city: formData.city,
                    county: formData.county,
                    phone: formData.phone
                },
                paymentMethod: formData.paymentMethod,
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                }
            };

            const orderResponse = await axios.post('/api/orders', orderData, { headers });
            const order = orderResponse.data;

            // If Cash on Delivery, skip M-Pesa
            if (formData.paymentMethod === 'cash') {
                toast.success('Order placed! We\'ll deliver and collect payment.');
                clearCart();
                navigate('/order-confirmation', { state: { orderId: order._id } });
                setLoading(false);
                return;
            }

            // Initiate M-Pesa payment
            const paymentResponse = await axios.post(
                '/api/mpesa/stk-push',
                {
                    orderId: order._id,
                    phoneNumber: formData.phone,
                    amount: total
                },
                { headers }
            );

            if (paymentResponse.data.success) {
                toast.success('M-Pesa STK Push sent! Check your phone.');
                
                const pollInterval = setInterval(async () => {
                    try {
                        const statusResponse = await axios.get(
                            `/api/mpesa/status/${order._id}`,
                            { headers }
                        );
                        
                        if (statusResponse.data.paymentStatus === 'paid') {
                            clearInterval(pollInterval);
                            toast.success('Payment confirmed!');
                            clearCart();
                            navigate('/order-confirmation', { state: { orderId: order._id } });
                        } else if (statusResponse.data.paymentStatus === 'failed') {
                            clearInterval(pollInterval);
                            toast.error('Payment failed. Please try again.');
                            setLoading(false);
                        }
                    } catch (error) {
                        console.error('Error checking payment status:', error);
                    }
                }, 3000);

                setTimeout(() => {
                    clearInterval(pollInterval);
                    if (loading) {
                        toast.error('Payment taking longer than expected. Check your M-Pesa messages.');
                        setLoading(false);
                    }
                }, 120000);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error(error.response?.data?.message || 'Checkout failed. Please try again.');
            setLoading(false);
        }
    };

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

    // Dynamic button text based on payment method
    const getButtonText = () => {
        if (loading) return 'Processing...';
        if (formData.paymentMethod === 'cash') return `Place Order — KES ${total.toLocaleString()}`;
        return `Pay KES ${total.toLocaleString()} via M-Pesa`;
    };

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <form className="lg:col-span-2 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
                        <h3 className="font-semibold text-lg">Shipping Information</h3>
                        <div className="mt-4 grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Phone Number {formData.paymentMethod === 'mpesa' ? '(for M-Pesa)' : ''}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="0712345678"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Delivery Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Street, Building"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm">County</label>
                                    <input type="text" name="county" value={formData.county} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm">Payment Method</label>
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-2">
                                <option value="mpesa">M-Pesa</option>
                                <option value="cash">Cash on Delivery</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 bg-primary text-white px-6 py-3 rounded disabled:opacity-50 w-full font-semibold"
                            disabled={loading}
                        >
                            {getButtonText()}
                        </button>
                    </form>

                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="font-semibold mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t my-3"></div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>KES {total.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {formData.paymentMethod === 'mpesa' ? 'You will receive an M-Pesa STK Push' : 'Pay cash on delivery'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;