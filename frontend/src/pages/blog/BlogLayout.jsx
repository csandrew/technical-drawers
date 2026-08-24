import React from 'react';
import { Link } from 'react-router-dom';

const BlogLayout = ({ 
    title, 
    category, 
    icon, 
    children, 
    readTime = '5 min read',
    date = 'July 2024',
    imageUrl
}) => {
    return (
        <section className="py-16 bg-slate-100">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <Link 
                    to="/blog" 
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary transition mb-6"
                >
                    <i className="fas fa-arrow-left"></i> Back to Guides
                </Link>

                {/* Article Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl text-accent">{icon}</span>
                        <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                            {category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
                        {title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span><i className="far fa-clock mr-1"></i> {readTime}</span>
                        <span>•</span>
                        <span><i className="far fa-calendar mr-1"></i> {date}</span>
                    </div>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 prose prose-lg max-w-none">
                    {children}
                </div>

                {/* Back to Blog Link - Bottom */}
                <div className="mt-8 text-center">
                    <Link 
                        to="/blog" 
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition"
                    >
                        <i className="fas fa-arrow-left"></i> Back to all guides
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogLayout;
