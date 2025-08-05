export const revalidate = 10;

type Blog = {
    id: string;
    country: string;
    state: string;
    city: string;
    location: string;
};

function shuffle<T>(array: T[]): T[] {
    return array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    }

async function getBlogData(): Promise<Blog[]> {
    console.log("[ISR] Fetching blog data from API...");
    const res = await fetch("https://68885d94adf0e59551b9a4c7.mockapi.io/blog");

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const data: Blog[] = await res.json();
    return shuffle(data).slice(0, 9);
}

export default async function ISRBlogPage() {
    const blogs = await getBlogData();

    return (
        <main className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Blogs - ISR</h1>
            <a href="/rendering">
                <button
                    style={{
                        cursor: 'pointer',
                        borderRadius: '6px',
                        padding: '10px 16px',
                        color: '#fff',
                        backgroundColor: '#0070f3',
                        border: 'none',
                        fontSize: '16px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Back
                </button>
            </a>
            <p className="text-gray-600 mb-6">
                This page is regenerated every <strong>10 seconds</strong> using ISR.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all"
                    >
                        <h2 className="text-lg font-semibold">{blog.city}, {blog.state}</h2>
                        <p className="text-sm text-gray-600">Country: {blog.country}</p>
                        <p className="text-sm text-gray-600">Location: {blog.location}</p>
                        <p className="text-xs text-gray-400 mt-2">ID: {blog.id}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}