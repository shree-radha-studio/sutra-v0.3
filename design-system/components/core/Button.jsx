import React from 'react';
import { Icon } from './Icon.jsx';
const H = { sm: 'var(--control-h-sm)', md: 'var(--control-h-md)', lg: 'var(--control-h-lg)' };
const FS = { sm: '12.5px', md: '13.5px', lg: '15px' };
const PX = { sm: '12px', md: '18px', lg: '24px' };
const V = {
  primary: { background: 'var(--accent)', color: 'var(--accent-on)', border: '1px solid transparent' },
  secondary: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
  soft: { background: 'var(--accent-soft)', color: 'var(--text-brand)', border: '1px solid transparent' },
  ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent' },
  danger: { background: 'var(--danger-500)', color: '#fff', border: '1px solid transparent' },
  success: { background: 'var(--ok-500)', color: '#fff', border: '1px solid transparent' },
  inverse: { background: 'var(--surface-inverse)', color: 'var(--text-inverse)', border: '1px solid transparent' },
};
/** Pill button. Primary = brand maroon; use once per view. */
export function Button({ variant = 'primary', size = 'md', icon, iconRight, caps = false, block = false, loading = false, disabled = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = V[variant] || V.primary;
  return (
    <button type="button" disabled={disabled || loading}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }} onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ display: block ? 'flex' : 'inline-flex', width: block ? '100%' : undefined, alignItems: 'center', justifyContent: 'center', gap: 8, height: H[size], padding: '0 ' + PX[size], borderRadius: 'var(--r-pill)', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: FS[size], letterSpacing: caps ? 'var(--tracking-wide)' : '0.01em', textTransform: caps ? 'uppercase' : 'none', whiteSpace: 'nowrap', opacity: disabled ? 0.45 : 1, transition: 'transform var(--dur-fast) var(--ease-out), filter var(--dur-fast), box-shadow var(--dur-fast)', transform: press ? 'var(--press-scale)' : hover ? 'var(--hover-lift)' : 'none', filter: hover && !press ? 'brightness(1.04)' : 'none', boxShadow: hover && variant !== 'ghost' ? 'var(--shadow-2)' : 'none', ...v, ...style }} {...rest}>
      {loading ? <Icon name="loader-2" size={size === 'sm' ? 14 : 16} style={{ animation: 'spin 1s linear infinite' }} /> : icon ? <Icon name={icon} size={size === 'sm' ? 14 : 16} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={size === 'sm' ? 14 : 16} /> : null}
    </button>
  );
}
