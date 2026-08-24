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
    const [brandIndex, setBrandIndex] = useState(0);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('top');
    const { addToCart } = useCart();

    // Categories data - Shorter display names for horizontal rail
    const categories = [
        { name: 'Calculators', icon: 'fa-calculator', filter: 'Scientific Calculators' },
        { name: 'Drawing', icon: 'fa-drafting-compass', filter: 'Engineering Drawing Equipment' },
        { name: 'Measuring', icon: 'fa-ruler-combined', filter: 'Measuring Instruments' },
        { name: 'Hand Tools', icon: 'fa-tools', filter: 'Hand Tools' },
        { name: 'Electrical', icon: 'fa-bolt', filter: 'Electrical Tools' },
        { name: 'Safety Gear', icon: 'fa-shield-alt', filter: 'Safety Equipment' },
        { name: 'Stationery', icon: 'fa-pencil-alt', filter: 'Stationery & Office Supplies' },
        { name: 'Art Supplies', icon: 'fa-paint-brush', filter: 'Art & Drafting Supplies' },
        { name: 'Textbooks', icon: 'fa-book', filter: 'Textbooks & Reference' },
    ];

    // Courses data for "Shop by Course"
    const courses = [
        { name: 'Engineering', icon: 'fa-cogs' },
        { name: 'Architecture', icon: 'fa-drafting-compass' },
        { name: 'Electrical Engineering', icon: 'fa-bolt' },
        { name: 'Mechanical Engineering', icon: 'fa-tools' },
        { name: 'Civil Engineering', icon: 'fa-building' },
        { name: 'Quantity Surveying', icon: 'fa-ruler-combined' },
    ];

    const brands = [
        { name: 'CASIO', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786812256/casio_lvcshg.png' },
        { name: 'OXFORD', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786812256/helix-oxford_yaadjy.jpg' },
        { name: 'NATARAJ', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786812256/nataraj_izh2i9.jpg' },
        { name: 'BIC', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786812256/bic_af8uad.png' },
        { name: 'ARALDITE', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786813410/araldite_n6va4o.avif' },
        { name: 'SanDisk', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786813411/sandisk_qrqp0p.png' },
        { name: 'ORAIMO', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786813412/oraimo_dymgs9.jpg' },
        { name: 'WERKEN', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786813413/werken_lmooxa.png' },
        { name: 'ACE MAMBA', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786813408/ace_ngdttc.png' },
        { name: 'FABER-CASTELL', logo: 'https://res.cloudinary.com/gaovndvn/image/upload/v1786813406/faber-castell_wfhrdt.png' },
    ];

    // Auto-slide brands every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setBrandIndex((prev) => (prev + 1) % brands.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [brands.length]);

    // Auto-slide categories every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCategoryIndex((prev) => (prev + 1) % categories.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [categories.length]);

    const getVisibleBrands = () => {
        const visible = [];
        for (let i = 0; i < 5; i++) {
            const index = (brandIndex + i) % brands.length;
            visible.push(brands[index]);
        }
        return visible;
    };

    const getVisibleCategories = () => {
        const visible = [];
        for (let i = 0; i < 5; i++) {
            const index = (categoryIndex + i) % categories.length;
            visible.push(categories[index]);
        }
        return visible;
    };

    // Filter products based on active tab
    const getFilteredProducts = () => {
        if (activeTab === 'new') {
            return [...featuredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        if (activeTab === 'deals') {
            return featuredProducts.filter(p => p.discount);
        }
        return featuredProducts; // Top Picks (featured)
    };

    const slides = [
        {
            id: 0,
            subtitle: 'Essential Drawing Tools for Every Engineer',
            bgColor: 'from-blue-900 to-indigo-700',
            buttonText: 'Shop Now ',
            buttonLink: '/products',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376702/hero-2_siytm2.png',
            features: [
                { name: '9-Piece Complete Set' },
                { name: 'Precision Compass & Divider' }
            ],
            description: 'Every engineering student needs reliable drawing equipment. Our collection includes drawing boards, drawing sets, T-squares, and set squares - everything you need for precise technical drawings.'
        },
        {
            id: 1,
            subtitle: 'Protect Your Feet, Protect Your Future',
            bgColor: 'from-red-900 to-orange-700',
            buttonText: 'Shop Now',
            buttonLink: '/products',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376700/hero-1_rpoefs.png',
            features: [
                { name: 'Steel Toe Protection' },
                { name: 'Anti-Slip Sole' }
            ],
            description: 'Lab sessions and workshops demand proper protection. Our steel-toe safety boots - including Werken, Soldier, and Ace Mamba - keep you safe while you learn.',
            timer: true
        },
        {
            id: 2,
            subtitle: 'Professional Quality for Lab Sessions',
            bgColor: 'from-purple-900 to-pink-700',
            buttonText: 'Shop Now',
            buttonLink: '/products',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376704/hero-3_zlgqyk.png',
            features: [
                { name: '100% Comfort', icon: 'fa-gem' },
                { name: 'Durable & Washable', icon: 'fa-shield-alt' }
            ],
            description: 'Look professional, stay comfortable. Our lab coats, dust coats, and overalls are perfect for long practical sessions. Available in multiple sizes for the perfect fit.'
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

    const visibleBrands = getVisibleBrands();
    const visibleCategories = getVisibleCategories();
    const filteredProducts = getFilteredProducts();

    return (
        <>
            <Helmet>
                <title>Technical Drawers | Essential Engineering & STEM Equipment for Students, Schools & Institutions in Kenya</title>
                <meta name="description" content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi. Located near Technical University of Kenya. Student-friendly prices, quality gear." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/" />
                <meta property="og:title" content="Technical Drawers | Essential Engineering & STEM Equipment for Students, Schools & Institutions in Kenya" />
                <meta property="og:description" content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi. Located near Technical University of Kenya." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/" />
                <meta name="twitter:title" content="Technical Drawers | Essential Engineering & STEM Equipment for Students, Schools & Institutions in Kenya" />
                <meta name="twitter:description" content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi." />
            </Helmet>

            {/* ========== HERO SLIDER ========== */}
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
                                                alt={slide.subtitle || 'Technical Drawers'}
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

            {/* ========== SHOP BY CATEGORY ========== */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl font-extrabold text-primary">Shop by Category</h2>
                        <p className="text-text-light text-sm mt-1">From day one in STEM education to engineering school - we've got the equipment, tools, and PPE you need to succeed at every stage.</p>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out">
                            {visibleCategories.map((cat, idx) => (
                                <Link
                                    key={`${cat.name}-${idx}`}
                                    to={`/products?category=${encodeURIComponent(cat.filter)}`}
                                    className="w-1/5 flex-shrink-0 bg-slate-100 hover:bg-slate-200 rounded-lg px-4 py-3 text-center transition-all hover:scale-105 hover:shadow-sm mx-2"
                                >
                                    <div className="text-xl text-secondary">
                                        <i className={`fas ${cat.icon}`}></i>
                                    </div>
                                    <span className="text-xs font-medium text-primary block mt-1">{cat.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Dots Navigation */}
                        <div className="flex justify-center gap-2 mt-4">
                            {categories.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCategoryIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === categoryIndex ? 'bg-secondary w-4' : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to category ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== POPULAR PRODUCTS ========== */}
            <section className="py-12 md:py-16 bg-slate-200">
                
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-xl md:text-2xl font-extrabold text-primary">Popular Products</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                        {filteredProducts.slice(0, 8).map(product => (
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

            {/* ========== WHY TECHNICAL DRAWERS ========== */}
            <section className="py-12 bg-white">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Why Technical Drawers?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 bg-white p-6 rounded shadow max-w-4xl mx-auto">
                    <div className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-2xl text-secondary flex-shrink-0" />
                        <div>
                            <strong>Genuine products</strong>
                            <p className="text-sm text-gray-600">Only trusted brands.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fas fa-coins text-2xl text-secondary flex-shrink-0" />
                        <div>
                            <strong>Student-friendly pricing</strong>
                            <p className="text-sm text-gray-600">We know your budget is tight. We keep prices fair.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fas fa-boxes text-2xl text-secondary flex-shrink-0" />
                        <div>
                            <strong>Bulk & institutional orders</strong>
                            <p className="text-sm text-gray-600">We supply universities, colleges, and training centers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== TRUSTED BRANDS ========== */}
            <section className="py-10 bg-slate-200 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Trusted Brands</h3>
                        <p className="text-xs text-gray-500 mt-1">Quality products from the brands you trust</p>
                    </div>
                    <div className="relative overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out">
                            {visibleBrands.map((brand, idx) => (
                                <div
                                    key={`${brand.name}-${idx}`}
                                    className="w-1/5 flex-shrink-0 flex items-center justify-center px-4"
                                >
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="h-8 md:h-10 w-auto object-contain transition duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                            {brands.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setBrandIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === brandIndex ? 'bg-secondary w-4' : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to brand ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;