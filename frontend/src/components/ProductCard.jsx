import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    // Get brand from product name or use default
    const getBrand = (name) => {
        const brands = ['Casio', 'Oxford', 'Classmate', 'Nataraj', 'Bic', 'Araldite', 'SanDisk', 'Oraimo', 'Werken', 'Ace Mamba', 'Soldier', 'Crayola', 'Faber-Castell'];
        for (const brand of brands) {
            if (name.toUpperCase().includes(brand.toUpperCase())) {
                return brand;
            }
        }
        return 'Technical Drawers';
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
            {/* Brand */}
            <div className="px-4 pt-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {getBrand(product.name)}
                </span>
            </div>
            
            {/* Image */}
            <Link to={`/product/${product._id}`}>
                <div className="aspect-square bg-gray-100 overflow-hidden flex items-center justify-center p-4">
                    <img 
                        src={product.images?.[0] || '/placeholder.jpg'} 
                        alt={product.name} 
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>
            </Link>
            
            {/* Info */}
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[40px] hover:text-primary transition">
                        {product.name}
                    </h3>
                </Link>
                
                {/* Rating - placeholder for now */}
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-xs font-medium">4.8</span>
                    <span className="text-xs text-gray-400">(126)</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-accent font-bold text-lg">
                        KES {product.price.toLocaleString()}
                    </span>
                    {/* Discount placeholder - can add later */}
                </div>
                
                {/* Stock */}
                <div className="mt-1">
                    <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ● {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                
                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`w-full mt-3 py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                        product.stock > 0 
                            ? 'bg-primary text-white hover:bg-primary-dark' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <i className="fas fa-shopping-cart"></i>
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
