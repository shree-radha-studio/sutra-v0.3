import * as React from 'react';
/**
 * 
 */
export interface StepperProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
export declare function Stepper(props: StepperProps): JSX.Element;
