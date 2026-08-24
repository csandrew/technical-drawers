import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from './BlogLayout';

const SetSquaresGuide = () => {
    return (
        <>
            <Helmet>
                <title>Technical Set Squares Guide | Technical Drawers</title>
                <meta name="description" content="A guide to choosing the right set squares for your engineering and architecture projects." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog/set-squares" />
                <meta property="og:title" content="Technical Set Squares Guide | Technical Drawers" />
                <meta property="og:description" content="A guide to choosing the right set squares for your engineering projects." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog/set-squares" />
                <meta name="twitter:title" content="Technical Set Squares Guide | Technical Drawers" />
                <meta name="twitter:description" content="A guide to choosing the right set squares for your engineering projects." />
            </Helmet>

            <BlogLayout 
                title="Technical Set Squares Guide"
                category="Drawing Tools"
                imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
            >
                {/* ... existing content ... */}
            </BlogLayout>
        </>
    );
};

export default SetSquaresGuide;
