import React from 'react'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-dark)',
    padding: '20px',
  } as React.CSSProperties,
  card: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
  } as React.CSSProperties,
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    marginBottom: '32px',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--text-secondary)',
  } as React.CSSProperties,
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
  } as React.CSSProperties,
  error: {
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: '#3a0d1b',
    color: '#ff8da4',
    fontSize: '13px',
    fontWeight: '600',
  } as React.CSSProperties,
  button: {
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: 'var(--accent-green)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  } as React.CSSProperties,
}

export default styles
