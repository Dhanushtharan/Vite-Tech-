'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: 'MEN',
    image: '/banner/men.jpg',
    href: '/categoryList/men',
  },
  {
    title: 'WOMEN',
    image: '/banner/women.jpg',
    href: '/categoryList/women',
  },
];

export default function ShopLatest() {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#F9F4F8] text-[#4A154B]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#A97BA5]">Just Dropped 🔥</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((cat) => (
          <Link key={cat.title} href={cat.href} className="block group">
            <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 group-hover:translate-y-0 bg-[#A97BA5]/90 text-white text-center py-3 text-lg font-semibold tracking-wide transition-all duration-300">
                {cat.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
