'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getUnicornById, updateUnicorn, Unicorn } from '@/src/app/api/crud';

export default function EditUnicornPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Unicorn>({ name: '', age: 0 });

  useEffect(() => {
    const fetchData = async () => {
      if (!id || typeof id !== 'string') return;
      const unicorn = await getUnicornById(id);
      setForm({ name: unicorn.name, age: unicorn.age });
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof id === 'string') {
      await updateUnicorn(id, form);
      router.push('/crud');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Unicorn</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
          required
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem' }}>
          Update
        </button>
      </form>
    </div>
  );
}
