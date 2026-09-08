import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** Phone module bar. Floating glass pill; active module = maroon capsule. */
export function BottomBar({ items = [], value, onChange, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 'var(--bottombar-h)', padding: '0 6px', borderRadius: 'var(--r-xl)', background: 'var(--surface-glass)', backdropFilter: 'var(--blur-glass)', border: '1px solid rgba(255,255,255,.55)', boxShadow: 'var(--shadow-3)', ...style }}>
      {items.map(it => { const a = it.key === value; return (
        <button key={it.key} type="button" onClick={() => onChange && onChange(it.key)} style={{ position: 'relative', flex: 1, height: 52, border: 0, borderRadius: 'var(--r-lg)', background: a ? 'var(--accent)' : 'transparent', color: a ? 'var(--accent-on)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', transition: 'background var(--dur-base) var(--ease-out)' }}>
          <Icon name={it.icon || 'circle'} size={20} />
          <span style={{ font: 'var(--text-overline)', fontSize: 10.5, letterSpacing: '.02em' }}>{it.label}</span>
          {it.count != null && <span style={{ position: 'absolute', top: 6, right: '22%', minWidth: 16, height: 16, borderRadius: 8, background: 'var(--gold-500)', color: '#fff', fontSize: 9.5, display: 'grid', placeItems: 'center', padding: '0 4px', fontFeatureSettings: 'var(--num)' }}>{it.count}</span>}
        </button>); })}
    </div>
  );
}
