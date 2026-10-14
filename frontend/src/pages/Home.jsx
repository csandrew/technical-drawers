// src/pages/Home.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchFeaturedProducts, fetchAllProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import {
    benefits,
    galleryLeft,
    galleryMiddle,
    galleryRight,
} from '../data/heroCampaigns';

const WHATSAPP_NUMBER = '254795011225';
const PHONE_DISPLAY = '+254 795 011 225';
const PHONE_LINK = 'tel:+254795011225';
const EMAIL = 'drawerstechnical@gmail.com';
const STORE_LINE = 'Haile Selassie Ave, T.U.K - Shop 10, Nairobi.';

const TABS = [
    { id: 'calculators', label: 'Calculators', category: 'Scientific Calculators' },
    { id: 'drawing', label: 'Drawing Tools', category: 'Engineering Drawing Equipment' },
    { id: 'safety', label: 'Safety Gear', category: 'Safety Equipment' },
];

const CONTAINER = 'mx-auto max-w-site px-4 sm:px-6 md:px-8 lg:px-10';

const whatsappLink = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const ProductSkeleton = ({
    count = 6,
    cols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6',
}) => (
    <div className={`grid gap-2 md:gap-4 ${cols}`} aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="animate-pulse rounded border border-gray-100 bg-white p-2">
                <div className="aspect-square rounded bg-gray-200" />
                <div className="mt-2 h-3 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-1/3 rounded bg-gray-200" />
            </div>
        ))}
    </div>
);

const ProductGrid = ({
    products,
    cols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6',
}) => (
    <div className={`grid gap-2 md:gap-4 ${cols}`}>
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
);

const SectionHeader = ({ title, to = '/products', children }) => (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-gray-200 md:mb-4">
        <div className="flex flex-wrap items-end gap-x-6">
            <h2 className="-mb-px border-b-2 border-secondary pb-2 text-base font-bold text-primary md:text-lg">
                {title}
            </h2>
            {children}
        </div>
        <Link to={to} className="pb-2 text-xs font-semibold text-secondary hover:underline md:text-sm">
            View all
        </Link>
    </div>
);

// ===== VERTICAL CAROUSEL (fade) =====
// Used inside Featured Gallery for the left and right tall columns.
const VerticalCarousel = ({ items, intervalMs = 4000 }) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || items.length < 2) return undefined;
        const id = setInterval(
            () => setIndex((p) => (p + 1) % items.length),
            intervalMs
        );
        return () => clearInterval(id);
    }, [items.length, paused, intervalMs]);

    const current = items[index];
    if (!current) return null;

    return (
        <div
            className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={current.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Link
                        to={current.link}
                        aria-label={current.alt}
                        className="absolute inset-0 block"
                    >
                        <img
                            src={current.image}
                            alt={current.alt}
                            loading="lazy"
                            className="h-full w-full object-cover object-center"
                        />
                    </Link>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const CategoryNav = () => (
    <nav aria-label="Shop by category" className="border-b border-gray-200 bg-secondary py-2 md:py-3">
        <div className={`${CONTAINER} flex items-center gap-1 overflow-x-auto text-sm font-bold text-white md:gap-2`}>
            {TABS.map((tab) => (
                <Link
                    key={tab.id}
                    to={`/products?category=${encodeURIComponent(tab.category)}`}
                    className="shrink-0 px-3 py-3 transition hover:text-primary md:px-4 md:py-4"
                >
                    {tab.label}
                </Link>
            ))}
            <a
                href={whatsappLink('Hello Technical Drawers, I would like a quote for a bulk order. Here is my list:')}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto shrink-0 whitespace-nowrap border-l border-white py-3 pl-4 pr-3 text-white transition hover:text-primary md:hidden"
            >
                Get a quote
            </a>
            <a href={PHONE_LINK} className="ml-auto hidden shrink-0 px-3 py-3 text-white md:block">
                {PHONE_DISPLAY}
            </a>
        </div>
    </nav>
);

const FeaturedGallery = () => {
    const leftImage = galleryLeft[0];
    const firstMiddleImage = galleryMiddle[0];
    const secondMiddleImage = galleryMiddle[1];
    const rightImage = galleryRight[0];

    if (!leftImage && !firstMiddleImage && !secondMiddleImage && !rightImage) return null;

    return (
        <section className="bg-white py-6 md:py-10">
            <div className={CONTAINER}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                    <div className="flex flex-col justify-center lg:col-span-3">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                            Featured Gallery
                        </span>
                        <h2 className="mt-3 text-xl font-bold text-primary md:text-2xl">Tools of the Trade</h2>
                        <p className="mt-3 text-sm text-gray-600 md:text-base">
                            Hand-picked equipment trusted by students and professionals across Kenya.
                        </p>
                        <Link
                            to="/products"
                            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                        >
                            View All Products
                        </Link>
                    </div>

                    <div className="lg:col-span-9">
                        <div className="grid aspect-[3/2] grid-cols-3 grid-rows-2 gap-3 md:gap-4">
                            {leftImage && (
                                <div className="row-span-2 col-start-1 row-start-1">
                                    <VerticalCarousel items={galleryLeft} intervalMs={4000} />
                                </div>
                            )}

                            {firstMiddleImage && (
                                <Link
                                    to={firstMiddleImage.link}
                                    aria-label={firstMiddleImage.alt}
                                    className="group relative col-start-2 row-start-1 overflow-hidden rounded-lg bg-gray-100"
                                >
                                    <img
                                        src={firstMiddleImage.image}
                                        alt={firstMiddleImage.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                                    />
                                </Link>
                            )}

                            {secondMiddleImage && (
                                <Link
                                    to={secondMiddleImage.link}
                                    aria-label={secondMiddleImage.alt}
                                    className="group relative col-start-2 row-start-2 overflow-hidden rounded-lg bg-gray-100"
                                >
                                    <img
                                        src={secondMiddleImage.image}
                                        alt={secondMiddleImage.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                                    />
                                </Link>
                            )}

                            {rightImage && (
                                <div className="row-span-2 col-start-3 row-start-1">
                                    <VerticalCarousel items={galleryRight} intervalMs={4500} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TrustStrip = () => (
    <section className="relative border-b border-gray-200 bg-gray-50" aria-label="Why shop with us">
        <div className="absolute inset-x-0 top-0 h-1 bg-secondary" />
        <div className={`${CONTAINER} py-6 md:py-8`}>
            <h2 className="mb-5 text-center text-base font-bold text-primary md:mb-6 md:text-lg">
                Why Students & Professionals Choose Us
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
                {benefits.map((benefit) => (
                    <div key={benefit.id} className="flex items-center gap-3 md:gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary md:h-14 md:w-14">
                            <i className={`fas ${benefit.icon} text-base md:text-xl`} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-bold leading-tight text-gray-900 md:text-base">
                                {benefit.title}
                            </h3>
                            <p className="mt-0.5 text-xs leading-snug text-gray-600 md:text-sm">
                                {benefit.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const BestSellersSection = ({
    loading,
    filteredProducts,
    allProducts,
    activeCategory,
    activeTab,
    setActiveTab,
}) => {
    const handleTabKeyNavigation = (event) => {
        const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);

        if (event.key === 'ArrowRight') {
            const nextTab = TABS[(currentIndex + 1) % TABS.length];
            setActiveTab(nextTab.id);
            document.getElementById(`tab-${nextTab.id}`)?.focus();
        }

        if (event.key === 'ArrowLeft') {
            const prevTab = TABS[(currentIndex - 1 + TABS.length) % TABS.length];
            setActiveTab(prevTab.id);
            document.getElementById(`tab-${prevTab.id}`)?.focus();
        }
    };

    return (
        <section className="bg-white py-5 md:py-8">
            <div className={CONTAINER}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3 md:mb-6">
                    <h2 className="border-b-2 border-secondary pb-2 text-base font-bold text-primary md:text-lg">
                        Best Sellers
                    </h2>
                    <div className="flex gap-3 md:gap-6" role="tablist" aria-label="Best sellers categories">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                id={`tab-${tab.id}`}
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                aria-controls="bestsellers-panel"
                                tabIndex={activeTab === tab.id ? 0 : -1}
                                onClick={() => setActiveTab(tab.id)}
                                onKeyDown={handleTabKeyNavigation}
                                className={`pb-2 text-xs font-semibold transition md:text-sm ${activeTab === tab.id
                                        ? 'border-b-2 border-secondary text-secondary'
                                        : 'border-b-2 border-transparent text-gray-500 hover:text-primary'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div id="bestsellers-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
                    {loading ? (
                        <ProductSkeleton count={6} cols="grid-cols-2 md:grid-cols-3" />
                    ) : filteredProducts.length ? (
                        <ProductGrid products={filteredProducts} cols="grid-cols-2 md:grid-cols-3" />
                    ) : allProducts.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-sm text-gray-500">Products are being restocked. Check back soon.</p>
                        </div>
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-sm text-gray-500">
                                No {activeCategory?.toLowerCase() || 'products'} in stock right now.
                            </p>
                            <a
                                href={whatsappLink(
                                    `Hello Technical Drawers, do you have any ${activeCategory || 'products'} in stock?`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block rounded bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                            >
                                Ask on WhatsApp
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const QuoteBand = () => (
    <section className="border-y border-gray-200 bg-slate-100 py-5 md:py-6">
        <div className={`${CONTAINER} flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left`}>
            <div>
                <h2 className="text-base font-bold text-primary md:text-xl">Send Your Equipment List</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Buying for a class, school or department? Share your list on WhatsApp and we will reply with a quote.
                </p>
            </div>
            <a
                href={whatsappLink('Hello Technical Drawers, I would like a quote for a bulk order. Here is my list:')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full shrink-0 rounded bg-secondary px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-dark md:ml-auto md:w-auto"
            >
                Get a quote
            </a>
        </div>
    </section>
);

const FeaturedProductsSection = ({ loading, featuredProducts }) => (
    <section className="bg-white py-5 md:py-8">
        <div className={CONTAINER}>
            <SectionHeader title="Featured Products" />
            {loading ? (
                <ProductSkeleton count={8} cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
            ) : (
                <ProductGrid
                    products={featuredProducts.slice(0, 12)}
                    cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                />
            )}
        </div>
    </section>
);

const BrandRow = ({ brands }) => {
    if (!brands.length) return null;

    return (
        <section className="border-t border-gray-200 bg-white py-5" aria-label="Shop by brand">
            <div className={CONTAINER}>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                    {brands.map((brand) => (
                        <Link
                            key={brand}
                            to={`/products?search=${encodeURIComponent(brand)}`}
                            className="rounded border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-secondary hover:text-secondary"
                        >
                            {brand}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HelpRow = () => (
    <section className="border-t border-gray-200 bg-gray-50 py-5 md:py-8" aria-label="Contact us">
        <div className={`${CONTAINER} grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            <a href={PHONE_LINK} className="rounded border border-gray-200 bg-white p-4 transition hover:border-secondary">
                <h3 className="text-sm font-bold text-primary">Have a question?</h3>
                <p className="mt-1 text-sm text-gray-600">Call {PHONE_DISPLAY}</p>
            </a>
            <a
                href={whatsappLink('Hello Technical Drawers, I need help with an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-200 bg-white p-4 transition hover:border-secondary"
            >
                <h3 className="text-sm font-bold text-primary">Need help ordering?</h3>
                <p className="mt-1 text-sm text-gray-600">Chat with us on WhatsApp</p>
            </a>
            <a href={`mailto:${EMAIL}`} className="rounded border border-gray-200 bg-white p-4 transition hover:border-secondary">
                <h3 className="text-sm font-bold text-primary">Write to us</h3>
                <p className="mt-1 break-all text-sm text-gray-600">{EMAIL}</p>
            </a>
            <div className="rounded border border-gray-200 bg-white p-4">
                <h3 className="text-sm font-bold text-primary">Visit our store</h3>
                <p className="mt-1 text-sm text-gray-600">{STORE_LINE}</p>
            </div>
        </div>
    </section>
);

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('calculators');

    useEffect(() => {
        const load = async () => {
            try {
                const [all, featured] = await Promise.all([
                    fetchAllProducts(),
                    fetchFeaturedProducts(),
                ]);
                setAllProducts(all);
                setFeaturedProducts(featured);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const activeCategory = TABS.find((tab) => tab.id === activeTab)?.category;
    const filteredProducts = useMemo(
        () =>
            activeCategory
                ? allProducts.filter((product) => product.category === activeCategory)
                : allProducts,
        [allProducts, activeCategory]
    );

    const brands = useMemo(
        () => [...new Set(allProducts.map((product) => product.brand).filter(Boolean))].slice(0, 14),
        [allProducts]
    );

    return (
        <>
            <Helmet>
                <title>Technical Drawers | Essential Engineering Equipment for STEM Students & Professionals</title>
                <meta
                    name="description"
                    content="Buy engineering drawing sets, scientific calculators, safety boots, and lab equipment in Nairobi. Trusted by STEM students at Technical University of Kenya. Quality tools at student-friendly prices."
                />
                <link rel="canonical" href="https://technicaldrawers.co.ke/" />
                <meta
                    property="og:title"
                    content="Technical Drawers | Essential Engineering & STEM Equipment for Students, Schools & Institutions in Kenya"
                />
                <meta
                    property="og:description"
                    content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi. Located near Technical University of Kenya."
                />
                <meta property="og:url" content="https://technicaldrawers.co.ke/" />
                <meta
                    name="twitter:title"
                    content="Technical Drawers | Essential Engineering & STEM Equipment for Students, Schools & Institutions in Kenya"
                />
                <meta
                    name="twitter:description"
                    content="Buy technical drawing sets, scientific calculators, and safety equipment for STEM students in Nairobi."
                />
            </Helmet>

            <h1 className="sr-only">
                Engineering drawing sets, scientific calculators and safety equipment for STEM students in Nairobi, Kenya.
            </h1>

            <CategoryNav />
            <FeaturedGallery />
            <TrustStrip />
            <BestSellersSection
                loading={loading}
                filteredProducts={filteredProducts}
                allProducts={allProducts}
                activeCategory={activeCategory}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <QuoteBand />
            <FeaturedProductsSection loading={loading} featuredProducts={featuredProducts} />
            <BrandRow brands={brands} />
            <HelpRow />
        </>
    );
};

export default Home;