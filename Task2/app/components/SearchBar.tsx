'use client';

import React, { useState, ChangeEvent } from 'react';

interface Country {
  name: string;
  capital: string;
  population: number;
  gdp: number;
  region: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);

//   const shouldShowResults = query.length >= 2;

  const fetchCountries = async (name: string) => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/country?name=${encodeURIComponent(name)}`,
      {
        headers: {
          'X-Api-Key': 'hB+2bGnBajLxNTwgERzBww==xftGSB8X8t8C25QO',
        },
      }
    );
    const data = await response.json();
    setCountries(data);
  } catch (err) {
    console.error('API Error:', err);
    setCountries([]);
  } finally {
    setLoading(false);
  }
};

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  setQuery(val);

  if (val.length >= 2) {
    fetchCountries(val);
  } else {
    setCountries([]);       
  }
};

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setQuery(country.name);
    setCountries([]);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedCountry(null);
    setCountries([]);
  };

  return (
    <div className="container">
      <h2>Search Country</h2>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a country..."
        />
        <button onClick={handleClear}>Clear</button>
      </div>

      {loading && <p>Loading...</p>}

      {!selectedCountry && countries.length > 0 && (
        <ul className="dropdown">
          {countries.map((country, idx) => (
            <li key={idx} onClick={() => handleSelect(country)}>
              {country.name}
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div className="country-details">
          <h3>{selectedCountry.name}</h3>
          <p><strong>Capital:</strong> {selectedCountry.capital}</p>
          <p><strong>Region:</strong> {selectedCountry.region}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>GDP:</strong> ${selectedCountry.gdp.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
