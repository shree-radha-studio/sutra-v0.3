import * as React from 'react';
/**
 * 
 */
export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  /** Shows the maroon scan button on the right */
  onScan?: () => void;
  size?: 'md' | 'lg';
  style?: React.CSSProperties;
}
export declare function SearchBar(props: SearchBarProps): JSX.Element;
