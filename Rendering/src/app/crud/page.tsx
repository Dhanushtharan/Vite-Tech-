'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUnicorns, deleteUnicorn, Unicorn } from '@/src/app/api/crud';

export default function CrudPage() {
  const [unicorns, setUnicorns] = useState<Unicorn[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUnicorns();
      setUnicorns(data);
    };
    fetchData();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this unicorn?');
    if (!confirmed) return;
    await deleteUnicorn(id);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User List</h1>
        <Link href="/crud/add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            + Add User
          </button>
        </Link>
      </div>

      {unicorns.length === 0 ? (
        <p className="text-gray-500">No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Age</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {unicorns.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{u.name}</td>
                  <td className="px-4 py-2 border-b">{u.age}</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <Link href={`/crud/edit/${u.id}`}>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(u.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
