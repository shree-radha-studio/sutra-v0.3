const { ProductCard, Badge, Button, IconButton, Tag, Tabs, SearchBar, Icon, Thumb } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const carts = [{ k: 'A', name: 'Ramleela Fashion', n: 4, on: true }, { k: 'B', name: 'RL Fashion', n: 2 }, { k: 'C', name: 'Ramleela Fashion', n: 0 }];
/** Fixed top bar of the catalogue module: menu · lockup · role · theme · carts */
function TopBar({ cartCount, dark, onDark }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
      <IconButton icon="menu" variant="ghost" size="sm" label="Menu" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 'var(--r-pill)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}><img src={D.A + 'logo/sutra-mark-gold.png'} style={{ height: 26 }} alt="Sutra" /><span style={{ width: 1, height: 20, background: 'var(--border-default)' }} /><img src={D.A + 'clients/srs-logo.png'} style={{ height: 24 }} alt="" /></div>
      <span style={{ flex: 1 }} />
      <Badge tone="neutral" size="md">Sales</Badge>
      <IconButton icon={dark ? 'sun' : 'moon'} variant="ghost" size="sm" onClick={onDark} label="Theme" />
      <IconButton icon="shopping-bag" variant="card" size="sm" badge={cartCount} label="Carts" />
    </div>
  );
}
function CartChips() {
  return (
    <div style={{ display: 'flex', gap: 8, overflow: 'auto', padding: '0 16px', scrollbarWidth: 'none' }}>
      {carts.map(c => <span key={c.k} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 40, padding: '0 14px 0 6px', borderRadius: 'var(--r-pill)', background: c.on ? 'var(--gold-400)' : 'var(--surface-card)', color: c.on ? 'var(--ink-900)' : 'var(--text-primary)', border: '1px solid ' + (c.on ? 'transparent' : 'var(--border-default)'), font: 'var(--text-small)', fontWeight: 500, whiteSpace: 'nowrap', flex: 'none', boxShadow: 'var(--shadow-1)' }}><span style={{ width: 28, height: 28, borderRadius: 14, background: c.on ? 'rgba(36,23,18,.12)' : 'var(--bg-sunken)', display: 'grid', placeItems: 'center', font: 'var(--text-design-name)', fontSize: 15 }}>{c.k}</span>{c.name}<b style={{ fontWeight: 500, opacity: .7 }}>{c.n}</b></span>)}
      <IconButton icon="plus" size="md" variant="card" label="New cart" style={{ flex: 'none' }} />
    </div>
  );
}
function Catalogue({ onOpen, onAdd, cartCount, dark, onDark }) {
  const [cat, setCat] = React.useState('all');
  const [filters, setFilters] = React.useState(['Top 30', 'Delhi']);
  const list = D.designs.filter(d => d.src).filter(d => cat === 'all' || (cat === 'samples' ? d.price == null : d.cat.toLowerCase() === cat));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: 58 }}>
      <TopBar cartCount={cartCount} dark={dark} onDark={onDark} />
      <div style={{ padding: '14px 16px 0' }}><Tabs value={cat} onChange={setCat} caps={false} items={[{ key: 'all', label: 'All' }, { key: 'samples', label: 'Samples' }, { key: 'lehenga', label: 'Lehenga' }, { key: 'saree', label: 'Saree' }, { key: 'plazo set', label: 'Plazo' }]} style={{ gap: 22 }} /></div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '12px 16px 0', overflow: 'auto', scrollbarWidth: 'none' }}>
        {filters.map(f => <Tag key={f} onRemove={() => setFilters(filters.filter(x => x !== f))}>{f}</Tag>)}<Tag icon="sliders-horizontal" onClick={() => {}}>Filters</Tag><Tag icon="arrow-down-up" onClick={() => {}}>Featured</Tag>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px 0' }}><span style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{list.length} designs</span><span style={{ flex: 1 }} /><IconButton icon="list" variant="ghost" size="sm" label="List view" /></div>
      <div style={{ flex: 1, overflow: 'auto', padding: '10px 16px 190px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '18px 14px', alignContent: 'start' }}>
        {list.map(d => <ProductCard key={d.code} width="100%" src={d.src} code={d.code} name={d.name} price={d.price} tag={d.tag} tagTone={d.tagTone || 'brand'} note={d.note} colours={d.colours.map(n => ({ name: n, hex: D.cols[n] }))} activeColour={d.colours[0]} onAdd={() => onAdd(d)} onClick={() => onOpen(d)} />)}
      </div>
    </div>
  );
}
/** Floating stack docked above the bottom bar: cart chips + search/scan. */
function CatalogueDock({ onScan }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 96, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto' }}><CartChips /></div>
      <div style={{ padding: '0 16px', pointerEvents: 'auto' }}><SearchBar size="lg" placeholder="Design no, name, city" onScan={onScan} /></div>
    </div>
  );
}
Object.assign(window, { Catalogue, CatalogueDock, TopBar });
