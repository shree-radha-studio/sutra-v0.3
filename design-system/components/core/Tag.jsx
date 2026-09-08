import React from 'react';
import { Icon } from './Icon.jsx';
/** Filter / selection chip. Removable (onRemove) or toggleable (selected + onClick). */
export function Tag({ children, selected = false, icon, onRemove, onClick, colour, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span role={onClick ? 'button' : undefined} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 'var(--r-pill)', background: selected ? 'var(--accent)' : hover && onClick ? 'var(--surface-card-hover)' : 'var(--surface-card)', color: selected ? 'var(--accent-on)' : 'var(--text-primary)', border: '1px solid ' + (selected ? 'transparent' : 'var(--border-default)'), font: 'var(--text-small)', fontWeight: 500, cursor: onClick ? 'pointer' : 'default', whiteSpace: 'nowrap', transition: 'background var(--dur-fast)', ...style }}>
      {colour && <span style={{ width: 10, height: 10, borderRadius: 5, background: colour, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.12)' }} />}
      {icon && <Icon name={icon} size={13} />}
      {children}
      {onRemove && <span onClick={e => { e.stopPropagation(); onRemove(); }} style={{ display: 'inline-flex', marginRight: -4, opacity: .7, cursor: 'pointer' }}><Icon name="x" size={13} /></span>}
    </span>
  );
}
