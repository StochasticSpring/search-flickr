import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Search Flickr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Search the Flickr public feed!" />
      </main>

      <Footer />
    </div>
  )
}
