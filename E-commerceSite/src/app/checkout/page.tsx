'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { clearCart } from '../redux/cartSlice';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRazorpay = () => {
    const options = {
      key: 'rzp_test_qeNM7IYuYt958F',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Demo Ecommerce',
      description: 'Test Order Payment',
      handler: async function (response: any) {
        await postOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      theme: {
        color: '#6B4C71',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const postOrder = async (paymentId: string) => {
    const orderData = {
      customer: {
        name: form.name,
        phone: form.phone,
        address: `${form.address}, ${form.city}, ${form.zip}`,
        paymentMethod: 'RAZORPAY',
        razorpayPaymentId: paymentId,
      },
      items: cart,
      totalAmount,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('https://688875f3adf0e59551ba09c8.mockapi.io/Orderdetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Order failed');

      localStorage.setItem('checkoutData', JSON.stringify(form));

      toast.success('Order placed successfully!');
      dispatch(clearCart());
      router.push('/checkout/confirmation');
    } catch (err) {
      console.error('Order submission failed:', err);
      toast.error('Order failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city || !form.zip) {
      toast.error('Please fill in all required fields.');
      return;
    }
    handleRazorpay();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 pt-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Billing Details</h2>

          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border text-gray-800 rounded-lg" />
          <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required pattern="[0-9]{10}" className="w-full px-4 py-2 border text-gray-800 rounded-lg" />
          <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} required className="w-full px-4 py-2 border text-gray-800 rounded-lg" />
          <div className="flex gap-4">
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required className="w-full px-4 py-2 border text-gray-800 rounded-lg" />
            <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} required className="w-full px-4 py-2 border text-gray-800 rounded-lg" />
          </div>

          <button type="submit" className="w-full bg-[#6B4C71] text-white py-3 rounded-lg hover:bg-[#5a3e61] transition">
            Pay ${totalAmount.toFixed(2)} with Razorpay
          </button>
        </form>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-gray-800">
                    <Image src={item.thumbnail} alt={item.title} width={60} height={60} className="rounded" />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
