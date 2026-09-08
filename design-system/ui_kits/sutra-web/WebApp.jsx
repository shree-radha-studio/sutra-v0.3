const { Switch } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
function WebApp() {
  const start = (location.hash || '').replace('#', '') || 'catalogue';
  const [module, setModule] = React.useState(D.nav.some(n => n.key === start) ? start : 'catalogue');
  const [tab, setTab] = React.useState('ready');
  const [catTab, setCatTab] = React.useState('catalogue');
  const [dark, setDark] = React.useState(false);
  const [customerMode, setCustomerMode] = React.useState(false);
  const [packing, setPacking] = React.useState(null);
  React.useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : ''; }, [dark]);
  const dispatchTabs = [{ key: 'ready', label: 'Ready', count: 9 }, { key: 'packing', label: 'Packing', count: 35 }, { key: 'billed', label: 'Billed' }, { key: 'stock', label: 'Stock' }, { key: 'oos', label: 'Out of stock' }, { key: 'return', label: 'Sale return' }];
  const catTabs = [{ key: 'catalogue', label: 'Catalogue' }, { key: 'carts', label: 'Carts', count: 3 }, { key: 'orders', label: 'Sale orders' }];
  const isDispatch = module === 'dispatch', isCat = module === 'catalogue' || module === 'carts';
  const title = isDispatch ? 'Dispatch' : module === 'masters' ? 'Master views' : isCat ? 'Catalogue' : D.nav.find(n => n.key === module)?.label || 'Sutra';
  let body;
  if (isDispatch && tab === 'ready') body = <DispatchReady onPack={c => { setPacking(c); setTab('packing'); }} />;
  else if (isDispatch && tab === 'packing') body = <DispatchPacking customer={packing} />;
  else if (module === 'masters') body = <MastersProducts />;
  else if (isCat && catTab === 'catalogue') body = <WebCatalogue customerMode={customerMode} />;
  else body = <main style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--text-muted)', font: 'var(--text-body)' }}><div style={{ textAlign: 'center' }}><div style={{ font: 'var(--text-h1)', color: 'var(--text-secondary)' }}>{title}</div><div style={{ marginTop: 8 }}>Not in this kit yet — see guidelines/screen-inventory.md.</div></div></main>;
  return <Shell module={isCat ? 'catalogue' : module} onModule={m => { setModule(m); if (m === 'dispatch') setTab('ready'); if (m === 'carts') setCatTab('carts'); if (m === 'catalogue') setCatTab('catalogue'); }} title={title}
    tabs={isDispatch ? dispatchTabs : isCat ? catTabs : undefined} tab={isDispatch ? tab : catTab} onTab={isDispatch ? setTab : setCatTab} dark={dark} onDark={() => setDark(!dark)}
    right={isCat ? <Switch size="sm" checked={customerMode} onChange={setCustomerMode} label={<span style={{ font: 'var(--text-small)', color: customerMode ? 'var(--text-brand)' : 'var(--text-secondary)' }}>Customer mode</span>} style={{ marginLeft: 8 }} /> : null}>{body}</Shell>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<WebApp />);
