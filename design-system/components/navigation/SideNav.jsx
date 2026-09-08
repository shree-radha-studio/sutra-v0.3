import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** Desktop left rail. Sand, no borders; active item = soft brand pill with a 3px maroon bar. */
export function SideNav({ items = [], value, onChange, collapsed = false, logoSrc, clientLogoSrc, user, footer, style }) {
  const w = collapsed ? 'var(--sidebar-w-rail)' : 'var(--sidebar-w)';
  return (
    <nav style={{ width: w, flex: 'none', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)', borderRight: '1px solid var(--border-subtle)', padding: collapsed ? '16px 10px' : '16px 12px', gap: 4, transition: 'width var(--dur-slow) var(--ease-out)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '4px 6px 18px' : '4px 8px 18px', minHeight: 52 }}>
        {logoSrc && <img src={logoSrc} alt="Sutra" style={{ height: 34 }} />}
        {!collapsed && clientLogoSrc && <><span style={{ width: 1, height: 26, background: 'var(--border-default)' }} /><img src={clientLogoSrc} alt="" style={{ height: 30 }} /></>}
      </div>
      {items.map(it => { if (it.section) return collapsed ? <div key={it.section} style={{ height: 1, background: 'var(--border-subtle)', margin: '8px 6px' }} /> : <div key={it.section} style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '14px 12px 6px' }}>{it.section}</div>;
        const a = it.key === value; return (
        <button key={it.key} type="button" title={it.label} onClick={() => onChange && onChange(it.key)} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, height: 40, padding: collapsed ? 0 : '0 12px', justifyContent: collapsed ? 'center' : 'flex-start', border: 0, borderRadius: 'var(--r-md)', background: a ? 'var(--accent-soft)' : 'transparent', color: a ? 'var(--text-brand)' : 'var(--text-secondary)', font: 'var(--text-body)', fontWeight: a ? 500 : 400, cursor: 'pointer', textAlign: 'left', width: '100%' }}>
          {a && <span style={{ position: 'absolute', left: collapsed ? 2 : -12, top: 10, bottom: 10, width: 3, borderRadius: 2, background: 'var(--accent)' }} />}
          <Icon name={it.icon || 'circle'} size={18} />
          {!collapsed && <span style={{ flex: 1 }}>{it.label}</span>}
          {!collapsed && it.count != null && <span style={{ font: 'var(--text-overline)', fontSize: 10.5, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, display: 'grid', placeItems: 'center', background: a ? 'var(--accent)' : 'var(--bg-sunken)', color: a ? 'var(--accent-on)' : 'var(--text-secondary)', fontFeatureSettings: 'var(--num)' }}>{it.count}</span>}
        </button>); })}
      <div style={{ flex: 1 }} />
      {footer}
      {user && <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '8px 0' : '8px 8px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <span style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--brand-700)', color: 'var(--sand-50)', display: 'grid', placeItems: 'center', font: 'var(--text-label)', fontSize: 12 }}>{(user.name || '?').split(' ').map(s => s[0]).join('').slice(0, 2)}</span>
        {!collapsed && <span style={{ minWidth: 0 }}><div style={{ font: 'var(--text-label)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div><div style={{ font: 'var(--text-overline)', letterSpacing: '.06em', color: 'var(--text-muted)', marginTop: 3, textTransform: 'uppercase' }}>{user.role}{user.firm ? ' · ' + user.firm : ''}</div></span>}
      </div>}
    </nav>
  );
}
