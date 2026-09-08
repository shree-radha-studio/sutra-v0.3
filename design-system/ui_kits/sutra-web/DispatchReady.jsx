const { Card, Badge, Button, IconButton, Tag, SearchBar, Icon } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const pcs = c => c.orders.reduce((s, o) => s + o.lines.reduce((t, l) => t + l[2], 0), 0);
const packable = c => c.orders.reduce((s, o) => s + o.lines.filter(l => l[3]).reduce((t, l) => t + l[2], 0), 0);
function CallChip({ children }) { return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 'var(--r-pill)', background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', font: 'var(--text-small)', color: 'var(--text-secondary)', cursor: 'pointer' }}>{children}<Icon name="phone" size={12} style={{ color: 'var(--text-brand)' }} /></span>; }
function CustomerCard({ c, onPack }) {
  const total = pcs(c), ok = packable(c);
  return (
    <Card ring={'var(--p' + c.priority + ')'} padding={0} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 18px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ font: 'var(--text-title)', fontSize: 17, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span><Badge tone={c.tier === 'Platinum' ? 'ok' : c.tier === 'Gold' ? 'gold' : 'neutral'}>{c.tier}</Badge></div>
        <div style={{ font: 'var(--text-small)', color: 'var(--text-muted)', marginTop: 2 }}>{c.market ? c.market + ' · ' : ''}<b style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{c.city}</b></div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}><CallChip>{c.phone}</CallChip><CallChip>{c.transport}</CallChip><CallChip>{c.broker}</CallChip></div>
      </div>
      {c.orders.map(o => <div key={o.no} style={{ margin: '0 12px 10px', padding: '10px 12px', background: 'var(--bg-raised)', borderRadius: 'var(--r-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ font: 'var(--text-code)', fontSize: 13 }}>{o.no}</span><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{o.date}</span><Badge tone={o.due <= 2 ? 'danger' : 'neutral'}>{o.due < 0 ? o.due + 'd' : o.due + 'd left'}</Badge><span style={{ flex: 1 }} /><span style={{ width: 10, height: 10, borderRadius: 5, background: 'var(--p' + c.priority + ')' }} title={'P' + c.priority} /></div>
        {o.note && <div style={{ font: 'var(--text-small)', color: 'var(--warn-600)', background: 'var(--warn-100)', padding: '4px 8px', borderRadius: 'var(--r-xs)', marginTop: 8 }}>Note: {o.note}</div>}
        <div style={{ marginTop: 4 }}>{o.lines.map((l, i) => <LineRow key={i} line={l} compact />)}</div>
      </div>)}
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 18px 16px', gap: 12 }}>
        <span style={{ font: 'var(--text-label)', fontSize: 13 }}>{total} pcs</span>{ok < total && <Badge tone="warn">{ok}/{total} in stock</Badge>}<span style={{ flex: 1 }} />
        <Button caps iconRight="chevron-right" onClick={() => onPack(c)}>Pack</Button>
      </div>
    </Card>
  );
}
function PendingPane({ open, onToggle }) {
  const [exp, setExp] = React.useState('c6');
  return (
    <aside style={{ width: open ? 'var(--pane-w)' : 48, flex: 'none', borderLeft: '1px solid var(--border-subtle)', background: 'var(--bg-raised)', display: 'flex', flexDirection: 'column', transition: 'width var(--dur-slow) var(--ease-out)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: open ? '14px 16px' : '14px 6px', justifyContent: open ? 'flex-start' : 'center' }}>
        {open && <><span style={{ font: 'var(--text-label)', fontSize: 12.5, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Pending orders</span><Badge tone="brand" variant="solid">42</Badge><span style={{ flex: 1 }} /></>}
        <IconButton icon={open ? 'panel-right-close' : 'panel-right-open'} variant="ghost" size="sm" onClick={onToggle} label="Toggle pane" />
      </div>
      {open && <div style={{ padding: '0 16px 16px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SearchBar placeholder="Customer or design no" style={{ height: 38, boxShadow: 'none' }} />
        {D.customers.map(c => { const o = exp === c.id; const t = pcs(c); const amt = c.orders.reduce((s, or) => s + or.lines.reduce((x, l) => x + l[2] * ((D.byCode[l[0]] || {}).price || 0), 0), 0); return (
          <Card key={c.id} padding={0} style={{ boxShadow: 'none' }}>
            <div onClick={() => setExp(o ? null : c.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', cursor: 'pointer' }}>
              <span style={{ flex: 1 }}><div style={{ font: 'var(--text-label)', fontSize: 13.5 }}>{c.name}</div><div style={{ font: 'var(--text-small)', color: 'var(--text-muted)', marginTop: 2 }}>{c.orders.length} order{c.orders.length > 1 ? 's' : ''} · {t} pcs</div></span>
              <Badge tone={Math.min(...c.orders.map(x => x.due)) < 0 ? 'danger' : 'neutral'}>{Math.min(...c.orders.map(x => x.due))}d</Badge><Icon name={o ? 'chevron-up' : 'chevron-down'} size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
            {o && <div style={{ padding: '0 12px 12px' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}><Badge tone="ok">{c.tier}</Badge><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{c.market || c.city}</span></div>
              {c.orders.map(or => <div key={or.no} style={{ padding: '8px 10px', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', marginTop: 6 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ font: 'var(--text-code)', fontSize: 12.5 }}>{or.no}</span><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{or.date}</span>{or.lines.some(l => !l[3]) && <Badge tone="danger">{or.lines.filter(l => !l[3]).length} short</Badge>}<span style={{ flex: 1 }} /><span style={{ font: 'var(--text-small)' }}>{or.lines.reduce((s, l) => s + l[2], 0)} pcs</span></div>
                {or.lines.map((l, i) => <LineRow key={i} line={l} compact showRate />)}
              </div>)}
              <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--text-small)', marginTop: 8, color: 'var(--text-secondary)' }}><span>Customer total</span><b style={{ fontWeight: 500, color: 'var(--text-primary)', fontFeatureSettings: 'var(--num)' }}>{t} pcs · ₹{amt.toLocaleString('en-IN')}</b></div>
            </div>}
          </Card>); })}
      </div>}
    </aside>
  );
}
function DispatchReady({ onPack }) {
  const [pane, setPane] = React.useState(true);
  const [q, setQ] = React.useState('');
  const [filters, setFilters] = React.useState(['In stock only', 'Due < 15d']);
  const list = D.customers.filter(c => packable(c) > 0 && (!q || c.name.toLowerCase().includes(q.toLowerCase()) || c.orders.some(o => o.lines.some(l => l[0].includes(q)))));
  return (
    <>
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px var(--gutter-desktop) 0' }}>
          <SearchBar value={q} onChange={setQ} placeholder="Customer or design no" style={{ width: 320 }} />
          <div style={{ display: 'flex', gap: 6 }}>{filters.map(f => <Tag key={f} onRemove={() => setFilters(filters.filter(x => x !== f))}>{f}</Tag>)}<Tag icon="sliders-horizontal" onClick={() => {}}>Filters</Tag><Tag icon="arrow-down-up" onClick={() => {}}>Due, oldest first</Tag></div>
          <span style={{ flex: 1 }} />
          <span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{list.length} orders · updated just now</span>
          <IconButton icon="refresh-cw" variant="card" size="sm" label="Refresh" />
          <IconButton icon="chevrons-down-up" variant="card" size="sm" label="Collapse all" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--card-gap)', padding: 'var(--gutter-desktop)' }}>
          {list.map(c => <CustomerCard key={c.id} c={c} onPack={onPack} />)}
        </div>
      </main>
      <PendingPane open={pane} onToggle={() => setPane(!pane)} />
    </>
  );
}
Object.assign(window, { DispatchReady });
