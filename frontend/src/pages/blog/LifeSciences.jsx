import React from 'react';
import BlogLayout from './BlogLayout';

const LifeSciences = () => {
    return (
        <BlogLayout 
            title="Essential Tools for Life Sciences Students"
            category="Life Sciences Guide"
            imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
        >
            <p className="text-lg text-gray-600 mb-6">
                From lab coats to microscopes and dissection tools. Everything you need for biology, 
                microbiology, and biomedical science courses.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
                <i className="fas fa-shield-alt text-accent mr-2"></i> Lab Safety Essentials
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Lab Coat</strong> - Cotton or poly-cotton blend</li>
                <li><strong>Safety Goggles</strong> - Protect from chemical splashes</li>
                <li><strong>Latex/Nitrile Gloves</strong> - For handling specimens</li>
                <li><strong>Closed-toe Shoes</strong> - Lab safety 101</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
                <i className="fas fa-microscope text-accent mr-2"></i> Lab Equipment &amp; Tools
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Dissection Kit</strong> - Scalpels, forceps, scissors</li>
                <li><strong>Magnifying Glass</strong> - For close-up observations</li>
                <li><strong>Lab Notebook</strong> - Record observations and results</li>
                <li><strong>Marking Pens</strong> - For labeling slides and samples</li>
            </ul>

            <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                <p className="font-semibold text-primary">
                    <i className="fas fa-lightbulb text-accent mr-2"></i> Pro Tip
                </p>
                <p className="text-gray-600">
                    Buy your lab coat slightly larger than your usual size - it's more comfortable over clothes 
                    and allows for easier movement.
                </p>
            </div>

            <div className="text-center mt-8">
                <a 
                    href="https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I%20need%20help%20choosing%20life%20sciences%20equipment" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp inline-flex"
                >
                    <i className="fab fa-whatsapp"></i> Chat with us
                </a>
            </div>
        </BlogLayout>
    );
};

export default LifeSciences;
