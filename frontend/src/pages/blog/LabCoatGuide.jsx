import React from 'react';
import BlogLayout from './BlogLayout';

const LabCoatGuide = () => {
    return (
        <BlogLayout 
            title="Lab Coat Sizes Explained"
            category="Lab Safety"
            imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=80"
        >
            <p className="text-lg text-gray-600 mb-6">
                Find the best fit for lab sessions so you stay safe and comfortable all day.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">How to Choose</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>Check chest and waist allowance for layering</li>
                <li>Confirm sleeve length reaches the wrist comfortably</li>
                <li>Choose a coat length that covers the hips</li>
                <li>Pick a fabric that is easy to wash and iron</li>
            </ul>

            <div className="bg-primary/5 border-l-4 border-primary p-4 mt-8">
                <p className="font-semibold text-primary">
                    <i className="fas fa-lightbulb text-accent mr-2"></i> Pro Tip
                </p>
                <p className="text-gray-600">
                    If you are between sizes, choose the larger option for comfort and safety. 
                    A coat that is too tight can catch and restrict your movement.
                </p>
            </div>

            <div className="text-center mt-8">
                <a 
                    href="https://wa.me/254795011225?text=Hello%20Technical%20Drawers%2C%20I%20need%20help%20choosing%20a%20lab%20coat%20size" 
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

export default LabCoatGuide;
