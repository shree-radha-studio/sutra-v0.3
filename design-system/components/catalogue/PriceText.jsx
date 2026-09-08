import React from 'react';
/** Catalogue price. The leading digit is 5% larger so the eye rests on the 3 in 3999, not the 4000 the mind rounds to. */
export function PriceText({ value, size = 18, lead = true, currency = '₹', tbd = 'TBD', color = 'var(--text-price)', weight = 500, style }) {
  if (value == null || value === '') return <span style={{ font: 'var(--text-price)', fontSize: size, color: 'var(--text-muted)', fontWeight: weight, ...style }}>{tbd}</span>;
  const s = typeof value === 'number' ? value.toLocaleString('en-IN') : String(value);
  const m = s.match(/^(\d)(.*)$/);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: 'var(--font-display)', fontWeight: weight, fontSize: size, lineHeight: 1, color, whiteSpace: 'nowrap', fontFeatureSettings: '"lnum" 1', ...style }}>
      {currency && <span style={{ fontSize: Math.round(size * .78), marginRight: Math.max(1, Math.round(size * .06)), color: 'var(--text-secondary)' }}>{currency}</span>}
      {lead && m ? <><span style={{ fontSize: Math.round(size * 1.05) }}>{m[1]}</span><span>{m[2]}</span></> : s}
    </span>
  );
}
