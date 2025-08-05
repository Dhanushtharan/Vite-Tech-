import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  description: string;
  category: string;
};

export const revalidate = 60; 

async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=120");
  const data = await res.json();
  return data.products;
}

export default async function ExploreProductsPage() {
  const products = await getAllProducts();

  const categoryMap: { [key: string]: Product[] } = {};
  products.forEach((product) => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = [];
    }
    categoryMap[product.category].push(product);
  });

  const categories = Object.keys(categoryMap);

  const slicedCategories = categories.slice(4);

  return (
    <main className="bg-gradient-to-b bg-[#f9f4f8] min-h-screen">
      <div className="py-8 px-4 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#1b1b2f]">
          Everything Everywhere All at Once!
        </h1>

        {slicedCategories.map((category) => (
          <section key={category} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 capitalize text-[#6e6e6e] border-b-2 pb-2 border-[#bcfd4c]">
              {category}
            </h2>

            {categoryMap[category]?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryMap[category].map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md p-4 transition-transform hover:scale-105 duration-300"
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={400}
                      height={300}
                      className="rounded-xl object-cover h-48 w-full"
                    />
                    <h3 className="text-lg font-semibold mt-2 truncate text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-[#1b1b2f]">
                        ${product.price}
                      </span>
                    </div>
                    <Link
                      href={`/product/${product.id}`}
                      className="block mt-4 text-center bg-gradient-to-tr from-[#8e44ad] to-[#1b1b2f] text-white px-4 py-2 rounded-full font-semibold hover:brightness-110 transition"
                    >
                      View Product
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 italic">
                No products found in this category.
              </p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
