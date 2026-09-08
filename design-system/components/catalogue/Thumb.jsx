import React from 'react';
/** Photo-first identifier. Shows the picture; when none, the design code on the sand backdrop. Never an empty box. */
export function Thumb({ src, code, size = 56, ratio = 1, radius = 'var(--r-sm)', colour, style }) {
  const w = typeof size === 'number' ? size : undefined, h = typeof size === 'number' ? Math.round(size * ratio) : undefined;
  return (
    <div style={{ position: 'relative', width: w, height: h, flex: 'none', borderRadius: radius, overflow: 'hidden', background: colour || 'var(--photo-backdrop)', display: 'grid', placeItems: 'center', ...style }}>
      {src ? <img src={src} alt={code || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ font: 'var(--text-code)', fontSize: Math.max(9, Math.min(14, (w || 56) / 4.6)), color: colour ? 'rgba(255,255,255,.9)' : 'var(--text-muted)', textShadow: colour ? '0 1px 2px rgba(0,0,0,.25)' : 'none' }}>{code}</span>}
    </div>
  );
}
