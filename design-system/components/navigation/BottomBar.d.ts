import * as React from 'react';
/**
 * 
 */
export interface BottomBarProps {
  items: { key: string; label: string; icon?: string; count?: number }[];
  value: string;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
}
export declare function BottomBar(props: BottomBarProps): JSX.Element;
