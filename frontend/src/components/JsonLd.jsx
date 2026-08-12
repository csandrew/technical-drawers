import React from 'react';
import { Helmet } from 'react-helmet-async';

const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Technical Drawers",
        "description": "Technical drawing equipments, engineering supplies, STEM essentials and safety gear for students and professionals in Kenya.",
        "url": "https://technicaldrawers.co.ke",
        "telephone": "+254795011225",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Haile Selassie Avenue",
            "addressLocality": "Nairobi",
            "addressCountry": "KE"
        },
        "openingHours": "Mo-Sa 07:00-17:00",
        "priceRange": "KES 50 - KES 15000"
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default JsonLd;
