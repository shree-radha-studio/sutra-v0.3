import * as React from 'react';
/**
 * Catalogue price — leading digit +5%.
 */
export interface PriceTextProps {
  /** number → Indian grouping (₹1,78,835); null → TBD (unpriced sample) */
  value?: number | string | null;
  size?: number;
  /** Leading digit 5% larger (catalogue rule). Turn off outside customer-facing screens. */
  lead?: boolean;
  currency?: string;
  tbd?: string;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}
export declare function PriceText(props: PriceTextProps): JSX.Element;
