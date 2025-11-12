// src/components/ui/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 text-center transition duration-300 transform bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl">
      <div className="flex justify-center mb-4">
        <div className="p-3 text-white bg-indigo-500 rounded-full">
          <Icon size={32} />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;