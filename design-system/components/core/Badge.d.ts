import * as React from 'react';
/**
 * 
 */
export interface BadgeProps {
  tone?: 'neutral' | 'brand' | 'gold' | 'ok' | 'warn' | 'danger' | 'info';
  variant?: 'soft' | 'solid' | 'outline';
  dot?: boolean;
  size?: 'sm' | 'md';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
