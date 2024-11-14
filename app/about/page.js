import React from 'react';
import ReactMarkdown from 'react-markdown';

async function getAboutContent() {
  const res = await fetch(`${process.env.API_URL}/api/about`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch about content');
  }
  return res.json();
}

export default async function About() {
  const about = await getAboutContent();

    return (
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
            {about.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  }