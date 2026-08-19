import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | Technical Drawers</title>
                <meta name="description" content="Terms of Service for Technical Drawers — engineering and STEM equipment store in Nairobi, Kenya. Read our terms for purchasing, returns, and more." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/terms" />
            </Helmet>

            <section className="py-12 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
                        <h1 className="text-3xl font-extrabold text-primary mb-2">Terms of Service</h1>
                        <p className="text-sm text-gray-500 mb-8">Last Updated: August 2026</p>

                        <p className="text-gray-600 mb-6">
                            Welcome to <strong>Technical Drawers</strong>. By using this website, you agree to the terms below. 
                            Technical Drawers is a Kenyan e-commerce store specializing in engineering drawing equipment, 
                            scientific calculators, STEM essentials, and safety gear for students, professionals, and institutions.
                        </p>

                        {/* Section 1 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">1. Business Information</h2>
                        <p className="text-gray-600 mb-3">
                            Technical Drawers is a registered business operating in Nairobi, Kenya. Our physical store is located at:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                            <li><strong>Address:</strong> Haile Selassie Avenue, Nairobi CBD</li>
                            <li><strong>Phone:</strong> +254 795 011 225</li>
                            <li><strong>Email:</strong> drawerstechnical@gmail.com</li>
                            <li><strong>Location:</strong> Next to Technical University of Kenya (TU-K)</li>
                        </ul>

                        {/* Section 2 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">2. Products and Pricing</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>All product descriptions, prices, and availability are subject to change without notice.</li>
                            <li>We strive to ensure all product information is accurate. However, errors may occur. If you find an error, please contact us.</li>
                            <li>Prices are in <strong>Kenyan Shillings (KES)</strong> and include VAT where applicable.</li>
                            <li>We reserve the right to correct any pricing errors and cancel orders if necessary.</li>
                        </ul>

                        {/* Section 3 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">3. Orders and Payment</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Orders placed through Technical Drawers are binding contracts between you (the customer) and us (Technical Drawers).</li>
                            <li>We accept payments via <strong>M-Pesa</strong> and <strong>Cash on Delivery</strong>.</li>
                            <li>For M-Pesa payments, you will receive an STK Push prompt on your registered phone number.</li>
                            <li>Payment confirmation is required before processing your order.</li>
                            <li>We reserve the right to cancel any order for reasons including but not limited to: product unavailability, pricing errors, or suspected fraud.</li>
                        </ul>

                        {/* Section 4 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">4. Shipping and Delivery</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>We currently serve customers within <strong>Nairobi</strong> and surrounding areas.</li>
                            <li>Delivery timelines will be communicated at checkout.</li>
                            <li>For bulk and institutional orders, special delivery arrangements can be made.</li>
                            <li>Risk of loss or damage passes to you upon delivery.</li>
                            <li>Please inspect your order upon delivery. If items are damaged or incorrect, contact us immediately.</li>
                        </ul>

                        {/* Section 5 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">5. Returns and Refunds</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>We want you to be satisfied with your purchase. If you are not, please contact us within <strong>7 days</strong> of receipt.</li>
                            <li>Items must be returned in their original condition and packaging.</li>
                            <li>Refunds will be processed via the original payment method.</li>
                            <li>Please note: shipping costs are non-refundable.</li>
                            <li>We reserve the right to refuse returns that do not meet these conditions.</li>
                        </ul>

                        {/* Section 6 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">6. Institutional and Bulk Orders</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>We welcome orders from universities, colleges, TVETs, and other institutions.</li>
                            <li>Institutional orders may be eligible for special pricing and delivery arrangements.</li>
                            <li>Please contact us directly at <strong>+254 795 011 225</strong> or <strong>drawerstechnical@gmail.com</strong> to discuss your requirements.</li>
                        </ul>

                        {/* Section 7 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">7. Account and Security</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>You are responsible for keeping your account credentials secure.</li>
                            <li>All activity under your account is your responsibility.</li>
                            <li>Do not use Technical Drawers for fraudulent, illegal, or harmful activity.</li>
                            <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
                        </ul>

                        {/* Section 8 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">8. Privacy and Data Protection</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>We collect and process your personal data in accordance with the <strong>Kenyan Data Protection Act, 2019</strong>.</li>
                            <li>Your information is used to process orders, communicate with you, and improve our services.</li>
                            <li>We do not share your personal data with third parties except as necessary to fulfill your order.</li>
                            <li>For full details, please see our <Link to="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.</li>
                        </ul>

                        {/* Section 9 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">9. Disclaimer and Liability</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Technical Drawers provides products "as is" and makes no warranties beyond those required by Kenyan law.</li>
                            <li>We are not liable for any indirect, incidental, or consequential damages arising from your use of our products or website.</li>
                            <li>Our total liability is limited to the purchase price of the product in question.</li>
                        </ul>

                        {/* Section 10 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">10. Governing Law</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>These terms are governed by and construed in accordance with the laws of <strong>Kenya</strong>.</li>
                            <li>Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts of <strong>Kenya</strong>.</li>
                        </ul>

                        {/* Section 11 */}
                        <h2 className="text-xl font-bold text-primary mt-8 mb-3">11. Changes to These Terms</h2>
                        <p className="text-gray-600">
                            We may update these terms from time to time. Continued use of Technical Drawers after changes means you accept the updated terms. 
                            Please review this page periodically.
                        </p>

                        {/* Contact */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h2 className="text-xl font-bold text-primary mb-3">12. Contact Us</h2>
                            <p className="text-gray-600">Questions about these terms? Reach us at:</p>
                            <ul className="mt-2 text-gray-600 space-y-1">
                                <li><strong>Email:</strong> <a href="mailto:drawerstechnical@gmail.com" className="text-accent hover:underline">drawerstechnical@gmail.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+254795011225" className="text-accent hover:underline">+254 795 011 225</a></li>
                                <li><strong>Address:</strong> Haile Selassie Avenue, Nairobi CBD (Next to TU-K)</li>
                            </ul>
                        </div>

                        {/* Back to Home */}
                        <div className="mt-8 text-center">
                            <Link to="/" className="text-accent hover:underline">← Back to Home</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Terms;
