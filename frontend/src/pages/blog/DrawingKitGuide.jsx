import React from 'react';
import BlogLayout from './BlogLayout';

const DrawingKitGuide = () => {
    return (
        <BlogLayout 
            title="How to Choose a Drawing Kit"
            category="Drawing Tools"
            imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
        >
            <div className="text-center mb-8">
                <i className="fas fa-drafting-compass text-5xl text-accent mb-4"></i>
                <p className="text-lg text-gray-600">Everything you need for precise technical drawings</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Complete Technical Drawing Set</h2>
            
            <div className="bg-accent/10 border-l-4 border-accent p-4 mb-6">
                <p className="font-semibold">9 pieces in a plastic box</p>
            </div>

            <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li><strong>1 Large Compass</strong> - For drawing circles and arcs with precision</li>
                <li><strong>Divider</strong> - Transfer measurements accurately between drawings</li>
                <li><strong>Extension Bar</strong> - Extends your compass for larger circles</li>
                <li><strong>Pencil Holder</strong> - Securely holds graphite leads for clean lines</li>
                <li><strong>Clutch Pencil (0.5mm)</strong> - Precision pencil for fine technical lines</li>
                <li><strong>Leads Box</strong> - Various graphite grades for different drawing needs</li>
                <li><strong>Lead Sharpener</strong> - Keeps your leads perfectly sharpened</li>
            </ul>

            <h3 className="text-xl font-bold text-primary mt-8 mb-3">Who Uses This?</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>All Engineering students</li>
                <li>Construction Management</li>
                <li>Building Construction Technology</li>
                <li>Grade 10 STEM learners</li>
            </ul>

            <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                <p className="font-semibold text-primary">
                    <i className="fas fa-lightbulb text-accent mr-2"></i> Pro Tip
                </p>
                <p className="text-gray-600">
                    This complete 9-piece set gives you everything you need for precise, professional drawings. 
                    Each tool is designed for accuracy and durability.
                </p>
            </div>

            <div className="text-center mt-8">
                <a 
                    href="https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I%20want%20to%20inquire%20about%20the%20Technical%20Drawing%20Set" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp inline-flex"
                >
                    <i className="fab fa-whatsapp"></i> Inquire about this set
                </a>
            </div>
        </BlogLayout>
    );
};

export default DrawingKitGuide;
