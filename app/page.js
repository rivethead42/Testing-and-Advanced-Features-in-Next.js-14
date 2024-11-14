'use client'

import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';
import FeatureCards from './components/FeatureCards';

export default function Home() {
  const [plantInfo, setPlantInfo] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleImageUpload = async (file) => {
    try {
      setLoading(true)
      setError(null)
      
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to identify plant')
      }

      const data = await response.json()
      setPlantInfo(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-green-600 p-6 sm:p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-2">PlantPal</h1>
              <p className="text-center text-green-100 text-lg">
                Identify plants and get care instructions in seconds!
              </p>
            </div>
            <div className="p-6 sm:p-10">
              <ImageUpload setPlantInfo={setPlantInfo} onUpload={handleImageUpload} loading={loading} />
              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              {uploadedImage && (
                <div className="mt-8 flex justify-center">
                  <img src={uploadedImage} alt="Uploaded plant" className="max-w-full h-auto rounded-lg shadow-md" style={{maxHeight: '400px'}} />
                </div>
              )}
              {plantInfo && <PlantInfo plantInfo={plantInfo} />}
            </div>
          </div>
        </div>
      </div>
      <FeatureCards />
    </div>
  );
}