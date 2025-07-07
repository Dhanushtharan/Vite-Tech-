'use client';

import { useState } from 'react';
import { Country, fetchCountryData } from './utils/page';

export default function HomePage() {
  const [country, setCountry] = useState('');
  const [data, setData] = useState<Country | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setData(null);

    try { 
      const result = await fetchCountryData(country, 'hB+2bGnBajLxNTwgERzBww==xftGSB8X8t8C25QO');
      setData(result);
    } catch (err: any) {
      setError(err.message ?? 'Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Country Info Finder</h1>

      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country name"
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{data.name}</h2>
          <p><strong>Capital:</strong> {data.capital}</p>
          <p><strong>Region:</strong> {data.region}</p>
          <p><strong>Population:</strong> {data.population.toLocaleString()}</p>
          <p><strong>GDP:</strong> ${data.gdp.toLocaleString()}</p>
        </div>
      )}
    </main>
  );
}
