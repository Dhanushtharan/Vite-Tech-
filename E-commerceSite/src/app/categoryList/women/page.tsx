import CategoryBlock from "@/app/components/categoryBlock";

export default async function MenCategoryPage() {
  const dressesRes = await fetch('https://dummyjson.com/products/category/womens-dresses');
  const beautyRes = await fetch('https://dummyjson.com/products/category/beauty');
  const watchesRes = await fetch('https://dummyjson.com/products/category/womens-watches');
  const topsRes = await fetch('https://dummyjson.com/products/category/tops');

  const dresses = await dressesRes.json();
  const beauty = await beautyRes.json();
  const watches = await watchesRes.json();
  const tops = await topsRes.json();      

  const products = [...dresses.products,...tops.products, ...beauty.products,  ...watches.products];

  return <CategoryBlock title="Women's Collection" products={products} bg={"bg-[#F9F4F8]"} color={"text-[#4A154B]"} />;
}
