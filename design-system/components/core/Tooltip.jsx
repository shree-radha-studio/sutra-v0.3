import React from 'react';
/** Hover label. Espresso bubble, 8px rise. */
export function Tooltip({ label, children, side = 'top' }) {
  const [on, setOn] = React.useState(false);
  const pos = side === 'bottom' ? { top: 'calc(100% + 8px)' } : { bottom: 'calc(100% + 8px)' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      {children}
      {on && <span role="tooltip" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', ...pos, background: 'var(--surface-inverse)', color: 'var(--text-inverse)', padding: '6px 10px', borderRadius: 'var(--r-sm)', font: 'var(--text-small)', whiteSpace: 'nowrap', boxShadow: 'var(--shadow-3)', zIndex: 'var(--z-float)', animation: 'var(--fade-in)' }}>{label}</span>}
    </span>
  );
}
