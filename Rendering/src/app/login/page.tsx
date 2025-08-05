'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'dhanush') {
      document.cookie = 'auth=true; path=/; max-age=3600';
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button
        onClick={handleLogin}
        style={{ cursor: "pointer", marginTop: "10px" }}
      >
        Login
      </button>
    </div>
  );
}
