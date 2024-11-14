import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
       <Head>
        <title>PlantPal - Plant Identifier</title>
        <meta name="description" content="Identify and learn about plants with ease" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}