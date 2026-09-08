const { BottomBar } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const NAV = [{ key: 'home', label: 'Home', icon: 'house' }, { key: 'catalogue', label: 'Catalogue', icon: 'layout-grid' }, { key: 'carts', label: 'Carts', icon: 'shopping-bag' }, { key: 'crm', label: 'CRM', icon: 'users' }, { key: 'godown', label: 'Godown', icon: 'warehouse' }, { key: 'chat', label: 'Chat', icon: 'message-circle' }];
function Phone({ start, startDesign }) {
  const [screen, setScreen] = React.useState(start);
  const [design, setDesign] = React.useState(startDesign || D.designs[0]);
  const [cart, setCart] = React.useState(8);
  const [dark, setDark] = React.useState(false);
  const mod = screen === 'approvals' ? 'home' : screen === 'product' ? 'catalogue' : screen;
  const bump = () => setCart(c => c + 1);
  return (
    <IOSDevice width={390} height={844}>
      <div data-theme={dark ? 'dark' : undefined} style={{ position: 'relative', height: '100%', background: 'var(--bg-page)', color: 'var(--text-primary)', overflow: 'hidden' }}>
        {screen === 'catalogue' && <><Catalogue onOpen={d => { setDesign(d); setScreen('product'); }} onAdd={bump} cartCount={cart} dark={dark} onDark={() => setDark(!dark)} /><CatalogueDock onScan={() => {}} /></>}
        {screen === 'product' && <ProductPage design={design} onBack={() => setScreen('catalogue')} onAdd={bump} />}
        {screen === 'approvals' && <Approvals />}
        {(screen === 'home' || screen === 'carts' || screen === 'crm' || screen === 'godown' || screen === 'chat') && <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: 24 }}><div><div style={{ font: 'var(--text-h1)', color: 'var(--text-secondary)' }}>{NAV.find(n => n.key === screen).label}</div><div style={{ marginTop: 8, font: 'var(--text-small)' }}>Not in this kit yet.</div></div></div>}
        <div style={{ position: 'absolute', left: 12, right: 12, bottom: 22 }}><BottomBar value={mod} onChange={k => setScreen(k === 'home' ? 'approvals' : k)} items={NAV.map(n => n.key === 'carts' ? { ...n, count: cart } : n)} /></div>
      </div>
    </IOSDevice>
  );
}
function MobileApp() {
  return (
    <div style={{ minHeight: '100%', display: 'flex', gap: 40, alignItems: 'flex-start', justifyContent: 'center', padding: 40, background: 'var(--sand-200)' }}>
      <Phone start="catalogue" />
      <Phone start="product" startDesign={D.designs[1]} />
      <Phone start="approvals" />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<MobileApp />);
