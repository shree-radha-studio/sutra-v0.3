import React from 'react';
import { Icon } from './Icon.jsx';
/** Module / node tabs. underline = the signature maroon rule; pill = segmented look. */
export function Tabs({ items = [], value, onChange, variant = 'underline', size = 'md', caps = true, style }) {
  const under = variant === 'underline';
  return (
    <div role="tablist" style={{ display: 'flex', alignItems: under ? 'flex-end' : 'center', gap: under ? 26 : 6, padding: under ? '0 4px' : 4, borderBottom: under ? '1px solid var(--border-subtle)' : 'none', background: under ? 'transparent' : 'var(--bg-sunken)', borderRadius: under ? 0 : 'var(--r-pill)', ...style }}>
      {items.map(it => {
        const active = it.key === value;
        return (
          <button key={it.key} role="tab" type="button" aria-selected={active} onClick={() => onChange && onChange(it.key)}
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, height: under ? (size === 'sm' ? 36 : 44) : (size === 'sm' ? 30 : 36), padding: under ? '0 2px' : '0 16px', border: 0, cursor: 'pointer', background: !under && active ? 'var(--surface-card)' : 'transparent', borderRadius: under ? 0 : 'var(--r-pill)', boxShadow: !under && active ? 'var(--shadow-1)' : 'none', color: active ? (under ? 'var(--text-brand)' : 'var(--text-primary)') : 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: size === 'sm' ? 12 : 13, letterSpacing: caps ? 'var(--tracking-wide)' : 0, textTransform: caps ? 'uppercase' : 'none', whiteSpace: 'nowrap', transition: 'color var(--dur-fast)' }}>
            {it.icon && <Icon name={it.icon} size={15} />}
            {it.label}
            {it.count != null && <span style={{ minWidth: 20, height: 18, padding: '0 6px', borderRadius: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: active ? 'var(--accent)' : 'var(--bg-sunken)', color: active ? 'var(--accent-on)' : 'var(--text-secondary)', fontSize: 10.5, fontFeatureSettings: 'var(--num)', letterSpacing: 0 }}>{it.count}</span>}
            {under && active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, borderRadius: 1, background: 'var(--accent)' }} />}
          </button>
        );
      })}
    </div>
  );
}
