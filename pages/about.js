// pages/about.js
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

// The page component
export default function About() {
  const [about, setAbout] = useState(null);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function getAboutContent() {
    return {
      "title": "About PlantPal",
      "content": "\n\n## Our Mission\n\nAt PlantPal, we believe that everyone can be a successful plant parent. Our mission is to bridge the gap between plant enthusiasts and the vast world of botany, making plant identification and care accessible to all.\n\n## What We Do\n\nPlantPal harnesses the power of cutting-edge AI technology to provide instant plant identification and personalized care instructions. Simply snap a photo of any plant, and our advanced algorithms will:\n\n1. **Identify the Plant**: Providing you with its common and scientific names.\n2. **Share Botanical Information**: Learn about the plant's family, origin, and unique characteristics.\n3. **Offer Care Instructions**: Get tailored advice on watering, light requirements, and soil preferences.\n\n## Why PlantPal?\n\n- **Instant Knowledge**: No more guessing games or endless searches. Get accurate information in seconds.\n- **Personalized Care**: Every plant is unique, and so are our care instructions.\n- **Expand Your Green Thumb**: Discover new plants and learn how to care for them with confidence.\n- **Eco-Friendly**: By helping you keep your plants healthy, we're contributing to a greener planet.\n\n## Our Technology\n\nPlantPal uses state-of-the-art machine learning models, specifically the Google Gemini AI, to analyze plant images. This ensures high accuracy in plant identification and up-to-date care recommendations.\n\n## Who We Are\n\nWe're a team of passionate botanists, developers, and plant lovers who came together to create a tool we wished existed. PlantPal is the result of our combined expertise and shared love for all things green.\n\n## Join Our Community\n\nWhether you're a seasoned gardener or just bought your first houseplant, PlantPal is here to support your plant journey. Join our growing community of plant enthusiasts, share your experiences, and let's make the world a little greener, one plant at a time.\n\n**Start your plant adventure with PlantPal today!**"
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      await delay(5000);
      const data = await getAboutContent();
      setAbout(data);
      console.log(data);
    }
    fetchData();
  },[]);

  return (
    <>
      <Head>
        <title>About - PlantPal</title>
        <meta name="description" content="Learn more about PlantPal and our mission" />
      </Head>
      
      <div className="bg-green-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-green-800 mb-6" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-8" {...props} />,
              p: ({ node, ...props }) => <p className="text-gray-700 mb-4" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-700 mb-4" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-700 mb-4" {...props} />,
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
            }}
          >
            {about?.content || ''}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}