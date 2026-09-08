const { Badge, Button, IconButton, Tag, ColourDots, Stepper, Switch, Icon, Thumb } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const stockRow = (label, vals, tone) => <div style={{ display: 'grid', gridTemplateColumns: '92px repeat(4, 1fr)', alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--border-subtle)', font: 'var(--text-small)' }}><span style={{ color: 'var(--text-muted)' }}>{label}</span>{vals.map((v, i) => <span key={i} style={{ textAlign: 'center', font: 'var(--text-label)', fontSize: 13, fontFeatureSettings: 'var(--num)', color: v === 0 || v === '—' ? 'var(--text-muted)' : tone || 'var(--text-primary)' }}>{v}</span>)}</div>;
function ProductPage({ design, onBack, onAdd }) {
  const d = design || D.designs[0];
  const [colour, setColour] = React.useState(d.colours[0]);
  const [sales, setSales] = React.useState(false);
  const [qty, setQty] = React.useState(0);
  const cols = d.colours.map(n => ({ name: n, hex: D.cols[n] }));
  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 120 }}>
      <div style={{ position: 'relative', height: 520, background: 'var(--photo-backdrop)' }}>
        {d.src && <img src={d.src} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
        <div style={{ position: 'absolute', left: 16, right: 16, top: 58, display: 'flex', gap: 8 }}><IconButton icon="chevron-left" variant="glass" onClick={onBack} label="Back" /><span style={{ flex: 1 }} /><IconButton icon="images" variant="glass" label="Gallery" /><IconButton icon="share-2" variant="glass" label="Share" /></div>
        <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', gap: 6 }}>{d.tag && <Badge tone={d.tagTone || 'brand'} variant="solid" size="md">{d.tag}</Badge>}{d.note && <Badge tone="danger" variant="solid" size="md">{d.note}</Badge>}</div>
        <div style={{ position: 'absolute', right: 16, bottom: 16, padding: '8px 10px', borderRadius: 'var(--r-pill)', background: 'rgba(36,23,18,.55)', backdropFilter: 'var(--blur-glass)', display: 'flex', alignItems: 'center', gap: 8, color: '#fff', font: 'var(--text-small)' }}><ColourDots colours={cols} active={colour} onSelect={setColour} size={14} />{colour}</div>
      </div>
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ font: 'var(--text-code)', fontSize: 18 }}>{d.code}</span><span style={{ font: 'var(--text-h1)', fontSize: 30 }}>{d.name}</span><span style={{ flex: 1 }} /><span style={{ font: 'var(--text-price)', fontSize: 26 }}>{d.price ? '₹' + d.price.toLocaleString('en-IN') : 'TBD'}</span></div>
        <div style={{ font: 'var(--text-small)', color: 'var(--text-muted)', marginTop: 4 }}>{d.cat} · {d.colours.length} colours · zari work</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, overflow: 'auto', flex: 1 }}>{d.colours.map(n => <div key={n} onClick={() => setColour(n)} style={{ flex: 'none', width: 68, cursor: 'pointer' }}><Thumb src={n === d.colours[0] ? d.src : undefined} code={d.code} colour={n === d.colours[0] ? undefined : D.cols[n]} size={68} ratio={1.25} style={{ boxShadow: n === colour ? '0 0 0 2px var(--surface-card), 0 0 0 3.5px var(--accent)' : 'none' }} /><div style={{ font: 'var(--text-small)', textAlign: 'center', marginTop: 6, color: n === colour ? 'var(--text-primary)' : 'var(--text-muted)' }}>{n}</div></div>)}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, padding: '12px 14px', background: 'var(--surface-card)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ font: 'var(--text-label)', fontSize: 13 }}>Cart A · Ramleela</span><span style={{ flex: 1 }} /><Stepper value={qty} onChange={setQty} size="lg" /><Button size="lg" icon="plus" onClick={() => { setQty(qty + 1); onAdd && onAdd(d); }}>Add</Button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Button variant="secondary" size="sm" block>Add colour set</Button><Button variant="secondary" size="sm" block>Add to all carts</Button></div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 22 }}><Switch checked={sales} onChange={setSales} label="Salesperson view" /><span style={{ flex: 1 }} />{sales && <Badge tone="warn">Staff only</Badge>}</div>
        {sales && <div style={{ marginTop: 14, padding: '14px 16px', background: 'var(--surface-card)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '92px repeat(4, 1fr)', font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', paddingBottom: 6 }}><span /> {d.colours.slice(0, 4).map(n => <span key={n} style={{ textAlign: 'center' }}>{n}</span>)}</div>
          {stockRow('In stock', [20, 2, 5, 15].slice(0, d.colours.length))}
          {stockRow('Reserved', [4, 0, 1, 0].slice(0, d.colours.length))}
          {stockRow('In production', [30, 0, 10, 0].slice(0, d.colours.length), 'var(--text-brand)')}
          {stockRow('Due 30/07', [10, '—', 8, '—'].slice(0, d.colours.length))}
          {stockRow('Due 10/08', [10, '—', 2, '—'].slice(0, d.colours.length))}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}><Tag icon="flag" onClick={() => {}}>Priority sell</Tag><Tag icon="tags" onClick={() => {}}>Set tag</Tag><Tag icon="upload" onClick={() => {}}>Add media</Tag><Tag icon="scroll-text" onClick={() => {}}>Recipe</Tag></div>
        </div>}
      </div>
    </div>
  );
}
Object.assign(window, { ProductPage });
