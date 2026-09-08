import React from 'react';
import { Icon } from '../core/Icon.jsx';
const base = (focus, invalid) => ({ display: 'flex', alignItems: 'center', gap: 10, height: 'var(--control-h-md)', padding: '0 14px', borderRadius: 'var(--r-control)', background: 'var(--surface-card)', border: '1px solid ' + (invalid ? 'var(--danger-500)' : focus ? 'var(--brand-500)' : 'var(--border-default)'), boxShadow: focus ? '0 0 0 3px ' + (invalid ? 'var(--danger-100)' : 'var(--brand-100)') : 'none', transition: 'box-shadow var(--dur-fast), border-color var(--dur-fast)' });
const Label = ({ children, hint }) => children ? <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ font: 'var(--text-label)', fontSize: 12, color: 'var(--text-secondary)' }}>{children}</span>{hint && <span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{hint}</span>}</div> : null;
/** Text field. Sand-white, 12px radius, maroon focus halo. */
export function Input({ label, hint, icon, suffix, invalid = false, error, style, inputStyle, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block', ...style }}>
      <Label hint={hint}>{label}</Label>
      <span style={base(focus, invalid)}>
        {icon && <Icon name={icon} size={16} style={{ color: 'var(--text-muted)' }} />}
        <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', font: 'var(--text-body)', color: 'var(--text-primary)', fontFeatureSettings: 'var(--num)', ...inputStyle }} {...rest} />
        {suffix && <span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{suffix}</span>}
      </span>
      {error && <div style={{ font: 'var(--text-small)', color: 'var(--danger-500)', marginTop: 6 }}>{error}</div>}
    </label>
  );
}
