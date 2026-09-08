import React from 'react';
import { Icon } from './Icon.jsx';
/** Compact icon/label switch (grid ⇄ list, density). */
export function SegmentedControl({ options = [], value, onChange, size = 'md', style }) {
  const h = size === 'sm' ? 30 : 36;
  return (
    <div style={{ display: 'inline-flex', padding: 3, gap: 2, background: 'var(--bg-sunken)', borderRadius: 'var(--r-pill)', ...style }}>
      {options.map(o => { const a = o.value === value; return (
        <button key={o.value} type="button" onClick={() => onChange && onChange(o.value)} title={o.label} aria-pressed={a}
          style={{ height: h - 6, minWidth: h - 6, padding: o.label && !o.icon ? '0 12px' : '0 9px', display: 'inline-flex', alignItems: 'center', gap: 6, border: 0, borderRadius: 'var(--r-pill)', cursor: 'pointer', background: a ? 'var(--surface-card)' : 'transparent', color: a ? 'var(--text-brand)' : 'var(--text-secondary)', boxShadow: a ? 'var(--shadow-1)' : 'none', font: 'var(--text-small)', fontWeight: 500, transition: 'background var(--dur-fast)' }}>
          {o.icon && <Icon name={o.icon} size={15} />}{o.icon ? null : o.label}
        </button>); })}
    </div>
  );
}
