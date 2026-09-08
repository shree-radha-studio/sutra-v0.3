import * as React from 'react';
/**
 * @startingPoint section="Core" subtitle="Node tabs with the maroon underline" viewport="700x120"
 */
export interface TabsProps {
  items: { key: string; label: string; count?: number; icon?: string }[];
  value: string;
  onChange?: (key: string) => void;
  /** underline = maroon rule under the active tab (default); pill = segmented */
  variant?: 'underline' | 'pill';
  size?: 'sm' | 'md';
  caps?: boolean;
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
