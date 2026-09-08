import * as React from 'react';
/**
 * 
 */
export interface SegmentedControlProps {
  options: { value: string; label?: string; icon?: string }[];
  value: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
