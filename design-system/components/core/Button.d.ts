import * as React from 'react';
/**
 * @startingPoint section="Core" subtitle="Pill button in seven tones" viewport="700x220"
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger' | 'success' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name, left of label */
  icon?: string;
  iconRight?: string;
  /** Uppercase tracked label — for floor commands like PACK ▸ */
  caps?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
