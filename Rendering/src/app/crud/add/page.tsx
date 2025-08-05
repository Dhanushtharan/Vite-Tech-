'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUnicorn } from '@/src/app/api/crud';

export default function AddUnicornPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', age: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUnicorn(form);
    router.push('/crud');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add New Unicorn</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem' }}>
          Create
        </button>
      </form>
    </div>
  );
}
