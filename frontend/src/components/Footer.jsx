import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-8 md:gap-12">
                    
                    {/* Brand */}
                    <div className="w-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="Technical Drawers" className="h-10" />
                            <span className="font-extrabold text-xl">
                                Technical <span className="text-accent">Drawers</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Equipping Kenya's next generation of STEM professionals.
                        </p>
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3 mt-5">
                            <a
                                href="https://www.instagram.com/technicaldrawers?igsh=MWlvbW9oenhtaXg2aQ=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                                style={{ background: 'radial-gradient(circle at 30% 110%, #ffdb70, #e4405f, #c13584, #833ab4, #5851db)' }}
                            >
                                <i className="fab fa-instagram text-white text-sm"></i>
                            </a>
                            <a
                                href="https://www.facebook.com/share/1DN8YCYcr9/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                                style={{ background: '#1877F2' }}
                            >
                                <i className="fab fa-facebook-f text-white text-sm"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="TikTok"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                                style={{ background: '#000000' }}
                            >
                                <i className="fab fa-tiktok text-white text-sm"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="w-auto">
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-accent transition">Home</Link></li>
                            <li><Link to="/products" className="text-gray-400 hover:text-accent transition">Products</Link></li>
                            <li><Link to="/blog" className="text-gray-400 hover:text-accent transition">Our Blog</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-accent transition">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-accent transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="w-auto">
                        <h4 className="font-bold text-lg mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-map-marker-alt text-gray-400"></i>
                                Haile Selassie Ave, Nairobi
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-envelope text-gray-400"></i>
                                <a href="mailto:drawerstechnical@gmail.com" className="hover:text-accent transition">drawerstechnical@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-phone-alt text-gray-400"></i>
                                <a href="tel:+254795011225" className="hover:text-accent transition">+254 795 011 225</a>
                            </li>
                        </ul>
                    </div>

                    
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>&copy; 2026 Technical Drawers. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" className="hover:text-accent transition">Privacy Policy</Link>
                        <Link to="/terms-conditions" className="hover:text-accent transition">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;