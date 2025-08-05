import CategoryBlock from "@/app/components/categoryBlock";

export default async function MenCategoryPage() {
  const shirtsRes = await fetch('https://dummyjson.com/products/category/mens-shirts');
  const watchesRes = await fetch('https://dummyjson.com/products/category/mens-watches');
  const shoesRes = await fetch('https://dummyjson.com/products/category/mens-shoes');

  const shirts = await shirtsRes.json();
  const watches = await watchesRes.json();
  const shoes = await shoesRes.json();      

  const products = [...shirts.products, ...watches.products, ...shoes.products];

  return <CategoryBlock title="Men's Collection" products={products} bg={"bg-[#F9F4F8]"} color={"text-[#4A154B]"} />;
}
