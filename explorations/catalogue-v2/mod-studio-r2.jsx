/* NEW DRAFTS · Studio › review 2 exemplar (13 Oct 2026). Plan: plans/review-2-studio.md §7. One compare pair for the owner:
   the designer terminal drawn in the house language (sand, espresso, one maroon line, Lucide) with the picture winning
   (decision 33: chat as a spine, the pane only on pick, the tuner over the pane; decision 31: six header buttons), and
   the phone review companion of the same state (decision 32). Not the deep-space look; that is what the compare is for.
   Loads after mod-studio.jsx and mod-studio-web.jsx: reuses their data (ST_CUTS, ST_CTX, stP, ST_TEMPLATES, ST_VERSIONS,
   ST_MSGS, ST_A, stImg, StMark, TuneBtn, ST_TABS) and the base chrome (WebShell3, frameF, Body, Hit, Orb, Meta, OutBtn,
   glass, veil, T.Btn, T.Chip, T.Dock). New blocks are prefixed StR2. */

const STR2_SEG = [['Stitch'], ['Moodboard'], ['History'], ['Memory', null, true], ['Photoshoots', 3], ['Upload centre', 12]]; /* six: Memory ▾ holds Settings (decision 31) */

/* the set on a sand stage: a white card with the twelve cells, numbered quietly, nothing picked yet */
function StR2Set({ T, w, h, r = 16, phone }) {
  return <div style={{ position: 'relative', width: w, height: h, borderRadius: r, overflow: 'hidden', background: '#fff', border: `1px solid ${T.line}`, boxShadow: T.dark ? 'none' : '0 10px 30px -18px rgba(36,23,18,.35)', flex: 'none' }}>
    {stImg(ST_A + 'cuts-grid.jpg')}
    {ST_CUTS.map(c => { const col = (c.n - 1) % 4, row = Math.floor((c.n - 1) / 4); return <span key={c.n} className="press" style={{ position: 'absolute', left: (col * 25) + '%', top: (row * 33.33) + '%', width: '25%', height: '33.33%' }}><span style={{ position: 'absolute', left: phone ? 4 : 8, top: phone ? 4 : 8, minWidth: phone ? 16 : 20, height: phone ? 16 : 20, padding: '0 5px', borderRadius: 10, background: 'rgba(36,23,18,.55)', color: '#fff', fontFamily: T.fontUI, fontSize: phone ? 9 : 10.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{c.n}</span></span>; })}
    <span style={{ position: 'absolute', left: 10, bottom: 10 }}><StMark /></span>
  </div>;
}

/* version strip in the house language: sand thumbs, the current one ringed in ink, "+" for a new generation */
function StR2Strip({ T, cur = 3, w = 46 }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{ST_VERSIONS.slice(0, 4).map(v => <span key={v.v} style={{ position: 'relative', width: w, height: Math.round(w * .86), borderRadius: 10, overflow: 'hidden', background: T.photoBg, flex: 'none', boxShadow: v.v === cur ? `0 0 0 2px ${T.ink}` : `inset 0 0 0 1px ${T.line}` }}>{stImg(v.src)}<span style={{ position: 'absolute', left: 5, bottom: 3, fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}>v{v.v}</span></span>)}<span className="press" style={{ width: w, height: Math.round(w * .86), borderRadius: 10, border: `1px dashed ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink2, flex: 'none' }}><Ic name="plus" size={14} /></span><span style={{ flex: 1 }} /><Meta T={T}>v3 of 3 · Cuts 4×3 · sales data on</Meta></div>;
}

/* the prompt box: one field, the template chips, Grid ▾, mic, the one maroon button */
function StR2Prompt({ T, phone }) {
  return <div style={{ borderRadius: 20, background: T.surface, border: `1px solid ${T.line2}`, boxShadow: T.dark ? 'none' : '0 8px 24px -16px rgba(36,23,18,.3)', padding: phone ? '8px 8px 8px 12px' : '10px 10px 10px 14px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Orb T={T} size={phone ? 22 : 24} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: phone ? 13.5 : 13, color: T.ink3 }}>Describe the design, or drop a picture</span>{!phone && <Hit T={T} icon="mic" size={30} iconSize={14} />}<span className="press" style={{ width: 34, height: 34, borderRadius: 17, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="arrow-up" size={16} sw={2.2} /></span></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8, overflow: 'hidden', maskImage: 'linear-gradient(90deg,#000 88%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,#000 88%,transparent)' }}><Hit T={T} icon="paperclip" size={26} iconSize={13} style={{ background: T.chipBg }} />{ST_TEMPLATES.slice(0, phone ? 4 : 8).map(([t, ic], i) => <T.Chip key={t} on={i === 0} outline={i !== 0} icon={ic} style={{ height: 26, fontSize: 11, padding: '0 9px' }}>{t}</T.Chip>)}<span style={{ width: 1, height: 18, background: T.line2, margin: '0 3px', flex: 'none' }} /><T.Chip outline icon="layout-grid" style={{ height: 26, fontSize: 11, padding: '0 9px' }}>4 × 3<Ic name="chevron-down" size={11} /></T.Chip></div>
  </div>;
}

/* the chat as a spine (decision 33): orb, the thread's name, the context thumbs with the Main ring, open chevron */
function StR2Spine({ T }) {
  return <div style={{ width: 56, flex: 'none', background: T.surface, borderRight: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 10 }}>
    <Hit T={T} icon="panel-left-open" size={28} iconSize={14} style={{ background: T.chipBg }} />
    <Orb T={T} on size={26} />
    <span style={{ writingMode: 'vertical-rl', fontFamily: T.fontUI, fontSize: 11, color: T.ink3, letterSpacing: '.08em', whiteSpace: 'nowrap' }}>Blouse · Multicolour floral · 4 prompts</span>
    <span style={{ flex: 1 }} />
    {ST_CTX.slice(0, 4).map((it, i) => <span key={i} style={{ width: 34, height: 40, borderRadius: 8, overflow: 'hidden', background: T.photoBg, flex: 'none', boxShadow: it.main ? `0 0 0 2px ${T.ink}` : `inset 0 0 0 1px ${T.line}` }}>{stImg(stP(it.code).src, stP(it.code).pos)}</span>)}
    <span style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3 }}>+3</span>
    <Hit T={T} icon="plus" size={28} iconSize={14} style={{ border: `1px dashed ${T.line2}`, borderRadius: 8 }} />
  </div>;
}

/* W · the terminal, picture first: spine · stage with the set, strip and prompt · the pane as a handle until a pick */
function WebStR2Terminal({ T }) {
  return <WebShell3 T={T} module="Studio" crumb={['Studio', 'Stitch', 'Blouse', 'Multicolour floral · cuts']} section="Stitch" seg={STR2_SEG} active="Stitch" tabs={ST_TABS('Stitch · Multicolour floral')} pane={<div />} paneTitle="Set options · pick a cell" paneCollapsed headerRight={<TuneBtn T={T} />}>
    <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
      <StR2Spine T={T} />
      <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '12px 24px 16px', background: T.bg2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Set · Cuts 4×3</span><Meta T={T}>12 tiles · pick one to open it · 8337 main + 5 refs</Meta><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', gap: 4 }}><Hit T={T} icon="thumbs-up" size={30} iconSize={14} style={{ border: `1px solid ${T.line2}`, borderRadius: 15 }} /><Hit T={T} icon="thumbs-down" size={30} iconSize={14} style={{ border: `1px solid ${T.line2}`, borderRadius: 15 }} /></span><OutBtn T={T} small icon="columns-2">Compare</OutBtn><OutBtn T={T} small icon="maximize-2">Full screen</OutBtn><OutBtn T={T} small icon="share-2">Share</OutBtn></div>
        <div style={{ flex: 1, minHeight: 0, display: 'grid', placeItems: 'center', padding: '10px 0' }}><StR2Set T={T} w={640} h={436} /></div>
        <StR2Strip T={T} />
        <div style={{ marginTop: 10, flex: 'none' }}><StR2Prompt T={T} /></div>
      </div>
    </div>
  </WebShell3>;
}

/* P · the review companion of the same state: Stitch's reply with the set as a card, keep / discard / save, the prompt tray */
function ScreenStR2Review({ T }) {
  return frameF(T, <>
    <div style={{ padding: '54px 10px 10px 8px', background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, display: 'flex', alignItems: 'center', gap: 4 }}>
      <Hit T={T} icon="chevron-left" size={40} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.1 }}>Multicolour floral · cuts</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>Blouse track · 8337 main + 5 refs · sales data on</Meta></span><Orb T={T} on size={30} /><Hit T={T} icon="ellipsis-vertical" size={40} />
    </div>
    <Body style={{ padding: '12px 14px 200px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div style={{ maxWidth: '86%', padding: '7px 12px', borderRadius: '16px 16px 4px 16px', background: T.chipBg, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Take 8337 as the main, the other blouses as references, a 4 × 3 grid…</div></div>
      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}><span style={{ width: 3, borderRadius: 2, background: T.accentLine, flex: 'none' }} /><div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.fontDisplay, fontSize: 16.5, lineHeight: 1.35, color: T.ink, fontWeight: 500 }}>{ST_MSGS[1].text}</div>
        <div style={{ marginTop: 10 }}><StR2Set T={T} w={333} h={226} r={14} phone /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}><Meta T={T}>Cuts 4×3 · v3 · 12 tiles</Meta><span style={{ flex: 1 }} /><span className="press" style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}>Open on the canvas</span><Ic name="chevron-right" size={12} color={T.ink3} /></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><OutBtn T={T} small icon="x" style={{ flex: 1, justifyContent: 'center' }}>Discard</OutBtn><OutBtn T={T} small icon="flask-conical" style={{ flex: 1, justifyContent: 'center' }}>Save</OutBtn><T.Btn small icon="check" style={{ flex: 1, height: 30 }}>Keep</T.Btn></div>
      </div></div>
    </Body>
  </>, <>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, padding: 8, borderRadius: 24, ...glass(T) }}><StR2Prompt T={T} phone /></div>
    <T.Dock active="More" noCart />
  </>);
}

(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Studio', note: 'review 2 exemplar · the terminal in the house language, the picture first (decisions 30, 31, 32, 33); compare against nw-2 and n-2', subs: [
  { name: 'Review 2 · exemplar', flow: 'the set lands → chat to the spine, the pane waits for a pick → the phone reviews the same set', phone: [['Review 2 · phone review companion · the set as a card, keep / discard / save', ScreenStR2Review]], web: [['Review 2 · terminal in the house language · spine, stage, pane as a handle', WebStR2Terminal]] },
] });

Object.assign(window, { STR2_SEG, StR2Set, StR2Strip, StR2Prompt, StR2Spine, WebStR2Terminal, ScreenStR2Review });
