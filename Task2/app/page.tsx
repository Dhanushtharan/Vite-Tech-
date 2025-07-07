import Head from 'next/head';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Search bar</title>
      </Head>
      <main style={{ paddingTop: '60px', textAlign: 'center' }}>
        
        <h1>Country Info ...</h1>
                <br></br>
        <SearchBar />
      </main>
    </>
  );
}
