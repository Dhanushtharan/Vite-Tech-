'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password, number, avatar }),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.success(data.error);
      return;
    }

    toast.success('Signup successful!');
    window.location.href='/';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f3edf7] to-[#e5d6ea] px-4"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#decbe4] p-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-[#4A154B] tracking-tight">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#4A154B] mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] bg-[#FAF8FB] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4A154B] mb-1">Username</label>
            <input
              type="text"
              placeholder="your username"
              className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] bg-[#FAF8FB] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4A154B] mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] bg-[#FAF8FB] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4A154B] mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] bg-[#FAF8FB] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B]"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4A154B] mb-1">Avatar URL (optional)</label>
            <input
              type="text"
              placeholder="https://example.com/avatar.png"
              className="w-full px-4 py-3 rounded-lg border border-[#CBB7D0] bg-[#FAF8FB] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] text-[#4A154B]"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#A97BA5] hover:bg-[#8E6796] text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-[#6D4B7E]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#8E6796] hover:underline font-medium">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
