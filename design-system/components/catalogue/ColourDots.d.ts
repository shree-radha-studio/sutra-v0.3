import * as React from 'react';
/**
 * 
 */
export interface ColourDotsProps {
  colours: { name: string; hex: string }[];
  active?: string;
  onSelect?: (name: string) => void;
  size?: number;
  max?: number;
  style?: React.CSSProperties;
}
export declare function ColourDots(props: ColourDotsProps): JSX.Element;
