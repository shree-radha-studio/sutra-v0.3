const { ProductCard, PriceText, Badge, Button, IconButton, Tag, Tabs, SearchBar, SegmentedControl, Select, Stepper, Switch, Thumb, ColourDots, Icon, Card } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const CARTS = [{ k: 'A', name: 'Ramleela Fashion', city: 'Surat', book: 'In-cabin' }, { k: 'B', name: 'RL Fashion', city: 'Meerut', book: 'WhatsApp' }, { k: 'C', name: 'Nalli Fashion Mart', city: 'Chennai', book: 'In-cabin' }];
const CATS = [{ key: 'all', label: 'All' }, { key: 'samples', label: 'Samples' }, { key: 'lehenga', label: 'Lehenga' }, { key: 'saree', label: 'Saree' }, { key: 'plazo set', label: 'Plazo' }, { key: 'crop top', label: 'Crop top' }, { key: 'blouse', label: 'Blouse' }];

/** Right pane — the live carts. Money is allowed here (sales roles). */
function CartPane({ carts, active, onActive, lines, onQty, customerMode }) {
  const mine = lines.filter(l => l.cart === active);
  const pcs = mine.reduce((s, l) => s + l.qty, 0);
  const amt = mine.reduce((s, l) => s + l.qty * (D.byCode[l.code].price || 0), 0);
  const cart = carts.find(c => c.k === active);
  return (
    <aside style={{ width: 'var(--pane-w)', flex: 'none', borderLeft: '1px solid var(--border-subtle)', background: 'var(--bg-raised)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ font: 'var(--text-label)', fontSize: 12.5, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Carts</span><Badge tone="gold" variant="solid">{carts.length}</Badge><span style={{ flex: 1 }} />
        <IconButton icon="plus" size="sm" variant="card" label="New cart" />
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '12px 16px 0', overflow: 'auto', scrollbarWidth: 'none' }}>
        {carts.map(c => { const on = c.k === active; const n = lines.filter(l => l.cart === c.k).reduce((s, l) => s + l.qty, 0); return (
          <button key={c.k} type="button" onClick={() => onActive(c.k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 38, padding: '0 12px 0 5px', borderRadius: 'var(--r-pill)', border: '1px solid ' + (on ? 'transparent' : 'var(--border-default)'), background: on ? 'var(--gold-400)' : 'var(--surface-card)', color: 'var(--ink-900)', cursor: 'pointer', font: 'var(--text-small)', fontWeight: 500, whiteSpace: 'nowrap', flex: 'none' }}>
            <span style={{ width: 28, height: 28, borderRadius: 14, background: on ? 'rgba(36,23,18,.14)' : 'var(--bg-sunken)', display: 'grid', placeItems: 'center', font: 'var(--text-design-name)', fontSize: 15 }}>{c.k}</span>{c.name.split(' ')[0]}<b style={{ fontWeight: 500, opacity: .65 }}>{n}</b>
          </button>); })}
      </div>
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ font: 'var(--text-title)' }}>{cart.name}</span><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{cart.city}</span><span style={{ flex: 1 }} /><Tag icon="book-open" onClick={() => {}} style={{ height: 26 }}>{cart.book} book</Tag></div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '10px 16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mine.length === 0 && <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)', font: 'var(--text-small)' }}>Nothing in this cart yet — tap + on any design.</div>}
        {mine.map(l => { const d = D.byCode[l.code]; return (
          <Card key={l.code + l.colour} padding={10} style={{ boxShadow: 'none' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Thumb src={l.colour === d.colours[0] ? d.src : undefined} code={d.code} colour={l.colour === d.colours[0] ? undefined : D.cols[l.colour]} size={52} ratio={1.25} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ font: 'var(--text-code)', fontSize: 13.5 }}>{d.code}</span><span style={{ font: 'var(--text-design-name)', fontSize: 16, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, font: 'var(--text-small)', color: 'var(--text-secondary)' }}><span style={{ width: 9, height: 9, borderRadius: 5, background: D.cols[l.colour] }} />{l.colour}<span style={{ flex: 1 }} />{!customerMode && <PriceText value={d.price} size={14} />}</div>
              </div>
              <Stepper size="sm" value={l.qty} onChange={v => onQty(l, v)} />
            </div>
          </Card>); })}
      </div>
      <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{pcs} pcs · {mine.length} lines · due 20 days</span><span style={{ flex: 1 }} />{!customerMode && <PriceText value={amt || null} size={24} tbd="—" />}</div>
        <Button block size="lg" iconRight="chevron-right" disabled={!pcs}>Submit for approval</Button>
      </div>
    </aside>
  );
}

/** Web product page (customer view + salesperson toggle) inside the catalogue main pane. */
function WebProduct({ d, onBack, onAdd, customerMode }) {
  const [colour, setColour] = React.useState(d.colours[0]);
  const [sales, setSales] = React.useState(false);
  const cols = d.colours.map(n => ({ name: n, hex: D.cols[n] }));
  const row = (label, vals, tone) => <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(' + d.colours.length + ', 1fr)', padding: '9px 0', borderTop: '1px solid var(--border-subtle)', font: 'var(--text-small)' }}><span style={{ color: 'var(--text-muted)' }}>{label}</span>{vals.slice(0, d.colours.length).map((v, i) => <span key={i} style={{ textAlign: 'center', font: 'var(--text-label)', fontSize: 13.5, fontFeatureSettings: 'var(--num)', color: v === 0 || v === '—' ? 'var(--text-muted)' : tone || 'var(--text-primary)' }}>{v}</span>)}</div>;
  return (
    <div style={{ padding: 'var(--gutter-desktop)', display: 'grid', gridTemplateColumns: 'minmax(320px, 440px) 1fr', gap: 32, alignItems: 'start' }}>
      <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--photo-backdrop)' }}>
        {d.src ? <img src={d.src} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: 'var(--text-display)', color: 'var(--text-muted)' }}>{d.code}</div>}
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}><IconButton icon="chevron-left" variant="glass" onClick={onBack} label="Back" /></div>
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 8 }}><IconButton icon="maximize-2" variant="glass" label="Full screen" /><IconButton icon="images" variant="glass" label="Gallery" badge={6} /></div>
        <div style={{ position: 'absolute', left: 14, bottom: 14, display: 'flex', gap: 6 }}>{d.tag && <Badge tone={d.tagTone || 'brand'} variant="solid" size="md">{d.tag}</Badge>}{d.note && <Badge tone="danger" variant="solid" size="md">{d.note}</Badge>}</div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}><span style={{ font: 'var(--text-code)', fontSize: 20 }}>{d.code}</span><span style={{ font: 'var(--text-display)', fontSize: 40 }}>{d.name}</span><span style={{ flex: 1 }} /><PriceText value={d.price} size={32} /></div>
        <div style={{ font: 'var(--text-body)', color: 'var(--text-muted)', marginTop: 6 }}>{d.cat} · {d.colours.length} colours · zari work · net & satin</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>{d.colours.map(n => <div key={n} onClick={() => setColour(n)} style={{ width: 84, cursor: 'pointer' }}><Thumb src={n === d.colours[0] ? d.src : undefined} code={d.code} colour={n === d.colours[0] ? undefined : D.cols[n]} size={84} ratio={1.25} radius="var(--r-md)" style={{ boxShadow: n === colour ? '0 0 0 2px var(--bg-page), 0 0 0 4px var(--accent)' : 'none' }} /><div style={{ font: 'var(--text-small)', textAlign: 'center', marginTop: 8, color: n === colour ? 'var(--text-primary)' : 'var(--text-muted)' }}>{n}</div></div>)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, padding: '14px 16px', background: 'var(--surface-card)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ font: 'var(--text-label)', fontSize: 13 }}>Cart A · Ramleela Fashion</span><span style={{ flex: 1 }} />
          <Button size="md" variant="secondary" onClick={() => d.colours.forEach(c => onAdd(d, c))}>Add colour set</Button>
          <Button size="md" icon="plus" onClick={() => onAdd(d, colour)}>Add {colour}</Button>
        </div>
        {!customerMode && <div style={{ marginTop: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}><Switch checked={sales} onChange={setSales} label="Salesperson view" />{sales && <Badge tone="warn" style={{ marginLeft: 12 }}>Staff only</Badge>}</div>
          {sales && <div style={{ marginTop: 14, padding: '14px 18px', background: 'var(--surface-card)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(' + d.colours.length + ', 1fr)', font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', paddingBottom: 8 }}><span /> {d.colours.map(n => <span key={n} style={{ textAlign: 'center' }}>{n}</span>)}</div>
            {row('In stock', [20, 2, 5, 15])}{row('Reserved', [4, 0, 1, 0])}{row('In production', [30, 0, 10, 0], 'var(--text-brand)')}{row('Due 30/07', [10, '—', 8, '—'])}{row('Due 10/08', [10, '—', 2, '—'])}
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}><Tag icon="flag" onClick={() => {}}>Priority sell</Tag><Tag icon="tags" onClick={() => {}}>Set manipulative tag</Tag><Tag icon="upload" onClick={() => {}}>Add media</Tag><Tag icon="scroll-text" onClick={() => {}}>Recipe</Tag><Tag icon="line-chart" onClick={() => {}}>Demand graph</Tag></div>
          </div>}
        </div>}
      </div>
    </div>
  );
}

function WebCatalogue({ customerMode }) {
  const [kind, setKind] = React.useState('products');
  const [cat, setCat] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [mode, setMode] = React.useState('grid');
  const [filters, setFilters] = React.useState(['Top 30', 'Delhi', 'Zari work']);
  const [open, setOpen] = React.useState(null);
  const [active, setActive] = React.useState('A');
  const [lines, setLines] = React.useState([{ cart: 'A', code: '2798', colour: 'Sky', qty: 2 }, { cart: 'A', code: '6002', colour: 'Lilac', qty: 1 }, { cart: 'B', code: '2006', colour: 'Lavender', qty: 2 }]);
  const add = (d, colour) => setLines(ls => { const i = ls.findIndex(l => l.cart === active && l.code === d.code && l.colour === colour); if (i >= 0) return ls.map((l, j) => j === i ? { ...l, qty: l.qty + 1 } : l); return [...ls, { cart: active, code: d.code, colour, qty: 1 }]; });
  const setQty = (line, v) => setLines(ls => v <= 0 ? ls.filter(l => l !== line) : ls.map(l => l === line ? { ...l, qty: v } : l));
  const list = D.designs.filter(d => cat === 'all' || (cat === 'samples' ? d.price == null : d.cat.toLowerCase() === cat)).filter(d => !q || d.code.includes(q) || d.name.toLowerCase().includes(q.toLowerCase()));
  const inCart = code => lines.filter(l => l.cart === active && l.code === code).reduce((s, l) => s + l.qty, 0);
  return (
    <>
      <main style={{ flex: 1, minWidth: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {open ? <WebProduct d={open} onBack={() => setOpen(null)} onAdd={add} customerMode={customerMode} /> : <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px var(--gutter-desktop) 0' }}>
            <SearchBar value={q} onChange={setQ} placeholder="Search design no, name or colour" onScan={() => {}} style={{ flex: 1, maxWidth: 560 }} />
            {!customerMode && <SegmentedControl value={kind} onChange={setKind} options={[{ value: 'products', label: 'Products' }, { value: 'materials', label: 'Materials' }, { value: 'wip', label: 'WIP' }]} />}
            <span style={{ flex: 1 }} />
            <SegmentedControl value={mode} onChange={setMode} options={[{ value: 'grid', icon: 'layout-grid', label: 'Grid' }, { value: 'list', icon: 'list', label: 'List' }]} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, padding: '10px var(--gutter-desktop) 0' }}>
            <Tabs value={cat} onChange={setCat} items={CATS} caps={false} style={{ flex: 1 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px var(--gutter-desktop) 0' }}>
            {filters.map(f => <Tag key={f} onRemove={() => setFilters(filters.filter(x => x !== f))}>{f}</Tag>)}
            <Tag icon="sliders-horizontal" onClick={() => {}}>Filters</Tag>
            <span style={{ flex: 1 }} />
            <span style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{list.length} designs</span>
            <Tag icon="arrow-down-up" onClick={() => {}}>Sort · Featured</Tag>
          </div>
          {mode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(212px, 1fr))', gap: '26px 18px', padding: '18px var(--gutter-desktop) var(--gutter-desktop)' }}>
              {list.map(d => <div key={d.code} style={{ position: 'relative' }}>
                <ProductCard width="100%" src={d.src} code={d.code} name={d.name} price={d.price} tag={d.tag} tagTone={d.tagTone || 'brand'} note={d.note} colours={d.colours.map(n => ({ name: n, hex: D.cols[n] }))} activeColour={d.colours[0]} onAdd={() => add(d, d.colours[0])} onClick={() => setOpen(d)} selected={inCart(d.code) > 0} />
                {inCart(d.code) > 0 && <span style={{ position: 'absolute', top: 10, right: 56, height: 24, padding: '0 9px', borderRadius: 12, background: 'var(--gold-400)', color: 'var(--ink-900)', font: 'var(--text-label)', fontSize: 11.5, display: 'grid', placeItems: 'center', fontFeatureSettings: 'var(--num)' }}>{inCart(d.code)} in {active}</span>}
              </div>)}
            </div>
          ) : (
            <div style={{ margin: '14px var(--gutter-desktop) var(--gutter-desktop)', background: 'var(--surface-card)', borderRadius: 'var(--r-card)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
              {list.map((d, i) => <div key={d.code} onClick={() => setOpen(d)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 0, cursor: 'pointer' }}>
                <Thumb src={d.src} code={d.code} size={56} ratio={1.25} />
                <span style={{ font: 'var(--text-code)', fontSize: 14, width: 64 }}>{d.code}</span>
                <span style={{ font: 'var(--text-design-name)', flex: 1 }}>{d.name}<span style={{ font: 'var(--text-small)', color: 'var(--text-muted)', marginLeft: 10 }}>{d.cat}</span></span>
                <ColourDots colours={d.colours.map(n => ({ name: n, hex: D.cols[n] }))} size={14} />
                <span style={{ width: 120, display: 'flex', gap: 4 }}>{d.tag && <Badge tone={d.tagTone || 'brand'}>{d.tag}</Badge>}{d.note && <Badge tone="danger">{d.note}</Badge>}</span>
                <span style={{ width: 100, textAlign: 'right' }}><PriceText value={d.price} size={18} /></span>
                <IconButton icon="plus" size="sm" variant="card" label="Add" onClick={e => { e.stopPropagation(); add(d, d.colours[0]); }} />
              </div>)}
            </div>
          )}
        </>}
      </main>
      <CartPane carts={CARTS} active={active} onActive={setActive} lines={lines} onQty={setQty} customerMode={customerMode} />
    </>
  );
}
Object.assign(window, { WebCatalogue });
