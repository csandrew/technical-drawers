import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from './BlogLayout';

const LifeSciences = () => {
    return (
        <>
            <Helmet>
                <title>Essential Tools for Life Sciences Students | Technical Drawers</title>
                <meta name="description" content="From lab coats to dissection tools. Everything you need for biology and biomedical science courses in Kenya." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog/life-sciences" />
                <meta property="og:title" content="Essential Tools for Life Sciences Students | Technical Drawers" />
                <meta property="og:description" content="From lab coats to dissection tools. Everything you need for biology and biomedical science." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog/life-sciences" />
                <meta name="twitter:title" content="Essential Tools for Life Sciences Students | Technical Drawers" />
                <meta name="twitter:description" content="From lab coats to dissection tools. Everything you need for biology and biomedical science." />
            </Helmet>

            <BlogLayout 
                title="Essential Tools for Life Sciences Students"
                category="Life Sciences Guide"
                imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
            >
                {/* ... existing content ... */}
            </BlogLayout>
        </>
    );
};

export default LifeSciences;
