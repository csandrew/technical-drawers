import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from './BlogLayout';

const CalculatorGuide = () => {
    return (
        <>
            <Helmet>
                <title>Which Calculator Should You Buy? | Technical Drawers</title>
                <meta name="description" content="FX-991ES vs FX-82ES vs FX-9860GII. What the lecturers actually recommend for engineering and STEM students in Kenya." />
                <link rel="canonical" href="https://technicaldrawers.co.ke/blog/calculator-guide" />
                <meta property="og:title" content="Which Calculator Should You Buy? | Technical Drawers" />
                <meta property="og:description" content="FX-991ES vs FX-82ES vs FX-9860GII. What the lecturers actually recommend." />
                <meta property="og:url" content="https://technicaldrawers.co.ke/blog/calculator-guide" />
                <meta name="twitter:title" content="Which Calculator Should You Buy? | Technical Drawers" />
                <meta name="twitter:description" content="FX-991ES vs FX-82ES vs FX-9860GII. What the lecturers actually recommend." />
            </Helmet>

            <BlogLayout 
                title="Which Calculator Should You Buy?"
                category="Calculator Guide"
                imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
            >
                {/* ... existing content ... */}
            </BlogLayout>
        </>
    );
};

export default CalculatorGuide;
