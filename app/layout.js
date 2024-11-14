import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PlantPal - Plant Identifier',
  description: 'Identify and learn about plants with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow bg-gradient-to-br from-green-50 to-green-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}