import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from './BlogLayout';

const EngineeringTools = () => {
    return (
        <>
            <Helmet>
                <title>Essential Tools for Engineering Students | Technical Drawers</title>
                <meta name="description" content="From calculators to drawing equipment. What you'll actually use throughout your engineering course in Kenya." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog/engineering-tools" />
                <meta property="og:title" content="Essential Tools for Engineering Students | Technical Drawers" />
                <meta property="og:description" content="From calculators to drawing equipment. What you'll actually use throughout your engineering course." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog/engineering-tools" />
                <meta name="twitter:title" content="Essential Tools for Engineering Students | Technical Drawers" />
                <meta name="twitter:description" content="From calculators to drawing equipment. What you'll actually use throughout your engineering course." />
            </Helmet>

            <BlogLayout 
                title="Essential Tools for Engineering Students"
                category="Engineering Guide"
                imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
            >
                {/* ... existing content ... */}
            </BlogLayout>
        </>
    );
};

export default EngineeringTools;
