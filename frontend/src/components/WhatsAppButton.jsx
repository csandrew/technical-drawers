// src/components/WhatsAppButton.jsx
import React from 'react';

const WhatsAppButton = () => {
    const phoneNumber = '254795011225';
    const message = 'Hello Technical Drawers,%0A%0AI have a question about your products. Can you help me?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-whatsapp text-white px-4 py-3 rounded-full shadow-lg hover:bg-whatsapp-hover hover:scale-105 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
        >
            <i className="fab fa-whatsapp text-xl"></i>
            <span className="font-medium text-sm whitespace-nowrap">
                WhatsApp Us
            </span>
        </a>
    );
};

export default WhatsAppButton;
