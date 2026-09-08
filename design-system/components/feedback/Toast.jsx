import React from 'react';
import { Icon } from '../core/Icon.jsx';
const T = { ok: ['check-circle-2', 'var(--ok-500)'], warn: ['alert-triangle', 'var(--warn-500)'], danger: ['x-circle', 'var(--danger-500)'], info: ['info', 'var(--info-500)'], neutral: ['bell', 'var(--gold-500)'] };
/** Espresso toast with a tone dot-icon. Scan feedback uses ok/danger loudly. */
export function Toast({ tone = 'neutral', title, message, action, onAction, onClose, style }) {
  const [icon, c] = T[tone] || T.neutral;
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minWidth: 280, maxWidth: 420, padding: '12px 14px', borderRadius: 'var(--r-md)', background: 'var(--surface-inverse)', color: 'var(--text-inverse)', boxShadow: 'var(--shadow-float)', animation: 'var(--rise-in)', ...style }}>
      <Icon name={icon} size={18} style={{ color: c, marginTop: 1 }} />
      <div style={{ flex: 1 }}>
        {title && <div style={{ font: 'var(--text-label)', fontSize: 13, marginBottom: message ? 4 : 0 }}>{title}</div>}
        {message && <div style={{ font: 'var(--text-small)', opacity: .8 }}>{message}</div>}
      </div>
      {action && <button type="button" onClick={onAction} style={{ border: 0, background: 'transparent', color: 'var(--gold-400)', font: 'var(--text-label)', fontSize: 12.5, cursor: 'pointer', padding: '2px 4px' }}>{action}</button>}
      {onClose && <button type="button" onClick={onClose} aria-label="Dismiss" style={{ border: 0, background: 'transparent', color: 'inherit', opacity: .6, cursor: 'pointer', padding: 0, display: 'grid' }}><Icon name="x" size={15} /></button>}
    </div>
  );
}
