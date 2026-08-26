// Home.jsx - Corrected Syntax & UI
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
            title: 'Enjoy Best Prices',
            description: 'Shop reliable scientific calculators at student-friendly prices in Nairobi. Trusted for genuine, essential engineering & STEM tools and equipment.',
            bgColor: 'bg-primary',
            textColor: 'text-white',
            buttonText: 'Explore Now',
            buttonLink: '/products',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1787748746/fx-991-ex-hero-grid_wcnw3b.png',
            features: ['Premium Materials', 'Handcrafted Quality', 'Lifetime Warranty']
        },
        {
            id: 1,
            title: 'Season Sale Up To 20% Off',
            description: 'Get your steel-toe safety boots, lab coats, and protective gear at discounted prices. Brands include Werken, Soldier, and Ace Mamba.',
            bgColor: 'bg-secondary',
            textColor: 'text-white',
            buttonText: 'Shop Sale',
            buttonLink: '/products?category=deals',
            image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376700/hero-1_rpoefs.png',
            discount: '20%',
            originalPrice: 'KES 3125',
            salePrice: 'KES 2500'
        },
        {
            id: 2,
            title: 'Discover Our Collection',
            description: 'Explore our latest engineering equipment including Casio calculators, drawing instruments, and lab safety gear. Everything you need at Technical Drawers Nairobi.',
            bgColor: 'bg-teal-900',
            textColor: 'text-white',
            buttonText: 'Shop Now',
            buttonLink: '/products?category=new',
            newArrivals: [
                { id: 1, name: 'Drawing Set', price: 'KES 800', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1787747602/hero-2_z4gz2y.png' },
                { id: 2, name: 'FX-82 MS', price: 'KES 1500', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1787748852/fx-82-ms-hero-grid_gkokq3.png' },
                { id: 3, name: 'Lab/Dust Coat', price: 'KES 800', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376704/hero-3_zlgqyk.png' },
                { id: 4, name: 'FX-991 ES Plus', price: 'KES 2700', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1787748844/fx-991-es-plus-hero-grid_f3wh3p.png' }
            ]
        }
    ];

    const newArrivals = [
        { id: 1, name: 'Drawing Set', price: 'KES 800', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1787747602/hero-2_z4gz2y.png' },
        { id: 2, name: 'FX-82 MS', price: 'KES 1500', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1787748852/fx-82-ms-hero-grid_gkokq3.png' },
        { id: 3, name: 'Lab/Dust Coat', price: 'KES 800', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1785376704/hero-3_zlgqyk.png' },
        { id: 4, name: 'FX-991 ES Plus', price: 'KES 2700', image: 'https://res.cloudinary.com/gaovndvn/image/upload/v1787748844/fx-991-es-plus-hero-grid_f3wh3p.png' }
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
        }, 8000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Technical Drawers | Essential Engineering Equipment for STEM Students & Professionals</title>
                <meta name="description" content="Buy engineering drawing sets, scientific calculators, safety boots, and lab equipment in Nairobi. Trusted by STEM students at Technical University of Kenya. Quality tools at student-friendly prices." />
            </Helmet>

            {/* HERO SLIDER */}
            <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
                <AnimatePresence mode="wait">
                    {slides.map((slide, index) => (
                        index === activeSlide && (
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className={`absolute inset-0 ${slide.bgColor}`}
                            >
                                <div className="container mx-auto px-4 h-full flex items-center">
                                    <div className="grid md:grid-cols-2 gap-8 items-center w-full py-8">
                                        {/* Left Content */}
                                        <motion.div
                                            initial={{ x: -30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.6 }}
                                            className={`${slide.textColor} space-y-4 md:space-y-6`}
                                        >
                                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                                {slide.title}
                                            </h1>

                                            <p className="text-sm md:text-lg opacity-90 max-w-lg">
                                                {slide.description}
                                            </p>

                                            {slide.features && slide.id !== 2 && (
                                                <div className="hidden sm:grid grid-cols-3 gap-3 max-w-md">
                                                    {slide.features.map((feature, i) => (
                                                        <div key={i} className="bg-white/10 rounded-lg px-3 py-2 text-center">
                                                            <span className="text-xs md:text-sm font-medium">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <Link
                                                to={slide.buttonLink}
                                                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 md:px-8 md:py-4 rounded-md font-semibold hover:shadow-xl transition-all hover:scale-105 text-sm md:text-base"
                                            >
                                                {slide.buttonText}
                                            </Link>
                                        </motion.div>

                                        {/* Right Content */}
                                        <motion.div
                                            initial={{ x: 30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="relative flex justify-center"
                                        >
                                            {slide.id === 0 && (
                                                <div className="relative w-full max-w-[280px] md:max-w-md">
                                                    <img
                                                        src={slide.image}
                                                        alt={slide.title}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </div>
                                            )}

                                            {slide.id === 1 && (
                                                <div className="relative w-full max-w-[280px] md:max-w-md">
                                                    <img
                                                        src={slide.image}
                                                        alt={slide.title}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                    {slide.discount && (
                                                        <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white text-primary px-3 py-2 md:px-6 md:py-3 rounded-full shadow-2xl rotate-6">
                                                            <span className="text-lg md:text-2xl font-bold">{slide.discount}</span>
                                                            <span className="block text-[8px] md:text-xs">OFF</span>
                                                        </div>
                                                    )}
                                                    {slide.originalPrice && slide.salePrice && (
                                                        <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white shadow-2xl rounded-xl px-3 py-2 md:px-6 md:py-4">
                                                            <span className="text-gray-400 line-through text-xs md:text-sm block">{slide.originalPrice}</span>
                                                            <span className="text-primary text-base md:text-2xl font-bold">{slide.salePrice}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {slide.id === 2 && slide.newArrivals && (
                                                <div className="w-full max-w-[320px] md:max-w-md">
                                                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                                                        {slide.newArrivals.slice(0, window.innerWidth < 768 ? 2 : 4).map((item) => (
                                                            <div key={item.id} className="rounded-lg overflow-hidden">
                                                                <div className="aspect-square">
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-full h-full object-cover"
                                                                        loading="lazy"
                                                                    />
                                                                </div>
                                                                <div className="p-1.5 md:p-2 text-center">
                                                                    <p className="text-white text-[8px] md:text-xs font-medium truncate">{item.name}</p>
                                                                    <p className="text-white font-bold text-[10px] md:text-sm">{item.price}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                                index === activeSlide
                                    ? 'bg-white w-6 md:w-8'
                                    : 'bg-white/40 hover:bg-white/100 w-1.5 md:w-2'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

{/* NEW ARRIVALS SECTION */}
<section className="py-8 md:py-16 bg-white">
    <div className="container mx-auto px-4">
        {/* Header - Always Left/Right on all screens */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
            {/* Title - Always left */}
            <div>
                <span className="text-secondary font-semibold text-xs md:text-sm uppercase tracking-wider">
                    New Arrivals
                </span>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mt-1 text-gray-800">
                    Discover Our Collection
                </h2>
            </div>

            {/* Button - Always right */}
            <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold hover:bg-primary-dark transition-all hover:scale-105 text-sm md:text-base whitespace-nowrap"
            >
                Shop Now
            </Link>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-6 md:mb-10">
            <p className="text-sm md:text-base text-gray-600">
                Shop quality engineering equipment, scientific calculators, and safety gear at Technical Drawers. Located in Technical University of Kenya, serving STEM students and professionals.
            </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {newArrivals.map((item) => (
                <div key={item.id} className="group cursor-pointer" data-product-id={item.id}>
                    <div className="bg-gray-100 rounded-lg md:rounded-2xl overflow-hidden aspect-square">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                    <div className="mt-2 md:mt-3">
                        <p className="text-xs md:text-sm text-gray-600">{item.name}</p>
                        <p className="font-bold text-sm md:text-lg text-gray-800">{item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

            {/* FEATURED PRODUCTS */}
            <section className="py-8 md:py-16 bg-slate-200">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-6 md:mb-12">
                        <span className="text-secondary font-semibold text-xs md:text-sm uppercase tracking-wider">
                            Featured
                        </span>
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mt-1 text-gray-800">
                            Premium Products
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 mt-2 md:mt-4">
                            Discover our curated collection of engineering drawing sets, T-Square, Bazooka, Casio scientific calculators, safety boots, and lab equipments.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                        {featuredProducts.slice(0, 4).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-6 md:mt-10">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 md:px-8 md:py-3 rounded-md font-semibold hover:bg-primary-dark transition-all hover:scale-105 text-sm md:text-base"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-8 md:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        <div className="text-center p-4 md:p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <i className="fas fa-gem text-xl md:text-2xl text-secondary"></i>
                            </div>
                            <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2 text-primary">
                                Premium Products
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                                Reliable equipment from trusted brands.
                            </p>
                        </div>

                        <div className="text-center p-4 md:p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <i className="fas fa-handshake text-xl md:text-2xl text-secondary"></i>
                            </div>
                            <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2 text-primary">
                                Student-friendly pricing
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                                We know your budget is tight. We keep prices fair.
                            </p>
                        </div>

                        <div className="text-center p-4 md:p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <i className="fas fa-boxes text-xl md:text-2xl text-secondary"></i>
                            </div>
                            <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2 text-primary">
                                Bulk & institutional orders
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                                We supply Universities, Colleges, and Institutions of higher learning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;