import * as React from 'react';
/**
 * @startingPoint section="Catalogue" subtitle="Picture-first product grid card" viewport="700x360"
 */
export interface ProductCardProps {
  src?: string;
  code: string;
  name?: string;
  /** number → ₹ formatted; null → "TBD" (sample not yet priced) */
  price?: number | string | null;
  colours?: { name: string; hex: string }[];
  activeColour?: string;
  onColour?: (name: string) => void;
  /** Corner badge, e.g. "Top 30" (manipulative tag) */
  tag?: string;
  tagTone?: 'brand' | 'gold' | 'ok' | 'warn' | 'danger' | 'info' | 'neutral';
  /** Caps note under the label, e.g. "Low stock" */
  note?: string;
  noteTone?: 'danger' | 'ok' | 'muted';
  /** Admin-view mini stats row, e.g. { free: 74, fg: 74, 'in prod': 0 } */
  stats?: Record<string, number | string>;
  onAdd?: () => void;
  onClick?: () => void;
  selected?: boolean;
  width?: number | string;
  ratio?: number;
  /** Leading price digit +5% (catalogue rule). Default true */
  leadPrice?: boolean;
  style?: React.CSSProperties;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;
