import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">PlantPal</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="py-4 px-2 text-green-100 hover:text-white transition duration-300">Home</Link>
            <Link href="/about" className="py-4 px-2 text-green-100 hover:text-white transition duration-300">About</Link>
            <Link href="/contact" className="py-4 px-2 text-green-100 hover:text-white transition duration-300">Contact</Link>
            <Link href="/gallery" className="py-4 px-2 text-green-100 hover:text-white transition duration-300">Gallery</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}