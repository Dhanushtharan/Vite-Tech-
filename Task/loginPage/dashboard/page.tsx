'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const res = await fetch('/api/check-auth');
  //     if (!res.ok) {
  //       router.replace('/login');
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  async function handleLogout() {
    const res = await fetch('/api/logout', {
      method: 'POST',
    });

    if(res.redirected) {
      router.push(res.url);
    } else {
      alert('Logout failed');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}
