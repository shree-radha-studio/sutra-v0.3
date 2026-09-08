const { SideNav, Tabs, Badge, IconButton, Icon } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
/** Page chrome: SideNav + sticky top row (module title · node tabs · live chip · theme · user). */
function Shell({ module, onModule, title, tabs, tab, onTab, dark, onDark, children, right }) {
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <SideNav value={module} onChange={onModule} items={D.nav} logoSrc={D.A + 'logo/sutra-mark-gold.png'} clientLogoSrc={D.A + 'clients/srs-logo.png'} user={{ name: 'Deepak Sharma', role: 'Dispatch mgr', firm: 'SRS' }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 'var(--topbar-h)', display: 'flex', alignItems: 'stretch', gap: 28, padding: '0 var(--gutter-desktop)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-page)', position: 'sticky', top: 0, zIndex: 'var(--z-sticky)' }}>
          <div style={{ display: 'flex', alignItems: 'center', font: 'var(--text-h2)', fontSize: 24, paddingRight: 4 }}>{title}</div>
          {tabs && <Tabs items={tabs} value={tab} onChange={onTab} style={{ borderBottom: 0, alignSelf: 'stretch' }} size="md" />}
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Badge tone="gold" dot>Live</Badge>
            <IconButton icon={dark ? 'sun' : 'moon'} variant="ghost" size="sm" label="Theme" onClick={onDark} />
            <IconButton icon="bell" variant="ghost" size="sm" label="Notifications" badge={3} />
            {right}
          </div>
        </header>
        <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>{children}</div>
      </div>
    </div>
  );
}
/** Reusable line row: thumb · code · colour dot + name · × qty · stock tick. Money never shown here. */
function LineRow({ line, compact = false, showRate = false }) {
  const [code, colour, qty, inStock] = line; const d = D.byCode[code];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? '6px 0' : '8px 0' }}>
      <window.SutraDesignSystem_58929b.Thumb src={d && d.src} code={code} colour={!d || !d.src ? D.cols[colour] : undefined} size={compact ? 36 : 44} ratio={1.15} />
      <span style={{ font: 'var(--text-code)', fontSize: 13.5 }}>{code}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--text-small)', color: 'var(--text-secondary)' }}><span style={{ width: 9, height: 9, borderRadius: 5, background: D.cols[colour], boxShadow: 'inset 0 0 0 1px rgba(36,23,18,.15)' }} />{colour}</span>
      <span style={{ flex: 1 }} />
      {showRate && d && <span style={{ font: 'var(--text-small)', color: 'var(--text-muted)', fontFeatureSettings: 'var(--num)' }}>× ₹{d.price ? d.price.toLocaleString('en-IN') : '—'}</span>}
      <span style={{ font: 'var(--text-label)', fontSize: 13, fontFeatureSettings: 'var(--num)' }}>× {qty}</span>
      <Icon name={inStock ? 'check-circle-2' : 'circle-dashed'} size={16} style={{ color: inStock ? 'var(--ok-500)' : 'var(--danger-500)' }} />
    </div>
  );
}
Object.assign(window, { Shell, LineRow });
