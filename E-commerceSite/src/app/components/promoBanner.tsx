'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
};

export default function PromoBanner() {
  const [products, setProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [vehiclesRes, motorcyclesRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/vehicle'),
          fetch('https://dummyjson.com/products/category/motorcycle'),
        ]);

        const vehicles = await vehiclesRes.json();
        const motorcycles = await motorcyclesRes.json();

        const combined = [...vehicles.products, ...motorcycles.products];
        setProducts(combined);
      } catch (error) {
        console.error('Failed to load promo products:', error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!products.length) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % products.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [products]);

  const current = products[index];
  if (!current) return null;

  return (
    <section className="relative bg-gradient-to-r from-[#804c67] via-[#a16584] to-[#c487a6] text-white px-8 py-20 rounded-2xl mx-4 mt-12 shadow-2xl overflow-hidden border border-[#f4d4dc88]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
        >
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ffe3ec] mb-3">{current.title}</h2>
            <p className="mb-4 text-lg text-[#e0d7e8]">{current.description.slice(0, 120)}...</p>
            <p className="text-xl font-semibold text-white mb-4">${current.price}</p>
            <Link
              href={`/product/${current.id}`}
              className="inline-block bg-[#ffe3ec] text-[#5a2f3b] hover:bg-[#fce4ef] hover:text-[#3d1e28] font-bold px-6 py-3 rounded-full shadow-md transition"
            >
              Only on this site 🚀
            </Link>

          </div>

          {/* Product Image */}
          <div className="relative w-full h-[250px] md:h-[300px] rounded-lg overflow-hidden">
            <Image
              src={current.thumbnail}
              alt={current.title}
              fill
              className="object-contain scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}