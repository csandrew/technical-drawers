import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from './BlogLayout';

const DrawingKitGuide = () => {
    return (
        <>
            <Helmet>
                <title>How to Choose a Drawing Kit | Technical Drawers</title>
                <meta name="description" content="Don't waste money on a kit you'll never use. Here's what you actually need for engineering and architecture students in Kenya." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog/drawing-kit" />
                <meta property="og:title" content="How to Choose a Drawing Kit | Technical Drawers" />
                <meta property="og:description" content="Don't waste money on a kit you'll never use. Here's what you actually need." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog/drawing-kit" />
                <meta name="twitter:title" content="How to Choose a Drawing Kit | Technical Drawers" />
                <meta name="twitter:description" content="Don't waste money on a kit you'll never use. Here's what you actually need." />
            </Helmet>

            <BlogLayout 
                title="How to Choose a Drawing Kit"
                category="Drawing Tools"
                imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
            >
                {/* ... existing content ... */}
            </BlogLayout>
        </>
    );
};

export default DrawingKitGuide;
