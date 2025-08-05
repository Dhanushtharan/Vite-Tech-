'use client';

import { useEffect, useState } from 'react';

interface CheckoutData {
  name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  razorpayReceiptId?: string;
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<CheckoutData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('checkoutData');
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!order) {
    return <p className="text-center text-gray-700 mt-10">Loading order details...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you for your order!</h1>
        <p className="text-gray-700 mb-6">Here are your order details:</p>

        <div className="text-left space-y-3 text-gray-800 font-medium">
          <p><span className="font-bold">Name:</span> {order.name}</p>
          <p><span className="font-bold">Phone:</span> {order.phone}</p>
          <p><span className="font-bold">Address:</span> {order.address}, {order.city}, {order.zip}</p>
          {order.razorpayReceiptId && (
          <p><span className="font-bold">Receipt:</span> {order.razorpayReceiptId}</p>
        )}
        </div>

        <p className="mt-8 text-green-600 font-semibold text-lg">Your order will be processed shortly.</p>
      </div>
    </div>
  );
}
