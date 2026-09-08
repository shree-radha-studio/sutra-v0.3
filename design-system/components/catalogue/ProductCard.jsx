import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';
import { ColourDots } from './ColourDots.jsx';
import { PriceText } from './PriceText.jsx';
/** The picture-first grid card. Photo fills; text is one quiet line beneath. */
export function ProductCard({ src, code, name, price, colours = [], activeColour, onColour, tag, tagTone = 'brand', note, noteTone = 'danger', stats, onAdd, onClick, selected = false, width = 220, ratio = 1.25, leadPrice = true, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ width, cursor: onClick ? 'pointer' : 'default', ...style }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / ' + ratio, borderRadius: 'var(--r-photo)', overflow: 'hidden', background: 'var(--photo-backdrop)', boxShadow: selected ? '0 0 0 2px var(--accent), var(--shadow-2)' : hover ? 'var(--shadow-2)' : 'none', transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)', transform: hover ? 'var(--hover-lift)' : 'none' }}>
        {src ? <img src={src} alt={name || code} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform var(--dur-page) var(--ease-out)', transform: hover ? 'scale(1.02)' : 'none' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: 'var(--text-display)', fontSize: Math.round(width / 6), color: 'var(--text-muted)' }}>{code}</div>}
        {tag && <div style={{ position: 'absolute', top: 10, left: 10 }}><Badge tone={tagTone} variant="solid">{tag}</Badge></div>}
        {onAdd && <button type="button" aria-label="Add to cart" onClick={e => { e.stopPropagation(); onAdd(); }} style={{ position: 'absolute', top: 10, right: 10, width: 40, height: 40, borderRadius: 20, border: 0, background: 'var(--surface-glass)', backdropFilter: 'var(--blur-glass)', color: 'var(--text-primary)', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-1)' }}><Icon name="plus" size={18} /></button>}
        {colours.length > 1 && <div style={{ position: 'absolute', left: 10, bottom: 10, padding: '6px 8px', borderRadius: 'var(--r-pill)', background: 'var(--surface-glass)', backdropFilter: 'var(--blur-glass)', display: 'flex' }}><ColourDots colours={colours} active={activeColour} onSelect={onColour} size={14} /></div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginTop: 10, padding: '0 2px' }}>
        <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><span style={{ font: 'var(--text-code)', fontSize: 14, color: 'var(--text-primary)' }}>{code}</span>{name && <span style={{ font: 'var(--text-design-name)', color: 'var(--text-secondary)', marginLeft: 8 }}>{name}</span>}</span>
        <PriceText value={price} size={17} lead={leadPrice} />
      </div>
      {note && <div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: noteTone === 'danger' ? 'var(--danger-500)' : noteTone === 'ok' ? 'var(--ok-500)' : 'var(--text-muted)', marginTop: 6, padding: '0 2px' }}>{note}</div>}
      {stats && <div style={{ display: 'flex', gap: 6, marginTop: 8, padding: 8, background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)' }}>{Object.entries(stats).map(([k, v]) => <div key={k} style={{ flex: 1, textAlign: 'center' }}><div style={{ font: 'var(--text-overline)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</div><div style={{ font: 'var(--text-label)', fontSize: 13, marginTop: 4, fontFeatureSettings: 'var(--num)', color: v === 0 ? 'var(--text-muted)' : 'var(--text-primary)' }}>{v}</div></div>)}</div>}
    </div>
  );
}
