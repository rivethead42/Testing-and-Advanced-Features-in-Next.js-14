import { Camera, Leaf, BookOpen, Droplet, Sun, Mountain } from 'lucide-react';

const features = [
  {
    icon: <Camera className="w-8 h-8 text-green-400" />,
    title: "Upload Photo",
    description: "Take or upload a clear photo of the plant you want to identify."
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-400" />,
    title: "Get Identification",
    description: "Our AI will analyze the image and provide the plant's name and species."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-green-400" />,
    title: "Learn Details",
    description: "Discover the plant's characteristics, origin, and interesting facts."
  },
  {
    icon: <Droplet className="w-8 h-8 text-green-400" />,
    title: "Watering Guide",
    description: "Find out how often and how much to water your plant."
  },
  {
    icon: <Sun className="w-8 h-8 text-green-400" />,
    title: "Light Requirements",
    description: "Learn about the ideal light conditions for your plant."
  },
  {
    icon: <Mountain className="w-8 h-8 text-green-400" />,
    title: "Soil Preferences",
    description: "Get information on the best soil type for optimal growth."
  }
];

export default function FeatureCards() {
  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 bg-opacity-10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}