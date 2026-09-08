import * as React from 'react';
/**
 * 
 */
export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  eyebrow?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  /** Bottom sheet (phone) */
  sheet?: boolean;
  style?: React.CSSProperties;
}
export declare function Dialog(props: DialogProps): JSX.Element;
