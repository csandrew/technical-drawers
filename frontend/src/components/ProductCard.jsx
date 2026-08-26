import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    const getBrand = (name) => {
        const brands = ['Casio', 'Oxford', 'Classmate', 'Nataraj', 'Bic', 'Araldite', 'SanDisk', 'Oraimo', 'Werken', 'Ace Mamba', 'Soldier', 'Crayola', 'Faber-Castell'];
        for (const brand of brands) {
            if (name.toUpperCase().includes(brand.toUpperCase())) {
                return brand;
            }
        }
        return 'Technical Drawers';
    };

    // Calculate discount (you can adjust this logic)
    const getOriginalPrice = (price) => {
        // If you have a discount percentage stored in product, use it
        if (product.discountPercent) {
            return Math.round(price / (1 - product.discountPercent / 100));
        }
        // Example: if price is 3500, original might be 4200 (16% off)
        // You can set this logic based on your data
        return product.originalPrice || Math.round(price * 1.15); // Fallback: 15% markup
    };

    const originalPrice = getOriginalPrice(product.price);
    const hasDiscount = originalPrice > product.price;

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-all hover:-translate-y-1 overflow-hidden group">
            {/* Image */}
            <Link to={`/product/${product._id}`}>
                <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img 
                        src={product.images?.[0] || '/placeholder.jpg'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>
            </Link>
            
            {/* Info */}
            <div className="p-3">
                {/* Brand */}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {getBrand(product.name)}
                </span>
                
                {/* Product Name */}
                <Link to={`/product/${product._id}`}>
                    <h3 className="font-semibold text-gray-800 text-xs leading-tight line-clamp-2 min-h-[32px] hover:text-primary transition mt-0.5">
                        {product.name}
                    </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-[11px] tracking-tight">★★★★★</span>
                    <span className="text-[10px] text-gray-500">4.8 (126)</span>
                </div>
                
                {/* Price with Original Price crossed out */}
                <div className="flex items-center gap-2 mt-1">
                    <p className="font-bold text-primary text-sm">
                        KES {product.price.toLocaleString()}
                    </p>
                    {hasDiscount && (
                        <p className="font-semibold text-red-500 text-[10px] line-through">
                            KES {originalPrice.toLocaleString()}
                        </p>
                    )}
                </div>
                
                {/* Your Features: Stock + Add to Cart */}
                <div className="mt-2">
                    <span className={`text-[10px] ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ● {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`w-full mt-1.5 py-1.5 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 text-xs ${
                            product.stock > 0 
                                ? 'bg-primary text-white hover:bg-primary-dark' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <i className="fas fa-shopping-cart text-[10px]"></i>
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;