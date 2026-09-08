import React from 'react';
/** Toggle. Maroon when on; espresso track off in dark mode. */
export function Switch({ checked = false, onChange, label, disabled, size = 'md', style }) {
  const w = size === 'sm' ? 34 : 44, h = size === 'sm' ? 20 : 26, k = h - 6;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, font: 'var(--text-body)', ...style }}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={e => onChange && onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: w, height: h, borderRadius: h / 2, background: checked ? 'var(--accent)' : 'var(--ink-200)', position: 'relative', transition: 'background var(--dur-base) var(--ease-out)' }}>
        <span style={{ position: 'absolute', top: 3, left: checked ? w - k - 3 : 3, width: k, height: k, borderRadius: k / 2, background: '#fff', boxShadow: '0 1px 3px rgba(36,23,18,.25)', transition: 'left var(--dur-base) var(--ease-out)' }} />
      </span>
      {label}
    </label>
  );
}
