import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderId: routeOrderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const orderId = routeOrderId || location.state?.orderId;

    useEffect(() => {
        let isCurrent = true;

        const fetchOrder = async () => {
            if (!orderId) {
                setError('No order ID was provided.');
                setLoading(false);
                return;
            }

            try {
                const accessToken = sessionStorage.getItem(`guest-order-${orderId}`);
                if (!accessToken) {
                    setError('This order confirmation is only available in the browser session where the order was placed.');
                    setLoading(false);
                    return;
                }
                const response = await api.get(`/api/orders/guest/${orderId}`, {
                    headers: { 'X-Order-Access-Token': accessToken }
                });
                if (isCurrent) setOrder(response.data.data ?? response.data);
            } catch (fetchError) {
                console.error('Error fetching order:', fetchError);
                if (isCurrent) {
                    setError(fetchError.response?.data?.message || 'Unable to load this order.');
                }
            } finally {
                if (isCurrent) setLoading(false);
            }
        };

        setLoading(true);
        setError('');
        fetchOrder();
        return () => {
            isCurrent = false;
        };
    }, [orderId]);

    if (loading) {
        return (
            <div className="py-20 text-center">Loading...</div>
        );
    }

    if (!order) {
        return (
            <div className="py-20 text-center">
                <h2>{error || 'Order not found'}</h2>
                <Link to="/" className="inline-flex mt-4 bg-primary text-white px-4 py-2 rounded">Go Home</Link>
            </div>
        );
    }

    const paymentPending = order.paymentMethod === 'mpesa' && order.paymentStatus === 'pending';
    const paymentFailed = order.paymentMethod === 'mpesa' && order.paymentStatus === 'failed';
    const heading = paymentPending
        ? 'Order received — payment pending'
        : paymentFailed
            ? 'Payment not completed'
            : 'Order confirmed';

    return (
        <section className="py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white p-8 rounded shadow text-center">
                    <i className={`fas ${paymentFailed ? 'fa-exclamation-circle text-red-500' : paymentPending ? 'fa-clock text-yellow-500' : 'fa-check-circle text-green-500'} text-4xl mx-auto`}></i>
                    <h1 className="text-2xl font-semibold mt-4">{heading}</h1>
                    <p className="text-sm text-gray-600 mt-2">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <p className="mt-4 text-gray-600">
                        {paymentFailed
                            ? 'Your payment was not completed. Please contact us if you need help placing this order.'
                            : paymentPending
                                ? 'Your order is saved. Complete the M-Pesa payment prompt to confirm payment.'
                                : 'Thank you for your order. We will send you a confirmation message shortly.'}
                    </p>

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