import React from 'react';
/** Lucide glyph (1.6px stroke). Needs window.lucide (UMD) loaded; falls back to a ring. */
export function Icon({ name = 'circle', size = 18, strokeWidth = 1.6, style, ...rest }) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  const key = String(name).split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  let node = lib && lib[key];
  // lucide UMD ships either [[tag, attrs], …] or ['svg', attrs, [[tag, attrs], …]] depending on version
  if (node && typeof node[0] === 'string') node = node[2];
  const kids = Array.isArray(node) ? node.filter(n => Array.isArray(n) && typeof n[0] === 'string') : null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', display: 'inline-block', ...style }} {...rest}>
      {kids && kids.length ? kids.map((n, i) => React.createElement(n[0], { ...(n[1] || {}), key: i })) : <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
