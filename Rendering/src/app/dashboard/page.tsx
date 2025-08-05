'use client'

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'auth=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
      <button 
      onClick={handleLogout}
      style={{cursor: "pointer"}}
      >
        Logout</button>
    </div>
  );
}
