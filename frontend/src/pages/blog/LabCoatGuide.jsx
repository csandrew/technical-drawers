import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from './BlogLayout';

const LabCoatGuide = () => {
    return (
        <>
            <Helmet>
                <title>Lab Coat Sizes Explained | Technical Drawers</title>
                <meta name="description" content="Don't look like you're wearing a tent. How to get the right lab coat fit for practical sessions." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog/lab-coat-guide" />
                <meta property="og:title" content="Lab Coat Sizes Explained | Technical Drawers" />
                <meta property="og:description" content="Don't look like you're wearing a tent. How to get the right lab coat fit." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog/lab-coat-guide" />
                <meta name="twitter:title" content="Lab Coat Sizes Explained | Technical Drawers" />
                <meta name="twitter:description" content="Don't look like you're wearing a tent. How to get the right lab coat fit." />
            </Helmet>

            <BlogLayout 
                title="Lab Coat Sizes Explained"
                category="Lab Safety"
                imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
            >
                {/* ... existing content ... */}
            </BlogLayout>
        </>
    );
};

export default LabCoatGuide;
