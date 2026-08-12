import React from 'react';
import BlogLayout from './BlogLayout';

const CalculatorGuide = () => {
    return (
        <BlogLayout 
            title="Which Calculator Should You Buy?"
            category="Calculator Guide"
            imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
        >
            <p className="text-lg text-gray-600 mb-6">
                The right calculator depends on your course, exam rules, and budget. 
                Learn which models are trusted by engineering, architecture, and science students.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Casio FX-991ES Plus</h2>
            <div className="bg-accent/10 border-l-4 border-accent p-4 mb-4">
                <span className="font-semibold text-accent">★ Most Popular</span>
                <span className="ml-3 text-sm bg-primary text-white px-2 py-0.5 rounded">Engineering</span>
                <span className="ml-2 text-sm bg-primary text-white px-2 py-0.5 rounded">Architecture</span>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Scientific calculator</li>
                <li>Non-programmable</li>
                <li>Two-way power: Battery and Solar</li>
                <li>417 functions for engineering students</li>
                <li>Suitable for Engineers, Architects, Quantity Surveyors</li>
            </ul>
            <p className="text-xl font-bold text-accent mt-4">KES 3,500</p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Casio FX-570ES Plus</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Scientific calculator</li>
                <li>Non-programmable</li>
                <li>Battery ONLY</li>
                <li>417 functions</li>
                <li>Suitable for Engineers, Architects, Quantity Surveyors</li>
            </ul>
            <p className="text-xl font-bold text-accent mt-4">KES 3,200</p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Casio FX-82MS</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Scientific calculator</li>
                <li>Non-programmable</li>
                <li>Battery ONLY</li>
                <li>240 functions</li>
                <li>Perfect for beginners and school</li>
            </ul>
            <p className="text-xl font-bold text-accent mt-4">KES 2,800</p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Casio FX-991EX CLASSWIZ</h2>
            <div className="bg-accent/10 border-l-4 border-accent p-4 mb-4">
                <span className="font-semibold text-accent">★ Advanced</span>
                <span className="ml-3 text-sm bg-primary text-white px-2 py-0.5 rounded">Actuarial</span>
                <span className="ml-2 text-sm bg-primary text-white px-2 py-0.5 rounded">Statistics</span>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Scientific calculator</li>
                <li>Non-programmable</li>
                <li>Two-way power: Battery and Solar</li>
                <li>552 functions including spreadsheet</li>
                <li>Suitable for Actuarial Science, Pure Maths, Statistics</li>
            </ul>
            <p className="text-xl font-bold text-accent mt-4">KES 4,200</p>

            <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                <p className="font-semibold text-primary">
                    <i className="fas fa-lightbulb text-accent mr-2"></i> Pro Tip
                </p>
                <p className="text-gray-600">
                    The FX-991ES Plus is the most popular choice among engineering and architecture students. 
                    It offers the best balance of features, price, and exam compliance.
                </p>
            </div>

            <div className="text-center mt-8">
                <a 
                    href="https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I%20need%20help%20choosing%20a%20calculator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp inline-flex"
                >
                    <i className="fab fa-whatsapp"></i> Need help choosing?
                </a>
            </div>
        </BlogLayout>
    );
};

export default CalculatorGuide;
