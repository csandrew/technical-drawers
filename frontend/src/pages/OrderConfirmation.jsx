import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
    const location = useLocation();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const orderId = location.state?.orderId;

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(`/api/orders/${orderId}`, { headers });
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center">Loading...</div>
        );
    }

    if (!order) {
        return (
            <div className="py-20 text-center">
                <h2>Order not found</h2>
                <Link to="/" className="inline-flex mt-4 bg-primary text-white px-4 py-2 rounded">Go Home</Link>
            </div>
        );
    }

    return (
        <section className="py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white p-8 rounded shadow text-center">
                    <i className="fas fa-check-circle text-4xl text-green-500 mx-auto"></i>
                    <h1 className="text-2xl font-semibold mt-4">Order Confirmed!</h1>
                    <p className="text-sm text-gray-600 mt-2">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <p className="mt-4 text-gray-600">Thank you for your order. We'll send you a confirmation message shortly.</p>

                    <div className="mt-6 text-left">
                        <div className="flex justify-between py-2">
                            <span>Status</span>
                            <span className={`px-3 py-1 rounded text-sm ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.orderStatus}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Payment</span>
                            <span className={`px-3 py-1 rounded text-sm ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.paymentStatus}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Total</span>
                            <span>KES {order.totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-6 text-left">
                        <h3 className="font-medium mb-2">Items Ordered</h3>
                        <div className="space-y-2">
                            {order.items.map(item => (
                                <div key={item.productId} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3">
                        <Link to="/" className="bg-primary text-white px-4 py-2 rounded">Continue Shopping</Link>
                        <a 
                            href={`https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I've%20just%20placed%20order%20${order._id.slice(-6).toUpperCase()}`} 
                            className="bg-golden text-primary px-4 py-2 rounded flex items-center hover:bg-golden-hover" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-whatsapp mr-2"></i> Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmation;