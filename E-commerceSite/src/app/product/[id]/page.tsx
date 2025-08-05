'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
  const res = await fetch('/api/me');
  const data = await res.json();

  if (!data.loggedIn) {
    router.push(`/login?redirect=/products/${id}`);
    return;
  }

  dispatch(addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    quantity: 1,
  }));

  toast.success('Added to cart !');
};


  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="pt-24 bg-[#f3f0f8] min-h-screen text-[#2c1f3e]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow-lg">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className="rounded object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-1">${product.price}</p>
          <p className="text-sm text-green-700 mb-1">Discount: {product.discountPercentage}%</p>
          <p className="text-sm mb-1">Category: {product.category}</p>
          <p className="text-sm mb-1">Brand: {product.brand}</p>
          <p className="text-sm mb-1">SKU: {product.sku}</p>
          <p className="text-sm mb-1">Stock: {product.stock}</p>
          <p className="text-sm mb-1">Min Order: {product.minimumOrderQuantity}</p>
          <p className="text-sm mb-1">Warranty: {product.warrantyInformation}</p>
          <p className="text-sm mb-1">Shipping: {product.shippingInformation}</p>
          <p className="text-sm mb-1">Availability: {product.availabilityStatus}</p>
          <p className="text-sm mb-1">
            Dimensions: {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} cm
          </p>
          <p className="text-sm mb-1">Weight: {product.weight}g</p>
          <p className="text-sm mb-3">Tags: {product.tags?.join(', ')}</p>

          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-2 bg-[#7e5aa2] hover:bg-[#68428d] text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {product.images?.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.images.map((img: string, i: number) => (
            <Image
              key={i}
              src={img}
              alt={`product-image-${i}`}
              width={300}
              height={300}
              className="rounded shadow object-cover"
            />
          ))}
        </div>
      )}

      <div className="mt-10 bg-white p-6 rounded shadow-md max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review: any, index: number) => (
            <div key={index} className="mb-4 border-b pb-2">
              <p className="font-semibold">
                {review.reviewerName} ({review.reviewerEmail})
              </p>
              <p className="text-sm text-gray-600">{review.date.split('T')[0]}</p>
              <p>⭐ {review.rating} - {review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}
