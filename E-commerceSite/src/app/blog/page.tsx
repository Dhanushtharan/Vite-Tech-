import clsx from 'clsx';

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
};

export const dynamic = 'force-static';

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://dummyjson.com/posts');
  const data = await res.json();
  return data.posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
<main className="min-h-screen bg-[#fdfbff] text-[#5c3759] border-t border-[#e3d0ec] px-6 py-12 pt-24">
      <h1 className="text-4xl font-bold text-center mb-10 text-#333">
        📝 Explore Our Blog
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className={clsx(
              'rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white p-6 flex flex-col justify-between'
            )}
          >
            <h2 className="text-xl font-semibold mb-2 text-[#6b4c71]">
              {post.title}
            </h2>
            <p className="text-gray-700 text-sm mb-4 line-clamp-4">
              {post.body}
            </p>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 text-xs text-white mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-500 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500 flex justify-between items-center">
                <span>
                  👍 {post.reactions.likes} | 👎 {post.reactions.dislikes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
