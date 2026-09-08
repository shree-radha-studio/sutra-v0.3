import * as React from 'react';
/**
 * 
 */
export interface ThumbProps {
  src?: string;
  /** Design / material code shown when there is no photo */
  code?: string;
  size?: number;
  /** height = size * ratio (1 square, 1.25 portrait) */
  ratio?: number;
  radius?: string;
  /** Fill with the SKU colour (hex) instead of the sand backdrop */
  colour?: string;
  style?: React.CSSProperties;
}
export declare function Thumb(props: ThumbProps): JSX.Element;
