
import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

type Props = {
  title: string;
  bg: string;
  color: string;
  products: Product[];
};

export default function CategoryBlock({ title, bg, color, products }: Props) {
  return (
    <section className={`${bg} ${color} px-6 pt-24 py-16`}>
      <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 border border-transparent hover:border-pink-300"
          >
            <div className="relative w-full pb-[100%] bg-gray-50">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h3 className="text-md font-semibold text-gray-800 truncate">{product.title}</h3>
              <p className="inline-block mt-3 px-3 py-1 bg-[#FADADD] text-[#7D184F] rounded-full text-sm font-semibold">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
