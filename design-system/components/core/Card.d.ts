import * as React from 'react';
/**
 * 
 */
export interface CardProps {
  children?: React.ReactNode;
  padding?: string | number;
  /** 2px outline colour — dispatch priority ring (var(--p1)…) */
  ring?: string;
  /** 5px left colour bar — parcel/customer colour */
  bar?: string;
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
