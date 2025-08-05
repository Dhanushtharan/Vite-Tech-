export const fetcher = async (url: string) => {
    console.log("Fetching from API:", url); 
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();

    return { data, totalCount: 200 };
};
