import React from 'react';
/** Label-over-number metric tile. Big number in Jost tabular; optional tone + sub note. */
export function StatTile({ label, value, sub, tone, compact = false, style }) {
  const c = tone === 'danger' ? 'var(--danger-500)' : tone === 'ok' ? 'var(--ok-500)' : tone === 'warn' ? 'var(--warn-500)' : tone === 'brand' ? 'var(--text-brand)' : 'var(--text-primary)';
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: compact ? '10px 12px' : '14px 16px', minWidth: compact ? 96 : 140, ...style }}>
      <div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ font: 'var(--text-metric)', fontSize: compact ? 18 : 24, color: c, marginTop: compact ? 6 : 10, fontFeatureSettings: 'var(--num)' }}>{value}</div>
      {sub && <div style={{ font: 'var(--text-small)', color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
