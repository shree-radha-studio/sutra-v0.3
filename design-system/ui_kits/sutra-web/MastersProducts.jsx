const { ProductCard, Badge, Button, IconButton, Tag, SearchBar, SegmentedControl, Thumb, ColourDots, StatTile, Tabs } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const alerts = [[102, 'SKUs at or below the low-stock mark'], [104, 'Designs with no photo yet'], [113, 'Designs the demand engine has never scored'], [15, 'Purchase documents not linked to a supplier ledger']];
function Spark({ v }) { const pts = [30, 42, 38, 55, 48, 62, v].map((y, i) => (i * 10) + ',' + (30 - y * .4)).join(' '); return <svg width="64" height="30" viewBox="0 0 64 30" style={{ overflow: 'visible' }}><polyline points={pts} fill="none" stroke="var(--brand-500)" strokeWidth="1.5" strokeLinejoin="round" /></svg>; }
function MastersProducts() {
  const [mode, setMode] = React.useState('grid');
  const [fam, setFam] = React.useState('items');
  const [ent, setEnt] = React.useState('products');
  const [q, setQ] = React.useState('');
  const list = D.designs.filter(d => !q || d.code.includes(q) || d.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <main style={{ flex: 1, minWidth: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px var(--gutter-desktop) 0' }}>
        <SegmentedControl value={fam} onChange={setFam} options={[{ value: 'items', label: 'Items' }, { value: 'ledgers', label: 'Ledgers' }]} />
        <Tabs variant="pill" caps={false} size="sm" value={ent} onChange={setEnt} items={fam === 'items' ? [{ key: 'products', label: 'Products', count: 118 }, { key: 'materials', label: 'Materials', count: 22 }, { key: 'wip', label: 'WIP', count: 2 }] : [{ key: 'customers', label: 'Customers', count: 67 }, { key: 'agencies', label: 'Broker agencies', count: 34 }, { key: 'brokers', label: 'Brokers', count: 25 }, { key: 'karigars', label: 'Karigars', count: 52 }, { key: 'transporters', label: 'Transporters', count: 55 }, { key: 'suppliers', label: 'Suppliers', count: 40 }, { key: 'team', label: 'Team', count: 9 }]} style={{ background: 'transparent', padding: 0 }} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '14px var(--gutter-desktop) 0', overflow: 'auto' }}>{alerts.map(([n, t], i) => <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 34, padding: '0 14px 0 10px', borderRadius: 'var(--r-pill)', background: i === 0 ? 'var(--accent-soft)' : 'var(--surface-card)', border: '1px solid ' + (i === 0 ? 'transparent' : 'var(--border-subtle)'), color: i === 0 ? 'var(--text-brand)' : 'var(--text-secondary)', font: 'var(--text-small)', whiteSpace: 'nowrap', cursor: 'pointer' }}><b style={{ font: 'var(--text-label)', fontSize: 14, fontFeatureSettings: 'var(--num)', color: i === 0 ? 'var(--text-brand)' : 'var(--text-primary)' }}>{n}</b>{t} →</span>)}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px var(--gutter-desktop) 0' }}>
        <SearchBar value={q} onChange={setQ} placeholder="Search design no, name or colour" style={{ flex: 1, maxWidth: 520 }} />
        <Tag icon="sliders-horizontal" onClick={() => {}}>Filters</Tag><Tag icon="bookmark" onClick={() => {}}>Views</Tag>{mode === 'list' && <Tag icon="columns-3" onClick={() => {}}>Columns 10/15</Tag>}
        <span style={{ flex: 1 }} />
        <SegmentedControl value={mode} onChange={setMode} options={[{ value: 'grid', icon: 'layout-grid', label: 'Grid' }, { value: 'list', icon: 'list', label: 'List' }]} />
        <SegmentedControl value="cozy" options={[{ value: 'cozy', icon: 'rows-3', label: 'Cozy' }, { value: 'dense', icon: 'rows-4', label: 'Dense' }]} />
        <Button variant="secondary" size="sm" icon="upload">Export</Button><Button variant="secondary" size="sm" icon="download">Import</Button>
      </div>
      <div style={{ font: 'var(--text-small)', color: 'var(--text-muted)', padding: '10px var(--gutter-desktop) 0' }}>{list.length} of 118 designs</div>
      {mode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 20, padding: '14px var(--gutter-desktop) var(--gutter-desktop)' }}>
          {list.map(d => <ProductCard key={d.code} width="100%" src={d.src} code={d.code} name={d.name} price={d.price} tag={d.tag} tagTone={d.tagTone || 'brand'} note={d.note} colours={d.colours.map(n => ({ name: n, hex: D.cols[n] }))} stats={{ free: d.free, fg: d.fg, 'in prod': d.prod }} onClick={() => {}} />)}
        </div>
      ) : (
        <div style={{ margin: '14px var(--gutter-desktop) var(--gutter-desktop)', background: 'var(--surface-card)', borderRadius: 'var(--r-card)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--text-body)', fontFeatureSettings: 'var(--num)' }}>
            <thead><tr>{['Design', 'Category', 'Price', 'Free', 'FG', 'Reserved', 'In prod', 'Demand', 'Colours', 'Tags'].map((h, i) => <th key={h} style={{ textAlign: i >= 2 && i <= 6 ? 'right' : 'left', padding: '12px 14px', font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-raised)' }}>{h}</th>)}</tr></thead>
            <tbody>{list.map(d => <tr key={d.code} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '8px 14px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Thumb src={d.src} code={d.code} size={44} ratio={1.2} /><span><div style={{ font: 'var(--text-code)', fontSize: 14 }}>{d.code}</div><div style={{ font: 'var(--text-design-name)', fontSize: 16, color: 'var(--text-secondary)' }}>{d.name}</div></span></div></td>
              <td style={{ padding: '8px 14px', color: 'var(--text-secondary)' }}>{d.cat}</td>
              <td style={{ padding: '8px 14px', textAlign: 'right', font: 'var(--text-price)', fontSize: 17 }}>{d.price ? '₹' + d.price.toLocaleString('en-IN') : 'TBD'}</td>
              <td style={{ padding: '8px 14px', textAlign: 'right', fontWeight: 500 }}>{d.free}</td>
              <td style={{ padding: '8px 14px', textAlign: 'right', color: 'var(--text-secondary)' }}>{d.fg}</td>
              <td style={{ padding: '8px 14px', textAlign: 'right', color: 'var(--text-secondary)' }}>{d.fg - d.free}</td>
              <td style={{ padding: '8px 14px', textAlign: 'right', color: d.prod ? 'var(--text-primary)' : 'var(--text-muted)' }}>{d.prod}</td>
              <td style={{ padding: '8px 14px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Spark v={d.score} /><span style={{ font: 'var(--text-label)', fontSize: 13 }}>{d.score}</span></div></td>
              <td style={{ padding: '8px 14px' }}><ColourDots colours={d.colours.map(n => ({ name: n, hex: D.cols[n] }))} size={14} /></td>
              <td style={{ padding: '8px 14px' }}><div style={{ display: 'flex', gap: 4 }}>{d.tag && <Badge tone={d.tagTone || 'brand'}>{d.tag}</Badge>}{d.note && <Badge tone="danger">{d.note}</Badge>}</div></td>
            </tr>)}</tbody>
          </table>
        </div>
      )}
    </main>
  );
}
Object.assign(window, { MastersProducts });
