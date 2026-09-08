import * as React from 'react';
/**
 * 
 */
export interface IconButtonProps {
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'soft' | 'card' | 'brand' | 'ghost' | 'glass';
  /** Accessible label / tooltip */
  label?: string;
  active?: boolean;
  /** Small gold count bubble (cart count, etc.) */
  badge?: number | string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
