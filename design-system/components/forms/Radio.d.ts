import * as React from 'react';
/**
 * 
 */
export interface RadioProps {
  options: (string | { value: string; label: string })[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  direction?: 'row' | 'column';
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
