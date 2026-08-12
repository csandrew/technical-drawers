import React from 'react';
import BlogLayout from './BlogLayout';

const UrbanPlanning = () => {
    return (
        <BlogLayout 
            title="Urban Planning Essentials"
            category="Urban Planning Guide"
            imageUrl="https://res.cloudinary.com/j2zcgbug/image/upload/v1784445622/urbanplanning_ohkz8v.png"
        >
            <p className="text-lg text-gray-600 mb-6">
                Tools you'll need for mapping, design, and planning projects throughout your course.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Essential Tools</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Drawing board (A2 or A3)</li>
                <li>T-square and set squares</li>
                <li>Scale ruler (metric and architectural)</li>
                <li>Compass set</li>
                <li>Mechanical pencils and eraser</li>
                <li>Tracing paper and sketchbook</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Mapping &amp; Design Tools</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Flexible curve ruler</li>
                <li>Circle templates</li>
                <li>Colored pencils or markers</li>
                <li>Graph paper and grid paper</li>
            </ul>

            <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                <p className="font-semibold text-primary">
                    <i className="fas fa-lightbulb text-accent mr-2"></i> Pro Tip
                </p>
                <p className="text-gray-600">
                    Learn to work with both metric and architectural scales - you'll need both in urban planning.
                </p>
            </div>

            <div className="text-center mt-8">
                <a 
                    href="https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I%20need%20help%20choosing%20urban%20planning%20tools" 
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

export default UrbanPlanning;
