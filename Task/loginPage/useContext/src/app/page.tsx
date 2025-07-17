'use client';

import React from 'react';
import { ThemeProvider } from './themeContext';
import { Themes } from './themes';

export default function HomePage() {
  return (
    <ThemeProvider>
      <main style={{ padding: '2rem' }}>
        <h1>useContext Hook</h1>
        <Themes />
      </main>
    </ThemeProvider>
  );
}
