import React from 'react';
import { Icon } from './Icon.jsx';
const S = { sm: 32, md: 40, lg: 48 };
const V = {
  soft: { background: 'var(--bg-raised)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' },
  card: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-1)' },
  brand: { background: 'var(--accent)', color: 'var(--accent-on)', border: '1px solid transparent' },
  ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent' },
  glass: { background: 'var(--surface-glass)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,.5)', backdropFilter: 'var(--blur-glass)' },
};
/** Round icon-only button. */
export function IconButton({ icon = 'circle', size = 'md', variant = 'soft', label, active = false, badge, disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const px = S[size] || S.md;
  const v = active ? V.brand : (V[variant] || V.soft);
  return (
    <button type="button" aria-label={label || icon} title={label} disabled={disabled} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', width: px, height: px, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .45 : 1, transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast)', transform: hover ? 'var(--hover-lift)' : 'none', ...v, ...style }} {...rest}>
      <Icon name={icon} size={size === 'sm' ? 15 : size === 'lg' ? 20 : 17} />
      {badge != null && <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: 'var(--gold-500)', color: '#fff', font: 'var(--text-overline)', fontSize: 10.5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFeatureSettings: 'var(--num)' }}>{badge}</span>}
    </button>
  );
}
