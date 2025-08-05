'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id: number, type: 'increment' | 'decrement') => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;
    const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fdf7fc] p-6 pt-27">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold text-[#5c2d6b] mb-4">🛒 Your Cart</h1>

          {cart.length === 0 ? (
            <p className="text-[#7a4a82]">Your cart is currently empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow border-l-4 border-[#b083c9] flex items-start gap-4 p-4"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="rounded-md object-cover"
                />
                <div className="flex-grow">
                  <h2 className="text-[#4b2a5b] font-semibold">{item.title}</h2>
                  <p className="text-[#7c6595]">${item.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, 'decrement')}
                      className="px-2 py-1 bg-[#d8c6ea] text-[#4b2a5b] rounded"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 bg-[#f1e7fa] rounded text-[#4b2a5b]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 'increment')}
                      className="px-2 py-1 bg-[#b083c9] text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="sticky top-6 bg-white shadow rounded-lg p-6 border border-[#e2d2ef] h-fit">
            <h2 className="text-xl font-semibold text-[#4a2d59] mb-4">Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-[#6e5481] mb-2">
                <span>{item.title.slice(0, 18)}...</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-4 border-[#d9c7e6]" />
            <div className="flex justify-between font-semibold text-[#4a2d59]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href={'/checkout'}>
            <button className="w-full mt-6 bg-[#a278b5] text-white py-2 rounded hover:bg-[#8e63a2] transition">
              Checkout
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
