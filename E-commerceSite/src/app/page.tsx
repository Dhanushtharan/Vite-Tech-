'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ShopLatest from './components/shopLatest';
import CategoryBlock from './components/categoryBlock';
import PromoBanner from './components/promoBanner';
import Hero3D from './heroComponent/page';

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  // const [count, setCount] = useState(0);
  // const [increasing, setIncreasing] = useState<boolean>();

  // const increment = () => {
  //   setCount(count + 1);
  //   setIncreasing(true);
  // }

  // const decrement = () => {
  //   if(count > 0){
  //   setCount(count - 1);
  //   setIncreasing(false);
  //   }
  // }

  // useEffect(() => {
  //   if(count == 5 && increasing){
  //     setCount(count + 5 || 10);
  //   }
  // },[count, increasing]);


  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=190')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data.filter((c) => typeof c === 'string'));
        }
      });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('loginSuccess')) {
      sessionStorage.removeItem('loginSuccess');
    }
  }, []);

  const getByCategory = (cat: string, limit: number = 6) =>
    products.filter((p) => p.category === cat).slice(0, limit);

  return (
    <main className="min-h-screen bg-[#F8F4F9] text-[#3C2A4D]">
      <Hero3D />
      <ShopLatest />
      <PromoBanner />
      <section className="px-6 py-16 bg-[#F8F4F9]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="block bg-white border border-[#A2678A] rounded-lg p-6 text-center shadow-md hover:shadow-lg transition capitalize text-lg font-medium text-[#3C2A4D]"
            >
              {cat.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      </section>

      <CategoryBlock
        title="Step Into Style "
        bg="bg-[#F8F4F9]"
        color="text-[#3C2A4D]"
        products={getByCategory('mens-shoes', 4)}
      />

      <CategoryBlock
        title="Comfort Zone "
        bg="bg-[#F0EAF1]"
        color="text-[#3C2A4D]"
        products={getByCategory('furniture', 4)}
      />

      <CategoryBlock
        title="Work Smart "
        bg="bg-[#F8F4F9]"
        color="text-[#3C2A4D]"
        products={getByCategory('laptops', 4)}
      />
      {/* <button onClick={increment}>
          +
      </button>
      <h2>Count: {count}</h2>
      <button onClick={decrement}>
        -
      </button> */}
    </main>
  );
}
