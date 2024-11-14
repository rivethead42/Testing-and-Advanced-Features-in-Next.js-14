// components/PlantInfo.js
import React from 'react';

export default function PlantInfo({ plantInfo }) {
  // Return null if no plantInfo is provided
  if (!plantInfo) {
    return null;
  }

  // Handle error case
  if (plantInfo.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{plantInfo.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Destructure with default values to prevent undefined errors
  const {
    name = 'Unknown Plant',
    scientific_name = 'Scientific name not available',
    description = 'No description available',
    family = 'Family not specified',
    care_instructions = {
      water: 'Water requirements not specified',
      light: 'Light requirements not specified',
      soil: 'Soil requirements not specified'
    }
  } = plantInfo;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="bg-green-600 px-6 py-4">
        <h2 className="text-3xl font-bold text-white">{name}</h2>
        <p className="text-green-100 text-lg italic">{scientific_name}</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-green-800">Description</h3>
          <p className="text-gray-700">{description}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-green-800">Plant Information</h3>
          <div className="bg-green-50 rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Family</dt>
                  <dd className="mt-1 text-sm text-gray-900">{family}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Water Needs</dt>
                  <dd className="mt-1 text-sm text-gray-900">{care_instructions.water}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Light Requirements</dt>
                  <dd className="mt-1 text-sm text-gray-900">{care_instructions.light}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Soil Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{care_instructions.soil}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-800">Care Instructions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><span className="font-medium">Water:</span> {care_instructions.water}</li>
            <li><span className="font-medium">Light:</span> {care_instructions.light}</li>
            <li><span className="font-medium">Soil:</span> {care_instructions.soil}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Add prop types for better development experience
PlantInfo.defaultProps = {
  plantInfo: {
    name: '',
    scientific_name: '',
    description: '',
    family: '',
    care_instructions: {
      water: '',
      light: '',
      soil: ''
    }
  }
};