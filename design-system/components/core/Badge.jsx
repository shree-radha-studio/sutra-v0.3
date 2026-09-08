import React from 'react';
const T = {
  neutral: ['var(--bg-sunken)', 'var(--text-secondary)', 'var(--ink-500)'],
  brand: ['var(--accent-soft)', 'var(--text-brand)', 'var(--accent)'],
  gold: ['var(--gold-100)', 'var(--gold-700)', 'var(--gold-500)'],
  ok: ['var(--ok-100)', 'var(--ok-600)', 'var(--ok-500)'],
  warn: ['var(--warn-100)', 'var(--warn-600)', 'var(--warn-500)'],
  danger: ['var(--danger-100)', 'var(--danger-600)', 'var(--danger-500)'],
  info: ['var(--info-100)', 'var(--info-600)', 'var(--info-500)'],
};
/** Status pill — PLATINUM, OPEN, PACKED, -12d left. Caps, 10.5px. */
export function Badge({ tone = 'neutral', variant = 'soft', dot = false, size = 'sm', children, style }) {
  const [bg, fg, solid] = T[tone] || T.neutral;
  const isSolid = variant === 'solid';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: size === 'md' ? 24 : 20, padding: size === 'md' ? '0 10px' : '0 8px', borderRadius: 'var(--r-pill)', background: isSolid ? solid : variant === 'outline' ? 'transparent' : bg, color: isSolid ? '#fff' : fg, border: variant === 'outline' ? '1px solid ' + solid : '1px solid transparent', fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: size === 'md' ? 11.5 : 10.5, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1, fontFeatureSettings: 'var(--num)', ...style }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 3, background: isSolid ? 'rgba(255,255,255,.85)' : solid }} />}
      {children}
    </span>
  );
}
