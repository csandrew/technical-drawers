import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../data/products';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            const data = await fetchProductById(id);
            setProduct(data);
            setLoading(false);
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            toast.success(`${product.name} added to cart!`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-secondary">Product not found</h2>
                <Link to="/products" className="btn btn-primary mt-4 inline-block">Back to Products</Link>
            </div>
        );
    }

    const productTitle = `${product.name} | Technical Drawers Nairobi`;
    const productDescription = product.description?.slice(0, 160) || `Shop ${product.name} at Technical Drawers in Nairobi. Quality engineering equipment for STEM students.`;

    return (
        <>
            <Helmet>
                <title>{productTitle}</title>
                <meta name="description" content={productDescription} />
                <link rel="canonical" href={`https://technicaldrawers.co.ke/product/${product._id}`} />
                <meta property="og:title" content={productTitle} />
                <meta property="og:description" content={productDescription} />
                <meta property="og:image" content={product.images?.[0]} />
                <meta property="og:url" content={`https://technicaldrawers.co.ke/product/${product._id}`} />
                <meta property="og:type" content="product" />
                <meta property="product:price:amount" content={product.price} />
                <meta property="product:price:currency" content="KES" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={productTitle} />
                <meta name="twitter:description" content={productDescription} />
                <meta name="twitter:image" content={product.images?.[0]} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.name,
                        "description": product.description,
                        "image": product.images?.[0],
                        "offers": {
                            "@type": "Offer",
                            "price": product.price,
                            "priceCurrency": "KES",
                            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                        }
                    })}
                </script>
            </Helmet>

            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-sm text-gray-500 mb-6">
                        <Link to="/" className="hover:text-accent">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/products" className="hover:text-accent">Products</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-700">{product.name}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 bg-white rounded-custom p-6 md:p-12 shadow-custom">
                        <div>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full rounded-lg object-cover aspect-square"
                            />
                            {product.images.length > 1 && (
                                <div className="flex gap-2 mt-3">
                                    {product.images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={`${product.name} ${i + 1}`}
                                            className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 border-2 border-transparent hover:border-accent transition"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{product.category}</span>
                            <h1 className="text-3xl font-extrabold text-primary mt-2">{product.name}</h1>
                            <p className="text-3xl font-bold text-accent mt-4">KES {product.price.toLocaleString()}</p>
                            <p className="text-gray-600 mt-4">{product.description}</p>

                            <div className="mt-6">
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
                                </span>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <label className="font-semibold text-gray-700">Quantity:</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 rounded-full border border-gray-300 hover:border-primary transition flex items-center justify-center"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-semibold" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-8 h-8 rounded-full border border-gray-300 hover:border-primary transition flex items-center justify-center"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    className="btn btn-primary flex-1 min-w-[150px]"
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    <i className="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                                <a
                                    href={`https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}`}
                                    className="btn btn-whatsapp flex-1 min-w-[150px]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Enquire about this product on WhatsApp"
                                >
                                    <i className="fab fa-whatsapp"></i> Enquire Now
                                </a>
                            </div>

                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div className="mt-8 border-t pt-6">
                                    <h3 className="text-lg font-bold text-primary mb-3">Specifications</h3>
                                    <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-lg p-4">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-700">{key}:</span>
                                                <span className="text-gray-600">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetail;