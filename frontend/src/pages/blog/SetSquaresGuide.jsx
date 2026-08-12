import React from 'react';
import BlogLayout from './BlogLayout';

const SetSquaresGuide = () => {
    return (
        <BlogLayout 
            title="Technical Set Squares Guide"
            category="Drawing Tools"
            imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
        >
            <div className="text-center mb-8">
                <i className="fas fa-ruler-combined text-5xl text-accent mb-4"></i>
                <p className="text-lg text-gray-600">Precision tools for accurate angles</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Two triangles set</li>
                <li>Triangle 1: 30°, 60° and 90° angles</li>
                <li>Triangle 2: 45°, 45° and 90° angles</li>
                <li>Clear plastic with black color scale</li>
                <li>Enclosed in a plastic bag</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">What's Included</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>30°/60°/90° Triangle</strong> - For precise angles</li>
                <li><strong>45°/45°/90° Triangle</strong> - For precise 45° and 90° angles</li>
            </ul>

            <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                <p className="font-semibold text-primary">
                    <i className="fas fa-lightbulb text-accent mr-2"></i> Perfect For
                </p>
                <p className="text-gray-600">
                    All engineering courses, Design, Architecture, and Grade 10 STEM Specialists.
                </p>
            </div>

            <div className="text-center mt-8">
                <a 
                    href="https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I%20want%20to%20inquire%20about%20the%20Set%20Squares" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp inline-flex"
                >
                    <i className="fab fa-whatsapp"></i> Inquire about Set Squares
                </a>
            </div>
        </BlogLayout>
    );
};

export default SetSquaresGuide;
