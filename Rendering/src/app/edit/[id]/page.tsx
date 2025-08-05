'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPlayerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    team: '',
    goals: '',
    age: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('playerData');
    if (stored) {
      const players = JSON.parse(stored);
      const player = players.find((p: any) => p.id === parseInt(id as string));
      if (player) setFormData(player);
    }
  }, [id]);

  const handleSubmit = () => {
    const stored = localStorage.getItem('playerData');
    if (stored) {
      const players = JSON.parse(stored);
      const updated = players.map((p: any) =>
        p.id === parseInt(id as string) ? { ...p, ...formData } : p
      );
      localStorage.setItem('playerData', JSON.stringify(updated));
      router.push('/dataFetching');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Player</h2>
      <input
        type="text"
        value={formData.name}
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        value={formData.team}
        placeholder="Team"
        onChange={(e) => setFormData({ ...formData, team: e.target.value })}
      />
      <input
        type="text"
        value={formData.goals}
        placeholder="Goals"
        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
      />
      <input
        type="text"
        value={formData.age}
        placeholder="Age"
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />
      <button onClick={handleSubmit} 
      style={{cursor:"pointer"}}>
      Update
      </button>
    </div>
  );
}
    