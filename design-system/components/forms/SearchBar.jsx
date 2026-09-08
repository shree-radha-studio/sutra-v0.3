import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** Wide pill search. Placeholder must name the fields it searches. */
export function SearchBar({ placeholder = 'Search design no, name or colour', value, onChange, onScan, size = 'md', style }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 52 : 44;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: h, padding: '0 8px 0 18px', borderRadius: 'var(--r-pill)', background: 'var(--surface-card)', border: '1px solid ' + (focus ? 'var(--brand-400)' : 'var(--border-default)'), boxShadow: focus ? '0 0 0 3px var(--brand-100)' : 'var(--shadow-1)', transition: 'box-shadow var(--dur-fast)', ...style }}>
      <Icon name="search" size={17} style={{ color: 'var(--text-muted)' }} />
      <input value={value} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', font: 'var(--text-body)', fontSize: 15, color: 'var(--text-primary)' }} />
      {onScan && <button type="button" onClick={onScan} aria-label="Scan barcode" style={{ width: h - 12, height: h - 12, borderRadius: '50%', border: 0, background: 'var(--accent)', color: 'var(--accent-on)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="scan-line" size={18} /></button>}
    </div>
  );
}
