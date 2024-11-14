'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function UploadForm({ onUpload, loading }) {
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onUpload(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex flex-col items-center justify-center w-full">
        <label 
          className={`w-full h-64 flex flex-col items-center justify-center px-4 py-6 bg-green-50 text-green-700 rounded-lg border-2 border-green-300 border-dashed cursor-pointer hover:bg-green-100 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mb-2 text-sm text-green-600">
              <span className="font-bold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-green-500">PNG, JPG or JPEG (MAX. 10MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>

        {preview && (
          <div className="mt-6 relative w-full h-64">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="rounded-lg object-contain"
            />
          </div>
        )}

        {loading && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
          </div>
        )}
      </div>
    </div>
  )
}