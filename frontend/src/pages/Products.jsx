
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const { addToCart } = useCart();
    
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [showAllCategories, setShowAllCategories] = useState(false);
    const categoryFilter = searchParams.get('category') || 'All';

    const categories = [
        'All',
        'Scientific Calculators',
        'Engineering Drawing Equipment',
        'Measuring Instruments',
        'Hand Tools',
        'Electrical Tools',
        'Safety Equipment',
        'Stationery & Office Supplies',
        'Art & Drafting Supplies',
        'Textbooks & Reference'
    ];

    const getVisibleCategories = () => {
        if (showAllCategories) return categories;
        return categories.slice(0, 6);
    };

    const categoryTitle = categoryFilter !== 'All' ? `${categoryFilter} | Technical Drawers` : 'All Products | Technical Drawers';
    const categoryDescription = categoryFilter !== 'All' 
        ? `Shop our ${categoryFilter} collection. Quality engineering equipment for STEM students in Kenya.` 
        : 'Browse our complete collection of engineering equipment, calculators, drawing tools, safety gear, and stationery for STEM students.';

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setAllProducts(data);
            applyFilters(data);
            setLoading(false);
        };
        loadProducts();
    }, []);

    useEffect(() => {
        applyFilters(allProducts);
        setCurrentPage(1);
    }, [categoryFilter]);

    const applyFilters = (products) => {
        let filtered = [...products];
        if (categoryFilter && categoryFilter !== 'All') {
            filtered = filtered.filter(p => p.category === categoryFilter);
        }
        setFilteredProducts(filtered);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (value) => {
        setSearchParams({ category: value });
        setCurrentPage(1);
    };

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
                <title>{categoryTitle}</title>
                <meta name="description" content={categoryDescription} />
                <link rel="canonical" href={`https://technicaldrawers.co.ke/products${categoryFilter !== 'All' ? `?category=${encodeURIComponent(categoryFilter)}` : ''}`} />
                <meta property="og:title" content={categoryTitle} />
                <meta property="og:description" content={categoryDescription} />
                <meta property="og:url" content={`https://technicaldrawers.co.ke/products${categoryFilter !== 'All' ? `?category=${encodeURIComponent(categoryFilter)}` : ''}`} />
                <meta name="twitter:title" content={categoryTitle} />
                <meta name="twitter:description" content={categoryDescription} />
            </Helmet>

            <section className="py-8 md:py-12 bg-slate-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-2xl font-extrabold text-secondary mb-4">Our Products</h1>
                        <p className="text-text-light text-sm md:text-base mt-1">
                            {filteredProducts.length} products found
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter by Category</h3>
                                <button
                                    onClick={() => setShowAllCategories(!showAllCategories)}
                                    className="md:hidden text-xs text-accent hover:text-accent-hover transition font-medium"
                                >
                                    {showAllCategories ? 'Show Less' : 'See All'}
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {getVisibleCategories().map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleFilterChange(cat)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
                                            categoryFilter === cat
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">
                            Showing {currentProducts.length} of {filteredProducts.length} products
                        </span>
                        {categoryFilter !== 'All' && (
                            <button
                                onClick={() => setSearchParams({})}
                                className="text-sm text-accent hover:text-accent-hover transition"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>

                    {currentProducts.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-600">No products found for this selection.</p>
                            <button
                                onClick={() => setSearchParams({})}
                                className="btn btn-primary mt-4 inline-block"
                            >
                                View All Products
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                {currentProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                                                    currentPage === pageNum
                                                        ? 'bg-primary text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Products;
