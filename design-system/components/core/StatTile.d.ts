import * as React from 'react';
/**
 * 
 */
export interface StatTileProps {
  label: string;
  value: React.ReactNode;
  sub?: string;
  tone?: 'default' | 'ok' | 'warn' | 'danger' | 'brand';
  compact?: boolean;
  style?: React.CSSProperties;
}
export declare function StatTile(props: StatTileProps): JSX.Element;
