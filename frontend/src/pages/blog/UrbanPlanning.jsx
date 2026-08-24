import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from './BlogLayout';

const UrbanPlanning = () => {
    return (
        <>
            <Helmet>
                <title>Urban Planning Essentials | Technical Drawers</title>
                <meta name="description" content="Tools for mapping, design, and planning projects throughout your urban planning course." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog/urban-planning" />
                <meta property="og:title" content="Urban Planning Essentials | Technical Drawers" />
                <meta property="og:description" content="Tools for mapping, design, and planning projects throughout your urban planning course." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog/urban-planning" />
                <meta name="twitter:title" content="Urban Planning Essentials | Technical Drawers" />
                <meta name="twitter:description" content="Tools for mapping, design, and planning projects throughout your urban planning course." />
            </Helmet>

            <BlogLayout 
                title="Urban Planning Essentials"
                category="Urban Planning Guide"
                imageUrl="https://res.cloudinary.com/j2zcgbug/image/upload/v1784445622/urbanplanning_ohkz8v.png"
            >
                {/* ... existing content ... */}
            </BlogLayout>
        </>
    );
};

export default UrbanPlanning;
