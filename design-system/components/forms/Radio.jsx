import React from 'react';
/** Radio group — horizontal or stacked. */
export function Radio({ options = [], value, onChange, name, direction = 'row', style }) {
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: direction === 'column' ? 'column' : 'row', gap: direction === 'column' ? 10 : 18, ...style }}>
      {options.map(o => { const v = typeof o === 'string' ? o : o.value, l = typeof o === 'string' ? o : o.label, on = v === value; return (
        <label key={v} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', font: 'var(--text-body)' }}>
          <input type="radio" name={name} checked={on} onChange={() => onChange && onChange(v)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
          <span style={{ width: 20, height: 20, borderRadius: 10, display: 'grid', placeItems: 'center', border: '1.5px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'), background: 'var(--surface-card)', transition: 'border-color var(--dur-fast)' }}>{on && <span style={{ width: 10, height: 10, borderRadius: 5, background: 'var(--accent)' }} />}</span>
          {l}
        </label>); })}
    </div>
  );
}
