const { Card, Badge, Button, IconButton, Tag, Thumb, Stepper, Switch, Icon, Toast } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const PST = { OPEN: 'danger', PACKED: 'ok', INVOICED: 'neutral' };
function CurrentOrderPane({ customer }) {
  const c = customer;
  return (
    <aside style={{ width: 300, flex: 'none', borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-raised)', overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ font: 'var(--text-label)', fontSize: 12.5, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Current order</span><Badge tone="brand" variant="solid">{c.orders.reduce((s, o) => s + o.lines.length, 0)}</Badge></div>
      <div><div style={{ font: 'var(--text-title)' }}>{c.name}</div><div style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{c.city}</div><div style={{ display: 'flex', gap: 6, marginTop: 8 }}><Tag icon="phone">{c.phone}</Tag></div></div>
      {c.orders.map(o => <Card key={o.no} padding={12} style={{ boxShadow: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><Icon name="chevron-down" size={14} style={{ color: 'var(--text-muted)' }} /><span style={{ font: 'var(--text-code)', fontSize: 13 }}>{o.no}</span><span style={{ flex: 1 }} /><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{o.lines.reduce((s, l) => s + l[2], 0)} pcs</span></div>
        {o.lines.map((l, i) => { const d = D.byCode[l[0]]; const packed = i === 0 ? l[2] : i === 1 ? Math.floor(l[2] / 2) : 0; return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid var(--border-subtle)' }}>
            <Thumb src={d && d.src} code={l[0]} colour={!d || !d.src ? D.cols[l[1]] : undefined} size={44} ratio={1.3} />
            <span style={{ flex: 1, minWidth: 0 }}><div style={{ font: 'var(--text-body)', fontWeight: 500 }}>{l[1]} <span style={{ color: 'var(--text-muted)' }}>×{l[2]}</span></div><div style={{ font: 'var(--text-small)', color: l[3] ? 'var(--text-muted)' : 'var(--danger-500)', marginTop: 2 }}>{l[3] ? (d ? d.free : 0) + ' in stock · ' + (l[2] - packed) + ' pending' : 'no stock'}</div></span>
            <span style={{ width: 28, height: 28, borderRadius: 14, display: 'grid', placeItems: 'center', font: 'var(--text-overline)', fontSize: 10, background: packed >= l[2] ? 'var(--ok-100)' : packed ? 'var(--warn-100)' : 'var(--bg-sunken)', color: packed >= l[2] ? 'var(--ok-600)' : packed ? 'var(--warn-600)' : 'var(--text-muted)' }}>{packed >= l[2] ? <Icon name="check" size={13} strokeWidth={2.4} /> : packed ? packed + '/' + l[2] : '—'}</span>
            <Button size="sm" variant="soft" caps iconRight="chevron-right" disabled={!l[3] || packed >= l[2]}>Pack</Button>
          </div>); })}
      </Card>)}
    </aside>
  );
}
function ParcelCard({ p, active, onSelect, onClose }) {
  const [lines, setLines] = React.useState(p.lines);
  const tone = PST[p.status]; const dim = p.status === 'INVOICED';
  return (
    <Card bar={active ? 'var(--accent)' : p.status === 'PACKED' ? 'var(--ok-500)' : 'var(--ink-300)'} selected={active} onClick={() => onSelect(p.code)} padding={0} style={{ opacity: dim ? .6 : 1 }}>
      <div style={{ padding: '14px 16px 8px 20px', display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ font: 'var(--text-code)', fontSize: 20, fontWeight: 500 }}>{p.code}</span>{active && <Badge tone="brand">Packing into</Badge>}<span style={{ flex: 1 }} /><Badge tone={tone} variant={p.status === 'OPEN' ? 'soft' : 'solid'}>{p.status}</Badge></div>
      <div style={{ padding: '0 16px 4px 20px' }}>{lines.map((l, i) => { const d = D.byCode[l[0]]; return (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i ? '1px solid var(--border-subtle)' : 0 }}>
          <Thumb src={d && d.src} code={l[0]} colour={!d || !d.src ? D.cols[l[1]] : undefined} size={40} ratio={1.2} />
          <span style={{ font: 'var(--text-code)', fontSize: 13.5 }}>{l[0]}</span><span style={{ font: 'var(--text-body)', color: 'var(--text-secondary)' }}>{l[1]}</span><span style={{ flex: 1 }} />
          {p.status === 'OPEN' ? <Stepper size="sm" value={l[2]} max={l[3]} onChange={v => setLines(lines.map((x, j) => j === i ? [x[0], x[1], v, x[3]] : x))} /> : <span style={{ font: 'var(--text-label)', fontSize: 13 }}>×{l[2]}</span>}
          <span style={{ font: 'var(--text-small)', color: 'var(--text-muted)', width: 30, textAlign: 'right' }}>/{l[3]}</span>
          {p.status === 'OPEN' && <IconButton icon="x" size="sm" variant="ghost" label="Remove" />}
        </div>); })}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 14px 20px' }}><span style={{ font: 'var(--text-label)', fontSize: 13 }}>{lines.reduce((s, l) => s + l[2], 0)} pcs</span><span style={{ flex: 1 }} />
        {p.status === 'OPEN' && <><Button size="sm" variant="secondary" icon="plus">Add line</Button><Button size="sm" variant="inverse" caps onClick={e => { e.stopPropagation(); onClose(p.code); }}>Close parcel</Button></>}
        {p.status === 'PACKED' && <Button size="sm" variant="soft" caps iconRight="chevron-right">Review invoice</Button>}
        {p.status === 'INVOICED' && <span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>awaiting shipment · TMP-260903-0036</span>}
      </div>
    </Card>
  );
}
function InvoicePane({ customer, review }) {
  const rows = [['1243', 'Mehroon', 2, 4995], ['D9107', 'White', 1, 1495], ['3661', 'Peach', 1, 5995]];
  const total = rows.reduce((s, r) => s + r[2] * r[3], 0);
  return (
    <aside style={{ width: 'var(--pane-w)', flex: 'none', borderLeft: '1px solid var(--border-subtle)', background: 'var(--bg-raised)', overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ font: 'var(--text-label)', fontSize: 12.5, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Invoice</span><Badge tone={review ? 'warn' : 'gold'} dot>{review ? 'Review' : 'Live'}</Badge></div>
      {review && <div style={{ font: 'var(--text-small)', color: 'var(--warn-600)', background: 'var(--warn-100)', padding: '10px 12px', borderRadius: 'var(--r-sm)' }}>Fix qty and rate, then confirm — nothing reaches Busy until you do.</div>}
      <Card padding={18} style={{ boxShadow: 'none', flex: 1 }}>
        <div style={{ font: 'var(--text-h2)' }}>Shree Radha Studio</div>
        <div style={{ font: 'var(--text-small)', color: 'var(--text-muted)', marginTop: 2 }}>9/112, Gandhi Nagar, Delhi · GSTIN 07AEZPA2938L2ZX</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, font: 'var(--text-small)' }}><span><b style={{ fontWeight: 500, font: 'var(--text-body)' }}>{customer.name}</b><br /><span style={{ color: 'var(--text-muted)' }}>P00059 · Order SO-3034</span></span><span style={{ color: 'var(--text-muted)' }}>03/09/26</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '8px 10px', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', font: 'var(--text-small)' }}><span style={{ color: 'var(--text-muted)', font: 'var(--text-overline)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Bill to</span><b style={{ fontWeight: 500 }}>{customer.name}</b><span style={{ flex: 1 }} /><Tag icon="link" onClick={() => {}} style={{ height: 24 }}>gaddi</Tag></div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 14, font: 'var(--text-small)', fontFeatureSettings: 'var(--num)' }}>
          <thead><tr style={{ color: 'var(--text-muted)', textAlign: 'left' }}>{['Title', 'Colour', 'Qty', 'Rate', 'Amount'].map((h, i) => <th key={h} style={{ fontWeight: 500, padding: '6px 0', borderBottom: '1px solid var(--border-default)', textAlign: i > 1 ? 'right' : 'left' }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map(r => <tr key={r[0] + r[1]}>{[r[0], r[1], r[2], r[3].toLocaleString('en-IN'), '₹' + (r[2] * r[3]).toLocaleString('en-IN')].map((v, i) => <td key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', textAlign: i > 1 ? 'right' : 'left', font: i === 0 ? 'var(--text-code)' : 'inherit' }}>{review && (i === 2 || i === 3) ? <input defaultValue={v} style={{ width: i === 2 ? 36 : 64, textAlign: 'right', border: '1px solid var(--border-default)', borderRadius: 6, padding: '3px 6px', font: 'inherit', background: 'var(--surface-card)' }} /> : v}</td>)}</tr>)}</tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{rows.reduce((s, r) => s + r[2], 0)} pcs · CGST 2.5% + SGST 2.5%</span><span style={{ font: 'var(--text-price)', fontSize: 26 }}>₹{Math.round(total * 1.05).toLocaleString('en-IN')}</span></div>
      </Card>
      {review ? <Button variant="success" block size="lg" icon="check">Confirm → Push to Busy</Button> : <Button variant="secondary" block icon="truck">Close shipment · 2 parcels</Button>}
    </aside>
  );
}
function DispatchPacking({ customer }) {
  const c = customer || D.customers[2];
  const [active, setActive] = React.useState('P00059');
  const [review, setReview] = React.useState(false);
  const [scan, setScan] = React.useState(true);
  const [toast, setToast] = React.useState(true);
  return (
    <>
      <CurrentOrderPane customer={c} />
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto', padding: 'var(--gutter-desktop)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', overflow: 'auto' }}>
          {D.customers.slice(0, 5).map(x => { const on = x.id === c.id; return <span key={x.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 8px 0 14px', borderRadius: 'var(--r-pill)', background: on ? 'var(--accent)' : 'var(--surface-card)', color: on ? 'var(--accent-on)' : 'var(--text-primary)', border: '1px solid ' + (on ? 'transparent' : 'var(--border-default)'), font: 'var(--text-small)', fontWeight: 500, whiteSpace: 'nowrap' }}>{x.name}<span style={{ width: 48, height: 4, borderRadius: 2, background: on ? 'rgba(255,255,255,.3)' : 'var(--bg-sunken)', overflow: 'hidden' }}><span style={{ display: 'block', width: on ? '55%' : '20%', height: '100%', background: on ? '#fff' : 'var(--ok-500)' }} /></span><span style={{ font: 'var(--text-overline)', opacity: .8 }}>{on ? '4/12' : '0/9'}</span></span>; })}
          <Tag onClick={() => {}}>All parcels</Tag>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Switch checked={scan} onChange={setScan} label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="scan-line" size={15} />Scan here</span>} />
          <Button variant="secondary" size="sm" icon="boxes">Select for shipment</Button>
          <span style={{ flex: 1 }} /><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>4 boxes</span>
          <IconButton icon="arrow-down-up" variant="card" size="sm" label="Sort" /><IconButton icon="filter" variant="card" size="sm" label="Filter" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 'var(--card-gap)', alignItems: 'start' }}>
          {D.parcels.map(p => <ParcelCard key={p.code} p={p} active={p.code === active} onSelect={setActive} onClose={() => setReview(true)} />)}
          <button type="button" style={{ height: 88, border: '1.5px dashed var(--border-strong)', borderRadius: 'var(--r-card)', background: 'transparent', color: 'var(--text-secondary)', font: 'var(--text-body)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Icon name="plus" size={16} />Add parcel</button>
        </div>
        {toast && <div style={{ position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)' }}><Toast tone="ok" title="Accepted" message="1243 Mehroon → P00059 · 2 of 2" onClose={() => setToast(false)} /></div>}
      </main>
      <InvoicePane customer={c} review={review} />
    </>
  );
}
Object.assign(window, { DispatchPacking });
