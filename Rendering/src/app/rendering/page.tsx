import React from 'react';

const RenderingHome = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Rendering Types</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a href="/rendering/ssr">
          <button className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition"
          style={{ cursor:'pointer' }}
          >
            Server Side Rendering (SSR)
          </button>
        </a>

        <a href="/rendering/ssg">
          <button className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition"
          style={{ cursor:'pointer' }}
          >
            Static Site Generation (SSG)
          </button>
        </a>

        <a href="/rendering/isr">
          <button className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition"
          style={{ cursor:'pointer' }}
          >
            Incremental Static Regeneration (ISR)
          </button>
        </a>
      </div>
    </main>
  );
};

export default RenderingHome;
