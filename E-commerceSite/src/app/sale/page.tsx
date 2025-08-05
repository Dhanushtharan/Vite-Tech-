//ISR page

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
};

export const revalidate = 60;

async function getSaleProducts(): Promise<Product[]> {
    console.log("Fetching sale products at", new Date().toISOString());
  const res = await fetch("https://dummyjson.com/products?limit=22", {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.products.filter((p: Product) => p.discountPercentage >= 10);
}

export default async function SalePage() {
  const saleProducts = await getSaleProducts();

  return (
    <section className="bg-[#fdfbff] text-[#6B4C71] px-6 pt-24 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">🔥 On Sale - Limited Time!</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {saleProducts.map((product) => {
          const discountedPrice = (
            product.price * (1 - product.discountPercentage / 100)
          ).toFixed(0);

          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 border border-transparent hover:border-[#CBAACB]"
            >
              <div className="relative w-full pb-[100%] bg-gray-50">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-[#6B4C71] text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-md font-semibold text-[#333] truncate">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="px-3 py-1 bg-[#FADADD] text-[#6B4C71] rounded-full text-sm font-semibold">
                    ${discountedPrice}
                  </span>
                  <span className="line-through text-sm text-gray-400">${product.price}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
