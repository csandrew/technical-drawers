
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
    const { addToCart } = useCart();

    // Categories data - Must match database EXACTLY
    const categories = [
        { name: 'Scientific Calculators', icon: 'fa-calculator' },
        { name: 'Engineering Drawing Equipment', icon: 'fa-drafting-compass' },
        { name: 'Measuring Instruments', icon: 'fa-ruler-combined' },
        { name: 'Hand Tools', icon: 'fa-tools' },
        { name: 'Electrical Tools', icon: 'fa-bolt' },
        { name: 'Safety Equipment', icon: 'fa-shield-alt' },
        { name: 'Stationery & Office Supplies', icon: 'fa-pencil-alt' },
        { name: 'Art & Drafting Supplies', icon: 'fa-paint-brush' },
        { name: 'Textbooks & Reference', icon: 'fa-book' },
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

    // Get visible brands (5 at a time)
    const getVisibleBrands = () => {
        const visible = [];
        for (let i = 0; i < 5; i++) {
            const index = (brandIndex + i) % brands.length;
            visible.push(brands[index]);
        }
        return visible;
    };

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

    const visibleBrands = getVisibleBrands();

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

            {/* Browse by Category - Must match database */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-xl md:text-2xl font-extrabold text-primary">
                            Shop by Category
                        </h2>
                        <p className="text-text-light text-sm mt-1">Find what you need for your course</p>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                        {categories.map((cat) => (
                            <Link
                                key={cat.name}
                                to={`/products?category=${encodeURIComponent(cat.name)}`}
                                className="bg-slate-100 hover:bg-slate-200 rounded-lg p-3 text-center transition-all hover:scale-105 hover:shadow-sm group"
                            >
                                <div className="text-xl text-secondary mb-1">
                                    <i className={`fas ${cat.icon}`}></i>
                                </div>
                                <h3 className="font-medium text-xs text-primary truncate">{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
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

            {/* Trusted Brands - Carousel */}
            <section className="py-10 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Trusted Brands</h3>
                        <p className="text-xs text-gray-500 mt-1">Quality products from the brands you trust</p>
                    </div>
                    
                    {/* Carousel Container */}
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
                        
                        {/* Dots Navigation */}
                        <div className="flex justify-center gap-2 mt-4">
                            {brands.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setBrandIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        idx === brandIndex ? 'bg-secondary w-4' : 'bg-gray-300'
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
