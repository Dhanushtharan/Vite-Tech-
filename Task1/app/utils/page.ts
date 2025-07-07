

export type Country = {
  name: string;
  capital: string;
  population: number;
  gdp: number;
  region: string;
};

export async function fetchCountryData(countryName: string, apiKey: string): Promise<Country> {
  if (!countryName.trim()) throw new Error('Country name is required.');

  const response = await fetch(
    `https://api.api-ninjas.com/v1/country?name=${encodeURIComponent(countryName)}`,
    {
      headers: {
        'X-Api-Key': 'hB+2bGnBajLxNTwgERzBww==xftGSB8X8t8C25QO',
      },      
    }   
  );

  if (!response.ok) throw new Error('Country not found.');
  const json: Country[] = await response.json();
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('No data available for this country.');
  }
          
  return json[0]; 
}
