import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const { addToCart } = useCart();

    const slides = [
        {
            id: 0,
            title: 'DRAWING SET',
            subtitle: 'Essential Tools for Every Engineer',
            bgColor: 'from-blue-900 to-indigo-700',
            buttonText: 'Shop Now →',
            buttonLink: '/products',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376702/hero-2_siytm2.png',
            features: [
                { name: '9-Piece Complete Set' },
                { name: 'Precision Compass & Divider' }
            ],
            description: 'Every engineering student needs a reliable drawing set. Our 9-piece collection includes everything from compass to pencil holder.'
        },
        {
            id: 1,
            title: 'SAFETY BOOTS',
            subtitle: 'Protect Your Feet, Protect Your Future',
            bgColor: 'from-red-900 to-orange-700',
            buttonText: 'Shop Now →',
            buttonLink: '/products',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376700/hero-1_rpoefs.png',
            features: [
                { name: 'Steel Toe Protection' },
                { name: 'Anti-Slip Sole' }
            ],
            description: 'Lab sessions and workshops demand proper protection. Our steel-toe safety boots keep you safe while you learn.',
            timer: true
        },
        {
            id: 2,
            title: 'LAB COATS',
            subtitle: 'Professional Quality for Lab Sessions',
            bgColor: 'from-purple-900 to-pink-700',
            buttonText: 'Shop Now →',
            buttonLink: '/products',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376704/hero-3_zlgqyk.png',
            features: [
                { name: '100% Comfort', icon: 'fa-gem' },
                { name: 'Durable & Washable', icon: 'fa-shield-alt' }
            ],
            description: 'Look professional, stay comfortable. Our lab coats are perfect for long practical sessions. Available in multiple sizes for the perfect fit.'
        }
    ];

    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchFeaturedProducts();
            setFeaturedProducts(products);
            setLoading(false);
        };
        loadProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Technical Drawers | Essential Engineering & STEM Equipments for Students, Schools & Institutions in Kenya</title>
                <meta name="description" content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi. Located near Technical University of Kenya. Student-friendly prices, quality gear." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/" />
                <meta property="og:title" content="Technical Drawers | Essential Engineering & STEM Equipments for Students, Schools & Institutions in Kenya" />
                <meta property="og:description" content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi. Located near Technical University of Kenya." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/" />
                <meta name="twitter:title" content="Technical Drawers | Essential Engineering & STEM Equipments for Students, Schools & Institutions in Kenya" />
                <meta name="twitter:description" content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi." />
            </Helmet>

            {/* Hero Slider Section */}
            <section className="relative overflow-hidden min-h-[600px] md:min-h-[500px] lg:min-h-[550px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeSlide
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-full'
                            }`}
                        style={{
                            transform: index === activeSlide ? 'translateX(0)' : 'translateX(100%)',
                            opacity: index === activeSlide ? 1 : 0,
                            transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out'
                        }}
                    >
                        <div className={`w-full h-full bg-gradient-to-br ${slide.bgColor} flex items-center overflow-y-auto`}>
                            <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
                                <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                                    <div className="text-white order-1 md:order-1">
                                        <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider bg-white/20 px-3 md:px-4 py-1 rounded-full mb-3 md:mb-4">
                                            {slide.title}
                                        </span>
                                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight mb-3 md:mb-4">
                                            {slide.subtitle}
                                        </h1>
                                        <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-lg mb-4 md:mb-6">
                                            {slide.description}
                                        </p>

                                        <Link
                                            to={slide.buttonLink}
                                            className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-all hover:scale-105 text-sm md:text-base"
                                        >
                                            {slide.buttonText}
                                        </Link>

                                        <div className="grid grid-cols-2 gap-2 md:gap-3 mt-4 md:mt-6">
                                            {slide.features.map((item, i) => (
                                                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3">
                                                    {item.icon ? (
                                                        <div className="flex items-center gap-2 text-white">
                                                            <i className={`fas ${item.icon}`}></i>
                                                            <span className="text-xs md:text-sm">{item.name}</span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <p className="text-white font-semibold text-xs md:text-sm">{item.name}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center order-2 md:order-2">
                                        <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-auto rounded-xl md:rounded-2xl shadow-2xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`h-2 md:h-3 rounded-full transition-all duration-300 ${index === activeSlide
                                ? 'bg-white w-6 md:w-8'
                                : 'bg-white/40 hover:bg-white/60 w-2 md:w-3'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 md:py-16 bg-slate-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl lg:text-2xl font-extrabold text-secondary mb-4">
                            Explore Products
                        </h2>
                        <p className="text-text-light text-sm md:text-base mt-2">
                            Trusted by STEM students at all major institutions of higher learning
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                        {featuredProducts.slice(0, 8).map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-6 md:mt-8">
                        <Link
                            to="/products"
                            className="btn btn-outline bg-white text-primary hover:bg-primary hover:text-white transition text-sm md:text-base"
                        >
                            View All Products <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;