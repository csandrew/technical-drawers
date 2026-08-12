import React from 'react';
import BlogLayout from './BlogLayout';

const EngineeringTools = () => {
    return (
        <BlogLayout 
            title="Essential Tools for Engineering Students"
            category="Engineering Guide"
            imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
        >
            <p className="text-lg text-gray-600 mb-6">
                Engineering is a broad field, but most students share common equipment needs. 
                Here's what you should have in your kit.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Year 1 &amp; 2 Essentials</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Scientific calculator (Casio FX-991ES Plus recommended)</li>
                <li>Set squares (30cm/60cm)</li>
                <li>Scale ruler (metric)</li>
                <li>Compass set</li>
                <li>Mechanical pencil and eraser</li>
                <li>Graph paper and notebooks</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Year 3 &amp; 4 Advanced Tools</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>T-square (60cm)</li>
                <li>Drawing board (A2 or A3)</li>
                <li>Technical drawing set</li>
                <li>Lab coat (for practical sessions)</li>
            </ul>

            <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                <p className="font-semibold text-primary">
                    <i className="fas fa-lightbulb text-accent mr-2"></i> Pro Tip
                </p>
                <p className="text-gray-600">
                    Invest in a good calculator early. It will serve you through all your math and engineering courses.
                </p>
            </div>

            <div className="text-center mt-8">
                <a 
                    href="https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I%20need%20help%20choosing%20engineering%20tools" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp inline-flex"
                >
                    <i className="fab fa-whatsapp"></i> Make an inquiry
                </a>
            </div>
        </BlogLayout>
    );
};

export default EngineeringTools;
