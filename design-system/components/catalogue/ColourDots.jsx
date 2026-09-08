import React from 'react';
/** Colour variants of a design as small swatches; active = ring. */
export function ColourDots({ colours = [], active, onSelect, size = 16, max = 6, style }) {
  const shown = colours.slice(0, max), more = colours.length - shown.length;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(size * .4), ...style }}>
      {shown.map(c => { const on = c.name === active; return (
        <button key={c.name} type="button" title={c.name} aria-label={c.name} onClick={() => onSelect && onSelect(c.name)}
          style={{ width: size, height: size, borderRadius: '50%', background: c.hex, border: 0, padding: 0, cursor: onSelect ? 'pointer' : 'default', boxShadow: on ? '0 0 0 2px var(--surface-card), 0 0 0 3.5px var(--accent)' : 'inset 0 0 0 1px rgba(36,23,18,.15)', transition: 'box-shadow var(--dur-fast)' }} />); })}
      {more > 0 && <span style={{ font: 'var(--text-overline)', color: 'var(--text-muted)', marginLeft: 2 }}>+{more}</span>}
    </div>
  );
}
