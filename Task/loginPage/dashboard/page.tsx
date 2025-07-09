'use client';

// import { useEffect } from 'react';
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

   const handleLogout = () => {
    
    document.cookie = 'auth=; path=/; max-age=0';

    router.push('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}
