import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** Centered sheet on a warm scrim. On phone, pass sheet to dock it to the bottom. */
export function Dialog({ open = true, title, eyebrow, children, actions, onClose, width = 480, sheet = false, style }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'var(--surface-overlay)', display: 'flex', alignItems: sheet ? 'flex-end' : 'center', justifyContent: 'center', padding: sheet ? 0 : 24, zIndex: 'var(--z-dialog)', animation: 'var(--fade-in)' }}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} style={{ width: sheet ? '100%' : '100%', maxWidth: sheet ? 'none' : width, background: 'var(--surface-card)', borderRadius: sheet ? 'var(--r-2xl) var(--r-2xl) 0 0' : 'var(--r-xl)', boxShadow: 'var(--shadow-float)', padding: 24, animation: 'var(--rise-in)', ...style }}>
        {sheet && <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-200)', margin: '-8px auto 16px' }} />}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            {eyebrow && <div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{eyebrow}</div>}
            {title && <div style={{ font: 'var(--text-h2)' }}>{title}</div>}
          </div>
          {onClose && <button type="button" onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, borderRadius: 16, border: 0, background: 'var(--bg-sunken)', color: 'var(--text-secondary)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="x" size={16} /></button>}
        </div>
        {children && <div style={{ marginTop: 16, font: 'var(--text-body)', color: 'var(--text-secondary)' }}>{children}</div>}
        {actions && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>{actions}</div>}
      </div>
    </div>
  );
}
