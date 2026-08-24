import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const BlogIndex = () => {
    const posts = [
        {
            id: 'calculator-guide',
            title: 'Which Calculator Should You Buy?',
            category: 'Calculator Guide',
            icon: 'fa-calculator',
            description: 'FX-991ES vs FX-82ES vs FX-9860GII. What the lecturers actually recommend.',
            component: 'CalculatorGuide'
        },
        {
            id: 'drawing-kit',
            title: 'How to Choose a Drawing Kit',
            category: 'Drawing Tools',
            icon: 'fa-pencil-ruler',
            description: 'Don\'t waste money on a kit you\'ll never use. Here\'s what you actually need.',
            component: 'DrawingKitGuide'
        },
        {
            id: 'engineering-tools',
            title: 'Essential Tools for Engineering Students',
            category: 'Engineering Guide',
            icon: 'fa-cogs',
            description: 'From calculators to drawing equipment. What you\'ll actually use throughout your course.',
            component: 'EngineeringTools'
        },
        {
            id: 'lab-coat-guide',
            title: 'Lab Coat Sizes Explained',
            category: 'Lab Safety',
            icon: 'fa-user-md',
            description: 'Don\'t look like you\'re wearing a tent. How to get the right fit.',
            component: 'LabCoatGuide'
        },
        {
            id: 'life-sciences',
            title: 'Essential Tools for Life Sciences Students',
            category: 'Life Sciences Guide',
            icon: 'fa-microscope',
            description: 'From lab coats to dissection tools. Everything you need for biology and biomedical science.',
            component: 'LifeSciences'
        },
        {
            id: 'set-squares',
            title: 'Technical Set Squares Guide',
            category: 'Drawing Tools',
            icon: 'fa-ruler-combined',
            description: 'A guide to choosing the right set squares for your engineering projects.',
            component: 'SetSquaresGuide'
        },
        {
            id: 'urban-planning',
            title: 'Urban Planning Essentials',
            category: 'Urban Planning Guide',
            icon: 'fa-city',
            description: 'Tools for mapping, design, and planning projects throughout your course.',
            component: 'UrbanPlanning'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Guides & Articles | Technical Drawers</title>
                <meta name="description" content="Read our guides on calculators, drawing kits, engineering tools, lab coats, and more. Practical advice for engineering and STEM students in Kenya." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog" />
                <meta property="og:title" content="Guides & Articles | Technical Drawers" />
                <meta property="og:description" content="Read our guides on calculators, drawing kits, engineering tools, lab coats, and more. Practical advice for engineering and STEM students in Kenya." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog" />
                <meta name="twitter:title" content="Guides & Articles | Technical Drawers" />
                <meta name="twitter:description" content="Read our guides on calculators, drawing kits, engineering tools, lab coats, and more. Practical advice for engineering and STEM students in Kenya." />
            </Helmet>

            <section className="py-16 bg-slate-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-2xl font-extrabold text-secondary">Guides &amp; Articles</h1>
                        <p className="text-text-light mt-2">Real advice from people who've been where you are</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <Link 
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 p-6 group"
                            >
                                <div className="text-4xl text-secondary mb-4 group-hover:scale-110 transition-transform">
                                    <i className={`fas ${post.icon}`}></i>
                                </div>
                                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                                <h3 className="text-lg font-bold text-primary mt-3 group-hover:text-secondary transition">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-2">{post.description}</p>
                                <div className="mt-4 text-accent font-semibold text-sm flex items-center gap-2">
                                    Read Guide <i className="fas fa-arrow-right group-hover:translate-x-1 transition"></i>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogIndex;
