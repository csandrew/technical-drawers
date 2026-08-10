
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from '@formspree/react';
import toast from 'react-hot-toast';

const Contact = () => {
    // Formspree hook - REPLACE WITH YOUR FORM ID
    const [state, handleSubmit] = useForm("maewelwo");
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Send to Formspree
        await handleSubmit(e);
        
        // Send to WhatsApp (keep existing functionality)
        const whatsappMessage = `Hello Technical Drawers,

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}`;

        const whatsappUrl = `https://wa.me/254795011225?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        toast.success('Message sent! We\'ll get back to you.');

        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <>
            <Helmet>
                <title>Contact Us — Technical Drawers</title>
                <meta name="description" content="Get in touch with Technical Drawers. Visit our shop in Nairobi CBD, call us, or send a WhatsApp message. We're here to help with your equipment needs." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/contact" />
                <meta property="og:title" content="Contact Us — Technical Drawers" />
                <meta property="og:description" content="Contact Technical Drawers — visit our shop in Nairobi CBD, call, or WhatsApp. We're here to help." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/contact" />
                <meta name="twitter:title" content="Contact Us — Technical Drawers" />
                <meta name="twitter:description" content="Contact Technical Drawers — visit our shop in Nairobi CBD, call, or WhatsApp." />
            </Helmet>

            <section className="py-12 bg-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-extrabold text-secondary mb-4">Contact Us</h1>
                        <p className="text-sm text-gray-600">We're actually helpful. Have a question? Talk to us.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded shadow">
                        <div className="md:col-span-1 space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-white rounded shadow">
                                <i className="fas fa-map-marker-alt text-2xl" />
                                <div>
                                    <h4 className="font-medium">Visit Our Shop</h4>
                                    <p className="text-sm text-gray-600">Haile Selassie Avenue, Nairobi CBD</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded shadow">
                                <i className="fas fa-phone-alt text-2xl" />
                                <div>
                                    <h4 className="font-medium">Call Us</h4>
                                    <p className="text-sm text-gray-600">+254 795 011 225</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded shadow">
                                <i className="fas fa-envelope text-2xl" />
                                <div>
                                    <h4 className="font-medium">Email Us</h4>
                                    <p className="text-sm text-gray-600">drawerstechnical@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded shadow">
                                <i className="fab fa-whatsapp text-2xl" />
                                <div>
                                    <h4 className="font-medium">WhatsApp</h4>
                                    <p className="text-sm text-gray-600">+254 795 011 225</p>
                                </div>
                            </div>
                        </div>

                        <form className="md:col-span-2 bg-white p-6 rounded shadow" onSubmit={handleFormSubmit}>
                            <h3 className="text-lg font-semibold mb-4">Send us a message</h3>
                            
                            {/* Formspree success message */}
                            {state.succeeded && (
                                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                                    ✅ Message sent successfully! We'll get back to you.
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 gap-4 p-4 rounded">
                                <div>
                                    <label className="block text-sm">Your Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full border px-3 py-2 bg-gray-100 rounded" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full border px-3 py-2 bg-gray-100 rounded" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm">Subject</label>
                                    <select 
                                        name="subject" 
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full border px-3 py-2 bg-gray-100 rounded"
                                    >
                                        <option value="">Select a subject...</option>
                                        <option value="product">Product Inquiry</option>
                                        <option value="bulk">Bulk Order</option>
                                        <option value="advice">Buying Advice</option>
                                        <option value="institution">Institution/University Order</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm">Message</label>
                                    <textarea 
                                        name="message" 
                                        rows="5" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full border px-3 py-2 bg-gray-100 rounded"
                                    ></textarea>
                                </div>
                                <div>
                                    <button 
                                        type="submit" 
                                        className="bg-primary text-white px-4 py-2 rounded inline-flex items-center hover:bg-primary-dark disabled:opacity-50"
                                        disabled={state.submitting}
                                    >
                                        <i className="fas fa-paper-plane mr-2"></i> 
                                        {state.submitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
