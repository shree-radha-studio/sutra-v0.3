import * as React from 'react';
/**
 * 
 */
export interface ToastProps {
  tone?: 'ok' | 'warn' | 'danger' | 'info' | 'neutral';
  title?: string;
  message?: string;
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
