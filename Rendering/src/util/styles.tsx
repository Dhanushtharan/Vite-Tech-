import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  padding: '24px',
  fontFamily: 'Segoe UI, Arial, sans-serif',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#fff',
};

export const headingStyle: CSSProperties = {
  fontSize: '28px',
  fontWeight: 600,
  marginBottom: '24px',
  textAlign: 'center',
};

export const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '24px',
};

export const inputStyle: CSSProperties = {
  padding: '0.6rem 0.8rem',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  fontSize: '16px',
  outline: 'none',
};

export const buttonStyle: CSSProperties = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 500,
  transition: 'background 0.2s ease',
};

export const buttonDangerStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#dc2626',
};

export const buttonDisabledStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#9ca3af',
  cursor: 'not-allowed',
};

export const tableWrapperStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

export const tableHeaderStyle: CSSProperties = {
  padding: '1rem',
  textAlign: 'left',
  backgroundColor: '#f9fafb',
  fontWeight: 600,
  fontSize: '15px',
  borderBottom: '2px solid #e5e7eb',
};

export const tableCellStyle: CSSProperties = {
  padding: '0.9rem 1rem',
  borderBottom: '1px solid #f1f5f9',
  fontSize: '15px',
};

export const actionsStyle: CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
};
