import CategoryBlock from "@/app/components/categoryBlock";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

async function getCategoryProducts(category: string): Promise<Product[]> {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.products;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>; 
}) {
  const { category } = await params;

  const products = await getCategoryProducts(category);
  const formattedTitle = category.replace(/-/g, ' '); 

  if (!products || products.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        <h2>No products found for "{formattedTitle}"</h2>
      </div>
      
    );
  }

  return (
    <CategoryBlock
      title={formattedTitle}
      bg="bg-[#F9F4F8]"
      color="text-[#4A154B]"
      products={products}
    />
  );
}
