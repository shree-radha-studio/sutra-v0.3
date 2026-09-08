import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** 20px rounded box, maroon when checked. */
export function Checkbox({ label, checked = false, onChange, disabled, indeterminate = false, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, font: 'var(--text-body)', ...style }}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={e => onChange && onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 20, height: 20, borderRadius: 6, display: 'grid', placeItems: 'center', background: checked || indeterminate ? 'var(--accent)' : 'var(--surface-card)', border: '1.5px solid ' + (checked || indeterminate ? 'var(--accent)' : 'var(--border-strong)'), color: 'var(--accent-on)', transition: 'background var(--dur-fast)' }}>
        {indeterminate ? <span style={{ width: 10, height: 2, background: 'currentColor', borderRadius: 1 }} /> : checked ? <Icon name="check" size={14} strokeWidth={2.4} /> : null}
      </span>
      {label}
    </label>
  );
}
