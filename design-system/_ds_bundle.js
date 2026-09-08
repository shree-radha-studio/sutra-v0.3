/* @ds-bundle: {"format":4,"namespace":"SutraDesignSystem_58929b","components":[{"name":"ColourDots","sourcePath":"components/catalogue/ColourDots.jsx"},{"name":"PriceText","sourcePath":"components/catalogue/PriceText.jsx"},{"name":"ProductCard","sourcePath":"components/catalogue/ProductCard.jsx"},{"name":"Thumb","sourcePath":"components/catalogue/Thumb.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"StatTile","sourcePath":"components/core/StatTile.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Tooltip","sourcePath":"components/core/Tooltip.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SearchBar","sourcePath":"components/forms/SearchBar.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"BottomBar","sourcePath":"components/navigation/BottomBar.jsx"},{"name":"SideNav","sourcePath":"components/navigation/SideNav.jsx"}],"sourceHashes":{"components/catalogue/ColourDots.jsx":"d13585631b0e","components/catalogue/PriceText.jsx":"93d775eaa6ba","components/catalogue/ProductCard.jsx":"827d68785aca","components/catalogue/Thumb.jsx":"ee53d07adea0","components/core/Badge.jsx":"a86a9e5f3bad","components/core/Button.jsx":"c4a203ee3884","components/core/Card.jsx":"d470befc0c93","components/core/Icon.jsx":"97370c6dd1b8","components/core/IconButton.jsx":"680fda6b3480","components/core/SegmentedControl.jsx":"c1dc6b290ee6","components/core/StatTile.jsx":"bf0d5536b7fe","components/core/Tabs.jsx":"78b5b166009a","components/core/Tag.jsx":"f9a435904caf","components/core/Tooltip.jsx":"7cb8a006a0af","components/feedback/Dialog.jsx":"1b61a6f6f9ad","components/feedback/Toast.jsx":"61729d4e7e3f","components/forms/Checkbox.jsx":"c4b985e37b33","components/forms/Input.jsx":"6a09d3f3ea45","components/forms/Radio.jsx":"ff6a39ddec23","components/forms/SearchBar.jsx":"1cbe7f17272d","components/forms/Select.jsx":"cb186573fae3","components/forms/Stepper.jsx":"112743b58a0e","components/forms/Switch.jsx":"2a2dab69873f","components/navigation/BottomBar.jsx":"6a6a0c5c4174","components/navigation/SideNav.jsx":"fec1285d7168","ui_kits/catalogue-explorations/common.jsx":"837892fb46de","ui_kits/catalogue-explorations/screens.jsx":"6e9ad471dcff","ui_kits/catalogue-explorations/themes.jsx":"40b292e56aa8","ui_kits/data.js":"3e9afaafca47","ui_kits/sutra-mobile/Approvals.jsx":"0a7320d2bee5","ui_kits/sutra-mobile/Catalogue.jsx":"b33eccbfeabb","ui_kits/sutra-mobile/MobileApp.jsx":"d09a55760198","ui_kits/sutra-mobile/ProductPage.jsx":"8cdaf6c6ce94","ui_kits/sutra-mobile/ios-frame.jsx":"24642b887be3","ui_kits/sutra-web/DispatchPacking.jsx":"bb3b0e1535f2","ui_kits/sutra-web/DispatchReady.jsx":"7082521f87ba","ui_kits/sutra-web/MastersProducts.jsx":"178a3713ef23","ui_kits/sutra-web/Shell.jsx":"4925171c48e2","ui_kits/sutra-web/WebApp.jsx":"00bfe46ad18a","ui_kits/sutra-web/WebCatalogue.jsx":"6488534b4be3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SutraDesignSystem_58929b = window.SutraDesignSystem_58929b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/catalogue/ColourDots.jsx
try { (() => {
/** Colour variants of a design as small swatches; active = ring. */
function ColourDots({
  colours = [],
  active,
  onSelect,
  size = 16,
  max = 6,
  style
}) {
  const shown = colours.slice(0, max),
    more = colours.length - shown.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(size * .4),
      ...style
    }
  }, shown.map(c => {
    const on = c.name === active;
    return /*#__PURE__*/React.createElement("button", {
      key: c.name,
      type: "button",
      title: c.name,
      "aria-label": c.name,
      onClick: () => onSelect && onSelect(c.name),
      style: {
        width: size,
        height: size,
        borderRadius: '50%',
        background: c.hex,
        border: 0,
        padding: 0,
        cursor: onSelect ? 'pointer' : 'default',
        boxShadow: on ? '0 0 0 2px var(--surface-card), 0 0 0 3.5px var(--accent)' : 'inset 0 0 0 1px rgba(36,23,18,.15)',
        transition: 'box-shadow var(--dur-fast)'
      }
    });
  }), more > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-overline)',
      color: 'var(--text-muted)',
      marginLeft: 2
    }
  }, "+", more));
}
Object.assign(__ds_scope, { ColourDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalogue/ColourDots.jsx", error: String((e && e.message) || e) }); }

// components/catalogue/PriceText.jsx
try { (() => {
/** Catalogue price. The leading digit is 5% larger so the eye rests on the 3 in 3999, not the 4000 the mind rounds to. */
function PriceText({
  value,
  size = 18,
  lead = true,
  currency = '₹',
  tbd = 'TBD',
  color = 'var(--text-price)',
  weight = 500,
  style
}) {
  if (value == null || value === '') return /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-price)',
      fontSize: size,
      color: 'var(--text-muted)',
      fontWeight: weight,
      ...style
    }
  }, tbd);
  const s = typeof value === 'number' ? value.toLocaleString('en-IN') : String(value);
  const m = s.match(/^(\d)(.*)$/);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      fontFamily: 'var(--font-display)',
      fontWeight: weight,
      fontSize: size,
      lineHeight: 1,
      color,
      whiteSpace: 'nowrap',
      fontFeatureSettings: '"lnum" 1',
      ...style
    }
  }, currency && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: Math.round(size * .78),
      marginRight: Math.max(1, Math.round(size * .06)),
      color: 'var(--text-secondary)'
    }
  }, currency), lead && m ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: Math.round(size * 1.05)
    }
  }, m[1]), /*#__PURE__*/React.createElement("span", null, m[2])) : s);
}
Object.assign(__ds_scope, { PriceText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalogue/PriceText.jsx", error: String((e && e.message) || e) }); }

// components/catalogue/Thumb.jsx
try { (() => {
/** Photo-first identifier. Shows the picture; when none, the design code on the sand backdrop. Never an empty box. */
function Thumb({
  src,
  code,
  size = 56,
  ratio = 1,
  radius = 'var(--r-sm)',
  colour,
  style
}) {
  const w = typeof size === 'number' ? size : undefined,
    h = typeof size === 'number' ? Math.round(size * ratio) : undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: w,
      height: h,
      flex: 'none',
      borderRadius: radius,
      overflow: 'hidden',
      background: colour || 'var(--photo-backdrop)',
      display: 'grid',
      placeItems: 'center',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: code || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: Math.max(9, Math.min(14, (w || 56) / 4.6)),
      color: colour ? 'rgba(255,255,255,.9)' : 'var(--text-muted)',
      textShadow: colour ? '0 1px 2px rgba(0,0,0,.25)' : 'none'
    }
  }, code));
}
Object.assign(__ds_scope, { Thumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalogue/Thumb.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const T = {
  neutral: ['var(--bg-sunken)', 'var(--text-secondary)', 'var(--ink-500)'],
  brand: ['var(--accent-soft)', 'var(--text-brand)', 'var(--accent)'],
  gold: ['var(--gold-100)', 'var(--gold-700)', 'var(--gold-500)'],
  ok: ['var(--ok-100)', 'var(--ok-600)', 'var(--ok-500)'],
  warn: ['var(--warn-100)', 'var(--warn-600)', 'var(--warn-500)'],
  danger: ['var(--danger-100)', 'var(--danger-600)', 'var(--danger-500)'],
  info: ['var(--info-100)', 'var(--info-600)', 'var(--info-500)']
};
/** Status pill — PLATINUM, OPEN, PACKED, -12d left. Caps, 10.5px. */
function Badge({
  tone = 'neutral',
  variant = 'soft',
  dot = false,
  size = 'sm',
  children,
  style
}) {
  const [bg, fg, solid] = T[tone] || T.neutral;
  const isSolid = variant === 'solid';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: size === 'md' ? 24 : 20,
      padding: size === 'md' ? '0 10px' : '0 8px',
      borderRadius: 'var(--r-pill)',
      background: isSolid ? solid : variant === 'outline' ? 'transparent' : bg,
      color: isSolid ? '#fff' : fg,
      border: variant === 'outline' ? '1px solid ' + solid : '1px solid transparent',
      fontFamily: 'var(--font-ui)',
      fontWeight: 500,
      fontSize: size === 'md' ? 11.5 : 10.5,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      fontFeatureSettings: 'var(--num)',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: isSolid ? 'rgba(255,255,255,.85)' : solid
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/** Sand-white surface. ring = priority/customer colour outline. */
function Card({
  children,
  padding = 'var(--card-pad)',
  ring,
  bar,
  hoverable = false,
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: hover && hoverable ? 'var(--surface-card-hover)' : 'var(--surface-card)',
      borderRadius: 'var(--r-card)',
      padding,
      boxShadow: selected ? '0 0 0 2px var(--accent), var(--shadow-2)' : hover && hoverable ? 'var(--shadow-2)' : 'var(--shadow-1)',
      border: ring ? '2px solid ' + ring : '1px solid var(--border-subtle)',
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      transform: hover && hoverable ? 'var(--hover-lift)' : 'none',
      ...style
    }
  }, bar && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 5,
      background: bar
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Lucide glyph (1.6px stroke). Needs window.lucide (UMD) loaded; falls back to a ring. */
function Icon({
  name = 'circle',
  size = 18,
  strokeWidth = 1.6,
  style,
  ...rest
}) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  const key = String(name).split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  let node = lib && lib[key];
  // lucide UMD ships either [[tag, attrs], …] or ['svg', attrs, [[tag, attrs], …]] depending on version
  if (node && typeof node[0] === 'string') node = node[2];
  const kids = Array.isArray(node) ? node.filter(n => Array.isArray(n) && typeof n[0] === 'string') : null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flex: 'none',
      display: 'inline-block',
      ...style
    }
  }, rest), kids && kids.length ? kids.map((n, i) => React.createElement(n[0], {
    ...(n[1] || {}),
    key: i
  })) : /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/catalogue/ProductCard.jsx
try { (() => {
/** The picture-first grid card. Photo fills; text is one quiet line beneath. */
function ProductCard({
  src,
  code,
  name,
  price,
  colours = [],
  activeColour,
  onColour,
  tag,
  tagTone = 'brand',
  note,
  noteTone = 'danger',
  stats,
  onAdd,
  onClick,
  selected = false,
  width = 220,
  ratio = 1.25,
  leadPrice = true,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '1 / ' + ratio,
      borderRadius: 'var(--r-photo)',
      overflow: 'hidden',
      background: 'var(--photo-backdrop)',
      boxShadow: selected ? '0 0 0 2px var(--accent), var(--shadow-2)' : hover ? 'var(--shadow-2)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      transform: hover ? 'var(--hover-lift)' : 'none'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || code,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transition: 'transform var(--dur-page) var(--ease-out)',
      transform: hover ? 'scale(1.02)' : 'none'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      font: 'var(--text-display)',
      fontSize: Math.round(width / 6),
      color: 'var(--text-muted)'
    }
  }, code), tag && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: tagTone,
    variant: "solid"
  }, tag)), onAdd && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Add to cart",
    onClick: e => {
      e.stopPropagation();
      onAdd();
    },
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      border: 0,
      background: 'var(--surface-glass)',
      backdropFilter: 'var(--blur-glass)',
      color: 'var(--text-primary)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-1)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 18
  })), colours.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 10,
      bottom: 10,
      padding: '6px 8px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--surface-glass)',
      backdropFilter: 'var(--blur-glass)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ColourDots, {
    colours: colours,
    active: activeColour,
    onSelect: onColour,
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 8,
      marginTop: 10,
      padding: '0 2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 14,
      color: 'var(--text-primary)'
    }
  }, code), name && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-design-name)',
      color: 'var(--text-secondary)',
      marginLeft: 8
    }
  }, name)), /*#__PURE__*/React.createElement(__ds_scope.PriceText, {
    value: price,
    size: 17,
    lead: leadPrice
  })), note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: noteTone === 'danger' ? 'var(--danger-500)' : noteTone === 'ok' ? 'var(--ok-500)' : 'var(--text-muted)',
      marginTop: 6,
      padding: '0 2px'
    }
  }, note), stats && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 8,
      padding: 8,
      background: 'var(--bg-raised)',
      borderRadius: 'var(--r-sm)'
    }
  }, Object.entries(stats).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13,
      marginTop: 4,
      fontFeatureSettings: 'var(--num)',
      color: v === 0 ? 'var(--text-muted)' : 'var(--text-primary)'
    }
  }, v)))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalogue/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: 'var(--control-h-sm)',
  md: 'var(--control-h-md)',
  lg: 'var(--control-h-lg)'
};
const FS = {
  sm: '12.5px',
  md: '13.5px',
  lg: '15px'
};
const PX = {
  sm: '12px',
  md: '18px',
  lg: '24px'
};
const V = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--accent-on)',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)'
  },
  soft: {
    background: 'var(--accent-soft)',
    color: 'var(--text-brand)',
    border: '1px solid transparent'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent'
  },
  danger: {
    background: 'var(--danger-500)',
    color: '#fff',
    border: '1px solid transparent'
  },
  success: {
    background: 'var(--ok-500)',
    color: '#fff',
    border: '1px solid transparent'
  },
  inverse: {
    background: 'var(--surface-inverse)',
    color: 'var(--text-inverse)',
    border: '1px solid transparent'
  }
};
/** Pill button. Primary = brand maroon; use once per view. */
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  caps = false,
  block = false,
  loading = false,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = V[variant] || V.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled || loading,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: H[size],
      padding: '0 ' + PX[size],
      borderRadius: 'var(--r-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)',
      fontWeight: 500,
      fontSize: FS[size],
      letterSpacing: caps ? 'var(--tracking-wide)' : '0.01em',
      textTransform: caps ? 'uppercase' : 'none',
      whiteSpace: 'nowrap',
      opacity: disabled ? 0.45 : 1,
      transition: 'transform var(--dur-fast) var(--ease-out), filter var(--dur-fast), box-shadow var(--dur-fast)',
      transform: press ? 'var(--press-scale)' : hover ? 'var(--hover-lift)' : 'none',
      filter: hover && !press ? 'brightness(1.04)' : 'none',
      boxShadow: hover && variant !== 'ghost' ? 'var(--shadow-2)' : 'none',
      ...v,
      ...style
    }
  }, rest), loading ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "loader-2",
    size: size === 'sm' ? 14 : 16,
    style: {
      animation: 'spin 1s linear infinite'
    }
  }) : icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 14 : 16
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: size === 'sm' ? 14 : 16
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const S = {
  sm: 32,
  md: 40,
  lg: 48
};
const V = {
  soft: {
    background: 'var(--bg-raised)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)'
  },
  card: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-1)'
  },
  brand: {
    background: 'var(--accent)',
    color: 'var(--accent-on)',
    border: '1px solid transparent'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent'
  },
  glass: {
    background: 'var(--surface-glass)',
    color: 'var(--text-primary)',
    border: '1px solid rgba(255,255,255,.5)',
    backdropFilter: 'var(--blur-glass)'
  }
};
/** Round icon-only button. */
function IconButton({
  icon = 'circle',
  size = 'md',
  variant = 'soft',
  label,
  active = false,
  badge,
  disabled,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const px = S[size] || S.md;
  const v = active ? V.brand : V[variant] || V.soft;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label || icon,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: px,
      height: px,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast)',
      transform: hover ? 'var(--hover-lift)' : 'none',
      ...v,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 15 : size === 'lg' ? 20 : 17
  }), badge != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 9,
      background: 'var(--gold-500)',
      color: '#fff',
      font: 'var(--text-overline)',
      fontSize: 10.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFeatureSettings: 'var(--num)'
    }
  }, badge));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
/** Compact icon/label switch (grid ⇄ list, density). */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style
}) {
  const h = size === 'sm' ? 30 : 36;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      gap: 2,
      background: 'var(--bg-sunken)',
      borderRadius: 'var(--r-pill)',
      ...style
    }
  }, options.map(o => {
    const a = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      onClick: () => onChange && onChange(o.value),
      title: o.label,
      "aria-pressed": a,
      style: {
        height: h - 6,
        minWidth: h - 6,
        padding: o.label && !o.icon ? '0 12px' : '0 9px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        border: 0,
        borderRadius: 'var(--r-pill)',
        cursor: 'pointer',
        background: a ? 'var(--surface-card)' : 'transparent',
        color: a ? 'var(--text-brand)' : 'var(--text-secondary)',
        boxShadow: a ? 'var(--shadow-1)' : 'none',
        font: 'var(--text-small)',
        fontWeight: 500,
        transition: 'background var(--dur-fast)'
      }
    }, o.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: o.icon,
      size: 15
    }), o.icon ? null : o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/StatTile.jsx
try { (() => {
/** Label-over-number metric tile. Big number in Jost tabular; optional tone + sub note. */
function StatTile({
  label,
  value,
  sub,
  tone,
  compact = false,
  style
}) {
  const c = tone === 'danger' ? 'var(--danger-500)' : tone === 'ok' ? 'var(--ok-500)' : tone === 'warn' ? 'var(--warn-500)' : tone === 'brand' ? 'var(--text-brand)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--r-md)',
      padding: compact ? '10px 12px' : '14px 16px',
      minWidth: compact ? 96 : 140,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-metric)',
      fontSize: compact ? 18 : 24,
      color: c,
      marginTop: compact ? 6 : 10,
      fontFeatureSettings: 'var(--num)'
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, sub));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
/** Module / node tabs. underline = the signature maroon rule; pill = segmented look. */
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  caps = true,
  style
}) {
  const under = variant === 'underline';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      alignItems: under ? 'flex-end' : 'center',
      gap: under ? 26 : 6,
      padding: under ? '0 4px' : 4,
      borderBottom: under ? '1px solid var(--border-subtle)' : 'none',
      background: under ? 'transparent' : 'var(--bg-sunken)',
      borderRadius: under ? 0 : 'var(--r-pill)',
      ...style
    }
  }, items.map(it => {
    const active = it.key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      role: "tab",
      type: "button",
      "aria-selected": active,
      onClick: () => onChange && onChange(it.key),
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: under ? size === 'sm' ? 36 : 44 : size === 'sm' ? 30 : 36,
        padding: under ? '0 2px' : '0 16px',
        border: 0,
        cursor: 'pointer',
        background: !under && active ? 'var(--surface-card)' : 'transparent',
        borderRadius: under ? 0 : 'var(--r-pill)',
        boxShadow: !under && active ? 'var(--shadow-1)' : 'none',
        color: active ? under ? 'var(--text-brand)' : 'var(--text-primary)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 500,
        fontSize: size === 'sm' ? 12 : 13,
        letterSpacing: caps ? 'var(--tracking-wide)' : 0,
        textTransform: caps ? 'uppercase' : 'none',
        whiteSpace: 'nowrap',
        transition: 'color var(--dur-fast)'
      }
    }, it.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 15
    }), it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 20,
        height: 18,
        padding: '0 6px',
        borderRadius: 9,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: active ? 'var(--accent)' : 'var(--bg-sunken)',
        color: active ? 'var(--accent-on)' : 'var(--text-secondary)',
        fontSize: 10.5,
        fontFeatureSettings: 'var(--num)',
        letterSpacing: 0
      }
    }, it.count), under && active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        borderRadius: 1,
        background: 'var(--accent)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/** Filter / selection chip. Removable (onRemove) or toggleable (selected + onClick). */
function Tag({
  children,
  selected = false,
  icon,
  onRemove,
  onClick,
  colour,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    role: onClick ? 'button' : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 30,
      padding: '0 12px',
      borderRadius: 'var(--r-pill)',
      background: selected ? 'var(--accent)' : hover && onClick ? 'var(--surface-card-hover)' : 'var(--surface-card)',
      color: selected ? 'var(--accent-on)' : 'var(--text-primary)',
      border: '1px solid ' + (selected ? 'transparent' : 'var(--border-default)'),
      font: 'var(--text-small)',
      fontWeight: 500,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-fast)',
      ...style
    }
  }, colour && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 5,
      background: colour,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.12)'
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 13
  }), children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'inline-flex',
      marginRight: -4,
      opacity: .7,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Tooltip.jsx
try { (() => {
/** Hover label. Espresso bubble, 8px rise. */
function Tooltip({
  label,
  children,
  side = 'top'
}) {
  const [on, setOn] = React.useState(false);
  const pos = side === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false)
  }, children, on && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      padding: '6px 10px',
      borderRadius: 'var(--r-sm)',
      font: 'var(--text-small)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-3)',
      zIndex: 'var(--z-float)',
      animation: 'var(--fade-in)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/** Centered sheet on a warm scrim. On phone, pass sheet to dock it to the bottom. */
function Dialog({
  open = true,
  title,
  eyebrow,
  children,
  actions,
  onClose,
  width = 480,
  sheet = false,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-overlay)',
      display: 'flex',
      alignItems: sheet ? 'flex-end' : 'center',
      justifyContent: 'center',
      padding: sheet ? 0 : 24,
      zIndex: 'var(--z-dialog)',
      animation: 'var(--fade-in)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: sheet ? '100%' : '100%',
      maxWidth: sheet ? 'none' : width,
      background: 'var(--surface-card)',
      borderRadius: sheet ? 'var(--r-2xl) var(--r-2xl) 0 0' : 'var(--r-xl)',
      boxShadow: 'var(--shadow-float)',
      padding: 24,
      animation: 'var(--rise-in)',
      ...style
    }
  }, sheet && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 2,
      background: 'var(--ink-200)',
      margin: '-8px auto 16px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)'
    }
  }, title)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      border: 0,
      background: 'var(--bg-sunken)',
      color: 'var(--text-secondary)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  }))), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      font: 'var(--text-body)',
      color: 'var(--text-secondary)'
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 24
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const T = {
  ok: ['check-circle-2', 'var(--ok-500)'],
  warn: ['alert-triangle', 'var(--warn-500)'],
  danger: ['x-circle', 'var(--danger-500)'],
  info: ['info', 'var(--info-500)'],
  neutral: ['bell', 'var(--gold-500)']
};
/** Espresso toast with a tone dot-icon. Scan feedback uses ok/danger loudly. */
function Toast({
  tone = 'neutral',
  title,
  message,
  action,
  onAction,
  onClose,
  style
}) {
  const [icon, c] = T[tone] || T.neutral;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      minWidth: 280,
      maxWidth: 420,
      padding: '12px 14px',
      borderRadius: 'var(--r-md)',
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      boxShadow: 'var(--shadow-float)',
      animation: 'var(--rise-in)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    style: {
      color: c,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13,
      marginBottom: message ? 4 : 0
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      opacity: .8
    }
  }, message)), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--gold-400)',
      font: 'var(--text-label)',
      fontSize: 12.5,
      cursor: 'pointer',
      padding: '2px 4px'
    }
  }, action), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 0,
      background: 'transparent',
      color: 'inherit',
      opacity: .6,
      cursor: 'pointer',
      padding: 0,
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 15
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** 20px rounded box, maroon when checked. */
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled,
  indeterminate = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      font: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      display: 'grid',
      placeItems: 'center',
      background: checked || indeterminate ? 'var(--accent)' : 'var(--surface-card)',
      border: '1.5px solid ' + (checked || indeterminate ? 'var(--accent)' : 'var(--border-strong)'),
      color: 'var(--accent-on)',
      transition: 'background var(--dur-fast)'
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 2,
      background: 'currentColor',
      borderRadius: 1
    }
  }) : checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2.4
  }) : null), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = (focus, invalid) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  height: 'var(--control-h-md)',
  padding: '0 14px',
  borderRadius: 'var(--r-control)',
  background: 'var(--surface-card)',
  border: '1px solid ' + (invalid ? 'var(--danger-500)' : focus ? 'var(--brand-500)' : 'var(--border-default)'),
  boxShadow: focus ? '0 0 0 3px ' + (invalid ? 'var(--danger-100)' : 'var(--brand-100)') : 'none',
  transition: 'box-shadow var(--dur-fast), border-color var(--dur-fast)'
});
const Label = ({
  children,
  hint
}) => children ? /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    font: 'var(--text-label)',
    fontSize: 12,
    color: 'var(--text-secondary)'
  }
}, children), hint && /*#__PURE__*/React.createElement("span", {
  style: {
    font: 'var(--text-small)',
    color: 'var(--text-muted)'
  }
}, hint)) : null;
/** Text field. Sand-white, 12px radius, maroon focus halo. */
function Input({
  label,
  hint,
  icon,
  suffix,
  invalid = false,
  error,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Label, {
    hint: hint
  }, label), /*#__PURE__*/React.createElement("span", {
    style: base(focus, invalid)
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    style: {
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 0,
      background: 'transparent',
      font: 'var(--text-body)',
      color: 'var(--text-primary)',
      fontFeatureSettings: 'var(--num)',
      ...inputStyle
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, suffix)), error && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--danger-500)',
      marginTop: 6
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio group — horizontal or stacked. */
function Radio({
  options = [],
  value,
  onChange,
  name,
  direction = 'row',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: direction === 'column' ? 'column' : 'row',
      gap: direction === 'column' ? 10 : 18,
      ...style
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value,
      l = typeof o === 'string' ? o : o.label,
      on = v === value;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        font: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      checked: on,
      onChange: () => onChange && onChange(v),
      style: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 10,
        display: 'grid',
        placeItems: 'center',
        border: '1.5px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'),
        background: 'var(--surface-card)',
        transition: 'border-color var(--dur-fast)'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 5,
        background: 'var(--accent)'
      }
    })), l);
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchBar.jsx
try { (() => {
/** Wide pill search. Placeholder must name the fields it searches. */
function SearchBar({
  placeholder = 'Search design no, name or colour',
  value,
  onChange,
  onScan,
  size = 'md',
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 52 : 44;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: h,
      padding: '0 8px 0 18px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--surface-card)',
      border: '1px solid ' + (focus ? 'var(--brand-400)' : 'var(--border-default)'),
      boxShadow: focus ? '0 0 0 3px var(--brand-100)' : 'var(--shadow-1)',
      transition: 'box-shadow var(--dur-fast)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 17,
    style: {
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 0,
      background: 'transparent',
      font: 'var(--text-body)',
      fontSize: 15,
      color: 'var(--text-primary)'
    }
  }), onScan && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onScan,
    "aria-label": "Scan barcode",
    style: {
      width: h - 12,
      height: h - 12,
      borderRadius: '50%',
      border: 0,
      background: 'var(--accent)',
      color: 'var(--accent-on)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "scan-line",
    size: 18
  })));
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = (focus, invalid) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  height: 'var(--control-h-md)',
  padding: '0 14px',
  borderRadius: 'var(--r-control)',
  background: 'var(--surface-card)',
  border: '1px solid ' + (invalid ? 'var(--danger-500)' : focus ? 'var(--brand-500)' : 'var(--border-default)'),
  boxShadow: focus ? '0 0 0 3px ' + (invalid ? 'var(--danger-100)' : 'var(--brand-100)') : 'none',
  transition: 'box-shadow var(--dur-fast), border-color var(--dur-fast)'
});
const Label = ({
  children,
  hint
}) => children ? /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    font: 'var(--text-label)',
    fontSize: 12,
    color: 'var(--text-secondary)'
  }
}, children), hint && /*#__PURE__*/React.createElement("span", {
  style: {
    font: 'var(--text-small)',
    color: 'var(--text-muted)'
  }
}, hint)) : null;
/** Native select styled as a Sutra field. */
function Select({
  label,
  hint,
  options = [],
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Label, {
    hint: hint
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      ...base(focus, invalid),
      paddingRight: 10
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 0,
      outline: 0,
      background: 'transparent',
      font: 'var(--text-body)',
      color: 'var(--text-primary)',
      appearance: 'none',
      WebkitAppearance: 'none',
      cursor: 'pointer'
    }
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    style: {
      color: 'var(--text-muted)'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
/** Qty stepper (− n +). The floor's most-tapped control — 44px targets on phone. */
function Stepper({
  value = 0,
  onChange,
  min = 0,
  max = Infinity,
  size = 'md',
  style
}) {
  const s = size === 'lg' ? 44 : size === 'sm' ? 28 : 36;
  const btn = dis => ({
    width: s,
    height: s,
    borderRadius: '50%',
    border: '1px solid var(--border-default)',
    background: 'var(--surface-card)',
    color: dis ? 'var(--text-muted)' : 'var(--text-primary)',
    display: 'grid',
    placeItems: 'center',
    cursor: dis ? 'not-allowed' : 'pointer',
    opacity: dis ? .5 : 1
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size === 'sm' ? 6 : 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Decrease",
    disabled: value <= min,
    onClick: () => onChange && onChange(Math.max(min, value - 1)),
    style: btn(value <= min)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: s > 30 ? 16 : 13
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: size === 'sm' ? 18 : 24,
      textAlign: 'center',
      font: 'var(--text-title)',
      fontSize: size === 'lg' ? 20 : size === 'sm' ? 13 : 16,
      fontFeatureSettings: 'var(--num)'
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Increase",
    disabled: value >= max,
    onClick: () => onChange && onChange(Math.min(max, value + 1)),
    style: btn(value >= max)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: s > 30 ? 16 : 13
  })));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Toggle. Maroon when on; espresso track off in dark mode. */
function Switch({
  checked = false,
  onChange,
  label,
  disabled,
  size = 'md',
  style
}) {
  const w = size === 'sm' ? 34 : 44,
    h = size === 'sm' ? 20 : 26,
    k = h - 6;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      font: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: w,
      height: h,
      borderRadius: h / 2,
      background: checked ? 'var(--accent)' : 'var(--ink-200)',
      position: 'relative',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? w - k - 3 : 3,
      width: k,
      height: k,
      borderRadius: k / 2,
      background: '#fff',
      boxShadow: '0 1px 3px rgba(36,23,18,.25)',
      transition: 'left var(--dur-base) var(--ease-out)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomBar.jsx
try { (() => {
/** Phone module bar. Floating glass pill; active module = maroon capsule. */
function BottomBar({
  items = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 'var(--bottombar-h)',
      padding: '0 6px',
      borderRadius: 'var(--r-xl)',
      background: 'var(--surface-glass)',
      backdropFilter: 'var(--blur-glass)',
      border: '1px solid rgba(255,255,255,.55)',
      boxShadow: 'var(--shadow-3)',
      ...style
    }
  }, items.map(it => {
    const a = it.key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onChange && onChange(it.key),
      style: {
        position: 'relative',
        flex: 1,
        height: 52,
        border: 0,
        borderRadius: 'var(--r-lg)',
        background: a ? 'var(--accent)' : 'transparent',
        color: a ? 'var(--accent-on)' : 'var(--text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        cursor: 'pointer',
        transition: 'background var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon || 'circle',
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-overline)',
        fontSize: 10.5,
        letterSpacing: '.02em'
      }
    }, it.label), it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 6,
        right: '22%',
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        background: 'var(--gold-500)',
        color: '#fff',
        fontSize: 9.5,
        display: 'grid',
        placeItems: 'center',
        padding: '0 4px',
        fontFeatureSettings: 'var(--num)'
      }
    }, it.count));
  }));
}
Object.assign(__ds_scope, { BottomBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SideNav.jsx
try { (() => {
/** Desktop left rail. Sand, no borders; active item = soft brand pill with a 3px maroon bar. */
function SideNav({
  items = [],
  value,
  onChange,
  collapsed = false,
  logoSrc,
  clientLogoSrc,
  user,
  footer,
  style
}) {
  const w = collapsed ? 'var(--sidebar-w-rail)' : 'var(--sidebar-w)';
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: w,
      flex: 'none',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-page)',
      borderRight: '1px solid var(--border-subtle)',
      padding: collapsed ? '16px 10px' : '16px 12px',
      gap: 4,
      transition: 'width var(--dur-slow) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: collapsed ? '4px 6px 18px' : '4px 8px 18px',
      minHeight: 52
    }
  }, logoSrc && /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Sutra",
    style: {
      height: 34
    }
  }), !collapsed && clientLogoSrc && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 26,
      background: 'var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: clientLogoSrc,
    alt: "",
    style: {
      height: 30
    }
  }))), items.map(it => {
    if (it.section) return collapsed ? /*#__PURE__*/React.createElement("div", {
      key: it.section,
      style: {
        height: 1,
        background: 'var(--border-subtle)',
        margin: '8px 6px'
      }
    }) : /*#__PURE__*/React.createElement("div", {
      key: it.section,
      style: {
        font: 'var(--text-overline)',
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        padding: '14px 12px 6px'
      }
    }, it.section);
    const a = it.key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      title: it.label,
      onClick: () => onChange && onChange(it.key),
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 40,
        padding: collapsed ? 0 : '0 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        border: 0,
        borderRadius: 'var(--r-md)',
        background: a ? 'var(--accent-soft)' : 'transparent',
        color: a ? 'var(--text-brand)' : 'var(--text-secondary)',
        font: 'var(--text-body)',
        fontWeight: a ? 500 : 400,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%'
      }
    }, a && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: collapsed ? 2 : -12,
        top: 10,
        bottom: 10,
        width: 3,
        borderRadius: 2,
        background: 'var(--accent)'
      }
    }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon || 'circle',
      size: 18
    }), !collapsed && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), !collapsed && it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-overline)',
        fontSize: 10.5,
        minWidth: 18,
        height: 18,
        padding: '0 5px',
        borderRadius: 9,
        display: 'grid',
        placeItems: 'center',
        background: a ? 'var(--accent)' : 'var(--bg-sunken)',
        color: a ? 'var(--accent-on)' : 'var(--text-secondary)',
        fontFeatureSettings: 'var(--num)'
      }
    }, it.count));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), footer, user && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: collapsed ? '8px 0' : '8px 8px',
      justifyContent: collapsed ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--brand-700)',
      color: 'var(--sand-50)',
      display: 'grid',
      placeItems: 'center',
      font: 'var(--text-label)',
      fontSize: 12
    }
  }, (user.name || '?').split(' ').map(s => s[0]).join('').slice(0, 2)), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: '.06em',
      color: 'var(--text-muted)',
      marginTop: 3,
      textTransform: 'uppercase'
    }
  }, user.role, user.firm ? ' · ' + user.firm : ''))));
}
Object.assign(__ds_scope, { SideNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SideNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalogue-explorations/common.jsx
try { (() => {
/* Shared helpers for the catalogue explorations (independent of the DS bundle on purpose). */
const D = window.SUTRA_DATA;
function Ic({
  name,
  size = 18,
  sw = 1.6,
  style,
  color
}) {
  const key = String(name).split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  let node = window.lucide && window.lucide.icons[key];
  if (node && typeof node[0] === 'string') node = node[2];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color || 'currentColor',
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none',
      ...style
    }
  }, node ? node.map((n, i) => React.createElement(n[0], {
    ...n[1],
    key: i
  })) : /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }));
}
/** Catalogue price: leading digit +5%, ₹ small and quiet. */
function Price({
  v,
  size = 18,
  font,
  color,
  weight = 500,
  lead = true,
  dim,
  style
}) {
  if (v == null) return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: font,
      fontSize: size,
      color: dim,
      fontWeight: weight,
      ...style
    }
  }, "TBD");
  const s = v.toLocaleString('en-IN');
  const m = s.match(/^(\d)(.*)$/);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      fontFamily: font,
      fontSize: size,
      lineHeight: 1,
      color,
      fontWeight: weight,
      whiteSpace: 'nowrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: Math.round(size * .72),
      marginRight: Math.max(1, size * .06),
      color: dim
    }
  }, "\u20B9"), lead ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: Math.round(size * 1.05)
    }
  }, m[1]), m[2]) : s);
}
/** Small multi-series line chart. series: [{pts:number[], color, width}] */
function Line({
  series,
  w = 300,
  h = 80,
  grid,
  pad = 4
}) {
  const all = series.flatMap(s => s.pts),
    max = Math.max(...all),
    min = Math.min(...all) * .9;
  const X = (i, n) => pad + i * (w - pad * 2) / (n - 1),
    Y = v => h - pad - (v - min) / (max - min || 1) * (h - pad * 2);
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: `0 0 ${w} ${h}`,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, grid && [0.25, 0.5, 0.75].map(g => /*#__PURE__*/React.createElement("line", {
    key: g,
    x1: pad,
    x2: w - pad,
    y1: h * g,
    y2: h * g,
    stroke: grid,
    strokeDasharray: "2 4"
  })), series.map((s, k) => /*#__PURE__*/React.createElement("polyline", {
    key: k,
    points: s.pts.map((v, i) => X(i, s.pts.length) + ',' + Y(v)).join(' '),
    fill: "none",
    stroke: s.color,
    strokeWidth: s.width || 1.5,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    opacity: s.opacity == null ? 1 : s.opacity
  })), series[0] && (() => {
    const s = series[0],
      i = s.pts.length - 1;
    return /*#__PURE__*/React.createElement("circle", {
      cx: X(i, s.pts.length),
      cy: Y(s.pts[i]),
      r: "3",
      fill: s.color
    });
  })());
}
/** Process timeline: done green · active blue · not started grey. */
function Timeline({
  steps,
  done,
  active,
  T
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, steps.map((s, i) => {
    const st = i < done ? 'done' : i === active ? 'active' : 'todo';
    const c = st === 'done' ? T.ok : st === 'active' ? T.blue : T.line;
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 4,
        width: '100%',
        borderRadius: 2,
        background: c,
        boxShadow: st === 'active' ? `0 0 0 3px ${T.blue}33` : 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fontUI,
        fontSize: 10,
        letterSpacing: '.04em',
        color: st === 'todo' ? T.ink3 : T.ink2,
        textTransform: 'uppercase'
      }
    }, s));
  }));
}
const SERIES = {
  demand: [42, 48, 45, 56, 61, 58, 66, 72, 70, 78],
  month: {
    all: [8, 12, 9, 15, 14, 18, 22, 19, 25, 24, 30, 28],
    Sky: [4, 6, 5, 8, 7, 9, 12, 10, 13, 12, 15, 14],
    Purple: [2, 3, 2, 3, 3, 4, 5, 4, 6, 6, 7, 6],
    Seagreen: [1, 2, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5],
    Peach: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3]
  },
  life: [5, 18, 40, 62, 90, 120, 160, 210, 250, 300, 340, 360]
};
const RECIPE = [['Mono net', '2.4 m', '250 m', true], ['Santoon', '5 m', '50 m', true], ['BKS 41 beads kali', '1 pc', '0 pc', false], ['Cancan', '1.5 m', '0 m', false]];
const MEDIA = [['Primary · per colour', '4/4', true], ['Side profiles', '2/4', false], ['AI shoot', '—', false], ['Model photoshoot', '1', true], ['Video', '—', false]];
const ORDERS = [['SO-3455', 'Ramleela Fashion', '10/09', 'Approved', 5], ['SO-3433', 'Nalli Fashion Mart', '02/09', 'Dispatched', 9], ['SO-3401', 'A V Creation', '28/08', 'Pending', 4]];
const CARTS = [{
  k: 'A',
  name: 'Ramleela Fashion',
  city: 'Surat',
  n: 4,
  book: 'In-cabin'
}, {
  k: 'B',
  name: 'RL Fashion',
  city: 'Meerut',
  n: 2,
  book: 'WhatsApp'
}, {
  k: 'C',
  name: 'Nalli Fashion Mart',
  city: 'Chennai',
  n: 0,
  book: 'In-cabin'
}];
const CART_LINES = [['2798', 'Sky', 2], ['2798', 'Purple', 1], ['6002', 'Lilac', 1]];
const NAV = [['house', 'Home'], ['layout-grid', 'Catalogue'], ['shopping-bag', 'Carts'], ['users', 'CRM'], ['warehouse', 'Godown'], ['message-circle', 'Chat']];
Object.assign(window, {
  Ic,
  Price,
  Line,
  Timeline,
  SERIES,
  RECIPE,
  MEDIA,
  ORDERS,
  CARTS,
  CART_LINES,
  NAV,
  XD: D
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalogue-explorations/common.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalogue-explorations/screens.jsx
try { (() => {
/* Catalogue module screens, built from the BRD, rendered through a theme T. */
const S = {
  photo: (T, d, colour, style) => {
    const primary = !colour || colour === d.colours[0];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: primary ? T.photoBg : XD.cols[colour],
        ...style
      }
    }, primary && d.src ? /*#__PURE__*/React.createElement("img", {
      src: d.src,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        fontFamily: T.fontMono,
        fontSize: 11,
        color: primary ? T.ink3 : 'rgba(255,255,255,.9)'
      }
    }, d.code));
  },
  h: (T, txt, right) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      padding: '0 20px',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontUI,
      fontSize: 10.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: T.ink3,
      whiteSpace: 'nowrap'
    }
  }, txt), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), right),
  card: (T, children, style) => /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '10px 16px 0',
      padding: 14,
      borderRadius: T.rCard,
      background: T.surface,
      border: `1px solid ${T.line}`,
      ...style
    }
  }, children),
  glassBtn: (T, icon) => /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: T.dark ? 14 : '50%',
      background: T.dark ? 'rgba(23,17,14,.55)' : T.glass,
      backdropFilter: 'blur(14px)',
      border: T.dark ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(255,255,255,.6)',
      display: 'grid',
      placeItems: 'center',
      color: T.ink
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: icon,
    size: 18
  })),
  frame: (T, children, bottom) => /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      background: T.bg,
      color: T.ink,
      overflow: 'hidden',
      fontFamily: T.fontUI
    }
  }, T.dark && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 60% at 50% -10%, rgba(216,179,106,.10), transparent 60%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden',
      paddingTop: 54
    }
  }, children), bottom)
};
const CATS = ['All', 'Samples', 'Lehenga', 'Saree', 'Plazo'];
function ScreenGrid({
  T
}) {
  const list = XD.designs.slice(0, 6);
  const inCart = {
    '2798': 2,
    '6002': 1
  };
  return S.frame(T, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(T.TopBar, {
    role: "Sales"
  }), /*#__PURE__*/React.createElement(T.Cats, {
    items: CATS,
    active: "All",
    title: T.dark ? 'Catalogue' : undefined
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '12px 20px 0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(T.Chip, {
    x: true
  }, "Top 30"), /*#__PURE__*/React.createElement(T.Chip, {
    x: true
  }, "Delhi"), /*#__PURE__*/React.createElement(T.Chip, {
    x: true
  }, "Zari work"), /*#__PURE__*/React.createElement(T.Chip, {
    icon: "sliders-horizontal"
  }, "Filters"), /*#__PURE__*/React.createElement(T.Chip, {
    icon: "arrow-down-up"
  }, "Featured")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: T.ink3,
      whiteSpace: 'nowrap'
    }
  }, "15 designs"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 14,
      color: T.ink3
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "layout-grid",
    size: 16,
    color: T.ink
  }), /*#__PURE__*/React.createElement(Ic, {
    name: "list",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: T.dark ? '14px 12px' : '20px 14px',
      padding: '12px 16px 260px',
      alignItems: 'start'
    }
  }, list.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.code,
    style: {
      marginTop: T.dark && i % 2 ? 34 : 0
    }
  }, /*#__PURE__*/React.createElement(T.GridCard, {
    d: d,
    inCart: inCart[d.code],
    tall: T.dark && i % 2 === 0
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(T.CartTray, {
    active: "A"
  }), /*#__PURE__*/React.createElement(T.BottomBar, {
    active: "Catalogue"
  })));
}
function ScreenProductCustomer({
  T
}) {
  const d = XD.designs[0];
  const colour = 'Sky';
  return S.frame(T, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflow: 'hidden',
      marginTop: -54
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 462,
      borderRadius: T.dark ? `0 0 ${T.rPhoto + 10}px ${T.rPhoto + 10}px` : '0 0 28px 28px',
      overflow: 'hidden',
      background: T.photoBg
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: d.src,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      top: 60,
      display: 'flex',
      gap: 8
    }
  }, S.glassBtn(T, 'chevron-left'), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), S.glassBtn(T, 'maximize-2'), S.glassBtn(T, 'share-2')), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 16,
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: T.dark ? 14 : 8,
      background: 'rgba(31,22,19,.55)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(T.Bars, {
    names: d.colours,
    active: colour,
    light: true
  }), colour), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 10px',
      borderRadius: 999,
      background: T.dark ? T.ink : T.glass,
      backdropFilter: 'blur(10px)'
    }
  }, /*#__PURE__*/React.createElement(T.Tag, null, d.tag)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontMono,
      fontSize: 13,
      color: T.ink3
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: T.dark ? 34 : 30,
      color: T.ink,
      flex: 1
    }
  }, d.name), /*#__PURE__*/React.createElement(Price, {
    v: d.price,
    size: 30,
    font: T.fontSerif,
    color: T.ink,
    dim: T.ink3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 8,
      fontSize: 13,
      color: T.ink3
    }
  }, d.cat, " \xB7 ", d.colours.length, " colours", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(T.Tag, {
    tone: "danger"
  }, d.note)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 18
    }
  }, d.colours.map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      width: 66
    }
  }, S.photo(T, d, n, {
    width: 66,
    height: 82,
    borderRadius: T.dark ? 16 : 8,
    boxShadow: n === colour ? `0 0 0 2px ${T.bg}, 0 0 0 3.5px ${T.dark ? T.ink : T.accent}` : 'none'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      textAlign: 'center',
      marginTop: 7,
      color: n === colour ? T.ink : T.ink3
    }
  }, n))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: T.dark ? '10px 10px 10px 18px' : '10px 10px 10px 16px',
      borderRadius: T.dark ? 28 : 999,
      background: T.dark ? T.surface : T.glass,
      backdropFilter: 'blur(18px)',
      border: `1px solid ${T.dark ? T.line : 'rgba(255,255,255,.6)'}`,
      boxShadow: T.shadow
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.ink2,
      lineHeight: 1.3
    }
  }, "Cart A", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: T.ink
    }
  }, "Ramleela")), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(T.Step, {
    v: 2,
    big: true
  }), /*#__PURE__*/React.createElement(T.Btn, {
    icon: "plus"
  }, "Add ", colour))));
}
function ScreenProductSales({
  T
}) {
  const d = XD.designs[0];
  const stock = {
    Sky: [20, 4, 30, '30/07'],
    Purple: [2, 0, 0, '—'],
    Seagreen: [5, 1, 10, '30/07'],
    Peach: [15, 0, 0, '—']
  };
  const cell = (v, danger) => /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'center',
      fontSize: 13,
      fontWeight: 500,
      color: v === 0 || v === '—' ? T.ink3 : danger ? T.danger : T.ink
    }
  }, v);
  return S.frame(T, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      height: 44,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      display: 'grid',
      placeItems: 'center',
      color: T.ink
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: T.ink3,
      flex: 1
    }
  }, "Salesperson view"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 12,
      color: T.ink2
    }
  }, "Customer mode", /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 20,
      borderRadius: 10,
      background: T.line2,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 2,
      top: 2,
      width: 16,
      height: 16,
      borderRadius: 8,
      background: T.surface
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      padding: '6px 20px 0'
    }
  }, S.photo(T, d, null, {
    width: 118,
    height: 150,
    borderRadius: T.rPhoto,
    flex: 'none'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontMono,
      fontSize: 12,
      color: T.ink3
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: 24,
      color: T.ink
    }
  }, d.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Price, {
    v: d.price,
    size: 22,
    font: T.fontSerif,
    color: T.ink,
    dim: T.ink3,
    lead: false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.ink3
    }
  }, "\xB7 cost \u20B92,610 \xB7 40% GM")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(T.Tag, null, "Top 30"), /*#__PURE__*/React.createElement(T.Tag, {
    tone: "danger"
  }, "Low stock"), /*#__PURE__*/React.createElement(T.Tag, {
    tone: "gold"
  }, "Priority sell"), /*#__PURE__*/React.createElement(T.Tag, {
    tone: "muted"
  }, "Zari work"), /*#__PURE__*/React.createElement(T.Tag, {
    tone: "muted"
  }, "Delhi \xB7 UP \xB7 MH"), /*#__PURE__*/React.createElement(T.Tag, {
    tone: "ok"
  }, "Rank 12")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(T.Btn, {
    kind: "secondary",
    small: true,
    icon: "upload"
  }, "Media"), /*#__PURE__*/React.createElement(T.Btn, {
    kind: "secondary",
    small: true,
    icon: "tags"
  }, "Set tag")))), S.h(T, 'Stock by colour', /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: T.ink3,
      whiteSpace: 'nowrap'
    }
  }, "godown \xB7 reserved \xB7 in prod \xB7 due")), S.card(T, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1.1fr',
      rowGap: 6,
      alignItems: 'center'
    }
  }, ['', 'Stock', 'Rsv', 'Prod', 'Due'].map(h => /*#__PURE__*/React.createElement("span", {
    key: h,
    style: {
      fontSize: 10,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: T.ink3,
      textAlign: h ? 'center' : 'left'
    }
  }, h)), d.colours.map(n => /*#__PURE__*/React.createElement(React.Fragment, {
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13,
      color: T.ink
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: T.dark ? 5 : 2,
      background: XD.cols[n]
    }
  }), n), cell(stock[n][0], stock[n][0] < 5), cell(stock[n][1]), cell(stock[n][2]), cell(stock[n][3]))))), S.h(T, 'Production · PO-1187 · 40 pcs'), S.card(T, /*#__PURE__*/React.createElement(Timeline, {
    steps: ['Dye', 'Embroidery', 'Stitching', 'Finishing'],
    done: 2,
    active: 2,
    T: T
  })), S.h(T, 'Recipe · per pc', /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: T.ink3
    }
  }, "live godown stock")), S.card(T, RECIPE.map(([m, q, st, ok], i) => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '7px 0',
      borderTop: i ? `1px solid ${T.line}` : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: T.dark ? 10 : 6,
      background: T.photoBg,
      display: 'grid',
      placeItems: 'center',
      fontFamily: T.fontMono,
      fontSize: 8,
      color: T.ink3
    }
  }, "MAT"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13.5,
      color: T.ink
    }
  }, m), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.ink2
    }
  }, q), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 500,
      minWidth: 48,
      textAlign: 'right',
      color: ok ? T.ok : T.danger
    }
  }, st))), {
    paddingTop: 6,
    paddingBottom: 6
  })));
}
function ScreenAnalytics({
  T
}) {
  const d = XD.designs[0];
  const gridc = T.dark ? 'rgba(241,232,220,.12)' : 'rgba(31,22,19,.12)';
  const tabs = ['All', 'Approved & pending', 'Dispatched'];
  return S.frame(T, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      height: 44,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      display: 'grid',
      placeItems: 'center',
      color: T.ink
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: 20,
      color: T.ink,
      whiteSpace: 'nowrap'
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontMono,
      fontSize: 12,
      color: T.ink3
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: T.ink3
    }
  }, "Analytics")), S.h(T, 'Demand score', /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: 22,
      color: T.ink
    }
  }, "78")), S.card(T, /*#__PURE__*/React.createElement(Line, {
    series: [{
      pts: SERIES.demand,
      color: T.dark ? T.gold : T.accent,
      width: 2
    }],
    h: 52,
    grid: gridc
  }), {
    padding: '10px 14px 6px'
  }), S.h(T, 'Last month · pcs', /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 10
    }
  }, d.colours.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 10.5,
      color: T.ink3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: XD.cols[n]
    }
  }), n)))), S.card(T, /*#__PURE__*/React.createElement(Line, {
    series: [{
      pts: SERIES.month.all,
      color: T.ink,
      width: 2.4
    }, ...d.colours.map(n => ({
      pts: SERIES.month[n],
      color: XD.cols[n],
      width: 1.4
    }))],
    h: 76,
    grid: gridc
  }), {
    padding: '10px 14px 6px'
  }), S.h(T, 'Lifelong · 360 pcs · ₹17.9L'), S.card(T, /*#__PURE__*/React.createElement(Line, {
    series: [{
      pts: SERIES.life,
      color: T.ink,
      width: 2
    }],
    h: 44,
    grid: gridc
  }), {
    padding: '10px 14px 6px'
  }), S.h(T, 'Media centre', /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: T.accent
    }
  }, "Upload \u2192")), S.card(T, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, MEDIA.map(([m, c, ok]) => /*#__PURE__*/React.createElement("span", {
    key: m,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: '0 10px',
      borderRadius: 999,
      background: T.dark ? T.surface2 : T.bg2,
      fontSize: 12,
      color: ok ? T.ink : T.ink3
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: ok ? 'check' : 'circle-dashed',
    size: 12,
    color: ok ? T.ok : T.ink3
  }), m, " ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, c)))), {
    padding: 12
  }), S.h(T, 'Sale orders', /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 12
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: 11.5,
      color: i === 0 ? T.ink : T.ink3,
      borderBottom: i === 0 ? `1.5px solid ${T.accent}` : '1.5px solid transparent',
      paddingBottom: 3
    }
  }, t)))), S.card(T, ORDERS.map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: o[0],
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 0',
      borderTop: i ? `1px solid ${T.line}` : 0,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontMono,
      fontSize: 12,
      color: T.ink2
    }
  }, o[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: T.ink,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, o[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.ink3,
      fontSize: 12
    }
  }, o[2]), /*#__PURE__*/React.createElement(T.Tag, {
    tone: o[3] === 'Dispatched' ? 'ok' : o[3] === 'Pending' ? 'gold' : 'muted'
  }, o[3]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      minWidth: 22,
      textAlign: 'right'
    }
  }, "\xD7", o[4]))), {
    paddingTop: 4,
    paddingBottom: 4
  })));
}
function ScreenScan({
  T
}) {
  const d = XD.designs[1];
  const qty = {
    Lilac: 1,
    Blush: 0
  };
  const quick = ['Add pc', 'Add colour set', 'Pc to all carts', 'Set to all carts'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      background: '#0B0908',
      overflow: 'hidden',
      fontFamily: T.fontUI,
      color: T.ink
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: XD.A + 'samples/2006-lavender.jpg',
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: .55,
      filter: 'blur(1px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,.55)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 66,
      left: 16
    }
  }, S.glassBtn(GALLERY, 'chevron-left')), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: 40,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 14px',
      borderRadius: 999,
      border: '1.5px solid #4CCB7A',
      color: '#fff',
      fontSize: 12.5,
      background: 'rgba(0,0,0,.4)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "plus-circle",
    size: 15,
    color: "#4CCB7A"
  }), "Scan to add \xB7 on"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 26,
      right: 26,
      top: 118,
      bottom: 112,
      borderRadius: T.dark ? 30 : 22,
      background: T.bg,
      boxShadow: '0 40px 80px -20px rgba(0,0,0,.8)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '52%',
      background: T.photoBg
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: d.src,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 12,
      padding: '8px 12px',
      borderRadius: T.dark ? 14 : 8,
      background: 'rgba(0,0,0,.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: '#fff',
      fontSize: 12
    }
  }, d.colours.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 16,
      borderRadius: 2,
      background: XD.cols[n]
    }
  }), n)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .7
    }
  }, "1 / 2 \xB7 swipe")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 10px',
      borderRadius: 999,
      background: T.dark ? T.ink : T.glass
    }
  }, /*#__PURE__*/React.createElement(T.Tag, null, d.tag)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontMono,
      fontSize: 12,
      color: T.ink3
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: 20,
      flex: 1
    }
  }, d.name), /*#__PURE__*/React.createElement(Price, {
    v: d.price,
    size: 20,
    font: T.fontSerif,
    color: T.ink,
    dim: T.ink3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 12,
      color: T.ink3
    }
  }, d.cat, " \xB7 Godown 12 \xB7 Reserved 3", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.accent,
      fontSize: 12.5
    }
  }, "Go to product \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, CARTS.map(c => /*#__PURE__*/React.createElement(T.Chip, {
    key: c.k,
    on: c.k === 'A'
  }, c.k, " \xB7 ", c.name.split(' ')[0]))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6
    }
  }, quick.map((q, i) => /*#__PURE__*/React.createElement(T.Btn, {
    key: q,
    kind: i === 0 ? 'primary' : 'secondary',
    small: true,
    style: {
      height: 34,
      fontSize: 12
    }
  }, q))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, d.colours.map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: T.dark ? 5 : 2,
      background: XD.cols[n]
    }
  }), n, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(T.Step, {
    v: qty[n]
  })))))));
}
function ScreenCarts({
  T
}) {
  const lines = CART_LINES.map(([c, col, q]) => ({
    d: XD.byCode[c],
    col,
    q
  }));
  const total = lines.reduce((s, l) => s + l.q * l.d.price, 0),
    pcs = lines.reduce((s, l) => s + l.q, 0);
  return S.frame(T, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      height: 44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: T.dark ? 30 : 26,
      color: T.ink
    }
  }, "Carts"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(T.Chip, {
    icon: "user-plus"
  }, "New customer")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '12px 20px 0',
      overflow: 'hidden'
    }
  }, CARTS.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.k,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 14px 0 5px',
      borderRadius: 999,
      background: c.k === 'A' ? T.dark ? T.gold : T.accent : T.surface,
      color: c.k === 'A' ? T.dark ? T.bg : T.onAccent : T.ink,
      border: `1px solid ${c.k === 'A' ? 'transparent' : T.line2}`,
      fontSize: 12.5,
      whiteSpace: 'nowrap',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'rgba(0,0,0,.14)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: T.fontDisplay,
      fontSize: 14
    }
  }, c.k), c.name.split(' ')[0], " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .65
    }
  }, c.n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: 20,
      color: T.ink,
      whiteSpace: 'nowrap'
    }
  }, "Ramleela Fashion"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.ink3,
      marginTop: 2,
      whiteSpace: 'nowrap'
    }
  }, "Surat \xB7 30 days credit")), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      padding: 3,
      borderRadius: 999,
      background: T.dark ? T.surface : T.bg2,
      flex: 'none'
    }
  }, ['In-cabin', 'WhatsApp'].map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: b,
    style: {
      height: 28,
      padding: '0 12px',
      borderRadius: 999,
      display: 'grid',
      placeItems: 'center',
      fontSize: 12,
      whiteSpace: 'nowrap',
      background: i === 0 ? T.dark ? T.ink : T.surface : 'transparent',
      color: i === 0 ? T.dark ? T.bg : T.ink : T.ink3,
      boxShadow: i === 0 && !T.dark ? '0 1px 2px rgba(0,0,0,.08)' : 'none'
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: T.dark ? 10 : '10px 12px',
      borderRadius: T.rCard,
      background: T.surface,
      border: `1px solid ${T.line}`
    }
  }, S.photo(T, l.d, l.col, {
    width: 56,
    height: 70,
    borderRadius: T.dark ? 14 : 6,
    flex: 'none'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontMono,
      fontSize: 12,
      color: T.ink3
    }
  }, l.d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.fontDisplay,
      fontSize: 17,
      color: T.ink,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, l.d.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 4,
      fontSize: 12.5,
      color: T.ink2,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: T.dark ? 5 : 2,
      background: XD.cols[l.col],
      flex: 'none'
    }
  }), l.col, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.ink3,
      flex: 'none'
    }
  }, "\xB7 \u20B9", l.d.price.toLocaleString('en-IN'))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(T.Step, {
    v: l.q
  }))), /*#__PURE__*/React.createElement(Price, {
    v: l.q * l.d.price,
    size: 17,
    font: T.fontSerif,
    color: T.ink,
    dim: T.ink3,
    lead: false
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 16px 0',
      padding: '12px 14px',
      borderRadius: T.rCard,
      border: `1px dashed ${T.line2}`,
      fontSize: 12.5,
      color: T.ink3
    }
  }, "Note for approval \xB7 \u201C2018 ke red ka stock check karna hai\u201D")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 24,
      padding: 14,
      borderRadius: T.dark ? 28 : 20,
      background: T.dark ? T.surface : T.glass,
      backdropFilter: 'blur(18px)',
      border: `1px solid ${T.dark ? T.line : 'rgba(255,255,255,.6)'}`,
      boxShadow: T.shadow,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: T.ink3,
      whiteSpace: 'nowrap'
    }
  }, pcs, " pcs \xB7 due 20 d"), /*#__PURE__*/React.createElement(Price, {
    v: total,
    size: 26,
    font: T.fontSerif,
    color: T.ink,
    dim: T.ink3,
    lead: false,
    style: {
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(T.Btn, {
    icon: "check"
  }, "Submit for approval")));
}
Object.assign(window, {
  ScreenGrid,
  ScreenProductCustomer,
  ScreenProductSales,
  ScreenAnalytics,
  ScreenScan,
  ScreenCarts
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalogue-explorations/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalogue-explorations/themes.jsx
try { (() => {
/* Two aesthetic directions. Each theme = tokens + its own chrome (top bar, category nav, chips, grid card, cart tray, bottom bar, controls). */
const base = {
  ok: '#3F8A5E',
  warn: '#C0862B',
  danger: '#C24545',
  blue: '#4C7FB5'
};

/* ───────────── A · GALLERY — ivory editorial, hairlines, Marcellus ───────────── */
const GALLERY = {
  ...base,
  name: 'Gallery',
  dark: false,
  bg: '#F7F2EB',
  bg2: '#EFE8DF',
  surface: '#FCF9F4',
  line: 'rgba(31,22,19,.10)',
  line2: 'rgba(31,22,19,.22)',
  ink: '#1F1613',
  ink2: '#5E4F47',
  ink3: '#9A8A80',
  accent: '#5A1F27',
  accentSoft: 'rgba(90,31,39,.08)',
  gold: '#B98E4A',
  onAccent: '#F7F2EB',
  fontDisplay: '"Marcellus", "Cormorant Garamond", serif',
  fontSerif: '"Cormorant Garamond", serif',
  fontUI: '"Jost", sans-serif',
  fontMono: '"IBM Plex Mono", monospace',
  rPhoto: 8,
  rCard: 14,
  rPill: 999,
  glass: 'rgba(247,242,235,.78)',
  shadow: '0 10px 30px -14px rgba(31,22,19,.35)',
  photoBg: 'linear-gradient(180deg,#EAE1D6,#DDD1C3)',
  barH: 66
};
GALLERY.Btn = ({
  kind = 'primary',
  children,
  icon,
  small,
  style,
  onClick
}) => {
  const P = kind === 'primary',
    G = kind === 'ghost';
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: small ? 34 : 48,
      padding: small ? '0 14px' : '0 22px',
      borderRadius: 999,
      border: P || G ? '1px solid transparent' : `1px solid ${GALLERY.line2}`,
      background: P ? GALLERY.accent : 'transparent',
      color: P ? GALLERY.onAccent : G ? GALLERY.ink2 : GALLERY.ink,
      fontFamily: GALLERY.fontUI,
      fontSize: small ? 12.5 : 14,
      fontWeight: 500,
      letterSpacing: '.02em',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(Ic, {
    name: icon,
    size: small ? 14 : 16
  }), children);
};
GALLERY.Chip = ({
  children,
  on,
  x,
  icon,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 28,
    padding: '0 11px',
    borderRadius: 999,
    border: `1px solid ${on ? GALLERY.accent : GALLERY.line2}`,
    background: on ? GALLERY.accent : 'transparent',
    color: on ? GALLERY.onAccent : GALLERY.ink2,
    fontFamily: GALLERY.fontUI,
    fontSize: 12,
    whiteSpace: 'nowrap',
    flex: 'none',
    ...style
  }
}, icon && /*#__PURE__*/React.createElement(Ic, {
  name: icon,
  size: 12
}), children, x && /*#__PURE__*/React.createElement(Ic, {
  name: "x",
  size: 11,
  style: {
    opacity: .6
  }
}));
GALLERY.Tag = ({
  tone = 'accent',
  children
}) => {
  const c = tone === 'danger' ? GALLERY.danger : tone === 'ok' ? GALLERY.ok : tone === 'gold' ? GALLERY.gold : tone === 'muted' ? GALLERY.ink3 : GALLERY.accent;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: GALLERY.fontUI,
      fontSize: 10.5,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: c,
      whiteSpace: 'nowrap'
    }
  }, children);
};
GALLERY.Step = ({
  v,
  big
}) => {
  const s = big ? 40 : 28;
  const b = {
    width: s,
    height: s,
    borderRadius: '50%',
    border: `1px solid ${GALLERY.line2}`,
    display: 'grid',
    placeItems: 'center',
    color: GALLERY.ink
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: big ? 14 : 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: b
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "minus",
    size: big ? 16 : 12
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: GALLERY.fontUI,
      fontSize: big ? 20 : 14,
      fontWeight: 500,
      minWidth: 16,
      textAlign: 'center'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      ...b,
      background: GALLERY.ink,
      color: GALLERY.bg,
      border: 0
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "plus",
    size: big ? 16 : 12
  })));
};
GALLERY.Bars = ({
  names,
  active,
  size = 'sm',
  light
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    gap: 3,
    alignItems: 'flex-end'
  }
}, names.map(n => /*#__PURE__*/React.createElement("span", {
  key: n,
  title: n,
  style: {
    width: size === 'sm' ? 5 : 8,
    height: n === active ? size === 'sm' ? 16 : 26 : size === 'sm' ? 12 : 20,
    borderRadius: 2,
    background: XD.cols[n],
    boxShadow: n === active ? `0 0 0 1.5px ${light ? '#fff' : GALLERY.ink}` : 'inset 0 0 0 1px rgba(0,0,0,.12)'
  }
})));
GALLERY.TopBar = ({
  scanOn,
  role
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 18px',
    height: 44
  }
}, /*#__PURE__*/React.createElement("img", {
  src: XD.A + 'logo/sutra-mark-gold.png',
  style: {
    height: 26
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 1,
    height: 18,
    background: GALLERY.line2,
    margin: '0 12px'
  }
}), /*#__PURE__*/React.createElement("img", {
  src: XD.A + 'clients/srs-logo.png',
  style: {
    height: 22
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    flex: 1
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: GALLERY.fontUI,
    fontSize: 10.5,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    color: GALLERY.ink3,
    marginRight: 14
  }
}, role), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    color: GALLERY.ink
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "search",
  size: 19
})), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    color: GALLERY.ink,
    border: scanOn ? `1.5px solid ${GALLERY.ok}` : '1px solid transparent',
    marginLeft: 2
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "scan-line",
  size: 19
})), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    color: GALLERY.ink,
    marginLeft: 2
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "ellipsis-vertical",
  size: 19
})));
GALLERY.Cats = ({
  items,
  active
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 22,
    padding: '6px 20px 0',
    borderBottom: `1px solid ${GALLERY.line}`
  }
}, items.map(c => /*#__PURE__*/React.createElement("span", {
  key: c,
  style: {
    position: 'relative',
    padding: '8px 0 12px',
    fontFamily: GALLERY.fontDisplay,
    fontSize: 15,
    letterSpacing: '.02em',
    color: c === active ? GALLERY.ink : GALLERY.ink3,
    whiteSpace: 'nowrap'
  }
}, c, c === active && /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 1.5,
    background: GALLERY.accent
  }
}))));
GALLERY.GridCard = ({
  d,
  inCart
}) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    aspectRatio: '4/5',
    borderRadius: GALLERY.rPhoto,
    overflow: 'hidden',
    background: GALLERY.photoBg
  }
}, d.src ? /*#__PURE__*/React.createElement("img", {
  src: d.src,
  style: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  }
}) : /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    fontFamily: GALLERY.fontDisplay,
    fontSize: 30,
    color: GALLERY.ink3
  }
}, d.code), d.tag && /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '6px 10px',
    background: GALLERY.glass,
    backdropFilter: 'blur(10px)',
    borderRadius: `0 0 ${GALLERY.rPhoto}px 0`
  }
}, /*#__PURE__*/React.createElement(GALLERY.Tag, {
  tone: d.tagTone === 'gold' ? 'gold' : 'accent'
}, d.tag)), /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: '6px 8px',
    borderRadius: 6,
    background: 'rgba(31,22,19,.55)',
    backdropFilter: 'blur(8px)',
    display: 'flex'
  }
}, /*#__PURE__*/React.createElement(GALLERY.Bars, {
  names: d.colours,
  light: true
})), /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: inCart ? GALLERY.accent : GALLERY.glass,
    backdropFilter: 'blur(10px)',
    color: inCart ? GALLERY.onAccent : GALLERY.ink,
    display: 'grid',
    placeItems: 'center',
    fontFamily: GALLERY.fontUI,
    fontSize: 13,
    fontWeight: 500
  }
}, inCart ? inCart : /*#__PURE__*/React.createElement(Ic, {
  name: "plus",
  size: 16
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 10
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: GALLERY.fontMono,
    fontSize: 11.5,
    color: GALLERY.ink3
  }
}, d.code), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: GALLERY.fontDisplay,
    fontSize: 15.5,
    color: GALLERY.ink,
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}, d.name), /*#__PURE__*/React.createElement(Price, {
  v: d.price,
  size: 16,
  font: GALLERY.fontSerif,
  color: GALLERY.ink,
  dim: GALLERY.ink3
})), d.note && /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 4
  }
}, /*#__PURE__*/React.createElement(GALLERY.Tag, {
  tone: "danger"
}, d.note)));
GALLERY.CartTray = ({
  active
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 16px',
    overflow: 'hidden'
  }
}, CARTS.map(c => {
  const on = c.k === active;
  return /*#__PURE__*/React.createElement("span", {
    key: c.k,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: on ? '0 14px 0 4px' : '0 4px',
      borderRadius: 999,
      background: 'rgba(252,249,244,.92)',
      border: `1px solid ${on ? GALLERY.accent : 'rgba(255,255,255,.6)'}`,
      boxShadow: GALLERY.shadow,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: on ? GALLERY.accent : GALLERY.bg2,
      color: on ? GALLERY.onAccent : GALLERY.ink,
      display: 'grid',
      placeItems: 'center',
      fontFamily: GALLERY.fontDisplay,
      fontSize: 15
    }
  }, c.k), on && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: GALLERY.fontUI,
      fontSize: 12.5,
      color: GALLERY.ink,
      whiteSpace: 'nowrap'
    }
  }, c.name, " ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: GALLERY.ink3
    }
  }, "\xB7 ", c.n)), !on && c.n > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      marginLeft: -10,
      top: -12,
      width: 16,
      height: 16,
      borderRadius: 8,
      background: GALLERY.gold,
      color: '#fff',
      fontFamily: GALLERY.fontUI,
      fontSize: 9.5,
      display: 'grid',
      placeItems: 'center'
    }
  }, c.n));
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: `1px dashed ${GALLERY.line2}`,
    display: 'grid',
    placeItems: 'center',
    color: GALLERY.ink2,
    flex: 'none'
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "plus",
  size: 16
})));
GALLERY.BottomBar = ({
  active
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    margin: '0 14px',
    height: 62,
    borderRadius: 999,
    background: 'rgba(252,249,244,.94)',
    border: '1px solid rgba(255,255,255,.6)',
    boxShadow: GALLERY.shadow,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px'
  }
}, NAV.map(([i, l]) => {
  const on = l === active;
  return /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      padding: on ? '0 16px 0 12px' : '0 10px',
      borderRadius: 999,
      background: on ? GALLERY.accent : 'transparent',
      color: on ? GALLERY.onAccent : GALLERY.ink2
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: i,
    size: 20,
    sw: on ? 1.8 : 1.5
  }), on && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: GALLERY.fontUI,
      fontSize: 12.5,
      letterSpacing: '.04em'
    }
  }, l));
}));

/* ───────────── B · ATELIER — espresso dark, tactile pills, Bodoni Moda ───────────── */
const ATELIER = {
  ...base,
  name: 'Atelier',
  dark: true,
  ok: '#5FB57F',
  warn: '#D9A33B',
  danger: '#E06060',
  blue: '#6FA3DC',
  bg: '#17110E',
  bg2: '#211915',
  surface: '#2A2019',
  surface2: '#342922',
  line: 'rgba(241,232,220,.09)',
  line2: 'rgba(241,232,220,.2)',
  ink: '#F3EADF',
  ink2: '#B9A898',
  ink3: '#7E6D62',
  accent: '#A8404F',
  accentSoft: 'rgba(168,64,79,.22)',
  gold: '#D8B36A',
  onAccent: '#FBF4EC',
  fontDisplay: '"Bodoni Moda", "Cormorant Garamond", serif',
  fontSerif: '"Bodoni Moda", serif',
  fontUI: '"Outfit", sans-serif',
  fontMono: '"DM Mono", monospace',
  rPhoto: 22,
  rCard: 24,
  rPill: 999,
  glass: 'rgba(23,17,14,.62)',
  shadow: '0 24px 50px -20px rgba(0,0,0,.7)',
  photoBg: 'linear-gradient(180deg,#3A2D26,#261D18)',
  barH: 74
};
ATELIER.Btn = ({
  kind = 'primary',
  children,
  icon,
  small,
  style,
  onClick
}) => {
  const P = kind === 'primary',
    G = kind === 'ghost';
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: small ? 36 : 52,
      padding: small ? '0 16px' : '0 24px',
      borderRadius: 999,
      border: 0,
      background: P ? ATELIER.ink : G ? 'transparent' : ATELIER.surface2,
      color: P ? ATELIER.bg : G ? ATELIER.ink2 : ATELIER.ink,
      fontFamily: ATELIER.fontUI,
      fontSize: small ? 13 : 15,
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      boxShadow: P ? '0 10px 24px -10px rgba(243,234,223,.35)' : 'none',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(Ic, {
    name: icon,
    size: small ? 14 : 17
  }), children);
};
ATELIER.Chip = ({
  children,
  on,
  x,
  icon,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 34,
    padding: '0 14px',
    borderRadius: 999,
    background: on ? ATELIER.ink : ATELIER.surface,
    color: on ? ATELIER.bg : ATELIER.ink2,
    fontFamily: ATELIER.fontUI,
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    flex: 'none',
    ...style
  }
}, icon && /*#__PURE__*/React.createElement(Ic, {
  name: icon,
  size: 13
}), children, x && /*#__PURE__*/React.createElement(Ic, {
  name: "x",
  size: 12,
  style: {
    opacity: .6
  }
}));
ATELIER.Tag = ({
  tone = 'accent',
  children
}) => {
  const bg = tone === 'danger' ? ATELIER.danger : tone === 'ok' ? ATELIER.ok : tone === 'gold' ? ATELIER.gold : tone === 'muted' ? ATELIER.surface2 : ATELIER.ink;
  const fg = tone === 'muted' ? ATELIER.ink2 : ATELIER.bg;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 24,
      padding: '0 10px',
      borderRadius: 999,
      background: bg,
      color: fg,
      fontFamily: ATELIER.fontUI,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.04em',
      whiteSpace: 'nowrap'
    }
  }, children);
};
ATELIER.Step = ({
  v,
  big
}) => {
  const s = big ? 44 : 30;
  const b = {
    width: s,
    height: s,
    borderRadius: big ? 14 : 10,
    background: ATELIER.surface2,
    display: 'grid',
    placeItems: 'center',
    color: ATELIER.ink
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: big ? 14 : 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: b
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "minus",
    size: big ? 18 : 13
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: ATELIER.fontUI,
      fontSize: big ? 22 : 15,
      fontWeight: 500,
      minWidth: 18,
      textAlign: 'center'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      ...b,
      background: ATELIER.ink,
      color: ATELIER.bg
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "plus",
    size: big ? 18 : 13
  })));
};
ATELIER.Bars = ({
  names,
  active,
  size = 'sm'
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    gap: size === 'sm' ? 5 : 8
  }
}, names.map(n => /*#__PURE__*/React.createElement("span", {
  key: n,
  style: {
    width: size === 'sm' ? 12 : 22,
    height: size === 'sm' ? 12 : 22,
    borderRadius: '50%',
    background: XD.cols[n],
    boxShadow: n === active ? `0 0 0 2px ${ATELIER.bg}, 0 0 0 3.5px ${ATELIER.ink}` : 'inset 0 0 0 1px rgba(0,0,0,.2)'
  }
})));
ATELIER.TopBar = ({
  scanOn,
  role
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '0 20px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    height: 44
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    height: 34,
    padding: '0 12px 0 6px',
    borderRadius: 999,
    background: ATELIER.surface
  }
}, /*#__PURE__*/React.createElement("img", {
  src: XD.A + 'logo/sutra-mark-gold.png',
  style: {
    height: 22
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 1,
    height: 14,
    background: ATELIER.line2
  }
}), /*#__PURE__*/React.createElement("img", {
  src: XD.A + 'clients/srs-dress-only.png',
  style: {
    height: 18
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: ATELIER.fontUI,
    fontSize: 11,
    letterSpacing: '.12em',
    color: ATELIER.ink2
  }
}, role.toUpperCase())), /*#__PURE__*/React.createElement("span", {
  style: {
    flex: 1
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: ATELIER.surface,
    display: 'grid',
    placeItems: 'center',
    color: ATELIER.ink
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "search",
  size: 18
})), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: ATELIER.surface,
    display: 'grid',
    placeItems: 'center',
    color: ATELIER.ink,
    marginLeft: 8,
    boxShadow: scanOn ? `0 0 0 1.5px ${ATELIER.ok}` : 'none'
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "scan-line",
  size: 18
})), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: ATELIER.surface,
    display: 'grid',
    placeItems: 'center',
    color: ATELIER.ink,
    marginLeft: 8
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "ellipsis",
  size: 18
}))));
ATELIER.Cats = ({
  items,
  active,
  title
}) => /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '10px 20px 0',
    fontFamily: ATELIER.fontDisplay,
    fontSize: 34,
    color: ATELIER.ink,
    letterSpacing: '-.01em'
  }
}, title), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 6,
    padding: '12px 20px 0',
    overflow: 'hidden'
  }
}, items.map(c => /*#__PURE__*/React.createElement(ATELIER.Chip, {
  key: c,
  on: c === active
}, c))));
ATELIER.GridCard = ({
  d,
  inCart,
  tall
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    borderRadius: ATELIER.rPhoto,
    overflow: 'hidden',
    background: ATELIER.photoBg,
    aspectRatio: tall ? '3/4.4' : '3/3.6'
  }
}, d.src ? /*#__PURE__*/React.createElement("img", {
  src: d.src,
  style: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  }
}) : /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    fontFamily: ATELIER.fontDisplay,
    fontSize: 34,
    color: ATELIER.ink3
  }
}, d.code), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg,rgba(23,17,14,0) 50%,rgba(23,17,14,.78) 100%)'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 6
  }
}, d.tag && /*#__PURE__*/React.createElement(ATELIER.Tag, {
  tone: d.tagTone === 'gold' ? 'gold' : 'accent'
}, d.tag), d.note && /*#__PURE__*/React.createElement(ATELIER.Tag, {
  tone: "danger"
}, d.note), /*#__PURE__*/React.createElement("span", {
  style: {
    flex: 1
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: inCart ? ATELIER.gold : 'rgba(243,234,223,.92)',
    color: ATELIER.bg,
    display: 'grid',
    placeItems: 'center',
    fontFamily: ATELIER.fontUI,
    fontSize: 13,
    fontWeight: 600
  }
}, inCart ? inCart : /*#__PURE__*/React.createElement(Ic, {
  name: "plus",
  size: 16,
  sw: 2
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: ATELIER.fontMono,
    fontSize: 11,
    color: ATELIER.ink2
  }
}, d.code), /*#__PURE__*/React.createElement(ATELIER.Bars, {
  names: d.colours
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: ATELIER.fontDisplay,
    fontSize: 16,
    color: ATELIER.ink,
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}, d.name), /*#__PURE__*/React.createElement(Price, {
  v: d.price,
  size: 17,
  font: ATELIER.fontUI,
  color: ATELIER.ink,
  dim: ATELIER.ink2,
  weight: 500
}))));
ATELIER.CartTray = ({
  active
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 16px',
    overflow: 'hidden'
  }
}, CARTS.map(c => {
  const on = c.k === active;
  return /*#__PURE__*/React.createElement("span", {
    key: c.k,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      height: 46,
      padding: '0 14px 0 6px',
      borderRadius: 999,
      background: on ? ATELIER.gold : '#2A2019',
      border: `1px solid ${on ? 'transparent' : ATELIER.line2}`,
      color: on ? ATELIER.bg : ATELIER.ink,
      boxShadow: ATELIER.shadow,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: on ? 'rgba(23,17,14,.18)' : ATELIER.surface2,
      display: 'grid',
      placeItems: 'center',
      fontFamily: ATELIER.fontDisplay,
      fontSize: 16
    }
  }, c.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: ATELIER.fontUI,
      fontSize: 13,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, c.name.split(' ')[0], " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .6
    }
  }, c.n)));
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 46,
    height: 46,
    borderRadius: '50%',
    background: ATELIER.surface,
    display: 'grid',
    placeItems: 'center',
    color: ATELIER.ink,
    flex: 'none'
  }
}, /*#__PURE__*/React.createElement(Ic, {
  name: "plus",
  size: 18
})));
ATELIER.BottomBar = ({
  active
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    margin: '0 16px',
    height: 70,
    borderRadius: 30,
    background: '#241B17',
    border: `1px solid ${ATELIER.line}`,
    boxShadow: ATELIER.shadow,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 8px'
  }
}, NAV.slice(0, 5).map(([i, l]) => {
  const on = l === active;
  return /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      width: 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 36,
      borderRadius: 14,
      background: on ? ATELIER.ink : 'transparent',
      color: on ? ATELIER.bg : ATELIER.ink3,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: i,
    size: 20,
    sw: on ? 2 : 1.6
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: ATELIER.fontUI,
      fontSize: 10,
      letterSpacing: '.04em',
      color: on ? ATELIER.ink : ATELIER.ink3
    }
  }, l));
}));
Object.assign(window, {
  GALLERY,
  ATELIER
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalogue-explorations/themes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/data.js
try { (() => {
/* Shared mock data for Sutra UI kits (fictional customers / designs). */
window.SUTRA_DATA = (() => {
  const A = '../../assets/';
  const cols = {
    Sky: '#8FB3D9',
    Purple: '#8B6BAE',
    Seagreen: '#6FA391',
    Peach: '#E8B99B',
    Lilac: '#B9A3CF',
    Blush: '#E9B7B7',
    Lavender: '#B7A7D9',
    Mehroon: '#7A2E3A',
    Rani: '#C2185B',
    Lemon: '#E5D66B',
    Firozi: '#3AA6A0',
    Rust: '#B0552E',
    White: '#F2EFE8',
    Bottle: '#2F6B4A',
    Pista: '#B7D2A0'
  };
  const designs = [{
    code: '2798',
    name: 'Plazo Set',
    price: 4995,
    cat: 'Plazo set',
    src: A + 'samples/2798-sky.jpg',
    colours: ['Sky', 'Purple', 'Seagreen', 'Peach'],
    tag: 'Top 30',
    note: 'Low stock',
    free: 20,
    fg: 22,
    prod: 30,
    score: 78
  }, {
    code: '6002',
    name: 'Lilac Court',
    price: 4995,
    cat: 'Lehenga',
    src: A + 'samples/6002-lilac.jpg',
    colours: ['Lilac', 'Blush'],
    tag: 'Top 30',
    free: 12,
    fg: 12,
    prod: 0,
    score: 84
  }, {
    code: '2006',
    name: 'Lavender Pallu',
    price: 4995,
    cat: 'Saree',
    src: A + 'samples/2006-lavender.jpg',
    colours: ['Lavender', 'Sky', 'Peach'],
    free: 41,
    fg: 44,
    prod: 0,
    score: 61
  }, {
    code: '4566',
    name: 'Blush Cape',
    price: null,
    cat: 'Lehenga',
    src: A + 'samples/4566-blush.jpg',
    colours: ['Blush'],
    tag: 'Sample',
    tagTone: 'gold',
    free: 0,
    fg: 0,
    prod: 24,
    score: 55
  }, {
    code: '1243',
    name: 'Crop Top',
    price: 4995,
    cat: 'Crop top',
    colours: ['Mehroon', 'Rani', 'White'],
    free: 45,
    fg: 48,
    prod: 0,
    score: 40
  }, {
    code: '1457',
    name: 'Crop Top',
    price: 3995,
    cat: 'Crop top',
    colours: ['Firozi', 'Pista', 'Bottle', 'Rust'],
    free: 47,
    fg: 47,
    prod: 0,
    score: 33
  }, {
    code: '3661',
    name: 'Drape Saree',
    price: 5995,
    cat: 'Saree',
    colours: ['Peach', 'Pista'],
    free: 8,
    fg: 30,
    prod: 60,
    score: 71,
    note: 'Low stock'
  }, {
    code: 'D9107',
    name: 'Blouse',
    price: 1495,
    cat: 'Blouse',
    colours: ['Lemon', 'White'],
    free: 24,
    fg: 40,
    prod: 0,
    score: 20
  }];
  const byCode = Object.fromEntries(designs.map(d => [d.code, d]));
  const customers = [{
    id: 'c1',
    name: 'Preeti Fashion Hub',
    city: 'Ludhiana',
    market: 'Chaura Bazaar',
    tier: 'Platinum',
    score: 92,
    phone: '98152 23366',
    transport: 'Punjab Freight',
    broker: 'Harjeet Singh',
    priority: 1,
    orders: [{
      no: 'SO-2613',
      date: '06/08/26',
      due: -18,
      note: 'Chaura Bazaar trial',
      lines: [['D9107', 'Lemon', 5, true], ['3661', 'Peach', 4, true]]
    }]
  }, {
    id: 'c2',
    name: 'Rangoli Ethnic Wear',
    city: 'Lucknow',
    market: 'Aminabad',
    tier: 'Platinum',
    score: 88,
    phone: '98395 56688',
    transport: 'UP Roadways',
    broker: 'Imran Khan',
    priority: 3,
    orders: [{
      no: 'SO-2620',
      date: '08/08/26',
      due: -12,
      note: 'New design trial',
      lines: [['6002', 'Lilac', 3, true]]
    }]
  }, {
    id: 'c3',
    name: 'Ambika Enterprises',
    city: 'Delhi',
    market: 'Chandni Chowk',
    tier: 'Gold',
    score: 74,
    phone: '98105 76294',
    transport: 'Local delivery',
    broker: 'Suman Traders',
    priority: 2,
    orders: [{
      no: 'SO-3034',
      date: '01/09/26',
      due: 12,
      lines: [['1243', 'Mehroon', 3, true], ['3661', 'Peach', 4, true], ['2798', 'Sky', 5, true]]
    }]
  }, {
    id: 'c4',
    name: 'A V Creation',
    city: 'Ambala',
    market: '',
    tier: 'Platinum',
    score: 90,
    phone: '93558 79111',
    transport: 'Patel Parcel Service',
    broker: 'Shubham Marketing',
    priority: 4,
    orders: [{
      no: 'SO-3033',
      date: '01/09/26',
      due: 12,
      note: 'Ready demo order',
      lines: [['1457', 'Firozi', 4, true], ['1457', 'Bottle', 3, true], ['3661', 'Pista', 2, false]]
    }]
  }, {
    id: 'c5',
    name: 'Aneri Boutique',
    city: 'Anand',
    market: '',
    tier: 'Silver',
    score: 66,
    phone: '98982 73380',
    transport: 'SNS Express',
    broker: 'Kishore Nathani',
    priority: 3,
    orders: [{
      no: 'SO-3036',
      date: '01/09/26',
      due: 12,
      lines: [['2006', 'Lavender', 6, true], ['D9107', 'White', 2, true]]
    }]
  }, {
    id: 'c6',
    name: 'Nalli Fashion Mart',
    city: 'Chennai',
    market: 'T Nagar',
    tier: 'Platinum',
    score: 95,
    phone: '98400 11223',
    transport: 'Sri Balaji Travels',
    broker: 'Karthik S',
    priority: 2,
    orders: [{
      no: 'SO-2607',
      date: '29/07/26',
      due: -24,
      lines: [['6002', 'Blush', 5, false], ['2798', 'Purple', 9, false], ['1243', 'Rani', 3, true]]
    }, {
      no: 'SO-2608',
      date: '04/08/26',
      due: -23,
      lines: [['3661', 'Peach', 7, false]]
    }]
  }];
  const parcels = [{
    code: 'P00059',
    status: 'OPEN',
    lines: [['1243', 'Mehroon', 2, 2], ['D9107', 'White', 1, 1], ['3661', 'Peach', 1, 3]]
  }, {
    code: 'P00060',
    status: 'OPEN',
    lines: [['2798', 'Sky', 1, 2]]
  }, {
    code: 'P00035',
    status: 'PACKED',
    lines: [['1243', 'Mehroon', 1, 1], ['D9107', 'White', 1, 1]]
  }, {
    code: 'P00036',
    status: 'INVOICED',
    lines: [['3661', 'Peach', 2, 2]]
  }];
  const nav = [{
    key: 'home',
    label: 'Home',
    icon: 'house'
  }, {
    key: 'catalogue',
    label: 'Catalogue',
    icon: 'layout-grid'
  }, {
    key: 'carts',
    label: 'Carts',
    icon: 'shopping-bag',
    count: 3
  }, {
    key: 'dispatch',
    label: 'Dispatch',
    icon: 'package',
    count: 42
  }, {
    key: 'production',
    label: 'Production',
    icon: 'scissors'
  }, {
    key: 'crm',
    label: 'CRM',
    icon: 'users'
  }, {
    section: 'Hub'
  }, {
    key: 'masters',
    label: 'Master views',
    icon: 'library'
  }, {
    key: 'reports',
    label: 'Reports',
    icon: 'bar-chart-3'
  }, {
    key: 'studio',
    label: 'Studio',
    icon: 'sparkles'
  }, {
    key: 'channels',
    label: 'Channels',
    icon: 'git-branch'
  }];
  return {
    A,
    cols,
    designs,
    byCode,
    customers,
    parcels,
    nav
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/data.js", error: String((e && e.message) || e) }); }

// ui_kits/sutra-mobile/Approvals.jsx
try { (() => {
const {
  Badge,
  Button,
  IconButton,
  Tag,
  Stepper,
  Icon,
  Thumb,
  StatTile,
  Card
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
function Score({
  label,
  v,
  max = 100,
  tone
}) {
  const c = tone || (v >= 70 ? 'var(--ok-500)' : v >= 40 ? 'var(--warn-500)' : 'var(--danger-500)');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 14,
      fontFeatureSettings: 'var(--num)'
    }
  }, v, max === 100 && typeof v === 'number' ? '' : ''), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      background: 'var(--bg-sunken)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: (typeof v === 'number' ? v : 60) + '%',
      height: '100%',
      background: c
    }
  }))));
}
function Approvals() {
  const c = D.customers[0];
  const [lines, setLines] = React.useState([['2798', 'Sky', 4], ['2798', 'Peach', 0], ['2798', 'Purple', 1], ['6002', 'Lilac', 3]]);
  const total = lines.reduce((s, l) => s + l[2] * (D.byCode[l[0]].price || 0), 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflow: 'auto',
      paddingTop: 58,
      paddingBottom: 110
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    variant: "ghost",
    size: "sm",
    label: "Back"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h2)',
      fontSize: 24
    }
  }, "Approvals"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    variant: "solid",
    size: "md"
  }, "3 of 7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '12px 16px 0',
      overflow: 'auto',
      scrollbarWidth: 'none'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: true,
    onClick: () => {}
  }, "Sale orders 4"), /*#__PURE__*/React.createElement(Tag, {
    onClick: () => {}
  }, "Returns 2"), /*#__PURE__*/React.createElement(Tag, {
    onClick: () => {}
  }, "Overages 1"), /*#__PURE__*/React.createElement(Tag, {
    onClick: () => {}
  }, "Costing")), /*#__PURE__*/React.createElement(Card, {
    style: {
      margin: '14px 16px 0'
    },
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-title)',
      fontSize: 18
    }
  }, "Ramleela Fashion"), /*#__PURE__*/React.createElement(Badge, {
    tone: "ok"
  }, "Platinum"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "phone",
    size: "sm",
    variant: "soft",
    label: "Call"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "Surat \xB7 Raghani Co. \xB7 Deepak \xB7 since 30/08/24"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Score, {
    label: "Payment",
    v: 78
  }), /*#__PURE__*/React.createElement(Score, {
    label: "Customer",
    v: 68
  }), /*#__PURE__*/React.createElement(Score, {
    label: "GR ratio",
    v: 40,
    tone: "var(--danger-500)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    compact: true,
    label: "FY billing",
    value: "\u20B94.5L",
    style: {
      flex: 1,
      minWidth: 0,
      padding: '8px 10px'
    }
  }), /*#__PURE__*/React.createElement(StatTile, {
    compact: true,
    label: "Total pcs",
    value: 543,
    style: {
      flex: 1,
      minWidth: 0,
      padding: '8px 10px'
    }
  }), /*#__PURE__*/React.createElement(StatTile, {
    compact: true,
    label: "Overdue",
    value: "\u20B962,400",
    tone: "danger",
    style: {
      flex: 1.3,
      minWidth: 0,
      padding: '8px 10px'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ok"
  }, "High tier 67%"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warn"
  }, "Mid 25%"), /*#__PURE__*/React.createElement(Badge, {
    tone: "danger"
  }, "Low 8%"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Top 30"), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "Hot"))), /*#__PURE__*/React.createElement(Card, {
    style: {
      margin: '12px 16px 0'
    },
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Order"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 15
    }
  }, "SO-3455"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, "In-cabin book \xB7 10/09/25")), ['2798', '6002'].map(code => {
    const d = D.byCode[code];
    const ls = lines.map((l, i) => [l, i]).filter(([l]) => l[0] === code);
    return /*#__PURE__*/React.createElement("div", {
      key: code,
      style: {
        display: 'flex',
        gap: 12,
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Thumb, {
      src: d.src,
      code: code,
      size: 72,
      ratio: 1.3
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-code)',
        fontSize: 14
      }
    }, code), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-design-name)',
        color: 'var(--text-secondary)'
      }
    }, d.name), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-price)',
        fontSize: 15
      }
    }, "\u20B9", d.price.toLocaleString('en-IN'))), ls.map(([l, i]) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 5,
        background: D.cols[l[1]]
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-small)',
        flex: 1
      }
    }, l[1]), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-small)',
        color: 'var(--text-muted)'
      }
    }, D.byCode[code].free, " in stock"), /*#__PURE__*/React.createElement(Stepper, {
      size: "sm",
      value: l[2],
      onChange: v => setLines(lines.map((x, j) => j === i ? [x[0], x[1], v] : x))
    })))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 16,
      paddingTop: 12,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, lines.reduce((s, l) => s + l[2], 0), " pcs \xB7 due 20 days \xB7 priority 3"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-price)',
      fontSize: 22
    }
  }, "\u20B9", total.toLocaleString('en-IN'))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '8px 10px',
      background: 'var(--warn-100)',
      color: 'var(--warn-600)',
      borderRadius: 'var(--r-sm)',
      font: 'var(--text-small)'
    }
  }, "Note: 2018 ke red ka stock check karna hai")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '14px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    block: true,
    icon: "x"
  }, "Reject"), /*#__PURE__*/React.createElement(Button, {
    variant: "success",
    size: "lg",
    block: true,
    icon: "check"
  }, "Approve")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "arrow-up-right",
    onClick: () => {}
  }, "Escalate to owner")));
}
Object.assign(window, {
  Approvals
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-mobile/Approvals.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-mobile/Catalogue.jsx
try { (() => {
const {
  ProductCard,
  Badge,
  Button,
  IconButton,
  Tag,
  Tabs,
  SearchBar,
  Icon,
  Thumb
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const carts = [{
  k: 'A',
  name: 'Ramleela Fashion',
  n: 4,
  on: true
}, {
  k: 'B',
  name: 'RL Fashion',
  n: 2
}, {
  k: 'C',
  name: 'Ramleela Fashion',
  n: 0
}];
/** Fixed top bar of the catalogue module: menu · lockup · role · theme · carts */
function TopBar({
  cartCount,
  dark,
  onDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "menu",
    variant: "ghost",
    size: "sm",
    label: "Menu"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 14px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.A + 'logo/sutra-mark-gold.png',
    style: {
      height: 26
    },
    alt: "Sutra"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 20,
      background: 'var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: D.A + 'clients/srs-logo.png',
    style: {
      height: 24
    },
    alt: ""
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    size: "md"
  }, "Sales"), /*#__PURE__*/React.createElement(IconButton, {
    icon: dark ? 'sun' : 'moon',
    variant: "ghost",
    size: "sm",
    onClick: onDark,
    label: "Theme"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "shopping-bag",
    variant: "card",
    size: "sm",
    badge: cartCount,
    label: "Carts"
  }));
}
function CartChips() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflow: 'auto',
      padding: '0 16px',
      scrollbarWidth: 'none'
    }
  }, carts.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.k,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      height: 40,
      padding: '0 14px 0 6px',
      borderRadius: 'var(--r-pill)',
      background: c.on ? 'var(--gold-400)' : 'var(--surface-card)',
      color: c.on ? 'var(--ink-900)' : 'var(--text-primary)',
      border: '1px solid ' + (c.on ? 'transparent' : 'var(--border-default)'),
      font: 'var(--text-small)',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      flex: 'none',
      boxShadow: 'var(--shadow-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      background: c.on ? 'rgba(36,23,18,.12)' : 'var(--bg-sunken)',
      display: 'grid',
      placeItems: 'center',
      font: 'var(--text-design-name)',
      fontSize: 15
    }
  }, c.k), c.name, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      opacity: .7
    }
  }, c.n))), /*#__PURE__*/React.createElement(IconButton, {
    icon: "plus",
    size: "md",
    variant: "card",
    label: "New cart",
    style: {
      flex: 'none'
    }
  }));
}
function Catalogue({
  onOpen,
  onAdd,
  cartCount,
  dark,
  onDark
}) {
  const [cat, setCat] = React.useState('all');
  const [filters, setFilters] = React.useState(['Top 30', 'Delhi']);
  const list = D.designs.filter(d => d.src).filter(d => cat === 'all' || (cat === 'samples' ? d.price == null : d.cat.toLowerCase() === cat));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingTop: 58
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    cartCount: cartCount,
    dark: dark,
    onDark: onDark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: cat,
    onChange: setCat,
    caps: false,
    items: [{
      key: 'all',
      label: 'All'
    }, {
      key: 'samples',
      label: 'Samples'
    }, {
      key: 'lehenga',
      label: 'Lehenga'
    }, {
      key: 'saree',
      label: 'Saree'
    }, {
      key: 'plazo set',
      label: 'Plazo'
    }],
    style: {
      gap: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      padding: '12px 16px 0',
      overflow: 'auto',
      scrollbarWidth: 'none'
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    onRemove: () => setFilters(filters.filter(x => x !== f))
  }, f)), /*#__PURE__*/React.createElement(Tag, {
    icon: "sliders-horizontal",
    onClick: () => {}
  }, "Filters"), /*#__PURE__*/React.createElement(Tag, {
    icon: "arrow-down-up",
    onClick: () => {}
  }, "Featured")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 18px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, list.length, " designs"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "list",
    variant: "ghost",
    size: "sm",
    label: "List view"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '10px 16px 190px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: '18px 14px',
      alignContent: 'start'
    }
  }, list.map(d => /*#__PURE__*/React.createElement(ProductCard, {
    key: d.code,
    width: "100%",
    src: d.src,
    code: d.code,
    name: d.name,
    price: d.price,
    tag: d.tag,
    tagTone: d.tagTone || 'brand',
    note: d.note,
    colours: d.colours.map(n => ({
      name: n,
      hex: D.cols[n]
    })),
    activeColour: d.colours[0],
    onAdd: () => onAdd(d),
    onClick: () => onOpen(d)
  }))));
}
/** Floating stack docked above the bottom bar: cart chips + search/scan. */
function CatalogueDock({
  onScan
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 96,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement(CartChips, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    size: "lg",
    placeholder: "Design no, name, city",
    onScan: onScan
  })));
}
Object.assign(window, {
  Catalogue,
  CatalogueDock,
  TopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-mobile/Catalogue.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-mobile/MobileApp.jsx
try { (() => {
const {
  BottomBar
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const NAV = [{
  key: 'home',
  label: 'Home',
  icon: 'house'
}, {
  key: 'catalogue',
  label: 'Catalogue',
  icon: 'layout-grid'
}, {
  key: 'carts',
  label: 'Carts',
  icon: 'shopping-bag'
}, {
  key: 'crm',
  label: 'CRM',
  icon: 'users'
}, {
  key: 'godown',
  label: 'Godown',
  icon: 'warehouse'
}, {
  key: 'chat',
  label: 'Chat',
  icon: 'message-circle'
}];
function Phone({
  start,
  startDesign
}) {
  const [screen, setScreen] = React.useState(start);
  const [design, setDesign] = React.useState(startDesign || D.designs[0]);
  const [cart, setCart] = React.useState(8);
  const [dark, setDark] = React.useState(false);
  const mod = screen === 'approvals' ? 'home' : screen === 'product' ? 'catalogue' : screen;
  const bump = () => setCart(c => c + 1);
  return /*#__PURE__*/React.createElement(IOSDevice, {
    width: 390,
    height: 844
  }, /*#__PURE__*/React.createElement("div", {
    "data-theme": dark ? 'dark' : undefined,
    style: {
      position: 'relative',
      height: '100%',
      background: 'var(--bg-page)',
      color: 'var(--text-primary)',
      overflow: 'hidden'
    }
  }, screen === 'catalogue' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Catalogue, {
    onOpen: d => {
      setDesign(d);
      setScreen('product');
    },
    onAdd: bump,
    cartCount: cart,
    dark: dark,
    onDark: () => setDark(!dark)
  }), /*#__PURE__*/React.createElement(CatalogueDock, {
    onScan: () => {}
  })), screen === 'product' && /*#__PURE__*/React.createElement(ProductPage, {
    design: design,
    onBack: () => setScreen('catalogue'),
    onAdd: bump
  }), screen === 'approvals' && /*#__PURE__*/React.createElement(Approvals, null), (screen === 'home' || screen === 'carts' || screen === 'crm' || screen === 'godown' || screen === 'chat') && /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--text-muted)',
      textAlign: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      color: 'var(--text-secondary)'
    }
  }, NAV.find(n => n.key === screen).label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      font: 'var(--text-small)'
    }
  }, "Not in this kit yet."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 22
    }
  }, /*#__PURE__*/React.createElement(BottomBar, {
    value: mod,
    onChange: k => setScreen(k === 'home' ? 'approvals' : k),
    items: NAV.map(n => n.key === 'carts' ? {
      ...n,
      count: cart
    } : n)
  }))));
}
function MobileApp() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      display: 'flex',
      gap: 40,
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 40,
      background: 'var(--sand-200)'
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    start: "catalogue"
  }), /*#__PURE__*/React.createElement(Phone, {
    start: "product",
    startDesign: D.designs[1]
  }), /*#__PURE__*/React.createElement(Phone, {
    start: "approvals"
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(MobileApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-mobile/MobileApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-mobile/ProductPage.jsx
try { (() => {
const {
  Badge,
  Button,
  IconButton,
  Tag,
  ColourDots,
  Stepper,
  Switch,
  Icon,
  Thumb
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const stockRow = (label, vals, tone) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '92px repeat(4, 1fr)',
    alignItems: 'center',
    padding: '8px 0',
    borderTop: '1px solid var(--border-subtle)',
    font: 'var(--text-small)'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--text-muted)'
  }
}, label), vals.map((v, i) => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    textAlign: 'center',
    font: 'var(--text-label)',
    fontSize: 13,
    fontFeatureSettings: 'var(--num)',
    color: v === 0 || v === '—' ? 'var(--text-muted)' : tone || 'var(--text-primary)'
  }
}, v)));
function ProductPage({
  design,
  onBack,
  onAdd
}) {
  const d = design || D.designs[0];
  const [colour, setColour] = React.useState(d.colours[0]);
  const [sales, setSales] = React.useState(false);
  const [qty, setQty] = React.useState(0);
  const cols = d.colours.map(n => ({
    name: n,
    hex: D.cols[n]
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflow: 'auto',
      paddingBottom: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 520,
      background: 'var(--photo-backdrop)'
    }
  }, d.src && /*#__PURE__*/React.createElement("img", {
    src: d.src,
    alt: d.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      top: 58,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    variant: "glass",
    onClick: onBack,
    label: "Back"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "images",
    variant: "glass",
    label: "Gallery"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "share-2",
    variant: "glass",
    label: "Share"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 16,
      display: 'flex',
      gap: 6
    }
  }, d.tag && /*#__PURE__*/React.createElement(Badge, {
    tone: d.tagTone || 'brand',
    variant: "solid",
    size: "md"
  }, d.tag), d.note && /*#__PURE__*/React.createElement(Badge, {
    tone: "danger",
    variant: "solid",
    size: "md"
  }, d.note)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      padding: '8px 10px',
      borderRadius: 'var(--r-pill)',
      background: 'rgba(36,23,18,.55)',
      backdropFilter: 'var(--blur-glass)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: '#fff',
      font: 'var(--text-small)'
    }
  }, /*#__PURE__*/React.createElement(ColourDots, {
    colours: cols,
    active: colour,
    onSelect: setColour,
    size: 14
  }), colour)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 18
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h1)',
      fontSize: 30
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-price)',
      fontSize: 26
    }
  }, d.price ? '₹' + d.price.toLocaleString('en-IN') : 'TBD')), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, d.cat, " \xB7 ", d.colours.length, " colours \xB7 zari work"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      overflow: 'auto',
      flex: 1
    }
  }, d.colours.map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    onClick: () => setColour(n),
    style: {
      flex: 'none',
      width: 68,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Thumb, {
    src: n === d.colours[0] ? d.src : undefined,
    code: d.code,
    colour: n === d.colours[0] ? undefined : D.cols[n],
    size: 68,
    ratio: 1.25,
    style: {
      boxShadow: n === colour ? '0 0 0 2px var(--surface-card), 0 0 0 3.5px var(--accent)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      textAlign: 'center',
      marginTop: 6,
      color: n === colour ? 'var(--text-primary)' : 'var(--text-muted)'
    }
  }, n))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 20,
      padding: '12px 14px',
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-lg)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13
    }
  }, "Cart A \xB7 Ramleela"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Stepper, {
    value: qty,
    onChange: setQty,
    size: "lg"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "plus",
    onClick: () => {
      setQty(qty + 1);
      onAdd && onAdd(d);
    }
  }, "Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    block: true
  }, "Add colour set"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    block: true
  }, "Add to all carts")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: sales,
    onChange: setSales,
    label: "Salesperson view"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), sales && /*#__PURE__*/React.createElement(Badge, {
    tone: "warn"
  }, "Staff only")), sales && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: '14px 16px',
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-lg)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '92px repeat(4, 1fr)',
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null), " ", d.colours.slice(0, 4).map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      textAlign: 'center'
    }
  }, n))), stockRow('In stock', [20, 2, 5, 15].slice(0, d.colours.length)), stockRow('Reserved', [4, 0, 1, 0].slice(0, d.colours.length)), stockRow('In production', [30, 0, 10, 0].slice(0, d.colours.length), 'var(--text-brand)'), stockRow('Due 30/07', [10, '—', 8, '—'].slice(0, d.colours.length)), stockRow('Due 10/08', [10, '—', 2, '—'].slice(0, d.colours.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "flag",
    onClick: () => {}
  }, "Priority sell"), /*#__PURE__*/React.createElement(Tag, {
    icon: "tags",
    onClick: () => {}
  }, "Set tag"), /*#__PURE__*/React.createElement(Tag, {
    icon: "upload",
    onClick: () => {}
  }, "Add media"), /*#__PURE__*/React.createElement(Tag, {
    icon: "scroll-text",
    onClick: () => {}
  }, "Recipe")))));
}
Object.assign(window, {
  ProductPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-mobile/ProductPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-mobile/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      "data-om-starter": "ios-frame",
      style: {
        width,
        height,
        borderRadius: 48,
        overflow: 'hidden',
        position: 'relative',
        background: dark ? '#000' : '#F2F2F7',
        boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
        fontFamily: '-apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 11,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 126,
        height: 37,
        borderRadius: 24,
        background: '#000',
        zIndex: 50
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }
    }, /*#__PURE__*/React.createElement(IOSStatusBar, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
      title: title,
      dark: dark
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto'
      }
    }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 8,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 139,
        height: 5,
        borderRadius: 100,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
      }
    })))
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-mobile/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-web/DispatchPacking.jsx
try { (() => {
const {
  Card,
  Badge,
  Button,
  IconButton,
  Tag,
  Thumb,
  Stepper,
  Switch,
  Icon,
  Toast
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const PST = {
  OPEN: 'danger',
  PACKED: 'ok',
  INVOICED: 'neutral'
};
function CurrentOrderPane({
  customer
}) {
  const c = customer;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 300,
      flex: 'none',
      borderRight: '1px solid var(--border-subtle)',
      background: 'var(--bg-raised)',
      overflow: 'auto',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 12.5,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, "Current order"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    variant: "solid"
  }, c.orders.reduce((s, o) => s + o.lines.length, 0))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-title)'
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, c.city), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "phone"
  }, c.phone))), c.orders.map(o => /*#__PURE__*/React.createElement(Card, {
    key: o.no,
    padding: 12,
    style: {
      boxShadow: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 14,
    style: {
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 13
    }
  }, o.no), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, o.lines.reduce((s, l) => s + l[2], 0), " pcs")), o.lines.map((l, i) => {
    const d = D.byCode[l[0]];
    const packed = i === 0 ? l[2] : i === 1 ? Math.floor(l[2] / 2) : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement(Thumb, {
      src: d && d.src,
      code: l[0],
      colour: !d || !d.src ? D.cols[l[1]] : undefined,
      size: 44,
      ratio: 1.3
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-body)',
        fontWeight: 500
      }
    }, l[1], " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)'
      }
    }, "\xD7", l[2])), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-small)',
        color: l[3] ? 'var(--text-muted)' : 'var(--danger-500)',
        marginTop: 2
      }
    }, l[3] ? (d ? d.free : 0) + ' in stock · ' + (l[2] - packed) + ' pending' : 'no stock')), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 14,
        display: 'grid',
        placeItems: 'center',
        font: 'var(--text-overline)',
        fontSize: 10,
        background: packed >= l[2] ? 'var(--ok-100)' : packed ? 'var(--warn-100)' : 'var(--bg-sunken)',
        color: packed >= l[2] ? 'var(--ok-600)' : packed ? 'var(--warn-600)' : 'var(--text-muted)'
      }
    }, packed >= l[2] ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13,
      strokeWidth: 2.4
    }) : packed ? packed + '/' + l[2] : '—'), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "soft",
      caps: true,
      iconRight: "chevron-right",
      disabled: !l[3] || packed >= l[2]
    }, "Pack"));
  }))));
}
function ParcelCard({
  p,
  active,
  onSelect,
  onClose
}) {
  const [lines, setLines] = React.useState(p.lines);
  const tone = PST[p.status];
  const dim = p.status === 'INVOICED';
  return /*#__PURE__*/React.createElement(Card, {
    bar: active ? 'var(--accent)' : p.status === 'PACKED' ? 'var(--ok-500)' : 'var(--ink-300)',
    selected: active,
    onClick: () => onSelect(p.code),
    padding: 0,
    style: {
      opacity: dim ? .6 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 20,
      fontWeight: 500
    }
  }, p.code), active && /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Packing into"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    variant: p.status === 'OPEN' ? 'soft' : 'solid'
  }, p.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 4px 20px'
    }
  }, lines.map((l, i) => {
    const d = D.byCode[l[0]];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        borderTop: i ? '1px solid var(--border-subtle)' : 0
      }
    }, /*#__PURE__*/React.createElement(Thumb, {
      src: d && d.src,
      code: l[0],
      colour: !d || !d.src ? D.cols[l[1]] : undefined,
      size: 40,
      ratio: 1.2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-code)',
        fontSize: 13.5
      }
    }, l[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body)',
        color: 'var(--text-secondary)'
      }
    }, l[1]), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), p.status === 'OPEN' ? /*#__PURE__*/React.createElement(Stepper, {
      size: "sm",
      value: l[2],
      max: l[3],
      onChange: v => setLines(lines.map((x, j) => j === i ? [x[0], x[1], v, x[3]] : x))
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-label)',
        fontSize: 13
      }
    }, "\xD7", l[2]), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-small)',
        color: 'var(--text-muted)',
        width: 30,
        textAlign: 'right'
      }
    }, "/", l[3]), p.status === 'OPEN' && /*#__PURE__*/React.createElement(IconButton, {
      icon: "x",
      size: "sm",
      variant: "ghost",
      label: "Remove"
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 16px 14px 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13
    }
  }, lines.reduce((s, l) => s + l[2], 0), " pcs"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), p.status === 'OPEN' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "plus"
  }, "Add line"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "inverse",
    caps: true,
    onClick: e => {
      e.stopPropagation();
      onClose(p.code);
    }
  }, "Close parcel")), p.status === 'PACKED' && /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "soft",
    caps: true,
    iconRight: "chevron-right"
  }, "Review invoice"), p.status === 'INVOICED' && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, "awaiting shipment \xB7 TMP-260903-0036")));
}
function InvoicePane({
  customer,
  review
}) {
  const rows = [['1243', 'Mehroon', 2, 4995], ['D9107', 'White', 1, 1495], ['3661', 'Peach', 1, 5995]];
  const total = rows.reduce((s, r) => s + r[2] * r[3], 0);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--pane-w)',
      flex: 'none',
      borderLeft: '1px solid var(--border-subtle)',
      background: 'var(--bg-raised)',
      overflow: 'auto',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 12.5,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, "Invoice"), /*#__PURE__*/React.createElement(Badge, {
    tone: review ? 'warn' : 'gold',
    dot: true
  }, review ? 'Review' : 'Live')), review && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--warn-600)',
      background: 'var(--warn-100)',
      padding: '10px 12px',
      borderRadius: 'var(--r-sm)'
    }
  }, "Fix qty and rate, then confirm \u2014 nothing reaches Busy until you do."), /*#__PURE__*/React.createElement(Card, {
    padding: 18,
    style: {
      boxShadow: 'none',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h2)'
    }
  }, "Shree Radha Studio"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "9/112, Gandhi Nagar, Delhi \xB7 GSTIN 07AEZPA2938L2ZX"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 16,
      font: 'var(--text-small)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      font: 'var(--text-body)'
    }
  }, customer.name), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "P00059 \xB7 Order SO-3034")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "03/09/26")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 12,
      padding: '8px 10px',
      background: 'var(--bg-raised)',
      borderRadius: 'var(--r-sm)',
      font: 'var(--text-small)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      font: 'var(--text-overline)',
      letterSpacing: '.08em',
      textTransform: 'uppercase'
    }
  }, "Bill to"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, customer.name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Tag, {
    icon: "link",
    onClick: () => {},
    style: {
      height: 24
    }
  }, "gaddi")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: 14,
      font: 'var(--text-small)',
      fontFeatureSettings: 'var(--num)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: 'var(--text-muted)',
      textAlign: 'left'
    }
  }, ['Title', 'Colour', 'Qty', 'Rate', 'Amount'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      fontWeight: 500,
      padding: '6px 0',
      borderBottom: '1px solid var(--border-default)',
      textAlign: i > 1 ? 'right' : 'left'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r[0] + r[1]
  }, [r[0], r[1], r[2], r[3].toLocaleString('en-IN'), '₹' + (r[2] * r[3]).toLocaleString('en-IN')].map((v, i) => /*#__PURE__*/React.createElement("td", {
    key: i,
    style: {
      padding: '8px 0',
      borderBottom: '1px solid var(--border-subtle)',
      textAlign: i > 1 ? 'right' : 'left',
      font: i === 0 ? 'var(--text-code)' : 'inherit'
    }
  }, review && (i === 2 || i === 3) ? /*#__PURE__*/React.createElement("input", {
    defaultValue: v,
    style: {
      width: i === 2 ? 36 : 64,
      textAlign: 'right',
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      padding: '3px 6px',
      font: 'inherit',
      background: 'var(--surface-card)'
    }
  }) : v)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, rows.reduce((s, r) => s + r[2], 0), " pcs \xB7 CGST 2.5% + SGST 2.5%"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-price)',
      fontSize: 26
    }
  }, "\u20B9", Math.round(total * 1.05).toLocaleString('en-IN')))), review ? /*#__PURE__*/React.createElement(Button, {
    variant: "success",
    block: true,
    size: "lg",
    icon: "check"
  }, "Confirm \u2192 Push to Busy") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    icon: "truck"
  }, "Close shipment \xB7 2 parcels"));
}
function DispatchPacking({
  customer
}) {
  const c = customer || D.customers[2];
  const [active, setActive] = React.useState('P00059');
  const [review, setReview] = React.useState(false);
  const [scan, setScan] = React.useState(true);
  const [toast, setToast] = React.useState(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CurrentOrderPane, {
    customer: c
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'auto',
      padding: 'var(--gutter-desktop)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      overflow: 'auto'
    }
  }, D.customers.slice(0, 5).map(x => {
    const on = x.id === c.id;
    return /*#__PURE__*/React.createElement("span", {
      key: x.id,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 36,
        padding: '0 8px 0 14px',
        borderRadius: 'var(--r-pill)',
        background: on ? 'var(--accent)' : 'var(--surface-card)',
        color: on ? 'var(--accent-on)' : 'var(--text-primary)',
        border: '1px solid ' + (on ? 'transparent' : 'var(--border-default)'),
        font: 'var(--text-small)',
        fontWeight: 500,
        whiteSpace: 'nowrap'
      }
    }, x.name, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 48,
        height: 4,
        borderRadius: 2,
        background: on ? 'rgba(255,255,255,.3)' : 'var(--bg-sunken)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        width: on ? '55%' : '20%',
        height: '100%',
        background: on ? '#fff' : 'var(--ok-500)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-overline)',
        opacity: .8
      }
    }, on ? '4/12' : '0/9'));
  }), /*#__PURE__*/React.createElement(Tag, {
    onClick: () => {}
  }, "All parcels")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: scan,
    onChange: setScan,
    label: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "scan-line",
      size: 15
    }), "Scan here")
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "boxes"
  }, "Select for shipment"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, "4 boxes"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-down-up",
    variant: "card",
    size: "sm",
    label: "Sort"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "filter",
    variant: "card",
    size: "sm",
    label: "Filter"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
      gap: 'var(--card-gap)',
      alignItems: 'start'
    }
  }, D.parcels.map(p => /*#__PURE__*/React.createElement(ParcelCard, {
    key: p.code,
    p: p,
    active: p.code === active,
    onSelect: setActive,
    onClose: () => setReview(true)
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      height: 88,
      border: '1.5px dashed var(--border-strong)',
      borderRadius: 'var(--r-card)',
      background: 'transparent',
      color: 'var(--text-secondary)',
      font: 'var(--text-body)',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  }), "Add parcel")), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: 20,
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "ok",
    title: "Accepted",
    message: "1243 Mehroon \u2192 P00059 \xB7 2 of 2",
    onClose: () => setToast(false)
  }))), /*#__PURE__*/React.createElement(InvoicePane, {
    customer: c,
    review: review
  }));
}
Object.assign(window, {
  DispatchPacking
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-web/DispatchPacking.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-web/DispatchReady.jsx
try { (() => {
const {
  Card,
  Badge,
  Button,
  IconButton,
  Tag,
  SearchBar,
  Icon
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const pcs = c => c.orders.reduce((s, o) => s + o.lines.reduce((t, l) => t + l[2], 0), 0);
const packable = c => c.orders.reduce((s, o) => s + o.lines.filter(l => l[3]).reduce((t, l) => t + l[2], 0), 0);
function CallChip({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '0 10px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--bg-raised)',
      border: '1px solid var(--border-subtle)',
      font: 'var(--text-small)',
      color: 'var(--text-secondary)',
      cursor: 'pointer'
    }
  }, children, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 12,
    style: {
      color: 'var(--text-brand)'
    }
  }));
}
function CustomerCard({
  c,
  onPack
}) {
  const total = pcs(c),
    ok = packable(c);
  return /*#__PURE__*/React.createElement(Card, {
    ring: 'var(--p' + c.priority + ')',
    padding: 0,
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-title)',
      fontSize: 17,
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, c.name), /*#__PURE__*/React.createElement(Badge, {
    tone: c.tier === 'Platinum' ? 'ok' : c.tier === 'Gold' ? 'gold' : 'neutral'
  }, c.tier)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, c.market ? c.market + ' · ' : '', /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-secondary)',
      fontWeight: 500
    }
  }, c.city)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(CallChip, null, c.phone), /*#__PURE__*/React.createElement(CallChip, null, c.transport), /*#__PURE__*/React.createElement(CallChip, null, c.broker))), c.orders.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.no,
    style: {
      margin: '0 12px 10px',
      padding: '10px 12px',
      background: 'var(--bg-raised)',
      borderRadius: 'var(--r-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 13
    }
  }, o.no), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, o.date), /*#__PURE__*/React.createElement(Badge, {
    tone: o.due <= 2 ? 'danger' : 'neutral'
  }, o.due < 0 ? o.due + 'd' : o.due + 'd left'), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 5,
      background: 'var(--p' + c.priority + ')'
    },
    title: 'P' + c.priority
  })), o.note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--warn-600)',
      background: 'var(--warn-100)',
      padding: '4px 8px',
      borderRadius: 'var(--r-xs)',
      marginTop: 8
    }
  }, "Note: ", o.note), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, o.lines.map((l, i) => /*#__PURE__*/React.createElement(LineRow, {
    key: i,
    line: l,
    compact: true
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 18px 16px',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13
    }
  }, total, " pcs"), ok < total && /*#__PURE__*/React.createElement(Badge, {
    tone: "warn"
  }, ok, "/", total, " in stock"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    caps: true,
    iconRight: "chevron-right",
    onClick: () => onPack(c)
  }, "Pack")));
}
function PendingPane({
  open,
  onToggle
}) {
  const [exp, setExp] = React.useState('c6');
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: open ? 'var(--pane-w)' : 48,
      flex: 'none',
      borderLeft: '1px solid var(--border-subtle)',
      background: 'var(--bg-raised)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width var(--dur-slow) var(--ease-out)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: open ? '14px 16px' : '14px 6px',
      justifyContent: open ? 'flex-start' : 'center'
    }
  }, open && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 12.5,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, "Pending orders"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    variant: "solid"
  }, "42"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: open ? 'panel-right-close' : 'panel-right-open',
    variant: "ghost",
    size: "sm",
    onClick: onToggle,
    label: "Toggle pane"
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    placeholder: "Customer or design no",
    style: {
      height: 38,
      boxShadow: 'none'
    }
  }), D.customers.map(c => {
    const o = exp === c.id;
    const t = pcs(c);
    const amt = c.orders.reduce((s, or) => s + or.lines.reduce((x, l) => x + l[2] * ((D.byCode[l[0]] || {}).price || 0), 0), 0);
    return /*#__PURE__*/React.createElement(Card, {
      key: c.id,
      padding: 0,
      style: {
        boxShadow: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => setExp(o ? null : c.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 12px',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-label)',
        fontSize: 13.5
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-small)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, c.orders.length, " order", c.orders.length > 1 ? 's' : '', " \xB7 ", t, " pcs")), /*#__PURE__*/React.createElement(Badge, {
      tone: Math.min(...c.orders.map(x => x.due)) < 0 ? 'danger' : 'neutral'
    }, Math.min(...c.orders.map(x => x.due)), "d"), /*#__PURE__*/React.createElement(Icon, {
      name: o ? 'chevron-up' : 'chevron-down',
      size: 14,
      style: {
        color: 'var(--text-muted)'
      }
    })), o && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 12px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        alignItems: 'center',
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "ok"
    }, c.tier), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-small)',
        color: 'var(--text-muted)'
      }
    }, c.market || c.city)), c.orders.map(or => /*#__PURE__*/React.createElement("div", {
      key: or.no,
      style: {
        padding: '8px 10px',
        background: 'var(--bg-raised)',
        borderRadius: 'var(--r-sm)',
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-code)',
        fontSize: 12.5
      }
    }, or.no), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-small)',
        color: 'var(--text-muted)'
      }
    }, or.date), or.lines.some(l => !l[3]) && /*#__PURE__*/React.createElement(Badge, {
      tone: "danger"
    }, or.lines.filter(l => !l[3]).length, " short"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-small)'
      }
    }, or.lines.reduce((s, l) => s + l[2], 0), " pcs")), or.lines.map((l, i) => /*#__PURE__*/React.createElement(LineRow, {
      key: i,
      line: l,
      compact: true,
      showRate: true
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        font: 'var(--text-small)',
        marginTop: 8,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "Customer total"), /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 500,
        color: 'var(--text-primary)',
        fontFeatureSettings: 'var(--num)'
      }
    }, t, " pcs \xB7 \u20B9", amt.toLocaleString('en-IN')))));
  })));
}
function DispatchReady({
  onPack
}) {
  const [pane, setPane] = React.useState(true);
  const [q, setQ] = React.useState('');
  const [filters, setFilters] = React.useState(['In stock only', 'Due < 15d']);
  const list = D.customers.filter(c => packable(c) > 0 && (!q || c.name.toLowerCase().includes(q.toLowerCase()) || c.orders.some(o => o.lines.some(l => l[0].includes(q)))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px var(--gutter-desktop) 0'
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    value: q,
    onChange: setQ,
    placeholder: "Customer or design no",
    style: {
      width: 320
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    onRemove: () => setFilters(filters.filter(x => x !== f))
  }, f)), /*#__PURE__*/React.createElement(Tag, {
    icon: "sliders-horizontal",
    onClick: () => {}
  }, "Filters"), /*#__PURE__*/React.createElement(Tag, {
    icon: "arrow-down-up",
    onClick: () => {}
  }, "Due, oldest first")), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, list.length, " orders \xB7 updated just now"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "refresh-cw",
    variant: "card",
    size: "sm",
    label: "Refresh"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevrons-down-up",
    variant: "card",
    size: "sm",
    label: "Collapse all"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 'var(--card-gap)',
      padding: 'var(--gutter-desktop)'
    }
  }, list.map(c => /*#__PURE__*/React.createElement(CustomerCard, {
    key: c.id,
    c: c,
    onPack: onPack
  })))), /*#__PURE__*/React.createElement(PendingPane, {
    open: pane,
    onToggle: () => setPane(!pane)
  }));
}
Object.assign(window, {
  DispatchReady
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-web/DispatchReady.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-web/MastersProducts.jsx
try { (() => {
const {
  ProductCard,
  Badge,
  Button,
  IconButton,
  Tag,
  SearchBar,
  SegmentedControl,
  Thumb,
  ColourDots,
  StatTile,
  Tabs
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const alerts = [[102, 'SKUs at or below the low-stock mark'], [104, 'Designs with no photo yet'], [113, 'Designs the demand engine has never scored'], [15, 'Purchase documents not linked to a supplier ledger']];
function Spark({
  v
}) {
  const pts = [30, 42, 38, 55, 48, 62, v].map((y, i) => i * 10 + ',' + (30 - y * .4)).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    width: "64",
    height: "30",
    viewBox: "0 0 64 30",
    style: {
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "var(--brand-500)",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }));
}
function MastersProducts() {
  const [mode, setMode] = React.useState('grid');
  const [fam, setFam] = React.useState('items');
  const [ent, setEnt] = React.useState('products');
  const [q, setQ] = React.useState('');
  const list = D.designs.filter(d => !q || d.code.includes(q) || d.name.toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px var(--gutter-desktop) 0'
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: fam,
    onChange: setFam,
    options: [{
      value: 'items',
      label: 'Items'
    }, {
      value: 'ledgers',
      label: 'Ledgers'
    }]
  }), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    caps: false,
    size: "sm",
    value: ent,
    onChange: setEnt,
    items: fam === 'items' ? [{
      key: 'products',
      label: 'Products',
      count: 118
    }, {
      key: 'materials',
      label: 'Materials',
      count: 22
    }, {
      key: 'wip',
      label: 'WIP',
      count: 2
    }] : [{
      key: 'customers',
      label: 'Customers',
      count: 67
    }, {
      key: 'agencies',
      label: 'Broker agencies',
      count: 34
    }, {
      key: 'brokers',
      label: 'Brokers',
      count: 25
    }, {
      key: 'karigars',
      label: 'Karigars',
      count: 52
    }, {
      key: 'transporters',
      label: 'Transporters',
      count: 55
    }, {
      key: 'suppliers',
      label: 'Suppliers',
      count: 40
    }, {
      key: 'team',
      label: 'Team',
      count: 9
    }],
    style: {
      background: 'transparent',
      padding: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '14px var(--gutter-desktop) 0',
      overflow: 'auto'
    }
  }, alerts.map(([n, t], i) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      height: 34,
      padding: '0 14px 0 10px',
      borderRadius: 'var(--r-pill)',
      background: i === 0 ? 'var(--accent-soft)' : 'var(--surface-card)',
      border: '1px solid ' + (i === 0 ? 'transparent' : 'var(--border-subtle)'),
      color: i === 0 ? 'var(--text-brand)' : 'var(--text-secondary)',
      font: 'var(--text-small)',
      whiteSpace: 'nowrap',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: 'var(--text-label)',
      fontSize: 14,
      fontFeatureSettings: 'var(--num)',
      color: i === 0 ? 'var(--text-brand)' : 'var(--text-primary)'
    }
  }, n), t, " \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px var(--gutter-desktop) 0'
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    value: q,
    onChange: setQ,
    placeholder: "Search design no, name or colour",
    style: {
      flex: 1,
      maxWidth: 520
    }
  }), /*#__PURE__*/React.createElement(Tag, {
    icon: "sliders-horizontal",
    onClick: () => {}
  }, "Filters"), /*#__PURE__*/React.createElement(Tag, {
    icon: "bookmark",
    onClick: () => {}
  }, "Views"), mode === 'list' && /*#__PURE__*/React.createElement(Tag, {
    icon: "columns-3",
    onClick: () => {}
  }, "Columns 10/15"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: mode,
    onChange: setMode,
    options: [{
      value: 'grid',
      icon: 'layout-grid',
      label: 'Grid'
    }, {
      value: 'list',
      icon: 'list',
      label: 'List'
    }]
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: "cozy",
    options: [{
      value: 'cozy',
      icon: 'rows-3',
      label: 'Cozy'
    }, {
      value: 'dense',
      icon: 'rows-4',
      label: 'Dense'
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "upload"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "download"
  }, "Import")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      padding: '10px var(--gutter-desktop) 0'
    }
  }, list.length, " of 118 designs"), mode === 'grid' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
      gap: 20,
      padding: '14px var(--gutter-desktop) var(--gutter-desktop)'
    }
  }, list.map(d => /*#__PURE__*/React.createElement(ProductCard, {
    key: d.code,
    width: "100%",
    src: d.src,
    code: d.code,
    name: d.name,
    price: d.price,
    tag: d.tag,
    tagTone: d.tagTone || 'brand',
    note: d.note,
    colours: d.colours.map(n => ({
      name: n,
      hex: D.cols[n]
    })),
    stats: {
      free: d.free,
      fg: d.fg,
      'in prod': d.prod
    },
    onClick: () => {}
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px var(--gutter-desktop) var(--gutter-desktop)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-card)',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      font: 'var(--text-body)',
      fontFeatureSettings: 'var(--num)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Design', 'Category', 'Price', 'Free', 'FG', 'Reserved', 'In prod', 'Demand', 'Colours', 'Tags'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i >= 2 && i <= 6 ? 'right' : 'left',
      padding: '12px 14px',
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-default)',
      background: 'var(--bg-raised)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, list.map(d => /*#__PURE__*/React.createElement("tr", {
    key: d.code,
    style: {
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Thumb, {
    src: d.src,
    code: d.code,
    size: 44,
    ratio: 1.2
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-code)',
      fontSize: 14
    }
  }, d.code), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-design-name)',
      fontSize: 16,
      color: 'var(--text-secondary)'
    }
  }, d.name)))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px',
      color: 'var(--text-secondary)'
    }
  }, d.cat), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px',
      textAlign: 'right',
      font: 'var(--text-price)',
      fontSize: 17
    }
  }, d.price ? '₹' + d.price.toLocaleString('en-IN') : 'TBD'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px',
      textAlign: 'right',
      fontWeight: 500
    }
  }, d.free), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px',
      textAlign: 'right',
      color: 'var(--text-secondary)'
    }
  }, d.fg), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px',
      textAlign: 'right',
      color: 'var(--text-secondary)'
    }
  }, d.fg - d.free), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px',
      textAlign: 'right',
      color: d.prod ? 'var(--text-primary)' : 'var(--text-muted)'
    }
  }, d.prod), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Spark, {
    v: d.score
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13
    }
  }, d.score))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px'
    }
  }, /*#__PURE__*/React.createElement(ColourDots, {
    colours: d.colours.map(n => ({
      name: n,
      hex: D.cols[n]
    })),
    size: 14
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, d.tag && /*#__PURE__*/React.createElement(Badge, {
    tone: d.tagTone || 'brand'
  }, d.tag), d.note && /*#__PURE__*/React.createElement(Badge, {
    tone: "danger"
  }, d.note)))))))));
}
Object.assign(window, {
  MastersProducts
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-web/MastersProducts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-web/Shell.jsx
try { (() => {
const {
  SideNav,
  Tabs,
  Badge,
  IconButton,
  Icon
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
/** Page chrome: SideNav + sticky top row (module title · node tabs · live chip · theme · user). */
function Shell({
  module,
  onModule,
  title,
  tabs,
  tab,
  onTab,
  dark,
  onDark,
  children,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: 'var(--bg-page)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement(SideNav, {
    value: module,
    onChange: onModule,
    items: D.nav,
    logoSrc: D.A + 'logo/sutra-mark-gold.png',
    clientLogoSrc: D.A + 'clients/srs-logo.png',
    user: {
      name: 'Deepak Sharma',
      role: 'Dispatch mgr',
      firm: 'SRS'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--topbar-h)',
      display: 'flex',
      alignItems: 'stretch',
      gap: 28,
      padding: '0 var(--gutter-desktop)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg-page)',
      position: 'sticky',
      top: 0,
      zIndex: 'var(--z-sticky)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      font: 'var(--text-h2)',
      fontSize: 24,
      paddingRight: 4
    }
  }, title), tabs && /*#__PURE__*/React.createElement(Tabs, {
    items: tabs,
    value: tab,
    onChange: onTab,
    style: {
      borderBottom: 0,
      alignSelf: 'stretch'
    },
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    dot: true
  }, "Live"), /*#__PURE__*/React.createElement(IconButton, {
    icon: dark ? 'sun' : 'moon',
    variant: "ghost",
    size: "sm",
    label: "Theme",
    onClick: onDark
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    variant: "ghost",
    size: "sm",
    label: "Notifications",
    badge: 3
  }), right)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex'
    }
  }, children)));
}
/** Reusable line row: thumb · code · colour dot + name · × qty · stock tick. Money never shown here. */
function LineRow({
  line,
  compact = false,
  showRate = false
}) {
  const [code, colour, qty, inStock] = line;
  const d = D.byCode[code];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: compact ? '6px 0' : '8px 0'
    }
  }, /*#__PURE__*/React.createElement(window.SutraDesignSystem_58929b.Thumb, {
    src: d && d.src,
    code: code,
    colour: !d || !d.src ? D.cols[colour] : undefined,
    size: compact ? 36 : 44,
    ratio: 1.15
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 13.5
    }
  }, code), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--text-small)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 5,
      background: D.cols[colour],
      boxShadow: 'inset 0 0 0 1px rgba(36,23,18,.15)'
    }
  }), colour), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), showRate && d && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      fontFeatureSettings: 'var(--num)'
    }
  }, "\xD7 \u20B9", d.price ? d.price.toLocaleString('en-IN') : '—'), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13,
      fontFeatureSettings: 'var(--num)'
    }
  }, "\xD7 ", qty), /*#__PURE__*/React.createElement(Icon, {
    name: inStock ? 'check-circle-2' : 'circle-dashed',
    size: 16,
    style: {
      color: inStock ? 'var(--ok-500)' : 'var(--danger-500)'
    }
  }));
}
Object.assign(window, {
  Shell,
  LineRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-web/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-web/WebApp.jsx
try { (() => {
const {
  Switch
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
function WebApp() {
  const start = (location.hash || '').replace('#', '') || 'catalogue';
  const [module, setModule] = React.useState(D.nav.some(n => n.key === start) ? start : 'catalogue');
  const [tab, setTab] = React.useState('ready');
  const [catTab, setCatTab] = React.useState('catalogue');
  const [dark, setDark] = React.useState(false);
  const [customerMode, setCustomerMode] = React.useState(false);
  const [packing, setPacking] = React.useState(null);
  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : '';
  }, [dark]);
  const dispatchTabs = [{
    key: 'ready',
    label: 'Ready',
    count: 9
  }, {
    key: 'packing',
    label: 'Packing',
    count: 35
  }, {
    key: 'billed',
    label: 'Billed'
  }, {
    key: 'stock',
    label: 'Stock'
  }, {
    key: 'oos',
    label: 'Out of stock'
  }, {
    key: 'return',
    label: 'Sale return'
  }];
  const catTabs = [{
    key: 'catalogue',
    label: 'Catalogue'
  }, {
    key: 'carts',
    label: 'Carts',
    count: 3
  }, {
    key: 'orders',
    label: 'Sale orders'
  }];
  const isDispatch = module === 'dispatch',
    isCat = module === 'catalogue' || module === 'carts';
  const title = isDispatch ? 'Dispatch' : module === 'masters' ? 'Master views' : isCat ? 'Catalogue' : D.nav.find(n => n.key === module)?.label || 'Sutra';
  let body;
  if (isDispatch && tab === 'ready') body = /*#__PURE__*/React.createElement(DispatchReady, {
    onPack: c => {
      setPacking(c);
      setTab('packing');
    }
  });else if (isDispatch && tab === 'packing') body = /*#__PURE__*/React.createElement(DispatchPacking, {
    customer: packing
  });else if (module === 'masters') body = /*#__PURE__*/React.createElement(MastersProducts, null);else if (isCat && catTab === 'catalogue') body = /*#__PURE__*/React.createElement(WebCatalogue, {
    customerMode: customerMode
  });else body = /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      color: 'var(--text-muted)',
      font: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h1)',
      color: 'var(--text-secondary)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, "Not in this kit yet \u2014 see guidelines/screen-inventory.md.")));
  return /*#__PURE__*/React.createElement(Shell, {
    module: isCat ? 'catalogue' : module,
    onModule: m => {
      setModule(m);
      if (m === 'dispatch') setTab('ready');
      if (m === 'carts') setCatTab('carts');
      if (m === 'catalogue') setCatTab('catalogue');
    },
    title: title,
    tabs: isDispatch ? dispatchTabs : isCat ? catTabs : undefined,
    tab: isDispatch ? tab : catTab,
    onTab: isDispatch ? setTab : setCatTab,
    dark: dark,
    onDark: () => setDark(!dark),
    right: isCat ? /*#__PURE__*/React.createElement(Switch, {
      size: "sm",
      checked: customerMode,
      onChange: setCustomerMode,
      label: /*#__PURE__*/React.createElement("span", {
        style: {
          font: 'var(--text-small)',
          color: customerMode ? 'var(--text-brand)' : 'var(--text-secondary)'
        }
      }, "Customer mode"),
      style: {
        marginLeft: 8
      }
    }) : null
  }, body);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(WebApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-web/WebApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sutra-web/WebCatalogue.jsx
try { (() => {
const {
  ProductCard,
  PriceText,
  Badge,
  Button,
  IconButton,
  Tag,
  Tabs,
  SearchBar,
  SegmentedControl,
  Select,
  Stepper,
  Switch,
  Thumb,
  ColourDots,
  Icon,
  Card
} = window.SutraDesignSystem_58929b;
const D = window.SUTRA_DATA;
const CARTS = [{
  k: 'A',
  name: 'Ramleela Fashion',
  city: 'Surat',
  book: 'In-cabin'
}, {
  k: 'B',
  name: 'RL Fashion',
  city: 'Meerut',
  book: 'WhatsApp'
}, {
  k: 'C',
  name: 'Nalli Fashion Mart',
  city: 'Chennai',
  book: 'In-cabin'
}];
const CATS = [{
  key: 'all',
  label: 'All'
}, {
  key: 'samples',
  label: 'Samples'
}, {
  key: 'lehenga',
  label: 'Lehenga'
}, {
  key: 'saree',
  label: 'Saree'
}, {
  key: 'plazo set',
  label: 'Plazo'
}, {
  key: 'crop top',
  label: 'Crop top'
}, {
  key: 'blouse',
  label: 'Blouse'
}];

/** Right pane — the live carts. Money is allowed here (sales roles). */
function CartPane({
  carts,
  active,
  onActive,
  lines,
  onQty,
  customerMode
}) {
  const mine = lines.filter(l => l.cart === active);
  const pcs = mine.reduce((s, l) => s + l.qty, 0);
  const amt = mine.reduce((s, l) => s + l.qty * (D.byCode[l.code].price || 0), 0);
  const cart = carts.find(c => c.k === active);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--pane-w)',
      flex: 'none',
      borderLeft: '1px solid var(--border-subtle)',
      background: 'var(--bg-raised)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 0',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 12.5,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, "Carts"), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid"
  }, carts.length), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "plus",
    size: "sm",
    variant: "card",
    label: "New cart"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '12px 16px 0',
      overflow: 'auto',
      scrollbarWidth: 'none'
    }
  }, carts.map(c => {
    const on = c.k === active;
    const n = lines.filter(l => l.cart === c.k).reduce((s, l) => s + l.qty, 0);
    return /*#__PURE__*/React.createElement("button", {
      key: c.k,
      type: "button",
      onClick: () => onActive(c.k),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 38,
        padding: '0 12px 0 5px',
        borderRadius: 'var(--r-pill)',
        border: '1px solid ' + (on ? 'transparent' : 'var(--border-default)'),
        background: on ? 'var(--gold-400)' : 'var(--surface-card)',
        color: 'var(--ink-900)',
        cursor: 'pointer',
        font: 'var(--text-small)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 14,
        background: on ? 'rgba(36,23,18,.14)' : 'var(--bg-sunken)',
        display: 'grid',
        placeItems: 'center',
        font: 'var(--text-design-name)',
        fontSize: 15
      }
    }, c.k), c.name.split(' ')[0], /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 500,
        opacity: .65
      }
    }, n));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-title)'
    }
  }, cart.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, cart.city), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Tag, {
    icon: "book-open",
    onClick: () => {},
    style: {
      height: 26
    }
  }, cart.book, " book"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '10px 16px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, mine.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px 0',
      textAlign: 'center',
      color: 'var(--text-muted)',
      font: 'var(--text-small)'
    }
  }, "Nothing in this cart yet \u2014 tap + on any design."), mine.map(l => {
    const d = D.byCode[l.code];
    return /*#__PURE__*/React.createElement(Card, {
      key: l.code + l.colour,
      padding: 10,
      style: {
        boxShadow: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Thumb, {
      src: l.colour === d.colours[0] ? d.src : undefined,
      code: d.code,
      colour: l.colour === d.colours[0] ? undefined : D.cols[l.colour],
      size: 52,
      ratio: 1.25
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-code)',
        fontSize: 13.5
      }
    }, d.code), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-design-name)',
        fontSize: 16,
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, d.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
        font: 'var(--text-small)',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 5,
        background: D.cols[l.colour]
      }
    }), l.colour, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), !customerMode && /*#__PURE__*/React.createElement(PriceText, {
      value: d.price,
      size: 14
    }))), /*#__PURE__*/React.createElement(Stepper, {
      size: "sm",
      value: l.qty,
      onChange: v => onQty(l, v)
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)'
    }
  }, pcs, " pcs \xB7 ", mine.length, " lines \xB7 due 20 days"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), !customerMode && /*#__PURE__*/React.createElement(PriceText, {
    value: amt || null,
    size: 24,
    tbd: "\u2014"
  })), /*#__PURE__*/React.createElement(Button, {
    block: true,
    size: "lg",
    iconRight: "chevron-right",
    disabled: !pcs
  }, "Submit for approval")));
}

/** Web product page (customer view + salesperson toggle) inside the catalogue main pane. */
function WebProduct({
  d,
  onBack,
  onAdd,
  customerMode
}) {
  const [colour, setColour] = React.useState(d.colours[0]);
  const [sales, setSales] = React.useState(false);
  const cols = d.colours.map(n => ({
    name: n,
    hex: D.cols[n]
  }));
  const row = (label, vals, tone) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px repeat(' + d.colours.length + ', 1fr)',
      padding: '9px 0',
      borderTop: '1px solid var(--border-subtle)',
      font: 'var(--text-small)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, label), vals.slice(0, d.colours.length).map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      textAlign: 'center',
      font: 'var(--text-label)',
      fontSize: 13.5,
      fontFeatureSettings: 'var(--num)',
      color: v === 0 || v === '—' ? 'var(--text-muted)' : tone || 'var(--text-primary)'
    }
  }, v)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--gutter-desktop)',
      display: 'grid',
      gridTemplateColumns: 'minmax(320px, 440px) 1fr',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4/5',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      background: 'var(--photo-backdrop)'
    }
  }, d.src ? /*#__PURE__*/React.createElement("img", {
    src: d.src,
    alt: d.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      font: 'var(--text-display)',
      color: 'var(--text-muted)'
    }
  }, d.code), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    variant: "glass",
    onClick: onBack,
    label: "Back"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      right: 14,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "maximize-2",
    variant: "glass",
    label: "Full screen"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "images",
    variant: "glass",
    label: "Gallery",
    badge: 6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 14,
      bottom: 14,
      display: 'flex',
      gap: 6
    }
  }, d.tag && /*#__PURE__*/React.createElement(Badge, {
    tone: d.tagTone || 'brand',
    variant: "solid",
    size: "md"
  }, d.tag), d.note && /*#__PURE__*/React.createElement(Badge, {
    tone: "danger",
    variant: "solid",
    size: "md"
  }, d.note))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 20
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-display)',
      fontSize: 40
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(PriceText, {
    value: d.price,
    size: 32
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, d.cat, " \xB7 ", d.colours.length, " colours \xB7 zari work \xB7 net & satin"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 22
    }
  }, d.colours.map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    onClick: () => setColour(n),
    style: {
      width: 84,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Thumb, {
    src: n === d.colours[0] ? d.src : undefined,
    code: d.code,
    colour: n === d.colours[0] ? undefined : D.cols[n],
    size: 84,
    ratio: 1.25,
    radius: "var(--r-md)",
    style: {
      boxShadow: n === colour ? '0 0 0 2px var(--bg-page), 0 0 0 4px var(--accent)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-small)',
      textAlign: 'center',
      marginTop: 8,
      color: n === colour ? 'var(--text-primary)' : 'var(--text-muted)'
    }
  }, n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 24,
      padding: '14px 16px',
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-lg)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 13
    }
  }, "Cart A \xB7 Ramleela Fashion"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "md",
    variant: "secondary",
    onClick: () => d.colours.forEach(c => onAdd(d, c))
  }, "Add colour set"), /*#__PURE__*/React.createElement(Button, {
    size: "md",
    icon: "plus",
    onClick: () => onAdd(d, colour)
  }, "Add ", colour)), !customerMode && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: sales,
    onChange: setSales,
    label: "Salesperson view"
  }), sales && /*#__PURE__*/React.createElement(Badge, {
    tone: "warn",
    style: {
      marginLeft: 12
    }
  }, "Staff only")), sales && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: '14px 18px',
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-lg)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px repeat(' + d.colours.length + ', 1fr)',
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", null), " ", d.colours.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      textAlign: 'center'
    }
  }, n))), row('In stock', [20, 2, 5, 15]), row('Reserved', [4, 0, 1, 0]), row('In production', [30, 0, 10, 0], 'var(--text-brand)'), row('Due 30/07', [10, '—', 8, '—']), row('Due 10/08', [10, '—', 2, '—']), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "flag",
    onClick: () => {}
  }, "Priority sell"), /*#__PURE__*/React.createElement(Tag, {
    icon: "tags",
    onClick: () => {}
  }, "Set manipulative tag"), /*#__PURE__*/React.createElement(Tag, {
    icon: "upload",
    onClick: () => {}
  }, "Add media"), /*#__PURE__*/React.createElement(Tag, {
    icon: "scroll-text",
    onClick: () => {}
  }, "Recipe"), /*#__PURE__*/React.createElement(Tag, {
    icon: "line-chart",
    onClick: () => {}
  }, "Demand graph"))))));
}
function WebCatalogue({
  customerMode
}) {
  const [kind, setKind] = React.useState('products');
  const [cat, setCat] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [mode, setMode] = React.useState('grid');
  const [filters, setFilters] = React.useState(['Top 30', 'Delhi', 'Zari work']);
  const [open, setOpen] = React.useState(null);
  const [active, setActive] = React.useState('A');
  const [lines, setLines] = React.useState([{
    cart: 'A',
    code: '2798',
    colour: 'Sky',
    qty: 2
  }, {
    cart: 'A',
    code: '6002',
    colour: 'Lilac',
    qty: 1
  }, {
    cart: 'B',
    code: '2006',
    colour: 'Lavender',
    qty: 2
  }]);
  const add = (d, colour) => setLines(ls => {
    const i = ls.findIndex(l => l.cart === active && l.code === d.code && l.colour === colour);
    if (i >= 0) return ls.map((l, j) => j === i ? {
      ...l,
      qty: l.qty + 1
    } : l);
    return [...ls, {
      cart: active,
      code: d.code,
      colour,
      qty: 1
    }];
  });
  const setQty = (line, v) => setLines(ls => v <= 0 ? ls.filter(l => l !== line) : ls.map(l => l === line ? {
    ...l,
    qty: v
  } : l));
  const list = D.designs.filter(d => cat === 'all' || (cat === 'samples' ? d.price == null : d.cat.toLowerCase() === cat)).filter(d => !q || d.code.includes(q) || d.name.toLowerCase().includes(q.toLowerCase()));
  const inCart = code => lines.filter(l => l.cart === active && l.code === code).reduce((s, l) => s + l.qty, 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, open ? /*#__PURE__*/React.createElement(WebProduct, {
    d: open,
    onBack: () => setOpen(null),
    onAdd: add,
    customerMode: customerMode
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '16px var(--gutter-desktop) 0'
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    value: q,
    onChange: setQ,
    placeholder: "Search design no, name or colour",
    onScan: () => {},
    style: {
      flex: 1,
      maxWidth: 560
    }
  }), !customerMode && /*#__PURE__*/React.createElement(SegmentedControl, {
    value: kind,
    onChange: setKind,
    options: [{
      value: 'products',
      label: 'Products'
    }, {
      value: 'materials',
      label: 'Materials'
    }, {
      value: 'wip',
      label: 'WIP'
    }]
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: mode,
    onChange: setMode,
    options: [{
      value: 'grid',
      icon: 'layout-grid',
      label: 'Grid'
    }, {
      value: 'list',
      icon: 'list',
      label: 'List'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 20,
      padding: '10px var(--gutter-desktop) 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: cat,
    onChange: setCat,
    items: CATS,
    caps: false,
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '14px var(--gutter-desktop) 0'
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    onRemove: () => setFilters(filters.filter(x => x !== f))
  }, f)), /*#__PURE__*/React.createElement(Tag, {
    icon: "sliders-horizontal",
    onClick: () => {}
  }, "Filters"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-overline)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, list.length, " designs"), /*#__PURE__*/React.createElement(Tag, {
    icon: "arrow-down-up",
    onClick: () => {}
  }, "Sort \xB7 Featured")), mode === 'grid' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(212px, 1fr))',
      gap: '26px 18px',
      padding: '18px var(--gutter-desktop) var(--gutter-desktop)'
    }
  }, list.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.code,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ProductCard, {
    width: "100%",
    src: d.src,
    code: d.code,
    name: d.name,
    price: d.price,
    tag: d.tag,
    tagTone: d.tagTone || 'brand',
    note: d.note,
    colours: d.colours.map(n => ({
      name: n,
      hex: D.cols[n]
    })),
    activeColour: d.colours[0],
    onAdd: () => add(d, d.colours[0]),
    onClick: () => setOpen(d),
    selected: inCart(d.code) > 0
  }), inCart(d.code) > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 10,
      right: 56,
      height: 24,
      padding: '0 9px',
      borderRadius: 12,
      background: 'var(--gold-400)',
      color: 'var(--ink-900)',
      font: 'var(--text-label)',
      fontSize: 11.5,
      display: 'grid',
      placeItems: 'center',
      fontFeatureSettings: 'var(--num)'
    }
  }, inCart(d.code), " in ", active)))) : /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px var(--gutter-desktop) var(--gutter-desktop)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-card)',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }
  }, list.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.code,
    onClick: () => setOpen(d),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '10px 16px',
      borderTop: i ? '1px solid var(--border-subtle)' : 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Thumb, {
    src: d.src,
    code: d.code,
    size: 56,
    ratio: 1.25
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-code)',
      fontSize: 14,
      width: 64
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-design-name)',
      flex: 1
    }
  }, d.name, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-muted)',
      marginLeft: 10
    }
  }, d.cat)), /*#__PURE__*/React.createElement(ColourDots, {
    colours: d.colours.map(n => ({
      name: n,
      hex: D.cols[n]
    })),
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120,
      display: 'flex',
      gap: 4
    }
  }, d.tag && /*#__PURE__*/React.createElement(Badge, {
    tone: d.tagTone || 'brand'
  }, d.tag), d.note && /*#__PURE__*/React.createElement(Badge, {
    tone: "danger"
  }, d.note)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(PriceText, {
    value: d.price,
    size: 18
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "plus",
    size: "sm",
    variant: "card",
    label: "Add",
    onClick: e => {
      e.stopPropagation();
      add(d, d.colours[0]);
    }
  })))))), /*#__PURE__*/React.createElement(CartPane, {
    carts: CARTS,
    active: active,
    onActive: setActive,
    lines: lines,
    onQty: setQty,
    customerMode: customerMode
  }));
}
Object.assign(window, {
  WebCatalogue
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sutra-web/WebCatalogue.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ColourDots = __ds_scope.ColourDots;

__ds_ns.PriceText = __ds_scope.PriceText;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Thumb = __ds_scope.Thumb;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.BottomBar = __ds_scope.BottomBar;

__ds_ns.SideNav = __ds_scope.SideNav;

})();
