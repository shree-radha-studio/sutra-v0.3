import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** Qty stepper (− n +). The floor's most-tapped control — 44px targets on phone. */
export function Stepper({ value = 0, onChange, min = 0, max = Infinity, size = 'md', style }) {
  const s = size === 'lg' ? 44 : size === 'sm' ? 28 : 36;
  const btn = (dis) => ({ width: s, height: s, borderRadius: '50%', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: dis ? 'var(--text-muted)' : 'var(--text-primary)', display: 'grid', placeItems: 'center', cursor: dis ? 'not-allowed' : 'pointer', opacity: dis ? .5 : 1 });
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size === 'sm' ? 6 : 10, ...style }}>
      <button type="button" aria-label="Decrease" disabled={value <= min} onClick={() => onChange && onChange(Math.max(min, value - 1))} style={btn(value <= min)}><Icon name="minus" size={s > 30 ? 16 : 13} /></button>
      <span style={{ minWidth: size === 'sm' ? 18 : 24, textAlign: 'center', font: 'var(--text-title)', fontSize: size === 'lg' ? 20 : size === 'sm' ? 13 : 16, fontFeatureSettings: 'var(--num)' }}>{value}</span>
      <button type="button" aria-label="Increase" disabled={value >= max} onClick={() => onChange && onChange(Math.min(max, value + 1))} style={btn(value >= max)}><Icon name="plus" size={s > 30 ? 16 : 13} /></button>
    </div>
  );
}
