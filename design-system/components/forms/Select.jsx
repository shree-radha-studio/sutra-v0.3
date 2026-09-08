import React from 'react';
import { Icon } from '../core/Icon.jsx';
const base = (focus, invalid) => ({ display: 'flex', alignItems: 'center', gap: 10, height: 'var(--control-h-md)', padding: '0 14px', borderRadius: 'var(--r-control)', background: 'var(--surface-card)', border: '1px solid ' + (invalid ? 'var(--danger-500)' : focus ? 'var(--brand-500)' : 'var(--border-default)'), boxShadow: focus ? '0 0 0 3px ' + (invalid ? 'var(--danger-100)' : 'var(--brand-100)') : 'none', transition: 'box-shadow var(--dur-fast), border-color var(--dur-fast)' });
const Label = ({ children, hint }) => children ? <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ font: 'var(--text-label)', fontSize: 12, color: 'var(--text-secondary)' }}>{children}</span>{hint && <span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{hint}</span>}</div> : null;
/** Native select styled as a Sutra field. */
export function Select({ label, hint, options = [], invalid = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block', ...style }}>
      <Label hint={hint}>{label}</Label>
      <span style={{ ...base(focus, invalid), paddingRight: 10 }}>
        <select onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ flex: 1, border: 0, outline: 0, background: 'transparent', font: 'var(--text-body)', color: 'var(--text-primary)', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }} {...rest}>
          {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <Icon name="chevron-down" size={16} style={{ color: 'var(--text-muted)' }} />
      </span>
    </label>
  );
}
