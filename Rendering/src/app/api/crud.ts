const API_URL = 'https://68875ab7071f195ca980641c.mockapi.io/api/user/users';

export interface Unicorn {
  id?: string;
  name: string;
  age: number;
}

export const getUnicorns = async (): Promise<Unicorn[]> => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const getUnicornById = async (id: string): Promise<Unicorn> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Unicorn not found');
  return await res.json();
};

export const createUnicorn = async (unicorn: Omit<Unicorn, 'id'>) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(unicorn),
  });
};

export const updateUnicorn = async (id: string, unicorn: Omit<Unicorn, 'id'>) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(unicorn),
  });
};

export const deleteUnicorn = async (id: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
