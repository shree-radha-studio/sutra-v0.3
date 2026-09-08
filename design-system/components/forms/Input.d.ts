import * as React from 'react';
/**
 * 
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  hint?: string;
  icon?: string;
  suffix?: React.ReactNode;
  invalid?: boolean;
  error?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
