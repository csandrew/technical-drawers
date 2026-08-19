import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | Technical Drawers</title>
                <meta name="description" content="Privacy Policy for Technical Drawers — how we collect, use, and protect your personal data in compliance with Kenyan law." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/privacy-policy" />
            </Helmet>

            <section className="py-12 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
                        <h1 className="text-3xl font-extrabold text-primary mb-2">Privacy Policy</h1>
                        <p className="text-sm text-gray-500 mb-8">Last Updated: August 2026</p>

                        <p className="text-gray-600 mb-6">
                            Technical Drawers respects your privacy. This policy explains how we collect, use, and protect your personal data in compliance with the <strong>Kenyan Data Protection Act, 2019</strong>.
                        </p>

                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">Information We Collect</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address.</li>
                            <li><strong>Order History:</strong> Products you have purchased from us.</li>
                            <li><strong>Payment Information:</strong> M-Pesa transaction details (we do not store your M-Pesa PIN).</li>
                            <li><strong>Website Usage:</strong> How you interact with our website.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>To process and fulfill your orders.</li>
                            <li>To communicate with you about your orders.</li>
                            <li>To improve our products and services.</li>
                            <li>To comply with legal obligations.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">Data Security</h2>
                        <p className="text-gray-600">
                            We take reasonable steps to protect your personal information from unauthorized access, alteration, or destruction. 
                            Your data is stored securely and only accessible by authorized personnel.
                        </p>

                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">Your Rights</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>You have the right to access the personal data we hold about you.</li>
                            <li>You have the right to request correction of inaccurate data.</li>
                            <li>You have the right to request deletion of your data, subject to legal requirements.</li>
                            <li>You have the right to withdraw consent at any time.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">Contact</h2>
                        <p className="text-gray-600">
                            For privacy-related questions, contact us at:
                            <br />
                            <strong>Email:</strong> <a href="mailto:drawerstechnical@gmail.com" className="text-accent hover:underline">drawerstechnical@gmail.com</a>
                            <br />
                            <strong>Phone:</strong> <a href="tel:+254795011225" className="text-accent hover:underline">+254 795 011 225</a>
                        </p>

                        <div className="mt-8 text-center">
                            <Link to="/" className="text-accent hover:underline">← Back to Home</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;
