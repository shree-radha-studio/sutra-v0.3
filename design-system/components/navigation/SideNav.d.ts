import * as React from 'react';
/**
 * 
 */
export interface SideNavProps {
  items: ({ key: string; label: string; icon?: string; count?: number } | { section: string })[];
  value: string;
  onChange?: (key: string) => void;
  collapsed?: boolean;
  logoSrc?: string;
  clientLogoSrc?: string;
  user?: { name: string; role?: string; firm?: string };
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function SideNav(props: SideNavProps): JSX.Element;
