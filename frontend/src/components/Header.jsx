import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CONTAINER = 'mx-auto max-w-site px-4 sm:px-6 md:px-8 lg:px-10';

const Header = () => {
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector('input');
        if (searchInput.value.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchInput.value.trim())}`;
        }
    };

    return (
        <header className="w-full bg-primary shadow-sm relative z-50">

            {/* Top Header */}
            <div className={`${CONTAINER} flex items-center justify-between gap-3 py-3 md:py-6`}>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <img
                        src="/logo.png"
                        alt="Technical Drawers"
                        className="h-10 md:h-12 w-auto"
                    />
                    <span className="text-lg text-white md:text-xl font-bold hidden sm:inline">
                        Technical<span className="text-accent">Drawers</span>
                    </span>
                </Link>

                {/* Mobile Greeting */}
                <div className="md:hidden flex-1 text-center">
                    <span className="text-sm font-bold text-white">
                        Welcome to Technical Drawers!
                    </span>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full h-12 px-4 pr-12 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-accent transition"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-gray-500 hover:text-primary transition"
                        >
                            <i className="fas fa-search text-xl"></i>
                        </button>
                    </form>
                </div>

                {/* Cart */}
                <Link
                    to="/cart"
                    className="flex items-center gap-2 text-accent hover:text-gray-300 transition flex-shrink-0"
                >
                    <div className="relative">
                        <i className="fas fa-shopping-cart text-2xl md:text-3xl"></i>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-3 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                        My Cart
                    </span>
                </Link>
            </div>

            {/* Search Bar - Mobile */}
            <div className={`${CONTAINER} md:hidden pb-3`}>
                <form onSubmit={handleSearch} className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full h-10 px-4 pr-10 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-accent transition text-sm"
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary transition"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>

            {/* Navigation */}
            <nav className="border-t border-white/10">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex items-center gap-2 w-full px-4 py-3 bg-transparent border-none text-base font-semibold text-white"
                >
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    {isMenuOpen ? 'CLOSE' : 'MENU'}
                </button>

                {/* Navigation Links */}
                <ul
                    className={`
                        ${isMenuOpen ? 'flex' : 'hidden'}
                        md:flex flex-col md:flex-row items-center justify-center
                        gap-0 md:gap-8 list-none m-0 p-0
                    `}
                >
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/products', label: 'Products' },
                        { to: '/blog', label: 'Our Blog' },
                        { to: '/about', label: 'About Us' },
                        { to: '/contact', label: 'Contact Us' },
                    ].map((link, i, arr) => (
                        <li
                            key={link.to}
                            className={`w-full md:w-auto ${i < arr.length - 1 ? 'border-b md:border-b-0 border-white/10' : ''}`}
                        >
                            <NavLink
                                to={link.to}
                                className={({ isActive }) => `
                                    block py-3 md:py-4 px-4 md:px-0 text-center md:text-left
                                    font-semibold text-sm tracking-wide
                                    ${isActive
                                        ? 'text-white border-b-2 border-accent'
                                        : 'text-white/80 hover:text-accent transition'}
                                `}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;