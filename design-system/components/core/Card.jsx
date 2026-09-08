import React from 'react';
/** Sand-white surface. ring = priority/customer colour outline. */
export function Card({ children, padding = 'var(--card-pad)', ring, bar, hoverable = false, selected = false, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', background: hover && hoverable ? 'var(--surface-card-hover)' : 'var(--surface-card)', borderRadius: 'var(--r-card)', padding, boxShadow: selected ? '0 0 0 2px var(--accent), var(--shadow-2)' : hover && hoverable ? 'var(--shadow-2)' : 'var(--shadow-1)', border: ring ? '2px solid ' + ring : '1px solid var(--border-subtle)', overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)', transform: hover && hoverable ? 'var(--hover-lift)' : 'none', ...style }}>
      {bar && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: bar }} />}
      {children}
    </div>
  );
}
