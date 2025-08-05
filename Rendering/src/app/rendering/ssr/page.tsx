import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

async function getUsers(): Promise<User[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }

    const data = await res.json();

    console.log('Fetched users data:', data);

    return data;
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <main style={{ padding: 20 }}>
            <h1>Users List (App Router SSR)</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <b>{user.name}</b> — {user.email}
                    </li>
                ))}
            </ul>
        </main>
    );
}
