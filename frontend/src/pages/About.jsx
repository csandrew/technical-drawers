
import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Technical Drawers</title>
                <meta name="description" content="Technical Drawers was founded by students who understand the struggle of finding quality engineering equipment. We supply genuine tools for STEM students in Kenya." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/about" />
                <meta property="og:title" content="About Us — Technical Drawers" />
                <meta property="og:description" content="Technical Drawers supplies genuine engineering equipment for STEM students in Kenya. Founded by students, for students." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/about" />
                <meta name="twitter:title" content="About Us — Technical Drawers" />
                <meta name="twitter:description" content="Technical Drawers supplies genuine engineering equipment for STEM students in Kenya. Founded by students, for students." />
            </Helmet>

            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-extrabold text-secondary mb-4">About Us</h1>
                        <p className="text-sm text-gray-600">Equipping Kenya's next generation of STEM professionals</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-semibold">We were students too.</h2>
                            <p className="mt-4 text-gray-600">Technical Drawers started when we realized students in Nairobi were struggling to find quality equipment. We know exactly what you need because we've been in your seat.</p>
                            <p className="mt-2 text-gray-600">We aim to reach over <strong>10,000 students</strong> and professionals across Kenya with genuine products at student-friendly prices.</p>

                            <div className="mt-6 space-y-4 bg-slate-300 p-6 rounded shadow">
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-check-circle text-2xl text-secondary" />
                                    <div>
                                        <strong>Genuine products</strong>
                                        <p className="text-sm text-gray-600">No counterfeits. Only trusted brands.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-coins text-2xl text-secondary" />
                                    <div>
                                        <strong>Student-friendly pricing</strong>
                                        <p className="text-sm text-gray-600">We know your budget is tight. We keep prices fair.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-boxes text-2xl text-secondary" />
                                    <div>
                                        <strong>Bulk & institutional orders</strong>
                                        <p className="text-sm text-gray-600">We supply universities, colleges, and training centers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&crop=center" alt="Technical Drawers" className="rounded shadow" />
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold">50+</div>
                            <div className="text-sm text-gray-600">Partner Institutions</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">10,000+</div>
                            <div className="text-sm text-gray-600">Students Targeted</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">100%</div>
                            <div className="text-sm text-gray-600">Quality Services</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
