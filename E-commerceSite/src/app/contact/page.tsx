'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for contacting us, we will reach out soon!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#fcefff] text-gray-800 px-4 py-16 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-[#a97ba5] mb-10">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="opacity-80">
              We're here to help! Reach out with any questions, feedback, or collaboration ideas.
            </p>
            <ul className="space-y-2 text-sm opacity-90">
              <li><strong>Email:</strong> support@zencart-store.com</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
              <li><strong>Hours:</strong> Mon-Fri 9:00 AM - 6:00 PM</li>
            </ul>
            <iframe
              title="Zencart Office"
              className="w-full h-64 rounded-xl shadow-md"
              loading="lazy"
              style={{ border: 0 }}
              src="https://www.google.com/maps?q=Chennai,Tamil+Nadu,India&output=embed"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
            <div>
              <label className="block font-medium mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="message">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#a97ba5] text-white py-2 px-4 rounded-md hover:bg-[#926b90] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
