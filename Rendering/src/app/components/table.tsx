'use client';

import { DataRow } from '@/src/util/types';
import { useEffect, useState } from 'react';
import {
  tableHeaderStyle,
  tableCellStyle,
  inputStyle,
  buttonStyle,
  tableWrapperStyle,
} from '@/src/util/styles';
import Link from 'next/link';

export default function DataTablePage() {
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [newRow, setNewRow] = useState({ name: '', team: '', goals: '', age: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const isFirstLoad = sessionStorage.getItem('loaded') === null;

  if (isFirstLoad) {
    localStorage.removeItem('playerData');
    sessionStorage.setItem('loaded', 'true');
  }
    const loadData = async () => {
      const local = localStorage.getItem('playerData');
      if (local) {
        const parsed = JSON.parse(local);
        setData(parsed);
        setFilteredData(parsed);
      } else {
        const res = await fetch('https://mocki.io/v1/1f03ff36-50d6-4a61-9cf2-e9792fb07ae8');
        const json = await res.json();
        const formatted = json.map((user: any, index: number) => ({
          id: user.id ?? index + 1,
          name: user.name,
          team: user.team,
          goals: user.goals,
          age: user.age,
          deleted: false,
        }));
        setData(formatted);
        setFilteredData(formatted);
        localStorage.setItem('playerData', JSON.stringify(formatted));
      }
    };
    loadData();
  }, []);

  const handleAdd = () => {
    if (!newRow.name || !newRow.team || !newRow.goals || !newRow.age) return;
    const id = data.length > 0 ? Math.max(...data.map((row) => row.id ?? 0)) + 1 : 1;
    const newEntry = {
      id,
      name: newRow.name,
      team: newRow.team,
      goals: Number(newRow.goals),
      age: Number(newRow.age),
      deleted: false,
    };
    const updated = [...data, newEntry];
    setData(updated);
    setFilteredData(updated);
    setNewRow({ name: '', team: '', goals: '', age: '' });
    localStorage.setItem('playerData', JSON.stringify(updated));
  };

  const handleSearch = (query: string) => {
  setSearchQuery(query);
  const lowerQuery = query.toLowerCase();
  const filtered = data.filter(
    (row) =>
      !row.deleted &&
      (
        row.name.toLowerCase().includes(lowerQuery) ||
        row.team.toLowerCase().includes(lowerQuery) ||
        row.goals.toString().includes(lowerQuery) ||
        row.age.toString().includes(lowerQuery)
      )
  );
  setFilteredData(filtered);
};

  const handleDelete = (id: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
  if (confirmDelete) {
    const updated = data.map((row) =>
      row.id === id ? { ...row, deleted: true } : row
    );
    setData(updated);
    setFilteredData(updated.filter((row) => !row.deleted));
    localStorage.setItem('playerData', JSON.stringify(updated));
  }
};

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Football Players</h1>

      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by name, team, goals, or age"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}/>
      </div>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Name"
          value={newRow.name}
          onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          style={inputStyle}/>
        <input
          type="text"
          placeholder="Team"
          value={newRow.team}
          onChange={(e) => setNewRow({ ...newRow, team: e.target.value })}
          style={inputStyle}/>
        <input
          type="text"
          placeholder="Goals"
          value={newRow.goals}
          onChange={(e) => setNewRow({ ...newRow, goals: e.target.value })}
          style={inputStyle}/>
        <input
          type="text"
          placeholder="Age"
          value={newRow.age}
          onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
          style={inputStyle}/>
        <button onClick={handleAdd} style={buttonStyle}>Add</button>
      </div>

      <table style={tableWrapperStyle}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Team</th>
            <th style={tableHeaderStyle}>Goals</th>
            <th style={tableHeaderStyle}>Age</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr key={row.id}>
                <td style={tableCellStyle}>{row.id}</td>
                <td style={tableCellStyle}>{row.name}</td>
                <td style={tableCellStyle}>{row.team}</td>
                <td style={tableCellStyle}>{row.goals}</td>
                <td style={tableCellStyle}>{row.age}</td>
                <td style={tableCellStyle}>
                  <Link href={`/edit/${row.id}`}>
                    <button style={{ marginRight: '0.5rem', cursor: 'pointer' }}>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(row.id)}
                    style={{ color: 'red', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '1rem' }}>
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
