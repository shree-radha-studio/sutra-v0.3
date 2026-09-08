import * as React from 'react';
/**
 * Lucide icon wrapper — the only icon set in Sutra.
 */
export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "shopping-bag" */
  name: string;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
