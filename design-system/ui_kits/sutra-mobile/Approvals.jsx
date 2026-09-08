const { Badge, Button, IconButton, Tag, Stepper, Icon, Thumb, StatTile, Card } = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
function Score({ label, v, max = 100, tone }) { const c = tone || (v >= 70 ? 'var(--ok-500)' : v >= 40 ? 'var(--warn-500)' : 'var(--danger-500)'); return <div style={{ flex: 1, minWidth: 0 }}><div style={{ font: 'var(--text-overline)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}><span style={{ font: 'var(--text-label)', fontSize: 14, fontFeatureSettings: 'var(--num)' }}>{v}{max === 100 && typeof v === 'number' ? '' : ''}</span><span style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--bg-sunken)', overflow: 'hidden' }}><span style={{ display: 'block', width: (typeof v === 'number' ? v : 60) + '%', height: '100%', background: c }} /></span></div></div>; }
function Approvals() {
  const c = D.customers[0];
  const [lines, setLines] = React.useState([['2798', 'Sky', 4], ['2798', 'Peach', 0], ['2798', 'Purple', 1], ['6002', 'Lilac', 3]]);
  const total = lines.reduce((s, l) => s + l[2] * (D.byCode[l[0]].price || 0), 0);
  return (
    <div style={{ height: '100%', overflow: 'auto', paddingTop: 58, paddingBottom: 110 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}><IconButton icon="chevron-left" variant="ghost" size="sm" label="Back" /><span style={{ font: 'var(--text-h2)', fontSize: 24 }}>Approvals</span><span style={{ flex: 1 }} /><Badge tone="brand" variant="solid" size="md">3 of 7</Badge></div>
      <div style={{ display: 'flex', gap: 6, padding: '12px 16px 0', overflow: 'auto', scrollbarWidth: 'none' }}><Tag selected onClick={() => {}}>Sale orders 4</Tag><Tag onClick={() => {}}>Returns 2</Tag><Tag onClick={() => {}}>Overages 1</Tag><Tag onClick={() => {}}>Costing</Tag></div>
      <Card style={{ margin: '14px 16px 0' }} padding={16}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ font: 'var(--text-title)', fontSize: 18 }}>Ramleela Fashion</span><Badge tone="ok">Platinum</Badge><span style={{ flex: 1 }} /><IconButton icon="phone" size="sm" variant="soft" label="Call" /></div>
        <div style={{ font: 'var(--text-small)', color: 'var(--text-muted)', marginTop: 2 }}>Surat · Raghani Co. · Deepak · since 30/08/24</div>
        <div style={{ display: 'flex', gap: 14, marginTop: 14 }}><Score label="Payment" v={78} /><Score label="Customer" v={68} /><Score label="GR ratio" v={40} tone="var(--danger-500)" /></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}><StatTile compact label="FY billing" value="₹4.5L" style={{ flex: 1, minWidth: 0, padding: '8px 10px' }} /><StatTile compact label="Total pcs" value={543} style={{ flex: 1, minWidth: 0, padding: '8px 10px' }} /><StatTile compact label="Overdue" value="₹62,400" tone="danger" style={{ flex: 1.3, minWidth: 0, padding: '8px 10px' }} /></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}><Badge tone="ok">High tier 67%</Badge><Badge tone="warn">Mid 25%</Badge><Badge tone="danger">Low 8%</Badge><Badge tone="brand">Top 30</Badge><Badge tone="gold">Hot</Badge></div>
      </Card>
      <Card style={{ margin: '12px 16px 0' }} padding={16}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Order</span><span style={{ font: 'var(--text-code)', fontSize: 15 }}>SO-3455</span><span style={{ flex: 1 }} /><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>In-cabin book · 10/09/25</span></div>
        {['2798', '6002'].map(code => { const d = D.byCode[code]; const ls = lines.map((l, i) => [l, i]).filter(([l]) => l[0] === code); return (
          <div key={code} style={{ display: 'flex', gap: 12, marginTop: 14 }}>
            <Thumb src={d.src} code={code} size={72} ratio={1.3} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ font: 'var(--text-code)', fontSize: 14 }}>{code}</span><span style={{ font: 'var(--text-design-name)', color: 'var(--text-secondary)' }}>{d.name}</span><span style={{ flex: 1 }} /><span style={{ font: 'var(--text-price)', fontSize: 15 }}>₹{d.price.toLocaleString('en-IN')}</span></div>
              {ls.map(([l, i]) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: D.cols[l[1]] }} /><span style={{ font: 'var(--text-small)', flex: 1 }}>{l[1]}</span><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{D.byCode[code].free} in stock</span><Stepper size="sm" value={l[2]} onChange={v => setLines(lines.map((x, j) => j === i ? [x[0], x[1], v] : x))} /></div>)}
            </div>
          </div>); })}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}><span style={{ font: 'var(--text-small)', color: 'var(--text-muted)' }}>{lines.reduce((s, l) => s + l[2], 0)} pcs · due 20 days · priority 3</span><span style={{ font: 'var(--text-price)', fontSize: 22 }}>₹{total.toLocaleString('en-IN')}</span></div>
        <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--warn-100)', color: 'var(--warn-600)', borderRadius: 'var(--r-sm)', font: 'var(--text-small)' }}>Note: 2018 ke red ka stock check karna hai</div>
      </Card>
      <div style={{ display: 'flex', gap: 10, padding: '14px 16px 0' }}><Button variant="secondary" size="lg" block icon="x">Reject</Button><Button variant="success" size="lg" block icon="check">Approve</Button></div>
      <div style={{ textAlign: 'center', marginTop: 12 }}><Tag icon="arrow-up-right" onClick={() => {}}>Escalate to owner</Tag></div>
    </div>
  );
}
Object.assign(window, { Approvals });
