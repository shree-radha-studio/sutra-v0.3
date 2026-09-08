import * as React from 'react';
/**
 * 
 */
export interface TagProps {
  children?: React.ReactNode;
  selected?: boolean;
  icon?: string;
  /** Colour swatch dot (hex) for colour filters */
  colour?: string;
  onRemove?: () => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
